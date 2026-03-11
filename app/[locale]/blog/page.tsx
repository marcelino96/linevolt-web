import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { client, writeClient, isSanityConfigured } from "@/sanity/lib/client";
import { BLOG_LIST_QUERY } from "@/sanity/lib/queries";
import { BlogListClient } from "./BlogListClient";
import { translateToEN } from "@/lib/translate";

const BASE_URL = "https://linevolt.id";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const url = `${BASE_URL}/blog`;
  return {
    metadataBase: new URL(BASE_URL),
    title: "Blog | Linevolt",
    description: isEn
      ? "Latest articles on LED strip installation and custom lighting solutions."
      : "Artikel terbaru tentang instalasi LED strip dan solusi lighting kustom dari Linevolt.",
    alternates: {
      canonical: url,
      languages: { "id-ID": `${BASE_URL}/blog`, "en-US": `${BASE_URL}/blog` },
    },
    openGraph: { title: "Blog | Linevolt", url, siteName: "Linevolt", locale: isEn ? "en_US" : "id_ID", type: "website" },
  };
}

// With localePrefix: "never", the middleware still rewrites internally to /[locale]/blog
// based on the NEXT_LOCALE cookie, so both locales must be pre-rendered.
export function generateStaticParams() {
  return [{ locale: "id" }, { locale: "en" }];
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";
  const rawPosts = isSanityConfigured()
    ? await client.fetch(BLOG_LIST_QUERY, {}, { next: { revalidate: 300 } })
    : [];

  // Auto-translate list fields (title + excerpt) and write back to Sanity once
  const posts = await Promise.all(
    (rawPosts as any[]).map(async (post) => {
      if (!isEn) return post;

      // Already has EN translations — use them
      if (post.titleEN && post.excerptEN) return post;

      // Translate missing fields
      const [titleEN, excerptEN] = await Promise.all([
        post.titleEN ? post.titleEN : translateToEN(post.title),
        post.excerptEN ? post.excerptEN : translateToEN(post.excerpt),
      ]);

      // Write back to Sanity so next request uses cached translation
      if (isSanityConfigured() && process.env.SANITY_API_TOKEN) {
        writeClient
          .patch(post._id)
          .setIfMissing({ titleEN: "", excerptEN: "" })
          .set({
            ...(!post.titleEN && { titleEN }),
            ...(!post.excerptEN && { excerptEN }),
          })
          .commit()
          .catch(() => {}); // fire-and-forget, don't block render
      }

      return { ...post, titleEN, excerptEN };
    })
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-16 font-sans">
      <BlogListClient posts={posts} locale={locale} isEn={isEn} />
    </main>
  );
}

