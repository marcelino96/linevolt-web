import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { BLOG_POST_QUERY, BLOG_ALL_SLUGS_QUERY, BLOG_LIST_QUERY } from "@/sanity/lib/queries";
import { BlogPostClient } from "./BlogPostClient";

const BASE_URL = "https://linevolt.id";
const WA_NUM = "62817771343";

export async function generateStaticParams() {
  if (!isSanityConfigured()) return [];
  const slugs: { slug: string }[] = await client.fetch(BLOG_ALL_SLUGS_QUERY);
  // With localePrefix: "never", only generate for one locale to avoid URL conflicts
  return slugs.map(({ slug }) => ({ locale: "id", slug }));
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
  const url = `${BASE_URL}/blog/${slug}`;
  return {
    metadataBase: new URL(BASE_URL),
    title: post.seoTitle || `${post.title} | Linevolt Blog`,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      ...(post.coverImage && { images: [{ url: post.coverImage, alt: post.coverImageAlt || post.title }] }),
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
  const [post, relatedRaw] = await Promise.all([
    client.fetch(BLOG_POST_QUERY, { slug }, { next: { revalidate: 300 } }),
    client.fetch(BLOG_LIST_QUERY, {}, { next: { revalidate: 300 } }),
  ]);

  if (!post) notFound();

  const related = (relatedRaw as any[]).filter((p) => p.slug !== slug).slice(0, 3);
  const waText = encodeURIComponent(`Halo Linevolt, saya baru baca artikel "${post.title}" dan ingin konsultasi`);

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

