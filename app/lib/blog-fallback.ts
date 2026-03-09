/**
 * Fallback: read blog posts from local JSON files.
 * Used when Sanity is not yet configured (NEXT_PUBLIC_SANITY_PROJECT_ID is unset).
 * This keeps the site functional during the CMS migration.
 */
import fs from "fs";
import path from "path";

export type JsonPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  author: string;
  content: string | Array<{ type: string; text: string }>;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPostsFromFiles(): JsonPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return (
    fs
      .readdirSync(BLOG_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => {
        try {
          return JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), "utf-8")) as JsonPost;
        } catch {
          return null;
        }
      })
      .filter(Boolean) as JsonPost[]
  ).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostFromFile(slug: string): JsonPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as JsonPost;
  } catch {
    return null;
  }
}

export function getAllSlugsFromFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}
