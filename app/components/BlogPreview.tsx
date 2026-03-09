import { client, isSanityConfigured } from "@/sanity/lib/client";
import { BLOG_PREVIEW_QUERY } from "@/sanity/lib/queries";
import { getAllPostsFromFiles } from "@/app/lib/blog-fallback";
import { BlogPreviewClient } from "./BlogPreviewClient";

// Server component — fetches latest 3 posts from Sanity (falls back to JSON files)
export async function BlogPreview() {
  let posts: any[];
  if (isSanityConfigured()) {
    posts = await client.fetch(BLOG_PREVIEW_QUERY, {}, { next: { revalidate: 300 } });
  } else {
    posts = getAllPostsFromFiles().slice(0, 3).map((p) => ({
      _id: p.slug,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      coverImage: p.coverImage,
      tags: p.tags,
      publishedAt: p.publishedAt,
      readTime: p.readTime,
    }));
  }

  if (!posts?.length) return null;

  return <BlogPreviewClient posts={posts} />;
}
