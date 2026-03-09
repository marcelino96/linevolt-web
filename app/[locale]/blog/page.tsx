import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { BLOG_LIST_QUERY } from "@/sanity/lib/queries";
import { BlogListClient } from "./BlogListClient";

const BASE_URL = "https://linevolt.id";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const url = isEn ? `${BASE_URL}/en/blog` : `${BASE_URL}/blog`;
  return {
    metadataBase: new URL(BASE_URL),
    title: "Blog | Linevolt",
    description: isEn
      ? "Latest articles on LED strip installation and custom lighting solutions."
      : "Artikel terbaru tentang instalasi LED strip dan solusi lighting kustom dari Linevolt.",
    alternates: { canonical: url, languages: { "id-ID": `${BASE_URL}/blog`, "en-US": `${BASE_URL}/en/blog` } },
    openGraph: { title: "Blog | Linevolt", url, siteName: "Linevolt", locale: isEn ? "en_US" : "id_ID", type: "website" },
  };
}

export function generateStaticParams() {
  return [{ locale: "id" }, { locale: "en" }];
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";
  const posts = isSanityConfigured()
    ? await client.fetch(BLOG_LIST_QUERY, {}, { next: { revalidate: 300 } })
    : [];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-16 font-sans">
      <BlogListClient posts={posts} locale={locale} isEn={isEn} />
    </main>
  );
}

