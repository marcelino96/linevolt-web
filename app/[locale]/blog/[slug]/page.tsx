import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client, writeClient, isSanityConfigured } from "@/sanity/lib/client";
import { BLOG_POST_QUERY, BLOG_ALL_SLUGS_QUERY, BLOG_LIST_QUERY } from "@/sanity/lib/queries";
import { BlogPostClient } from "./BlogPostClient";
import { translateToEN } from "@/lib/translate";

const BASE_URL = "https://linevolt.id";
const WA_NUM = "62817771343";

export async function generateStaticParams() {
  if (!isSanityConfigured()) return [];
  const slugs: { slug: string }[] = await client.fetch(BLOG_ALL_SLUGS_QUERY);
  // With localePrefix: "never", middleware still rewrites internally to /[locale]/blog/[slug]
  // based on cookie — both locales must be pre-rendered.
  const locales = ["id", "en"];
  return locales.flatMap((locale) => slugs.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = isSanityConfigured()
    ? await client.fetch(BLOG_POST_QUERY, { slug }, { next: { revalidate: 300 } })
    : null;
  if (!post) return { title: "Artikel Tidak Ditemukan | Linevolt" };
  const isEn = locale === "en";
  const url = `${BASE_URL}/blog/${slug}`;
  const title = (isEn ? post.seoTitleEN || post.titleEN : post.seoTitle) || `${isEn && post.titleEN ? post.titleEN : post.title} | Linevolt Blog`;
  const description = (isEn ? post.seoDescriptionEN || post.excerptEN : post.seoDescription) || post.excerpt;
  const ogTitle = (isEn && post.titleEN) ? post.titleEN : post.title;
  const ogDesc = (isEn && post.excerptEN) ? post.excerptEN : post.excerpt;
  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      ...(post.coverImage && { images: [{ url: post.coverImage, alt: post.coverImageAlt || ogTitle }] }),
    },
    other: { "article:tag": post.tags?.join(", ") ?? "" },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  if (!isSanityConfigured()) notFound();
  let [post, relatedRaw] = await Promise.all([
    client.fetch(BLOG_POST_QUERY, { slug }, { next: { revalidate: 300 } }),
    client.fetch(BLOG_LIST_QUERY, {}, { next: { revalidate: 300 } }),
  ]);

  if (!post) notFound();

  // Auto-translate full post content when locale=en and translations missing
  if (isEn) {
    const needsTitle = !post.titleEN;
    const needsExcerpt = !post.excerptEN;
    const needsContent = !post.contentEN;
    const needsReadTime = !post.readTimeEN;

    if (needsTitle || needsExcerpt || needsContent || needsReadTime) {
      const [titleEN, excerptEN, contentEN, readTimeEN] = await Promise.all([
        needsTitle ? translateToEN(post.title) : post.titleEN,
        needsExcerpt ? translateToEN(post.excerpt) : post.excerptEN,
        needsContent && post.content ? translateToEN(
          typeof post.content === "string" ? post.content : post.content.map((b: any) => b.text).join("\n\n")
        ) : post.contentEN,
        needsReadTime ? translateToEN(post.readTime) : post.readTimeEN,
      ]);

      // Write back to Sanity (fire-and-forget cache)
      if (isSanityConfigured() && process.env.SANITY_API_TOKEN) {
        writeClient
          .patch(post._id)
          .set({
            ...(needsTitle && { titleEN }),
            ...(needsExcerpt && { excerptEN }),
            ...(needsContent && contentEN && { contentEN }),
            ...(needsReadTime && { readTimeEN }),
          })
          .commit()
          .catch(() => {});
      }

      post = { ...post, titleEN, excerptEN, contentEN, readTimeEN };
    }
  }

  const related = await Promise.all(
    (relatedRaw as any[])
      .filter((p: any) => p.slug !== slug)
      .slice(0, 3)
      .map(async (p: any) => {
        if (!isEn || p.titleEN) return p;
        const titleEN = await translateToEN(p.title);
        return { ...p, titleEN };
      })
  );
  const waText = isEn
    ? encodeURIComponent(`Hello Linevolt, I just read the article "${post.titleEN || post.title}" and would like to consult`)
    : encodeURIComponent(`Halo Linevolt, saya baru baca artikel "${post.title}" dan ingin konsultasi`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BASE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#business`,
      name: "Linevolt",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#business`,
      name: "Linevolt",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo-alt.png`, width: 400, height: 100 },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    keywords: post.tags?.join(", "),
    articleSection: "LED & Lighting",
    inLanguage: locale === "en" ? "en-US" : "id-ID",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${post.slug}` },
    url: `${BASE_URL}/blog/${post.slug}`,
    ...(post.coverImage && {
      image: {
        "@type": "ImageObject",
        url: post.coverImage,
        alt: post.coverImageAlt || post.title,
      },
    }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BlogPostClient post={post} related={related} locale={locale} isEn={isEn} waText={waText} waNum={WA_NUM} />
    </div>
  );
}

