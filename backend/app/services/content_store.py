import json
import os
import shutil
from pathlib import Path
from typing import Any

from ..models.content import PortfolioContent


class PortfolioContentStore:
    """Small JSON store used by the public portfolio and the private editor."""

    def __init__(self) -> None:
        self.seed_path = Path(__file__).resolve().parent.parent / "db" / "portfolio_content.json"
        default_path = Path(__file__).resolve().parents[3] / "data" / "portfolio_content.json"
        self.content_path = Path(os.getenv("PORTFOLIO_CONTENT_PATH", str(default_path)))
        self.content_path.parent.mkdir(parents=True, exist_ok=True)
        if not self.content_path.exists():
            shutil.copyfile(self.seed_path, self.content_path)

    def load(self) -> PortfolioContent:
        with self.content_path.open("r", encoding="utf-8") as file:
            payload: dict[str, Any] = json.load(file)
        return PortfolioContent.model_validate(payload)

    def save(self, content: PortfolioContent) -> PortfolioContent:
        validated = PortfolioContent.model_validate(content)
        tmp_path = self.content_path.with_suffix(".tmp")
        with tmp_path.open("w", encoding="utf-8") as file:
            json.dump(validated.model_dump(), file, ensure_ascii=False, indent=2)
            file.write("\n")
        tmp_path.replace(self.content_path)
        return validated

    def as_markdown(self) -> str:
        content = self.load()
        lines = [
            "# Contenido dinámico del portfolio",
            "",
            f"## Perfil\nNombre: {content.profile.name}\nHeadline: {content.profile.headline}\nEstado: {content.profile.status}",
            "",
            "## Resumen",
            content.about,
            "",
            "## Habilidades",
            ", ".join(content.profile.skills),
            "",
            "## Proyectos",
        ]

        for project in content.projects:
            lines.extend(
                [
                    f"### {project.title}",
                    project.description,
                    f"Tecnologías: {', '.join(project.technologies)}",
                    f"Repositorio: {project.repoUrl}" if project.repoUrl else "Repositorio: no especificado",
                    f"Demo: {project.projectUrl}" if project.projectUrl else "Demo: no especificada",
                    "",
                ]
            )

        lines.append("## Experiencia y formación")
        for item in content.experiences:
            lines.extend(
                [
                    f"### {item.role} - {item.company}",
                    f"Periodo: {item.period.start} - {item.period.end}",
                    item.description,
                    f"Tecnologías/temas: {', '.join(item.technologies)}",
                    "",
                ]
            )

        lines.append("## Certificaciones")
        if content.certifications:
            for item in content.certifications:
                lines.extend(
                    [
                        f"### {item.title} - {item.issuer}",
                        f"Fecha: {item.date}",
                        item.description,
                        f"Tecnologías/temas: {', '.join(item.technologies)}",
                        f"Credencial: {item.credentialUrl}" if item.credentialUrl else "Credencial: no especificada",
                        "",
                    ]
                )
        else:
            lines.extend(["No hay certificaciones publicadas todavía.", ""])

        lines.append("## Ecosistema de lenguajes y tecnologías")
        for language in content.languageEcosystem:
            lines.append(f"- {language.name}: {language.use}")

        return "\n".join(lines)
