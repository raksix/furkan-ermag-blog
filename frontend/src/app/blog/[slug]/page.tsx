import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { getBlogPost } from "@/lib/api";
import { BlogPost } from "@/lib/types";
import { notFound } from "next/navigation";

const fallbackPosts: Record<string, BlogPost> = {
  "aspnet-core-restful-api": {
    id: 1,
    title: "ASP.NET Core ile RESTful API Gelistirme",
    slug: "aspnet-core-restful-api",
    summary:
      "ASP.NET Core kullanarak profesyonel bir RESTful API nasil gelistirilir?",
    content: `## Giris

ASP.NET Core, Microsoft tarafindan gelistirilen acik kaynakli, yuksek performansli bir web framework'udur. Bu yazida, ASP.NET Core kullanarak profesyonel bir RESTful API gelistirmeyi adim adim ogreneceksiniz.

## Proje Olusturma

Yeni bir ASP.NET Core Web API projesi olusturmak icin asagidaki komutu kullanin:

\`\`\`bash
dotnet new webapi -n MyApi
\`\`\`

## Controller Yapisi

Controller'lar API endpointlerinizi tanimlar:

\`\`\`csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
    {
        var products = await _productService.GetAllAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var product = await _productService.GetByIdAsync(id);
        if (product == null) return NotFound();
        return Ok(product);
    }
}
\`\`\`

## Dependency Injection

ASP.NET Core'un yerlesik DI container'ini kullanarak servislerinizi kaydedin:

\`\`\`csharp
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
\`\`\`

## Sonuc

ASP.NET Core ile guclu ve olceklenebilir API'ler gelistirmek oldukca kolaydir. Framework'un sagladi araclari dogru kullanarak profesyonel seviyede projeler ortaya cikarmak mumkundur.`,
    coverImage: "",
    tags: [".NET", "API", "C#"],
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  "nextjs-15-modern-frontend": {
    id: 2,
    title: "Next.js 15 ile Modern Frontend Gelistirme",
    slug: "nextjs-15-modern-frontend",
    summary: "Next.js 15'in yeni ozellikleri ve App Router kullanimi.",
    content: `## Next.js 15 Nedir?

Next.js, React tabanli bir full-stack web framework'udur. Versiyon 15 ile birlikte gelen yenilikler, gelistirici deneyimini onemli olcude iyilestirmektedir.

## App Router

App Router, dosya sistemi tabanli routing saglar:

\`\`\`
src/
  app/
    page.tsx          // Ana sayfa
    blog/
      page.tsx        // Blog listesi
      [slug]/
        page.tsx      // Blog detay
    about/
      page.tsx        // Hakkinda
\`\`\`

## Server Components

Server Component'ler varsayilan olarak sunucu tarafinda render edilir:

\`\`\`tsx
// Bu bir Server Component - varsayilan
export default async function BlogPage() {
  const posts = await fetch('/api/posts');
  return <PostList posts={posts} />;
}
\`\`\`

## Client Components

Interaktif bilesenler icin \`"use client"\` direktifini kullanin:

\`\`\`tsx
"use client";
import { useState } from "react";

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "Begenildi" : "Begen"}
    </button>
  );
}
\`\`\`

## Sonuc

Next.js 15, modern web gelistirme icin muhtesem araclar sunuyor. Server Components, streaming ve optimize edilmis routing ile performansli uygulamalar olusturabilirsiniz.`,
    coverImage: "",
    tags: ["Next.js", "React", "TypeScript"],
    createdAt: "2026-01-20T10:00:00Z",
    updatedAt: "2026-01-20T10:00:00Z",
  },
  "docker-dotnet-konteyner": {
    id: 3,
    title: "Docker ile .NET Uygulamalarini Konteynerize Etme",
    slug: "docker-dotnet-konteyner",
    summary: "Docker kullanarak .NET uygulamalarinizi konteyner icinde calistirma.",
    content: `## Docker Neden Onemli?

Docker, uygulamalarinizi tasinabilir konteynerler icinde paketlemenizi saglar. "Benim makinemde calisiyor" sorununa kesin cozum sunar.

## Dockerfile Olusturma

\`\`\`dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["MyApi/MyApi.csproj", "MyApi/"]
RUN dotnet restore "MyApi/MyApi.csproj"
COPY . .
WORKDIR "/src/MyApi"
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyApi.dll"]
\`\`\`

## Docker Compose

Birden fazla servisi yonetmek icin Docker Compose kullanin:

\`\`\`yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "5000:80"
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: mydb
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
\`\`\`

## Sonuc

Docker ile .NET uygulamalarinizi kolayca konteynerize edebilir, tasinabilir ve olceklenebilir hale getirebilirsiniz.`,
    coverImage: "",
    tags: ["Docker", ".NET", "DevOps"],
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-02-01T10:00:00Z",
  },
  "ef-core-ileri-seviye": {
    id: 4,
    title: "Entity Framework Core - Ileri Seviye Sorgular",
    slug: "ef-core-ileri-seviye",
    summary: "EF Core ile performansli sorgular ve optimization teknikleri.",
    content: `## Entity Framework Core

Entity Framework Core, .NET icin modern bir ORM (Object-Relational Mapper) kutuphanesidir.

## Eager Loading vs Lazy Loading

\`\`\`csharp
// Eager Loading - Iliskili verileri onceden yukler
var orders = await context.Orders
    .Include(o => o.Customer)
    .Include(o => o.OrderItems)
        .ThenInclude(oi => oi.Product)
    .ToListAsync();

// Explicit Loading
var order = await context.Orders.FindAsync(1);
await context.Entry(order)
    .Collection(o => o.OrderItems)
    .LoadAsync();
\`\`\`

## Query Optimization

\`\`\`csharp
// AsNoTracking - Readonly sorgular icin performans artisi
var products = await context.Products
    .AsNoTracking()
    .Where(p => p.Price > 100)
    .Select(p => new ProductDto
    {
        Id = p.Id,
        Name = p.Name,
        Price = p.Price
    })
    .ToListAsync();
\`\`\`

## Raw SQL Sorgulari

\`\`\`csharp
var products = await context.Products
    .FromSqlRaw("SELECT * FROM Products WHERE Price > {0}", minPrice)
    .ToListAsync();
\`\`\`

## Sonuc

EF Core, dogru kullanildiginda hem gelistirici verimliligini hem de uygulama performansini artiran guclu bir aractir.`,
    coverImage: "",
    tags: [".NET", "EF Core", "SQL"],
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-02-10T10:00:00Z",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

async function loadPost(slug: string): Promise<BlogPost | null> {
  try {
    return await getBlogPost(slug);
  } catch {
    return fallbackPosts[slug] || null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPost(slug);

  if (!post) {
    notFound();
  }

  const readTime = estimateReadTime(post.content);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Tum Yazilar
        </Link>
      </Button>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readTime} dk okuma
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <Separator className="mb-8" />

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("```")) {
              return null;
            }
            if (line.trim() === "") {
              return <br key={i} />;
            }
            return (
              <p key={i} className="mb-2 leading-relaxed">
                {line}
              </p>
            );
          })}
        </div>
      </article>
    </div>
  );
}
