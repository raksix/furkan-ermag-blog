namespace FurkanErmag.Blog.Api.Models;

public class Project
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public List<string> TechStack { get; set; } = new();
    public string GithubUrl { get; set; } = string.Empty;
    public string LiveUrl { get; set; } = string.Empty;
}
