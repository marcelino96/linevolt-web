import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { BLOG_LIST_QUERY } from "@/sanity/lib/queries";
import { getAllPostsFromFiles } from "@/app/lib/blog-fallback";

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
    : getAllPostsFromFiles().map((p) => ({
        _id: p.slug,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        coverImage: p.coverImage,
        coverImageAlt: p.title,
        tags: p.tags,
        publishedAt: p.publishedAt,
        readTime: p.readTime,
        author: p.author,
      }));

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/30 bg-orange-400/8 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" /> Blog & Edukasi
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Tips & Insight <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Lighting</span></h1>
          <p className="text-gray-400">{isEn ? "Latest insights on LED and custom lighting." : "Wawasan terbaru seputar instalasi LED dan custom lighting."}</p>
        </div>
        {!posts?.length ? (
          <div className="text-center py-24 text-gray-600">
            <p className="text-lg">{isEn ? "No articles yet." : "Belum ada artikel."}</p>
            <p className="text-sm mt-2">{isEn ? "Add posts in Sanity Studio (/studio)." : "Tambah artikel di Sanity Studio (/studio)."}</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            <Link href={`/${locale}/blog/${posts[0].slug}`} className="group block mb-10">
              <div className="relative rounded-3xl overflow-hidden border border-white/8 bg-[#0d0d0d] hover:border-orange-400/30 transition-all duration-500" style={{ minHeight: 320 }}>
                {posts[0].coverImage && (
                  <Image src={posts[0].coverImage} alt={posts[0].coverImageAlt || posts[0].title} fill className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end" style={{ minHeight: 320 }}>
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">ARTIKEL UNGGULAN</span>
                    {posts[0].tags?.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400">{tag}</span>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black text-white mb-3 group-hover:text-orange-300 transition-colors">{posts[0].title}</h2>
                  <p className="text-gray-400 text-sm mb-4 max-w-2xl">{posts[0].excerpt}</p>
                  <span className="text-xs text-gray-500">{posts[0].author} · {new Date(posts[0].publishedAt).toLocaleDateString(isEn ? "en-US" : "id-ID", { year: "numeric", month: "long", day: "numeric" })} · {posts[0].readTime}</span>
                </div>
              </div>
            </Link>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(1).map((post: any) => (
                <Link key={post._id} href={`/${locale}/blog/${post.slug}`} className="group block">
                  <article className="h-full rounded-2xl overflow-hidden border border-white/8 bg-[#0d0d0d] hover:border-orange-400/30 transition-all duration-300 flex flex-col">
                    <div className="relative w-full h-44 overflow-hidden bg-[#0a0a0a]">
                      {post.coverImage ? (
                        <Image src={post.coverImage} alt={post.coverImageAlt || post.title} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 to-[#0a0a0a]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {post.tags?.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="text-xs font-semibold px-2 py-0.5 rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400">{tag}</span>
                        ))}
                      </div>
                      <h2 className="font-black text-base text-white mb-2 leading-snug group-hover:text-orange-300 transition-colors line-clamp-2 flex-1">{post.title}</h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-600 mt-auto">
                        <span>{new Date(post.publishedAt).toLocaleDateString(isEn ? "en-US" : "id-ID", { year: "numeric", month: "short", day: "numeric" })}</span>
                        <span className="text-orange-400 font-semibold">{post.readTime} →</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

