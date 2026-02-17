import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, MapPin, Briefcase } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Hakkimda
        </h1>
        <p className="mt-2 text-muted-foreground">
          Yazilim gelistirici olarak yolculugum ve deneyimlerim.
        </p>
      </div>

      {/* Bio Section */}
      <section className="mb-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              FE
            </div>
            <div>
              <h2 className="text-2xl font-bold">Furkan Ermag</h2>
              <p className="text-muted-foreground flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Yazilim Gelistirici
              </p>
              <p className="text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Turkiye
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Merhaba! Ben Furkan Ermag, tutkulu bir yazilim gelistiriciyim. Ozellikle .NET
            ekosistemi ve modern web teknolojileri uzerinde calismaktayim. Backend
            gelistirme, API tasarimi, veritabani optimizasyonu ve full-stack proje
            gelistirme konularinda deneyim sahibiyim.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Surekli ogrenmeye ve kendimi gelistirmeye devam ediyorum. Bu blog'da
            ogrendiklerimi, deneyimlerimi ve projelerimi paylasiyorum.
          </p>
        </div>
      </section>

      <Separator className="mb-12" />

      {/* Experience Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Deneyim</h2>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Backend Developer</CardTitle>
              <p className="text-sm text-muted-foreground">
                Yazilim Sirketi &middot; 2024 - Devam Ediyor
              </p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>ASP.NET Core ile RESTful API gelistirme</li>
                <li>Mikroservis mimarisi tasarimi ve implementasyonu</li>
                <li>PostgreSQL ve Redis ile veritabani yonetimi</li>
                <li>Docker ve CI/CD pipeline kurulumu</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="mb-12" />

      {/* Skills Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Yetenekler</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Backend</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["C#", ".NET 8", "ASP.NET Core", "Entity Framework Core", "Dapper", "MediatR"].map(
                (skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                )
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Frontend</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn/ui"].map(
                (skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                )
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Veritabani</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["SQL Server", "PostgreSQL", "Redis", "MongoDB"].map(
                (skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                )
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">DevOps & Araclar</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["Docker", "Git", "GitHub Actions", "Azure", "RabbitMQ", "Swagger"].map(
                (skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="mb-12" />

      {/* Contact Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Iletisim</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" asChild>
            <a
              href="https://github.com/furkanermag"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://linkedin.com/in/furkanermag"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="mailto:furkan@ermag.dev">
              <Mail className="mr-2 h-4 w-4" />
              E-posta
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
