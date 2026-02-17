using Microsoft.EntityFrameworkCore;
using FurkanErmag.Blog.Api.Models;

namespace FurkanErmag.Blog.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<Project> Projects => Set<Project>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BlogPost>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Slug).IsUnique();
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Slug).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Summary).HasMaxLength(500);
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
        });

        // Seed data
        modelBuilder.Entity<BlogPost>().HasData(
            new BlogPost
            {
                Id = 1,
                Title = "ASP.NET Core ile RESTful API Gelistirme",
                Slug = "aspnet-core-restful-api",
                Summary = "ASP.NET Core kullanarak profesyonel bir RESTful API nasil gelistirilir? Bu yazida temel kavramlardan ileri seviye tekniklere kadar her seyi ele aliyoruz.",
                Content = "## Giris\n\nASP.NET Core, Microsoft tarafindan gelistirilen acik kaynakli, yuksek performansli bir web framework'udur.\n\n## Proje Olusturma\n\nYeni bir ASP.NET Core Web API projesi olusturmak icin asagidaki komutu kullanin:\n\n```bash\ndotnet new webapi -n MyApi\n```\n\n## Sonuc\n\nASP.NET Core ile guclu ve olceklenebilir API'ler gelistirmek oldukca kolaydir.",
                CoverImage = "",
                Tags = new List<string> { ".NET", "API", "C#" },
                CreatedAt = new DateTime(2026, 1, 15, 10, 0, 0, DateTimeKind.Utc),
                UpdatedAt = new DateTime(2026, 1, 15, 10, 0, 0, DateTimeKind.Utc)
            },
            new BlogPost
            {
                Id = 2,
                Title = "Next.js 15 ile Modern Frontend Gelistirme",
                Slug = "nextjs-15-modern-frontend",
                Summary = "Next.js 15'in yeni ozellikleri ve App Router ile modern web uygulamalari nasil gelistirilir?",
                Content = "## Next.js 15 Nedir?\n\nNext.js, React tabanli bir full-stack web framework'udur.\n\n## App Router\n\nApp Router, dosya sistemi tabanli routing saglar.\n\n## Sonuc\n\nNext.js 15, modern web gelistirme icin muhtesem araclar sunuyor.",
                CoverImage = "",
                Tags = new List<string> { "Next.js", "React", "TypeScript" },
                CreatedAt = new DateTime(2026, 1, 20, 10, 0, 0, DateTimeKind.Utc),
                UpdatedAt = new DateTime(2026, 1, 20, 10, 0, 0, DateTimeKind.Utc)
            },
            new BlogPost
            {
                Id = 3,
                Title = "Docker ile .NET Uygulamalarini Konteynerize Etme",
                Slug = "docker-dotnet-konteyner",
                Summary = "Docker kullanarak .NET uygulamalarinizi konteyner icerisinde nasil calistiracaginizi adim adim ogrenin.",
                Content = "## Docker Neden Onemli?\n\nDocker, uygulamalarinizi tasinabilir konteynerler icinde paketlemenizi saglar.\n\n## Dockerfile Olusturma\n\nMulti-stage build kullanarak optimize edilmis Docker image'lari olusturabilirsiniz.\n\n## Sonuc\n\nDocker ile .NET uygulamalarinizi kolayca konteynerize edebilirsiniz.",
                CoverImage = "",
                Tags = new List<string> { "Docker", ".NET", "DevOps" },
                CreatedAt = new DateTime(2026, 2, 1, 10, 0, 0, DateTimeKind.Utc),
                UpdatedAt = new DateTime(2026, 2, 1, 10, 0, 0, DateTimeKind.Utc)
            },
            new BlogPost
            {
                Id = 4,
                Title = "Entity Framework Core - Ileri Seviye Sorgular",
                Slug = "ef-core-ileri-seviye",
                Summary = "Entity Framework Core ile performansli sorgular yazma, lazy/eager loading ve query optimization teknikleri.",
                Content = "## Entity Framework Core\n\nEntity Framework Core, .NET icin modern bir ORM kutuphanesidir.\n\n## Eager Loading vs Lazy Loading\n\nIliskili verileri yuklemek icin farkli stratejiler kullanabilirsiniz.\n\n## Sonuc\n\nEF Core, dogru kullanildiginda guclu bir aractir.",
                CoverImage = "",
                Tags = new List<string> { ".NET", "EF Core", "SQL" },
                CreatedAt = new DateTime(2026, 2, 10, 10, 0, 0, DateTimeKind.Utc),
                UpdatedAt = new DateTime(2026, 2, 10, 10, 0, 0, DateTimeKind.Utc)
            }
        );

        modelBuilder.Entity<Project>().HasData(
            new Project
            {
                Id = 1,
                Title = "E-Ticaret Platformu",
                Description = "Full-stack e-ticaret uygulamasi. Kullanici yonetimi, odeme sistemi ve admin paneli icerir.",
                ImageUrl = "",
                TechStack = new List<string> { ".NET", "React", "PostgreSQL", "Docker" },
                GithubUrl = "https://github.com/furkanermag",
                LiveUrl = ""
            },
            new Project
            {
                Id = 2,
                Title = "Task Management API",
                Description = "RESTful task yonetim API'si. JWT authentication, role-based authorization ve Swagger dokumantasyonu.",
                ImageUrl = "",
                TechStack = new List<string> { ".NET", "Entity Framework", "SQL Server", "Redis" },
                GithubUrl = "https://github.com/furkanermag",
                LiveUrl = ""
            },
            new Project
            {
                Id = 3,
                Title = "Blog Platformu",
                Description = "Next.js ve .NET backend ile olusturulmus kisisel blog platformu.",
                ImageUrl = "",
                TechStack = new List<string> { "Next.js", "TypeScript", ".NET", "PostgreSQL" },
                GithubUrl = "https://github.com/furkanermag",
                LiveUrl = ""
            }
        );
    }
}
