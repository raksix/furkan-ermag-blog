import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code2, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { getProjects } from "@/lib/api";
import { Project } from "@/lib/types";

const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "E-Ticaret Platformu",
    description:
      "Full-stack e-ticaret uygulamasi. Kullanici yonetimi, odeme sistemi ve admin paneli icerir.",
    imageUrl: "",
    techStack: [".NET", "React", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/furkanermag",
    liveUrl: "",
  },
  {
    id: 2,
    title: "Task Management API",
    description:
      "RESTful task yonetim API'si. JWT authentication, role-based authorization ve Swagger dokumantasyonu.",
    imageUrl: "",
    techStack: [".NET", "Entity Framework", "SQL Server", "Redis"],
    githubUrl: "https://github.com/furkanermag",
    liveUrl: "",
  },
  {
    id: 3,
    title: "Blog Platformu",
    description:
      "Next.js ve .NET backend ile olusturulmus kisisel blog platformu. Markdown destegi ve SEO optimizasyonu.",
    imageUrl: "",
    techStack: ["Next.js", "TypeScript", ".NET", "PostgreSQL"],
    githubUrl: "https://github.com/furkanermag",
    liveUrl: "",
  },
];

async function loadProjects(): Promise<Project[]> {
  try {
    return await getProjects();
  } catch {
    return fallbackProjects;
  }
}

export default async function HomePage() {
  const projects = await loadProjects();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="flex flex-col gap-6">
          <Badge variant="secondary" className="w-fit">
            <Code2 className="mr-1 h-3 w-3" />
            Yazilim Gelistirici
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Merhaba, ben{" "}
            <span className="text-primary">Furkan Ermag</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            .NET ve modern web teknolojileri ile calisiyorum. Backend gelistirme,
            API tasarimi ve full-stack projeler uzerinde uzmanlasmaktayim.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/blog">
                Blog Yazilari
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">Hakkimda</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12">
        <h2 className="mb-8 text-2xl font-bold">Teknolojiler</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "C#",
            ".NET",
            "ASP.NET Core",
            "Entity Framework",
            "SQL Server",
            "PostgreSQL",
            "TypeScript",
            "React",
            "Next.js",
            "Tailwind CSS",
            "Docker",
            "Redis",
            "RabbitMQ",
            "Git",
          ].map((skill) => (
            <Badge key={skill} variant="outline" className="text-sm py-1 px-3">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Projeler</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1 h-3 w-3" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
