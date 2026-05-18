import { create } from "zustand"
import { defaultPortfolioContent } from "@/data/defaultContent"
import { fetchPortfolioContent, normalizePortfolioContent } from "@/lib/api/content"
import type { PortfolioContent, PortfolioContentState } from "@/types"

const CONTENT_CACHE_KEY = "portfolio-content-cache-v1"

function readCachedContent(): PortfolioContent | null {
  if (typeof window === "undefined") return null

  try {
    const raw = window.localStorage.getItem(CONTENT_CACHE_KEY)
    return raw ? normalizePortfolioContent(JSON.parse(raw) as PortfolioContent) : null
  } catch {
    return null
  }
}

function writeCachedContent(content: PortfolioContent) {
  const normalizedContent = normalizePortfolioContent(content)
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(normalizedContent))
  } catch {
    // Ignore storage errors. The remote API remains the source of truth.
  }
}

export const usePortfolioContentStore = create<PortfolioContentState>((set) => {
  const initialCachedContent = readCachedContent()

  return {
    content: initialCachedContent,
    isLoading: !initialCachedContent,
    error: null,

    setContent: (content) => {
      const normalizedContent = normalizePortfolioContent(content)
      writeCachedContent(normalizedContent)
      set({ content: normalizedContent, error: null })
    },

    loadContent: async () => {
      const cachedContent = readCachedContent()

      set({
        ...(cachedContent ? { content: cachedContent } : {}),
        isLoading: !cachedContent,
        error: null,
      })

      try {
        const content = normalizePortfolioContent(await fetchPortfolioContent())
        writeCachedContent(content)
        set({ content, isLoading: false, error: null })
      } catch (error) {
        set({
          content: cachedContent ?? defaultPortfolioContent,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "No se pudo cargar el contenido remoto",
        })
      }
    },
  }
})
