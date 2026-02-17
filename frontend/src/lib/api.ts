import { BlogPost, Project } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

async function fetchApi<T>(endpoint: string): Promise<T> {
  const base = typeof window === "undefined"
    ? `http://localhost:${process.env.PORT || 3000}/api`
    : API_BASE;

  const res = await fetch(`${base}${endpoint}`, {
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
