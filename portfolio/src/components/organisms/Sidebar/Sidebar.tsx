import { useEffect, useRef, type ReactNode } from "react";
import { cn, simulateTypingDelay } from "@/lib/utils";
import { useChatStore, useThemeStore } from "@/store/chatStore";
import { usePortfolioContentStore } from "@/store/contentStore";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { contactFlowIntro } from "@/data/contact";
import {
  sendCertificationMessages,
  sendExperienceMessages,
  sendProjectMessages,
} from "@/lib/chatHelpers";
import type { SidebarSectionId } from "@/types";
import {
  MessageSquare,
  Briefcase,
  Code2,
  Mail,
  Sun,
  Moon,
  PanelLeftClose,
  Sparkles,
  Github,
  Linkedin,
  GraduationCap,
  Award,
  Bot,
  RotateCcw,
} from "lucide-react";

interface SidebarItem {
  id: SidebarSectionId;
  label: string;
  description: string;
  icon: ReactNode;
}

const sections: SidebarItem[] = [
  {
    id: "about",
    label: "Perfil",
    description: "Quién soy y hacia dónde voy",
    icon: <MessageSquare className="w-4 h-4" />,
  },
  {
    id: "projects",
    label: "Proyectos",
    description: "Productos, prototipos y laboratorios",
    icon: <Code2 className="w-4 h-4" />,
  },
  {
    id: "experience",
    label: "Trayectoria",
    description: "Formación, foco y evolución",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: "certifications",
    label: "Certificaciones",
    description: "Credenciales y aprendizaje validado",
    icon: <Award className="w-4 h-4" />,
  },
  {
    id: "contact",
    label: "Contacto",
    description: "Hablemos de una oportunidad",
    icon: <Mail className="w-4 h-4" />,
  },
];

export function Sidebar() {
  const {
    sidebarOpen,
    toggleSidebar,
    setSidebarOpen,
    addMessage,
    setTyping,
    startContactFlow,
    setCurrentSection,
    currentSection,
    clearMessages,
    resetContactFlow,
  } = useChatStore();
  const { theme, toggleTheme } = useThemeStore();
  const content = usePortfolioContentStore((state) => state.content);
  const isDesktop = useIsDesktop("md");
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (!isDesktop && sidebarOpen) setSidebarOpen(false);
      return;
    }

    if (!isDesktop && sidebarOpen) setSidebarOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen && !isDesktop)
        setSidebarOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen, isDesktop, setSidebarOpen]);

  if (!content) {
  return null;
}

  const handleBackdropClick = () => setSidebarOpen(false);

  const handleReset = () => {
    clearMessages();
    resetContactFlow();
    setCurrentSection(null);
    if (!isDesktop) setSidebarOpen(false);
  };

  const handleSectionClick = (sectionId: SidebarSectionId) => {
    setCurrentSection(sectionId);
    if (!isDesktop) setSidebarOpen(false);

    switch (sectionId) {
      case "about":
        simulateTypingDelay(setTyping, () => {
          addMessage({ role: "assistant", content: content.about });
        });
        break;
      case "projects":
        sendProjectMessages(addMessage, setTyping, content.projects);
        break;
      case "experience":
        sendExperienceMessages(addMessage, setTyping, content.experiences);
        break;
      case "certifications":
        sendCertificationMessages(addMessage, setTyping, content.certifications);
        break;
      case "contact":
        simulateTypingDelay(setTyping, () => {
          addMessage({
            role: "assistant",
            content: contactFlowIntro,
            contentType: "contact",
          });
          startContactFlow();
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      {!isDesktop && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "flex-shrink-0 h-screen flex flex-col overflow-hidden text-[hsl(var(--sidebar-foreground))]",
          "border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar))]/95 backdrop-blur-xl",
          isDesktop
            ? cn(
                "relative transition-all duration-300 ease-in-out",
                sidebarOpen ? "w-80" : "w-0",
              )
            : cn(
                "fixed inset-y-0 left-0 z-50 w-80 max-w-[86vw]",
                "transition-transform duration-300 ease-in-out",
                sidebarOpen
                  ? "translate-x-0 pointer-events-auto"
                  : "-translate-x-full pointer-events-none",
              ),
        )}
      >
        <div className="relative p-5 border-b border-[hsl(var(--sidebar-border))]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.18),transparent_60%)]" />
          <div className="relative flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                portfolio
              </div>
              <h2 className="mt-4 text-xl font-bold leading-tight text-[hsl(var(--sidebar-foreground))]">
                {content.profile.shortName}
                <span className="block text-primary">
                  {content.profile.name
                    .replace(content.profile.shortName, "")
                    .trim()}
                </span>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.72)]">
                {content.profile.headline}
              </p>
            </div>
            <button
              onClick={toggleSidebar}
              className="rounded-2xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-foreground)/0.05)] p-2 text-[hsl(var(--sidebar-foreground)/0.72)] transition hover:bg-[hsl(var(--sidebar-foreground)/0.1)] hover:text-[hsl(var(--sidebar-foreground))]"
              aria-label="Cerrar menú"
            >
              <PanelLeftClose className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-foreground)/0.05)] p-3">
              <GraduationCap className="mb-2 h-4 w-4 text-primary" />
              <p className="text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--sidebar-foreground)/0.58)]">
                Estado
              </p>
              <p className="mt-1 text-sm font-semibold text-[hsl(var(--sidebar-foreground))]">
                {content.profile.highlights[0] ?? "Perfil técnico"}
              </p>
            </div>
            <div className="rounded-2xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-foreground)/0.05)] p-3">
              <Bot className="mb-2 h-4 w-4 text-accent" />
              <p className="text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--sidebar-foreground)/0.58)]">
                Foco
              </p>
              <p className="mt-1 text-sm font-semibold text-[hsl(var(--sidebar-foreground))]">
                {content.profile.highlights[1] ?? "IA aplicada"}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-2 scrollbar-thin">
          {sections.map((section) => {
            const active = currentSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={cn(
                  "group w-full rounded-2xl border px-3 py-3 text-left transition-all duration-200",
                  active
                    ? "border-primary/30 bg-primary/10 shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
                    : "border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-foreground)/0.035)] hover:border-primary/20 hover:bg-[hsl(var(--sidebar-foreground)/0.08)]",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-[hsl(var(--sidebar-foreground)/0.08)] text-[hsl(var(--sidebar-foreground)/0.72)] group-hover:bg-[hsl(var(--sidebar-foreground)/0.12)] group-hover:text-[hsl(var(--sidebar-foreground))]",
                    )}
                  >
                    {section.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[hsl(var(--sidebar-foreground))]">
                      {section.label}
                    </span>
                    <span className="block truncate text-xs text-[hsl(var(--sidebar-foreground)/0.58)]">
                      {section.description}
                    </span>
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-[hsl(var(--sidebar-border))] p-4">
          <button
            onClick={handleReset}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-foreground)/0.05)] px-3 py-2.5 text-sm font-semibold text-[hsl(var(--sidebar-foreground)/0.78)] transition hover:bg-[hsl(var(--sidebar-foreground)/0.09)] hover:text-[hsl(var(--sidebar-foreground))]"
          >
            <RotateCcw className="h-4 w-4 text-primary" />
            Nueva presentación
          </button>

          <div className="flex items-center gap-2">
            <a
              href={content.site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-foreground)/0.05)] text-[hsl(var(--sidebar-foreground)/0.72)] transition hover:bg-[hsl(var(--sidebar-foreground)/0.09)] hover:text-[hsl(var(--sidebar-foreground))]"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={content.site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-foreground)/0.05)] text-[hsl(var(--sidebar-foreground)/0.72)] transition hover:bg-[hsl(var(--sidebar-foreground)/0.09)] hover:text-[hsl(var(--sidebar-foreground))]"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${content.site.social.email}`}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-foreground)/0.05)] text-[hsl(var(--sidebar-foreground)/0.72)] transition hover:bg-[hsl(var(--sidebar-foreground)/0.09)] hover:text-[hsl(var(--sidebar-foreground))]"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <div className="flex-1" />
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-foreground)/0.05)] text-[hsl(var(--sidebar-foreground)/0.72)] transition hover:bg-[hsl(var(--sidebar-foreground)/0.09)] hover:text-[hsl(var(--sidebar-foreground))]"
              aria-label={theme === "dark" ? "Modo claro" : "Modo oscuro"}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
