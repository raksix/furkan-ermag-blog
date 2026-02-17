using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurkanErmag.Blog.Api.Data;
using FurkanErmag.Blog.Api.Models;

namespace FurkanErmag.Blog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProjectsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Project>>> GetAll()
    {
        var projects = await _context.Projects.ToListAsync();
        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Project>> GetById(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound();

        return Ok(project);
    }

    [HttpPost]
    public async Task<ActionResult<Project>> Create(Project project)
    {
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Project project)
    {
        if (id != project.Id)
            return BadRequest();

        var existing = await _context.Projects.FindAsync(id);
        if (existing == null)
            return NotFound();

        existing.Title = project.Title;
        existing.Description = project.Description;
        existing.ImageUrl = project.ImageUrl;
        existing.TechStack = project.TechStack;
        existing.GithubUrl = project.GithubUrl;
        existing.LiveUrl = project.LiveUrl;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound();

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
