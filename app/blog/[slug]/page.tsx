import { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    tags: string[];
    publishedAt: string;
    readTime: string;
    author: string;
};

function getPost(slug: string): Post | null {
    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    try { return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Post; }
    catch { return null; }
}

function getAllPosts(): Post[] {
    const blogDir = path.join(process.cwd(), "content", "blog");
    if (!fs.existsSync(blogDir)) return [];
    return (fs.readdirSync(blogDir)
        .filter(f => f.endsWith(".json"))
        .map(f => {
            try { return JSON.parse(fs.readFileSync(path.join(blogDir, f), "utf-8")) as Post; }
            catch { return null; }
        })
        .filter(Boolean) as Post[])
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function generateStaticParams() {
    const blogDir = path.join(process.cwd(), "content", "blog");
    if (!fs.existsSync(blogDir)) return [];
    return fs.readdirSync(blogDir)
        .filter(f => f.endsWith(".json"))
        .map(f => ({ slug: f.replace(".json", "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return { title: "Artikel Tidak Ditemukan | Linevolt" };
    return {
        title: `${post.title} | Linevolt Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author],
        },
        other: {
            "article:tag": post.tags.join(", "),
        },
    };
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

// Normalize content that may be stored as an array of {type, text} objects
function normalizeContent(content: unknown): string {
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) {
        return content.map((block: { type?: string; text?: string }) => {
            if (block.type === 'heading') return `## ${block.text ?? ''}`;
            return block.text ?? '';
        }).join('\n\n');
    }
    return '';
}

// Simple markdown-to-HTML renderer for content
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
        .replace(/^(?!<[h|l|p|t|c|u|o|p]).+$/gm, '<p class="text-gray-400 leading-relaxed mb-4 text-[15px]">$&</p>')
        .replace(/\n\n/g, "")
        .replace(/<p class="text-gray-400 leading-relaxed mb-4 text-\[15px\]"><\/p>/g, "");
}

const TAG_COLORS: Record<string, string> = {
    "LED Strip": "#F97316", "Videotron": "#60a5fa", "Tutorial": "#34d399",
    "Case Study": "#a78bfa", "Tips Instalasi": "#fb923c", "Teknis": "#22d3ee",
    default: "#9ca3af",
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();

    const allPosts = getAllPosts().filter(p => p.slug !== slug).slice(0, 3);

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        author: { "@type": "Organization", name: "Linevolt" },
        publisher: { "@type": "Organization", name: "Linevolt", logo: { "@type": "ImageObject", url: "https://linevolt.id/logo-alt.png" } },
        datePublished: post.publishedAt,
        keywords: post.tags.join(", "),
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://linevolt.id/blog/${post.slug}` },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://linevolt.id" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://linevolt.id/blog" },
            { "@type": "ListItem", position: 3, name: post.title, item: `https://linevolt.id/blog/${post.slug}` },
        ],
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/90 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/blog" className="text-orange-400 font-black text-sm tracking-tight hover:text-orange-300 transition-colors">← Blog</Link>
                    <Link href="/" className="text-xs text-gray-500 font-semibold tracking-widest uppercase hover:text-white transition-colors">Linevolt</Link>
                    <a href="https://wa.me/6281234567890?text=Halo%20Linevolt%2C%20saya%20ingin%20konsultasi" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-400 transition-colors">
                        Konsultasi Gratis
                    </a>
                </div>
            </nav>

            <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs text-gray-600 mb-8">
                    <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-orange-400 transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-gray-400 truncate max-w-xs">{post.title}</span>
                </nav>

                {/* Tags */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full border" style={{ color: TAG_COLORS[tag] || TAG_COLORS.default, borderColor: `${TAG_COLORS[tag] || TAG_COLORS.default}40`, background: `${TAG_COLORS[tag] || TAG_COLORS.default}10` }}>{tag}</span>
                    ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">{post.title}</h1>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-10 pb-8 border-b border-white/8">
                    <span className="font-semibold text-gray-400">{post.author}</span>
                    <span>·</span>
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>·</span>
                    <span className="text-orange-400">{post.readTime} baca</span>
                </div>

                {/* Excerpt */}
                <p className="text-lg text-gray-300 leading-relaxed mb-10 border-l-2 border-orange-500 pl-5 italic">{post.excerpt}</p>

                {/* Content */}
                <div
                    className="prose-custom"
                    dangerouslySetInnerHTML={{ __html: renderContent(normalizeContent(post.content)) }}
                />

                {/* CTA */}
                <div className="mt-16 p-8 rounded-3xl border border-orange-400/20 bg-orange-400/5 text-center">
                    <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-3">Butuh Bantuan?</p>
                    <h2 className="text-xl font-black text-white mb-3">Konsultasikan Proyek Lighting Anda</h2>
                    <p className="text-gray-500 text-sm mb-6">Tim ahli Linevolt siap membantu dari perencanaan hingga instalasi. Gratis, tanpa komitmen.</p>
                    <a href={`https://wa.me/6281234567890?text=Halo%20Linevolt%2C%20saya%20baru%20baca%20artikel%20${encodeURIComponent(post.title)}%20dan%20ingin%20konsultasi`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300 text-sm">
                        Chat via WhatsApp →
                    </a>
                </div>
            </main>

            {/* Related Articles */}
            {allPosts.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 pb-24">
                    <div className="border-t border-white/8 pt-16">
                        <h2 className="text-xl font-black mb-8">Artikel Terkait</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {allPosts.map(p => (
                                <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                                    <div className="rounded-2xl border border-white/8 bg-[#0d0d0d] p-5 hover:border-orange-400/30 transition-all duration-300 h-full">
                                        <div className="flex gap-2 mb-3 flex-wrap">
                                            {p.tags.slice(0, 1).map(tag => (
                                                <span key={tag} className="text-xs font-semibold px-2 py-0.5 rounded-full border" style={{ color: TAG_COLORS[tag] || TAG_COLORS.default, borderColor: `${TAG_COLORS[tag] || TAG_COLORS.default}40`, background: `${TAG_COLORS[tag] || TAG_COLORS.default}10` }}>{tag}</span>
                                            ))}
                                        </div>
                                        <h3 className="font-bold text-sm text-white leading-snug group-hover:text-orange-300 transition-colors">{p.title}</h3>
                                        <p className="text-xs text-gray-600 mt-2">{p.readTime} baca</p>
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
