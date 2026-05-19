import type { PortfolioContent } from "@/types"

export const defaultPortfolioContent: PortfolioContent = {
  "profile": {
    "name": "Farid Stiven Prado Hoyos",
    "shortName": "Farid Stiven",
    "headline": "Ingeniero Multimedia, producto digital e inteligencia artificial aplicada.",
    "intro": "Construyo experiencias digitales donde conviven diseño, software e inteligencia artificial. Este sitio funciona como un asistente conversacional que responde sobre mi perfil, proyectos, formación y visión profesional.",
    "status": "Disponible para crear, colaborar y aprender",
    "avatarAlt": "Farid Stiven Prado Hoyos",
    "highlights": [
      "Ingeniería Multimedia",
      "Inteligencia Artificial aplicada",
      "Fullstack + UX",
      "RAG y asistentes conversacionales"
    ],
    "skills": [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "MCP",
      "RAG",
      "UX/UI",
      "Tailwind CSS",
      "Docker",
      "Automatización"
    ]
  },
  "site": {
    "url": "https://faridprado.vercel.app",
    "name": "Farid Stiven Prado Hoyos",
    "title": "Farid Stiven Prado Hoyos | Ingeniería Multimedia e Inteligencia Artificial",
    "description": "Portfolio conversacional de Farid Stiven Prado Hoyos, estudiante de Ingeniería Multimedia con foco en Inteligencia Artificial aplicada.",
    "ogImage": "/og-image.svg",
    "social": {
      "github": "https://github.com/FaridPrado",
      "linkedin": "https://www.linkedin.com/in/farid-prado/",
      "email": "faridvzx@gmail.com"
    }
  },
  "about": "Soy **Farid Stiven Prado Hoyos**, estudiante de **Ingeniería Multimedia** próximo a terminar mi carrera e iniciar una **especialización en Inteligencia Artificial**. Mi perfil une criterio visual, desarrollo de software, pensamiento de enfoque en producto y curiosidad por sistemas inteligentes. Me interesa crear productos digitales útiles, interfaces claras y soluciones con IA que no sean solo demos, sino experiencias que comuniquen, automaticen y ayuden a resolver problemas reales.\n\nEste portfolio es mi primera declaración profesional: una presentación conversacional construida con React, FastAPI, Gemini y RAG ligero para mostrar cómo pienso, qué estoy aprendiendo y hacia dónde quiero crecer.",
  "projects": [
    {
      "id": "farid-ai-portfolio",
      "title": "Farid AI Portfolio",
      "description": "Portfolio conversacional diseñado como producto personal: frontend en React, backend en FastAPI, autenticación JWT, Gemini API y RAG ligero para responder sobre mi perfil profesional. La meta es presentar mi historia de una forma interactiva, memorable y técnica.",
      "technologies": [
        "React",
        "TypeScript",
        "FastAPI",
        "Python",
        "Gemini API",
        "RAG",
        "JWT",
        "Docker",
        "Nginx"
      ],
      "repoUrl": "https://github.com/FaridPrado",
      "projectUrl": "",
      "images": []
    },
    {
      "id": "pipeline-enriquecimiento-clientes-o-proveedores",
      "title": "Actualización Automática de Proveedores y/o Clientes",
      "description": "Herramienta de escritorio y CLI que extrae datos de facturas, RUTs e invoices en PDF, los cruza contra un Excel maestro de proveedores y actualiza automáticamente los campos faltantes o desactualizados.\n\nDiseñada para equipos contables, financieros y administrativos que necesitan enriquecer información de proveedores a partir de documentos PDF, con soporte para estructuras de Excel arbitrarias mediante un sistema de mapeo visual de columnas.",
      "technologies": [
        "Python"
      ],
      "repoUrl": "https://github.com/HenryCamilo/pipeline-enriquecimiento-clientes-o-proveedores",
      "projectUrl": "",
      "images": []
    },
    {
      "id": "procedural-writing-system",
      "title": "Procedural Writing System",
      "description": "Procedural Writing System es un proyecto experimental de inteligencia artificial que automatiza un flujo editorial completo: genera textos breves, los revisa, crea una dirección visual, compone una tarjeta gráfica y publica el resultado en una web estática.\n\nEl sistema usa como caso de aplicación una publicación digital llamada Ecos del Alma, una colección de escritos breves sobre memoria, vínculos, despedidas y regreso a uno mismo.\n\nLa intención no es generar texto con un único prompt, sino construir una arquitectura controlada donde cada salida pase por reglas, memoria, validación y publicación automatizada.",
      "technologies": [
        "Python"
      ],
      "repoUrl": "https://github.com/FaridPrado/procedural-writing-system",
      "projectUrl": "https://FaridPrado.github.io/procedural-writing-system/",
      "images": []
    },
    {
      "id": "insightagent-saag",
      "title": "InsightAgent SaaG",
      "description": "InsightAgent es un agente conversacional de inteligencia de negocio que permite analizar archivos CSV, Excel y documentos mediante lenguaje natural.\n\nEl usuario puede cargar un archivo, explorar su estructura, conversar con los datos, generar gráficos, detectar anomalías, revisar múltiples hojas de Excel y exportar reportes ejecutivos sin escribir SQL ni construir dashboards manualmente.",
      "technologies": [
        "Python",
        "JavaScript",
        "CSS",
        "HTML",
        "Dockerfile",
        "Shell"
      ],
      "repoUrl": "https://github.com/FaridPrado/insightagent-saag",
      "projectUrl": "https://insightagent-saag.onrender.com",
      "images": [
        "/projects/InsightAgent-SaaG.png"
      ]
    }
  ],
  "experiences": [
    {
      "id": "education-multimedia-engineering",
      "company": "Formación Universitaria",
      "role": "Estudiante de Ingeniería Multimedia",
      "period": {
        "start": "En curso",
        "end": "Próximo a finalizar"
      },
      "description": "Formación enfocada en la intersección entre tecnología, diseño, programación, comunicación visual, interacción y producción digital. \n\nEsta base me permite entender un producto no solo como código, sino como experiencia completa para una persona real.",
      "technologies": [
        "Ingeniería Multimedia",
        "Programación",
        "UX",
        "Diseño Interactivo",
        "Narrativa Digital"
      ],
      "companyUrl": ""
    },
    {
      "id": "ai-specialization-path",
      "company": "Ruta de Especialización",
      "role": "Próximo especialista en Inteligencia Artificial",
      "period": {
        "start": "Siguiente etapa",
        "end": "En adelante"
      },
      "description": "Estoy orientando mi crecimiento hacia IA aplicada: asistentes conversacionales, RAG, automatización, visión por computador y modelos generativos. Mi objetivo es conectar creatividad multimedia con sistemas inteligentes que resuelvan problemas reales.",
      "technologies": [
        "Inteligencia Artificial",
        "RAG",
        "LLMs",
        "Automatización",
        "Python",
        "Datos"
      ],
      "companyUrl": ""
    },
    {
      "id": "fullstack-product-practice",
      "company": "Proyectos personales y académicos",
      "role": "Desarrollador multimedia activo",
      "period": {
        "start": "Actualidad",
        "end": "Presente"
      },
      "description": "Construyo proyectos propios para fortalecer frontend, backend, APIs, diseño de interfaces e integración con IA. Este portfolio funciona como producto insignia: una presentación profesional conversacional, extensible y pensada para destacar mi evolución.",
      "technologies": [
        "React",
        "FastAPI",
        "APIs",
        "Git",
        "Tailwind",
        "UI Engineering"
      ],
      "companyUrl": "https://github.com/FaridPrado"
    },
    {
      "id": "experience-mp50wkb0",
      "company": "Alcaldía Municipal de Yumbo",
      "role": "Gestor de Medios Digitales y Comunicaciones",
      "period": {
        "start": "Enero 2022",
        "end": "Diciembre 2023"
      },
      "description": "Participé en la estrategia visual y la gestión técnica de los canales digitales de la Administración Municipal. Diseñé activos gráficos, produje reportes audiovisuales de alto impacto y automaticé la atención al ciudadano (PQRS) implementando sistemas de respuesta en redes sociales. Esta experiencia me enseñó a escalar la producción masiva de contenidos bajo estrictos lineamientos corporativos, a auditar textos con rigor editorial, y a utilizar la automatización para resolver cuellos de botella operativos, sentando las bases de mi enfoque actual en la creación de sistemas visuales eficientes y escalables.",
      "technologies": [
        "Automatización de flujos de mensajes (Meta / Chatbots)",
        "Gestión y Analítica de Redes Sociales (Community Management)",
        "Estructuración y Gestión de PQRS",
        "Producción Audiovisual y Reportaría Gráfica",
        "Diseño de Identidad Visual Corporativa",
        "Auditoría Editorial y Copywriting",
        "Adobe Creative Cloud (Illustrator",
        "Photoshop",
        "Premiere)",
        "Estrategia de Canales Digitales"
      ],
      "companyUrl": ""
    }
  ],
  "certifications": [],
  "languageEcosystem": [
    {
      "name": "TypeScript",
      "use": "Frontend, tipos y experiencia interactiva"
    },
    {
      "name": "Python",
      "use": "FastAPI, Gemini, RAG y servicios"
    },
    {
      "name": "Rust",
      "use": "Herramienta CLI experimental de validación"
    },
    {
      "name": "Go",
      "use": "Auditoría rápida de contenido JSON"
    },
    {
      "name": "SQL",
      "use": "Modelo de datos portable para futuras persistencias"
    },
    {
      "name": "Bash",
      "use": "Automatización local y setup"
    },
    {
      "name": "Docker",
      "use": "Empaquetado y despliegue reproducible"
    },
    {
      "name": "Nginx",
      "use": "Proxy, SPA routing y rate limit"
    },
    {
      "name": "YAML",
      "use": "CI/CD y configuración"
    },
    {
      "name": "CSS",
      "use": "Sistema visual, auroras y microinteracciones"
    },
    {
      "name": "Markdown",
      "use": "Contexto editable para el asistente"
    }
  ]
}
