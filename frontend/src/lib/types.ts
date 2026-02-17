export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
}
