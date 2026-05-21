import asyncio

import pytest

from app.services.github_sync import GitHubSyncError, _resolve_repository_full_name


class FakeGitHubResponse:
    def __init__(self, status_code: int, payload: dict[str, str], text: str = "") -> None:
        self.status_code = status_code
        self._payload = payload
        self.text = text

    def json(self) -> dict[str, str]:
        return self._payload


class FakeGitHubClient:
    def __init__(self, response: FakeGitHubResponse) -> None:
        self.response = response
        self.calls: list[dict[str, object]] = []

    async def get(self, url: str, **kwargs: object) -> FakeGitHubResponse:
        self.calls.append({"url": url, **kwargs})
        return self.response


def test_resolve_repository_full_name_follows_renamed_owner_redirects() -> None:
    client = FakeGitHubClient(
        FakeGitHubResponse(200, {"full_name": "FaridPrado/portfolio"})
    )

    full_name = asyncio.run(
        _resolve_repository_full_name(client, {}, "faridSprado", "portfolio")
    )

    assert full_name == "FaridPrado/portfolio"
    assert client.calls[0]["url"] == "https://api.github.com/repos/faridSprado/portfolio"
    assert client.calls[0]["follow_redirects"] is True


def test_resolve_repository_full_name_raises_for_missing_repo() -> None:
    client = FakeGitHubClient(FakeGitHubResponse(404, {}, "Not Found"))

    with pytest.raises(GitHubSyncError, match="Could not resolve GitHub repository"):
        asyncio.run(_resolve_repository_full_name(client, {}, "missing", "portfolio"))
