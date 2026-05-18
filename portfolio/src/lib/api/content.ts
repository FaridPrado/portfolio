import type { PortfolioContent } from "@/types"

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:8000" : "/api")

export function normalizePortfolioContent(content: PortfolioContent): PortfolioContent {
  return {
    ...content,
    certifications: content.certifications ?? [],
  }
}

export async function fetchPortfolioContent(): Promise<PortfolioContent> {
  const response = await fetch(`${API_BASE_URL}/content`, {
    headers: { "Accept": "application/json" },
  })

  if (!response.ok) {
    throw new Error(`Content API error: ${response.status}`)
  }

  return normalizePortfolioContent(await response.json())
}

export async function fetchAdminPortfolioContent(adminSecret: string): Promise<PortfolioContent> {
  const response = await fetch(`${API_BASE_URL}/admin/content`, {
    headers: {
      "Accept": "application/json",
      "X-Admin-Secret": adminSecret,
    },
  })

  if (!response.ok) {
    throw new Error(`Admin content API error: ${response.status}`)
  }

  return normalizePortfolioContent(await response.json())
}

export async function savePortfolioContent(content: PortfolioContent, adminSecret: string): Promise<PortfolioContent> {
  const response = await fetch(`${API_BASE_URL}/admin/content`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Secret": adminSecret,
    },
    body: JSON.stringify(content),
  })

  if (!response.ok) {
    throw new Error(`Save content API error: ${response.status}`)
  }

  return normalizePortfolioContent(await response.json())
}
