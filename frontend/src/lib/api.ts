export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  phone: string | null;
  location: string | null;
  github: string | null;
  linkedin: string | null;
}

export interface Project {
  id: string;
  title: string;
  excerpt: string;
  icon: string;
  live_url: string | null;
  github_url: string | null;
  technologies: string | null;
  markdown_file: string | null;
  content: string | null;
  sort_order: number;
}

export interface BearNote {
  id: string;
  title: string;
  excerpt: string;
  content: string | null;
  sort_order: number;
}

export interface SocialLink {
  id: string;
  title: string;
  img: string;
  link: string;
  category: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period_start: string;
  period_end: string | null;
  description: string;
  sort_order: number;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period_start: string;
  period_end: string | null;
  sort_order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audio: string;
}

export type AboutSections = Record<string, string>;

export interface TyporaDocument {
  id: string;
  title: string;
  content: string;
}

export interface FinderItem {
  id: string;
  name: string;
  type: "folder" | "file";
  parent_id: string | null;
  link: string | null;
  icon: string | null;
  sort_order: number;
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`);
  if (!res.ok) throw new Error(`GET /api${path} failed: ${res.status}`);
  return res.json();
}

export const api = {
  profile: () => get<Profile>("/profile"),
  projects: () => get<Project[]>("/projects"),
  bearNotes: () => get<BearNote[]>("/bear-notes"),
  socialLinks: () => get<SocialLink[]>("/social-links"),
  experience: () => get<Experience[]>("/experience"),
  education: () => get<Education[]>("/education"),
  skills: () => get<Skill[]>("/skills"),
  music: () => get<MusicTrack[]>("/music"),
  about: () => get<AboutSections>("/about"),
  finderItems: () => get<FinderItem[]>("/finder-items"),
  typoraDocument: () => get<TyporaDocument>("/typora-document"),
};
