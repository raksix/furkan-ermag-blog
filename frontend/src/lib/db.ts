import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.MONGODB_DB || "furkanermag_blog";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  // Seed if empty
  const postCount = await db.collection("blog_posts").countDocuments();
  if (postCount === 0) {
    await seedData(db);
  }

  return db;
}

async function seedData(db: Db) {
  await db.collection("blog_posts").insertMany([
    {
      title: "ASP.NET Core ile RESTful API Gelistirme",
      slug: "aspnet-core-restful-api",
      summary: "ASP.NET Core kullanarak profesyonel bir RESTful API nasil gelistirilir? Bu yazida temel kavramlardan ileri seviye tekniklere kadar her seyi ele aliyoruz.",
      content: `## Giris\n\nASP.NET Core, Microsoft tarafindan gelistirilen acik kaynakli, yuksek performansli bir web framework'udur.\n\n## Proje Olusturma\n\n\`\`\`bash\ndotnet new webapi -n MyApi\n\`\`\`\n\n## Controller Yapisi\n\n\`\`\`csharp\n[ApiController]\n[Route("api/[controller]")]\npublic class ProductsController : ControllerBase\n{\n    [HttpGet]\n    public async Task<ActionResult<IEnumerable<Product>>> GetAll()\n    {\n        var products = await _productService.GetAllAsync();\n        return Ok(products);\n    }\n}\n\`\`\`\n\n## Dependency Injection\n\n\`\`\`csharp\nbuilder.Services.AddScoped<IProductService, ProductService>();\n\`\`\`\n\n## Sonuc\n\nASP.NET Core ile guclu ve olceklenebilir API'ler gelistirmek oldukca kolaydir.`,
      coverImage: "",
      tags: [".NET", "API", "C#"],
      createdAt: "2026-01-15T10:00:00Z",
      updatedAt: "2026-01-15T10:00:00Z",
    },
    {
      title: "Next.js 15 ile Modern Frontend Gelistirme",
      slug: "nextjs-15-modern-frontend",
      summary: "Next.js 15'in yeni ozellikleri ve App Router ile modern web uygulamalari nasil gelistirilir?",
      content: `## Next.js 15 Nedir?\n\nNext.js, React tabanli bir full-stack web framework'udur.\n\n## App Router\n\nDosya sistemi tabanli routing saglar:\n\n\`\`\`\nsrc/app/\n  page.tsx\n  blog/\n    page.tsx\n    [slug]/page.tsx\n\`\`\`\n\n## Server Components\n\n\`\`\`tsx\nexport default async function BlogPage() {\n  const posts = await fetch('/api/posts');\n  return <PostList posts={posts} />;\n}\n\`\`\`\n\n## Sonuc\n\nNext.js 15, modern web gelistirme icin muhtesem araclar sunuyor.`,
      coverImage: "",
      tags: ["Next.js", "React", "TypeScript"],
      createdAt: "2026-01-20T10:00:00Z",
      updatedAt: "2026-01-20T10:00:00Z",
    },
    {
      title: "Docker ile .NET Uygulamalarini Konteynerize Etme",
      slug: "docker-dotnet-konteyner",
      summary: "Docker kullanarak .NET uygulamalarinizi konteyner icerisinde nasil calistiracaginizi adim adim ogrenin.",
      content: `## Docker Neden Onemli?\n\nDocker, uygulamalarinizi tasinabilir konteynerler icinde paketlemenizi saglar.\n\n## Dockerfile\n\n\`\`\`dockerfile\nFROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base\nWORKDIR /app\nEXPOSE 80\n\nFROM mcr.microsoft.com/dotnet/sdk:8.0 AS build\nCOPY . .\nRUN dotnet publish -c Release -o /app/publish\n\nFROM base AS final\nCOPY --from=publish /app/publish .\nENTRYPOINT ["dotnet", "MyApi.dll"]\n\`\`\`\n\n## Docker Compose\n\n\`\`\`yaml\nservices:\n  api:\n    build: .\n    ports:\n      - "5000:80"\n  db:\n    image: postgres:16\n\`\`\`\n\n## Sonuc\n\nDocker ile .NET uygulamalarinizi kolayca konteynerize edebilirsiniz.`,
      coverImage: "",
      tags: ["Docker", ".NET", "DevOps"],
      createdAt: "2026-02-01T10:00:00Z",
      updatedAt: "2026-02-01T10:00:00Z",
    },
    {
      title: "Entity Framework Core - Ileri Seviye Sorgular",
      slug: "ef-core-ileri-seviye",
      summary: "Entity Framework Core ile performansli sorgular yazma, lazy/eager loading ve query optimization teknikleri.",
      content: `## Entity Framework Core\n\nEF Core, .NET icin modern bir ORM kutuphanesidir.\n\n## Eager Loading\n\n\`\`\`csharp\nvar orders = await context.Orders\n    .Include(o => o.Customer)\n    .Include(o => o.OrderItems)\n    .ToListAsync();\n\`\`\`\n\n## Query Optimization\n\n\`\`\`csharp\nvar products = await context.Products\n    .AsNoTracking()\n    .Where(p => p.Price > 100)\n    .Select(p => new ProductDto { Id = p.Id, Name = p.Name })\n    .ToListAsync();\n\`\`\`\n\n## Sonuc\n\nEF Core, dogru kullanildiginda guclu bir aractir.`,
      coverImage: "",
      tags: [".NET", "EF Core", "SQL"],
      createdAt: "2026-02-10T10:00:00Z",
      updatedAt: "2026-02-10T10:00:00Z",
    },
  ]);

  await db.collection("projects").insertMany([
    {
      title: "E-Ticaret Platformu",
      description: "Full-stack e-ticaret uygulamasi. Kullanici yonetimi, odeme sistemi ve admin paneli icerir.",
      imageUrl: "",
      techStack: [".NET", "React", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com/furkanermag",
      liveUrl: "",
    },
    {
      title: "Task Management API",
      description: "RESTful task yonetim API'si. JWT authentication, role-based authorization ve Swagger dokumantasyonu.",
      imageUrl: "",
      techStack: [".NET", "Entity Framework", "SQL Server", "Redis"],
      githubUrl: "https://github.com/furkanermag",
      liveUrl: "",
    },
    {
      title: "Blog Platformu",
      description: "Next.js backend ile olusturulmus kisisel blog platformu. MongoDB ve SEO optimizasyonu.",
      imageUrl: "",
      techStack: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
      githubUrl: "https://github.com/furkanermag",
      liveUrl: "",
    },
  ]);

  // Create unique index on slug
  await db.collection("blog_posts").createIndex({ slug: 1 }, { unique: true });
}

export default getDb;
