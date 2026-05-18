import type { Certification, ChatState, Experience, Project } from "@/types"
import { ProjectCard } from "@/components/molecules/ProjectCard/ProjectCard"
import { ExperienceCard } from "@/components/molecules/ExperienceCard/ExperienceCard"
import { CertificationCard } from "@/components/molecules/CertificationCard"
import { simulateTypingDelay } from "./utils"

const PROJECTS_INTRO = "Estos son los proyectos que mejor cuentan hacia dónde voy: producto digital, IA aplicada y experiencias multimedia."
const EXPERIENCE_INTRO = "Esta es la ruta de formación y crecimiento profesional: una mezcla de ingeniería multimedia, producto e inteligencia artificial."
const CERTIFICATIONS_INTRO = "Estas son las certificaciones que complementan mi perfil técnico y mi ruta de aprendizaje."

type AddMessage = ChatState["addMessage"]
type SetTyping = ChatState["setTyping"]

export function sendProjectMessages(addMessage: AddMessage, setTyping: SetTyping, projects: Project[]) {
  simulateTypingDelay(setTyping, () => {
    addMessage({
      role: "assistant",
      content: PROJECTS_INTRO,
      contentType: "text",
    })

    projects.forEach((project, index) => {
      const delay = (index + 1) * 450
      window.setTimeout(() => {
        setTyping(true)
        window.setTimeout(() => {
          addMessage({
            role: "assistant",
            content: project.title,
            contentType: "project",
            richContent: <ProjectCard project={project} />,
          })
          setTyping(false)
        }, 520)
      }, delay)
    })
  })
}

export function sendExperienceMessages(addMessage: AddMessage, setTyping: SetTyping, experiences: Experience[]) {
  simulateTypingDelay(setTyping, () => {
    addMessage({
      role: "assistant",
      content: EXPERIENCE_INTRO,
      contentType: "text",
    })

    experiences.forEach((experience, index) => {
      const delay = (index + 1) * 450
      window.setTimeout(() => {
        setTyping(true)
        window.setTimeout(() => {
          addMessage({
            role: "assistant",
            content: `${experience.role} en ${experience.company}`,
            contentType: "experience",
            richContent: <ExperienceCard experience={experience} />,
          })
          setTyping(false)
        }, 520)
      }, delay)
    })
  })
}


export function sendCertificationMessages(addMessage: AddMessage, setTyping: SetTyping, certifications: Certification[]) {
  simulateTypingDelay(setTyping, () => {
    if (certifications.length === 0) {
      addMessage({
        role: "assistant",
        content: "Aún no hay certificaciones publicadas. Cuando agregues una desde el panel admin aparecerá aquí automáticamente.",
        contentType: "text",
      })
      return
    }

    addMessage({
      role: "assistant",
      content: CERTIFICATIONS_INTRO,
      contentType: "text",
    })

    certifications.forEach((certification, index) => {
      const delay = (index + 1) * 450
      window.setTimeout(() => {
        setTyping(true)
        window.setTimeout(() => {
          addMessage({
            role: "assistant",
            content: certification.title,
            contentType: "certification",
            richContent: <CertificationCard certification={certification} />,
          })
          setTyping(false)
        }, 520)
      }, delay)
    })
  })
}
