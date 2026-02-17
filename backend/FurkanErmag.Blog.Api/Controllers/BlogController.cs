using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurkanErmag.Blog.Api.Data;
using FurkanErmag.Blog.Api.Models;

namespace FurkanErmag.Blog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly AppDbContext _context;

    public BlogController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BlogPost>>> GetAll()
    {
        var posts = await _context.BlogPosts
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return Ok(posts);
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<BlogPost>> GetBySlug(string slug)
    {
        var post = await _context.BlogPosts
            .FirstOrDefaultAsync(p => p.Slug == slug);

        if (post == null)
            return NotFound();

        return Ok(post);
    }

    [HttpPost]
    public async Task<ActionResult<BlogPost>> Create(BlogPost post)
    {
        post.CreatedAt = DateTime.UtcNow;
        post.UpdatedAt = DateTime.UtcNow;

        _context.BlogPosts.Add(post);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBySlug), new { slug = post.Slug }, post);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, BlogPost post)
    {
        if (id != post.Id)
            return BadRequest();

        var existing = await _context.BlogPosts.FindAsync(id);
        if (existing == null)
            return NotFound();

        existing.Title = post.Title;
        existing.Slug = post.Slug;
        existing.Summary = post.Summary;
        existing.Content = post.Content;
        existing.CoverImage = post.CoverImage;
        existing.Tags = post.Tags;
        existing.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null)
            return NotFound();

        _context.BlogPosts.Remove(post);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
