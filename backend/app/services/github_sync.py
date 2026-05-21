from __future__ import annotations

import base64
import json
import os
from typing import Any

import httpx


class GitHubSyncError(RuntimeError):
    pass


def _env(name: str, default: str = "") -> str:
    return os.getenv(name, default).strip()


def github_sync_is_enabled() -> bool:
    return _env("GITHUB_SYNC_ENABLED", "false").lower() in {"1", "true", "yes", "on"}


async def _resolve_repository_full_name(
    client: httpx.AsyncClient,
    headers: dict[str, str],
    owner: str,
    repo: str,
) -> str:
    """Return GitHub's canonical owner/repo, following renamed-user redirects."""
    repository_url = f"https://api.github.com/repos/{owner}/{repo}"
    response = await client.get(repository_url, headers=headers, follow_redirects=True)

    if response.status_code != 200:
        raise GitHubSyncError(
            f"Could not resolve GitHub repository {owner}/{repo}. "
            f"Status: {response.status_code}. Body: {response.text}"
        )

    full_name = response.json().get("full_name")
    if not isinstance(full_name, str) or "/" not in full_name:
        raise GitHubSyncError("GitHub did not return a valid repository full_name.")

    return full_name


async def sync_portfolio_content_to_github(content: dict[str, Any]) -> dict[str, Any] | None:
    """
    Updates data/portfolio_content.json in GitHub.

    If GITHUB_SYNC_ENABLED is false, this does nothing.
    If enabled and something fails, raises GitHubSyncError.
    """

    if not github_sync_is_enabled():
        return None

    token = _env("GITHUB_TOKEN")
    owner = _env("GITHUB_OWNER")
    repo = _env("GITHUB_REPO")
    branch = _env("GITHUB_BRANCH", "main")
    path = _env("GITHUB_CONTENT_PATH", "data/portfolio_content.json")

    if not token or not owner or not repo:
        raise GitHubSyncError(
            "GitHub sync is enabled, but GITHUB_TOKEN, GITHUB_OWNER or GITHUB_REPO is missing."
        )

    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token}",
        "X-GitHub-Api-Version": "2022-11-28",
    }

    async with httpx.AsyncClient(timeout=30) as client:
        full_name = await _resolve_repository_full_name(client, headers, owner, repo)
        api_url = f"https://api.github.com/repos/{full_name}/contents/{path}"

        current_file = await client.get(
            api_url,
            headers=headers,
            params={"ref": branch},
        )

        if current_file.status_code != 200:
            raise GitHubSyncError(
                f"Could not read current GitHub file. "
                f"Status: {current_file.status_code}. Body: {current_file.text}"
            )

        current_data = current_file.json()
        current_sha = current_data.get("sha")

        if not current_sha:
            raise GitHubSyncError("GitHub did not return the current file SHA.")

        pretty_json = json.dumps(content, ensure_ascii=False, indent=2) + "\n"
        encoded_content = base64.b64encode(pretty_json.encode("utf-8")).decode("utf-8")

        payload: dict[str, Any] = {
            "message": "Update portfolio content from admin",
            "content": encoded_content,
            "sha": current_sha,
            "branch": branch,
        }

        author_name = _env("GITHUB_COMMIT_AUTHOR_NAME")
        author_email = _env("GITHUB_COMMIT_AUTHOR_EMAIL")

        if author_name and author_email:
            payload["committer"] = {
                "name": author_name,
                "email": author_email,
            }

        update_response = await client.put(
            api_url,
            headers=headers,
            json=payload,
        )

        if update_response.status_code not in {200, 201}:
            raise GitHubSyncError(
                f"Could not update GitHub file. "
                f"Status: {update_response.status_code}. Body: {update_response.text}"
            )

        return update_response.json()
