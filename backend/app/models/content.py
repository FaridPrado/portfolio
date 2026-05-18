from pydantic import BaseModel, Field, HttpUrl
from typing import Optional


class SocialLinks(BaseModel):
    github: str = ""
    linkedin: str = ""
    email: str = ""


class SiteContent(BaseModel):
    url: str = ""
    name: str
    title: str
    description: str
    ogImage: str = "/og-image.svg"
    social: SocialLinks = Field(default_factory=SocialLinks)


class ProfileContent(BaseModel):
    name: str
    shortName: str
    headline: str
    intro: str
    status: str
    avatarAlt: str
    highlights: list[str] = Field(default_factory=list)
    skills: list[str] = Field(default_factory=list)


class ProjectContent(BaseModel):
    id: str
    title: str
    description: str
    technologies: list[str] = Field(default_factory=list)
    repoUrl: str = ""
    projectUrl: str = ""
    images: list[str] = Field(default_factory=list)


class ExperiencePeriod(BaseModel):
    start: str
    end: str


class ExperienceContent(BaseModel):
    id: str
    company: str
    role: str
    period: ExperiencePeriod
    description: str
    technologies: list[str] = Field(default_factory=list)
    companyUrl: str = ""


class CertificationContent(BaseModel):
    id: str
    title: str
    issuer: str
    date: str
    description: str
    technologies: list[str] = Field(default_factory=list)
    credentialUrl: str = ""


class LanguageEntry(BaseModel):
    name: str
    use: str


class PortfolioContent(BaseModel):
    profile: ProfileContent
    site: SiteContent
    about: str
    projects: list[ProjectContent] = Field(default_factory=list)
    experiences: list[ExperienceContent] = Field(default_factory=list)
    certifications: list[CertificationContent] = Field(default_factory=list)
    languageEcosystem: list[LanguageEntry] = Field(default_factory=list)
