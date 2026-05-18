# Farid AI Portfolio

**Portfolio profesional conversacional de Farid Stiven Prado Hoyos**  
Ingeniería Multimedia, producto digital e inteligencia artificial aplicada.

[Ver portfolio online](https://faridprado.vercel.app) · [GitHub](https://github.com/FaridPrado) · [LinkedIn](https://www.linkedin.com/in/farid-prado/)

---

## Resumen

**Farid AI Portfolio** es un portfolio profesional interactivo construido como una experiencia conversacional. El proyecto no se limita a presentar información estática: integra una interfaz moderna, un backend propio, contenido editable, autenticación, streaming de respuestas con IA y un panel privado de administración.

La idea central es que cualquier visitante pueda explorar mi perfil, proyectos, trayectoria, habilidades y datos de contacto conversando con un asistente de IA contextualizado con información real del portfolio.

Este repositorio funciona como una demostración técnica de mis capacidades en desarrollo frontend, backend, integración de modelos de lenguaje, diseño de interfaces, arquitectura de producto digital, automatización y despliegue web.

---

## Objetivos del proyecto

- Presentar mi perfil profesional de una forma más memorable que un portfolio tradicional.
- Demostrar habilidades reales construyendo una aplicación fullstack funcional.
- Integrar IA generativa de forma útil, contextualizada y conectada al contenido del sitio.
- Mantener el contenido del portfolio editable sin modificar manualmente componentes React.
- Mostrar criterio visual, experiencia de usuario y organización técnica.
- Servir como punto de contacto para oportunidades laborales, servicios freelance o colaboración.

---

## Características principales

### Portfolio conversacional

El visitante puede consultar información sobre:

- Perfil profesional.
- Proyectos destacados.
- Trayectoria y formación.
- Habilidades técnicas.
- Enfoque personal hacia inteligencia artificial.
- Datos de contacto.
- Contexto general del repositorio y experiencia profesional.

### Asistente con IA

El asistente utiliza Gemini API / Google AI Studio y contexto editable del portfolio para responder de forma personalizada. El backend construye el contexto desde el contenido actual, evitando depender de texto estático obsoleto.

### Panel privado de administración

El proyecto incluye una ruta privada:

```text
/admin
```

Desde ahí se puede editar contenido como:

- Información de perfil.
- Texto de presentación.
- Proyectos.
- Imágenes de proyectos.
- Tecnologías.
- Experiencia.
- Enlaces sociales.
- Ecosistema técnico.

El acceso está protegido mediante `ADMIN_SECRET`.

### Contenido persistente

El contenido principal vive en:

```text
data/portfolio_content.json
```

Ese archivo funciona como fuente editable del portfolio y como contexto para el asistente.

### Sincronización opcional con GitHub

El backend puede sincronizar cambios del panel admin con GitHub usando la API oficial de GitHub. Esto permite que los cambios realizados desde producción se versionen como commits en el repositorio.

### Formulario de contacto conversacional

El flujo de contacto permite recopilar nombre, correo y mensaje desde la interfaz conversacional. El envío se integra con Resend desde el backend.

### Despliegue gratuito

La aplicación está preparada para desplegarse gratuitamente usando:

- **Vercel** para el frontend.
- **Render** para el backend.
- **GitHub** como fuente de verdad del repositorio y contenido versionado.

---

## Stack técnico

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Helmet Async
- React Markdown
- Lucide React

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic
- JWT
- Server-Sent Events / streaming
- Resend
- GitHub REST API
- Gemini API mediante `google-genai`

### IA y contenido

- Gemini API / Google AI Studio
- Contexto editable basado en JSON
- Prompt de sistema personalizable
- Respuestas por streaming
- RAG ligero orientado al contenido del portfolio

### Infraestructura y herramientas

- Docker Compose
- Nginx
- GitHub Actions
- Render
- Vercel
- Go
- Rust
- SQL
- Bash
- YAML

---

## Arquitectura general

```text
Visitante
   ↓
Frontend React/Vite en Vercel
   ↓
API FastAPI en Render
   ↓
Contenido JSON + Gemini API + Resend + GitHub API
```

Flujo simplificado:

```text
Usuario escribe en el chat
   ↓
Frontend envía mensaje al backend
   ↓
Backend obtiene contenido actual del portfolio
   ↓
Backend construye contexto para Gemini
   ↓
Gemini genera respuesta
   ↓
Backend transmite respuesta por streaming
   ↓
Frontend renderiza la respuesta en la interfaz
```

Flujo de administración:

```text
Admin edita contenido en /admin
   ↓
Frontend envía contenido actualizado al backend
   ↓
Backend valida ADMIN_SECRET
   ↓
Backend guarda data/portfolio_content.json
   ↓
Opcionalmente sincroniza el cambio con GitHub
   ↓
Vercel/Render redeployan desde el repositorio
```

---

## Estructura del repositorio

```text
.
├── backend/                  # API FastAPI, Gemini, auth, admin, contacto y servicios
│   ├── app/
│   │   ├── db/               # Contenido semilla y prompts
│   │   ├── models/           # Modelos Pydantic
│   │   ├── routes/           # Rutas HTTP
│   │   └── services/         # Lógica de negocio e integraciones
│   └── requirements.txt
│
├── portfolio/                # Frontend React/Vite
│   ├── public/               # Assets públicos, favicon, og-image e imágenes de proyectos
│   ├── src/
│   │   ├── assets/           # Recursos visuales internos
│   │   ├── components/       # Componentes UI
│   │   ├── data/             # Fallback local del contenido
│   │   ├── lib/              # API clients, auth y utilidades
│   │   ├── store/            # Zustand stores
│   │   └── types/            # Tipos TypeScript
│   ├── index.html
│   └── package.json
│
├── data/                     # Contenido persistente del portfolio
├── db/                       # Esquema SQL portable para futuras persistencias
├── docs/                     # Documentación técnica y guías
├── nginx/                    # Configuración para proxy en Docker
├── tools/                    # Utilidades auxiliares en Go/Rust/Bash
├── .github/workflows/        # CI
├── docker-compose.yml
└── README.md
```

---

## Variables de entorno

Los archivos `.env` reales no deben subirse al repositorio. El proyecto incluye archivos `.env.example` como referencia.

### Backend

Archivo local:

```text
backend/.env
```

Variables principales:

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
GEMINI_TEMPERATURE=0.55
GEMINI_MAX_OUTPUT_TOKENS=2500

ADMIN_SECRET=

SECRET_KEY=
CLIENT_ID=portfolio-client
CLIENT_SECRET=

FRONTEND_ORIGINS=http://localhost:5173
PORTFOLIO_CONTENT_PATH=../data/portfolio_content.json

RESEND_API_KEY=
RESEND_FROM_EMAIL=Portfolio Farid <onboarding@resend.dev>
CONTACT_EMAIL=

GITHUB_SYNC_ENABLED=false
GITHUB_TOKEN=
GITHUB_OWNER=FaridPrado
GITHUB_REPO=portfolio
GITHUB_BRANCH=main
GITHUB_CONTENT_PATH=data/portfolio_content.json
GITHUB_COMMIT_AUTHOR_NAME=Portfolio Admin
GITHUB_COMMIT_AUTHOR_EMAIL=
```

### Frontend

Archivo local:

```text
portfolio/.env
```

Variables principales:

```env
VITE_API_URL=http://localhost:8000
VITE_CLIENT_ID=portfolio-client
VITE_CLIENT_SECRET=
```

---

## Instalación y ejecución local

### Requisitos

- Node.js 22+
- pnpm
- Python 3.11+
- Git
- API key de Google AI Studio
- Opcional: cuenta de Resend para el formulario de contacto

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/FaridPrado/portfolio.git
cd portfolio
```

---

### 2. Configurar variables de entorno

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp portfolio/.env.example portfolio/.env
```

Edita los archivos `.env` con tus valores reales.

---

### 3. Ejecutar backend

#### Windows / PowerShell

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

#### macOS / Linux

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend local:

```text
http://localhost:8000
```

API docs:

```text
http://localhost:8000/docs
```

---

### 4. Ejecutar frontend

En otra terminal:

```bash
cd portfolio
pnpm install
pnpm dev
```

Frontend local:

```text
http://localhost:5173
```

Admin local:

```text
http://localhost:5173/admin
```

---

## Uso con Docker

```bash
cp .env.example .env
docker compose up --build
```

Con la configuración incluida, el proxy queda disponible en:

```text
http://localhost:8080
```

---

## Contenido editable

El archivo principal de contenido es:

```text
data/portfolio_content.json
```

Este archivo alimenta:

- Información principal del perfil.
- Proyectos.
- Imágenes de proyectos.
- Experiencia.
- Tecnologías.
- Enlaces sociales.
- Texto about.
- Contexto usado por el asistente.

El contenido semilla del backend se encuentra en:

```text
backend/app/db/portfolio_content.json
```

El fallback local del frontend está en:

```text
portfolio/src/data/defaultContent.ts
```

---

## Imágenes de proyectos

Las imágenes públicas de proyectos deben guardarse en:

```text
portfolio/public/projects
```

Ejemplo:

```text
portfolio/public/projects/insightagent-saag.png
```

En el admin se referencian así:

```text
/projects/insightagent-saag.png
```

No se deben usar rutas locales de Windows ni URLs `localhost` dentro del contenido desplegado.

---

## Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/health` | Healthcheck del backend |
| `GET` | `/content` | Contenido público del portfolio |
| `GET` | `/admin/content` | Lectura protegida del contenido |
| `PUT` | `/admin/content` | Guardado protegido del contenido |
| `POST` | `/auth/token` | Generación de access token y refresh token |
| `POST` | `/auth/refresh` | Renovación del access token |
| `POST` | `/chat` | Chat con Gemini y contexto del portfolio |
| `POST` | `/sendEmail` | Envío de contacto mediante Resend |

---

## Scripts útiles

### Frontend

```bash
cd portfolio
pnpm install
pnpm build
pnpm lint
```

### Backend

```bash
cd backend
python -m compileall app
```

### Auditoría del contenido

```bash
go run tools/go-content-audit/main.go data/portfolio_content.json
```

---

## Despliegue

### Frontend en Vercel

Configuración recomendada:

```text
Root Directory: portfolio
Build Command: pnpm build
Output Directory: dist
Install Command: pnpm install --frozen-lockfile
```

Variables en Vercel:

```env
VITE_API_URL=https://tu-backend.onrender.com
VITE_CLIENT_ID=portfolio-client
VITE_CLIENT_SECRET=
```

Para soportar rutas de SPA como `/admin`, el proyecto incluye configuración de rewrite hacia `index.html`.

### Backend en Render

Configuración recomendada:

```text
Runtime: Python 3
Root Directory: vacío
Build Command: cd backend && pip install --upgrade pip && pip install -r requirements.txt
Start Command: cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Variables importantes en Render:

```env
FRONTEND_ORIGINS=https://tu-frontend.vercel.app,http://localhost:5173
PORTFOLIO_CONTENT_PATH=../data/portfolio_content.json
```

---

## Seguridad

- Las claves reales no deben versionarse.
- `GEMINI_API_KEY`, `RESEND_API_KEY`, `SECRET_KEY`, `ADMIN_SECRET`, `CLIENT_SECRET` y `GITHUB_TOKEN` deben vivir como variables secretas.
- El token de GitHub, si se usa, debe ser fine-grained y limitarse al repositorio correspondiente.
- Para sincronizar contenido desde el admin solo se requiere permiso `Contents: Read and write`.
- El frontend nunca debe contener claves privadas de Gemini, Resend o GitHub.
- `ADMIN_SECRET` protege las rutas privadas de administración.
- `FRONTEND_ORIGINS` limita los orígenes permitidos por CORS.

---

## Decisiones técnicas destacadas

### Contenido desacoplado del código

El contenido principal vive en JSON. Esto permite actualizar proyectos, perfil y experiencia sin modificar componentes visuales.

### Backend como capa segura

Las llamadas a Gemini, Resend y GitHub se realizan desde FastAPI para evitar exponer secretos en el navegador.

### Streaming de respuestas

El chat recibe fragmentos de respuesta de forma progresiva, mejorando la percepción de velocidad y la experiencia conversacional.

### Fallback y caché de contenido

El frontend puede usar contenido cacheado para evitar pantallas vacías prolongadas cuando el backend gratuito está despertando.

### Deploy gratuito y funcional

El proyecto está diseñado para funcionar con servicios gratuitos, aceptando las limitaciones naturales de cold starts en Render.

---

## Limitaciones conocidas

- En Render Free, el backend puede dormirse tras periodos sin tráfico y tardar en responder al primer request.
- Si se usa sincronización automática con GitHub, cada guardado desde admin puede crear un commit.
- El almacenamiento de archivos en Render Free no debe considerarse persistente a largo plazo; GitHub debe ser la fuente final de verdad.
- El contenido de fallback del frontend debe mantenerse alineado con el contenido real si se quiere evitar información antigua en escenarios offline.

---

## Qué demuestra este proyecto

Este repositorio demuestra habilidades en:

- Desarrollo frontend con React, TypeScript y Tailwind.
- Desarrollo backend con Python y FastAPI.
- Integración de LLMs en aplicaciones reales.
- Diseño de experiencias conversacionales.
- Manejo de contenido editable tipo CMS ligero.
- Autenticación y protección de rutas.
- Despliegue frontend/backend desacoplado.
- Consumo de APIs externas.
- Organización de repositorios fullstack.
- Criterio visual y experiencia de usuario.
- Automatización y pensamiento de producto.

---

## Contacto

- **Portfolio:** https://faridprado.vercel.app
- **GitHub:** https://github.com/FaridPrado
- **LinkedIn:** https://www.linkedin.com/in/farid-prado/
- **Email:** faridvzx@gmail.com

---

## Autor

Desarrollado por **Farid Stiven Prado Hoyos** como proyecto personal, técnico y profesional para presentar mi perfil, mi evolución y mi enfoque hacia el desarrollo de productos digitales con inteligencia artificial aplicada.
