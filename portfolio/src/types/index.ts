import type { ReactNode } from "react"

export type MessageContentType =
  | "text"
  | "project"
  | "experience"
  | "certification"
  | "contact"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  contentType?: MessageContentType
  richContent?: ReactNode
  timestamp: Date
  hasError?: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  repoUrl?: string
  projectUrl?: string
  images: string[]
}

export interface Experience {
  id: string
  company: string
  role: string
  period: {
    start: string
    end: string
  }
  description: string
  technologies: string[]
  companyUrl?: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  technologies: string[]
  credentialUrl?: string
}

export interface SocialLinks {
  github: string
  linkedin: string
  email: string
}

export interface SiteContent {
  url: string
  name: string
  title: string
  description: string
  ogImage: string
  social: SocialLinks
}

export interface ProfileContent {
  name: string
  shortName: string
  headline: string
  intro: string
  status: string
  avatarAlt: string
  highlights: string[]
  skills: string[]
}

export interface LanguageEntry {
  name: string
  use: string
}

export interface PortfolioContent {
  profile: ProfileContent
  site: SiteContent
  about: string
  projects: Project[]
  experiences: Experience[]
  certifications: Certification[]
  languageEcosystem: LanguageEntry[]
}

export type SidebarSectionId =
  | "about"
  | "projects"
  | "experience"
  | "certifications"
  | "contact"

export interface SidebarSection {
  id: SidebarSectionId
  label: string
  icon: string
}

export interface SectionContent {
  id: SidebarSectionId
  content: string
}

export type ContactFlowStep = "name" | "email" | "message"

export interface ContactData {
  name?: string
  email?: string
  consulta?: string
}

export interface ChatState {
  messages: Message[]
  isTyping: boolean
  sidebarOpen: boolean
  contactFlowStep: ContactFlowStep | null
  contactData: ContactData
  currentSection: SidebarSectionId | null
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void
  setTyping: (typing: boolean) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  startContactFlow: () => void
  setContactFlowStep: (step: ContactFlowStep | null) => void
  setContactData: (data: ContactData) => void
  resetContactFlow: () => void
  clearMessages: () => void
  setCurrentSection: (section: SidebarSectionId | null) => void
  startStreamingMessage: (content: string) => string
  appendToStreamingMessage: (id: string, content: string) => void
  markMessageAsError: (id: string) => void
}

export interface ThemeState {
  theme: "light" | "dark"
  toggleTheme: () => void
  setTheme: (theme: "light" | "dark") => void
}

export interface PortfolioContentState {
  content: PortfolioContent | null
  isLoading: boolean
  error: string | null
  setContent: (content: PortfolioContent) => void
  loadContent: () => Promise<void>
}
