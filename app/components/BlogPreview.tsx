import { client, isSanityConfigured } from "@/sanity/lib/client";
import { BLOG_PREVIEW_QUERY } from "@/sanity/lib/queries";
import { BlogPreviewClient } from "./BlogPreviewClient";

// Server component — fetches latest 3 posts from Sanity
export async function BlogPreview() {
  if (!isSanityConfigured()) return null;
  const posts = await client.fetch(BLOG_PREVIEW_QUERY, {}, { next: { revalidate: 300 } });
  if (!posts?.length) return null;
  return <BlogPreviewClient posts={posts} />;
}
