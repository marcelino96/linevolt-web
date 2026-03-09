import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { BLOG_POST_QUERY, BLOG_ALL_SLUGS_QUERY, BLOG_LIST_QUERY } from "@/sanity/lib/queries";

const BASE_URL = "https://linevolt.id";
const WA_NUM = "62817771343";

type ContentBlock = { type: string; text: string };

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function convertContentToMarkdown(content: string | ContentBlock[]): string {
  if (typeof content === "string") return content;
  return content.map((block) => {
    if (block.type === "heading") return `## ${block.text}`;
    return block.text;
  }).join("\n\n");
}

function renderContent(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-black text-white mt-10 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-8 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-orange-300">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-white/8 text-orange-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/```[\s\S]*?```/g, (block) => {
      const code = block.replace(/```[^\n]*\n?/, "").replace(/```$/, "");
      return `<pre class="bg-[#111] border border-white/10 rounded-xl p-4 overflow-x-auto text-sm text-green-300 font-mono my-4"><code>${code}</code></pre>`;
    })
    .replace(/^\| (.+) \|$/gm, (_m, row) => {
      const cells = row.split(" | ").map((c: string) => `<td class="px-4 py-2 border-b border-white/8 text-sm text-gray-300">${c}</td>`).join("");
      return `<tr>${cells}</tr>`;
    })
    .replace(/(<tr>[\s\S]*?<\/tr>)/g, '<table class="w-full border-collapse border border-white/10 rounded-xl overflow-hidden my-6">$1</table>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-5 list-decimal text-gray-300 mb-1 text-sm leading-relaxed">$2</li>')
    .replace(/^- (.+)$/gm, '<li class="ml-5 list-disc text-gray-300 mb-1 text-sm leading-relaxed">$1</li>')
    .replace(/^(?!<[htlpuc]).+$/gm, '<p class="text-gray-400 leading-relaxed mb-4 text-[15px]">$&</p>')
    .replace(/\n\n/g, "")
    .replace(/<p class="text-gray-400 leading-relaxed mb-4 text-\[15px\]"><\/p>/g, "");
}

export async function generateStaticParams() {
  if (!isSanityConfigured()) return [];
  const slugs: { slug: string }[] = await client.fetch(BLOG_ALL_SLUGS_QUERY);
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
  const url = locale === "en" ? `${BASE_URL}/en/blog/${slug}` : `${BASE_URL}/blog/${slug}`;
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
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: "Linevolt" },
    publisher: {
      "@type": "Organization",
      name: "Linevolt",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo-alt.png` },
    },
    datePublished: post.publishedAt,
    keywords: post.tags?.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/${locale === "en" ? "en/" : ""}blog/${post.slug}` },
    ...(post.coverImage && { image: post.coverImage }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/${locale === "en" ? "en/" : ""}blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/${locale === "en" ? "en/" : ""}blog/${post.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-600 mb-8">
          <Link href={`/${locale}`} className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/blog`} className="hover:text-orange-400 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400">{tag}</span>
            ))}
          </div>
        )}

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-8 border border-white/8">
            <Image src={post.coverImage} alt={post.coverImageAlt || post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">{post.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-10 pb-8 border-b border-white/8">
          <span className="font-semibold text-gray-400">{post.author}</span>
          <span>·</span>
          <span>{formatDate(post.publishedAt, locale)}</span>
          <span>·</span>
          <span className="text-orange-400">{post.readTime} {isEn ? "read" : "baca"}</span>
        </div>

        {/* Excerpt */}
        <p className="text-lg text-gray-300 leading-relaxed mb-10 border-l-2 border-orange-500 pl-5 italic">{post.excerpt}</p>

        {/* Content */}
        {post.content && (
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: renderContent(convertContentToMarkdown(post.content)) }}
          />
        )}

        {/* CTA */}
        <div className="mt-16 p-8 rounded-3xl border border-orange-400/20 bg-orange-400/5 text-center">
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-3">
            {isEn ? "Need Help?" : "Butuh Bantuan?"}
          </p>
          <h2 className="text-xl font-black text-white mb-3">
            {isEn ? "Consult Your Lighting Project" : "Konsultasikan Proyek Lighting Anda"}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {isEn
              ? "Our expert team is ready to help from planning to installation. Free, no commitment."
              : "Tim ahli Linevolt siap membantu dari perencanaan hingga instalasi. Gratis, tanpa komitmen."}
          </p>
          <a
            href={`https://wa.me/${WA_NUM}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300 text-sm"
          >
            {isEn ? "Chat via WhatsApp →" : "Chat via WhatsApp →"}
          </a>
        </div>
      </main>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="border-t border-white/8 pt-16">
            <h2 className="text-xl font-black mb-8">{isEn ? "Related Articles" : "Artikel Terkait"}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p: any) => (
                <Link key={p._id} href={`/${locale}/blog/${p.slug}`} className="group">
                  <div className="rounded-2xl border border-white/8 bg-[#0d0d0d] p-5 hover:border-orange-400/30 transition-all duration-300 h-full flex flex-col">
                    {p.coverImage && (
                      <div className="relative w-full h-32 rounded-xl overflow-hidden mb-4">
                        <Image src={p.coverImage} alt={p.coverImageAlt || p.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {p.tags?.slice(0, 1).map((tag: string) => (
                        <span key={tag} className="text-xs font-semibold px-2 py-0.5 rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400">{tag}</span>
                      ))}
                    </div>
                    <h3 className="font-bold text-sm text-white leading-snug group-hover:text-orange-300 transition-colors flex-1">{p.title}</h3>
                    <p className="text-xs text-gray-600 mt-2">{p.readTime} {isEn ? "read" : "baca"}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

