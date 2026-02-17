import { BlogPost, Project } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5119/api";

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return fetchApi<BlogPost[]>("/blog");
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  return fetchApi<BlogPost>(`/blog/${slug}`);
}

export async function getProjects(): Promise<Project[]> {
  return fetchApi<Project[]>("/projects");
}
