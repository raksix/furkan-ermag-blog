import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getBlogPosts } from "@/lib/api";
import { BlogPost } from "@/lib/types";

const fallbackPosts: BlogPost[] = [
  {
    id: 1,
    title: "ASP.NET Core ile RESTful API Gelistirme",
    slug: "aspnet-core-restful-api",
    summary:
      "ASP.NET Core kullanarak profesyonel bir RESTful API nasil gelistirilir? Bu yazida temel kavramlardan ileri seviye tekniklere kadar her seyi ele aliyoruz.",
    content: "",
    coverImage: "",
    tags: [".NET", "API", "C#"],
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Next.js 15 ile Modern Frontend Gelistirme",
    slug: "nextjs-15-modern-frontend",
    summary:
      "Next.js 15'in yeni ozellikleri ve App Router ile modern web uygulamalari nasil gelistirilir?",
    content: "",
    coverImage: "",
    tags: ["Next.js", "React", "TypeScript"],
    createdAt: "2026-01-20T10:00:00Z",
    updatedAt: "2026-01-20T10:00:00Z",
  },
  {
    id: 3,
    title: "Docker ile .NET Uygulamalarini Konteynerize Etme",
    slug: "docker-dotnet-konteyner",
    summary:
      "Docker kullanarak .NET uygulamalarinizi konteyner icerisinde nasil calistiracaginizi adim adim ogrenin.",
    content: "",
    coverImage: "",
    tags: ["Docker", ".NET", "DevOps"],
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-02-01T10:00:00Z",
  },
  {
    id: 4,
    title: "Entity Framework Core - Ileri Seviye Sorgular",
    slug: "ef-core-ileri-seviye",
    summary:
      "Entity Framework Core ile performansli sorgular yazma, lazy/eager loading ve query optimization teknikleri.",
    content: "",
    coverImage: "",
    tags: [".NET", "EF Core", "SQL"],
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-02-10T10:00:00Z",
  },
];

async function loadPosts(): Promise<BlogPost[]> {
  try {
    return await getBlogPosts();
  } catch {
    return fallbackPosts;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await loadPosts();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Yazilim gelistirme, teknoloji ve projelerim hakkinda yazilar.
        </p>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="transition-all hover:shadow-lg hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <time dateTime={post.createdAt}>
                    {formatDate(post.createdAt)}
                  </time>
                </div>
                <CardTitle className="text-xl md:text-2xl hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
