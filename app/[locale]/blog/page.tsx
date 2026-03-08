import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
    title: "Blog & Tips Lighting | Linevolt — Edukasi LED Strip & Videotron",
    description: "Artikel tips, panduan instalasi, dan studi kasus seputar LED Strip Addressable, Videotron, dan Custom Lighting dari para ahli Linevolt.",
    openGraph: {
        title: "Blog Linevolt — Tips LED Strip & Videotron",
        description: "Pelajari cara instalasi LED strip, biaya videotron, dan best practice lighting dari para expert Linevolt.",
        type: "website",
    },
};

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    tags: string[];
    publishedAt: string;
    readTime: string;
    author: string;
};

function getAllPosts(): Post[] {
    const blogDir = path.join(process.cwd(), "content", "blog");
    if (!fs.existsSync(blogDir)) return [];
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith(".json"));
    return (files
        .map(f => {
            try { return JSON.parse(fs.readFileSync(path.join(blogDir, f), "utf-8")) as Post; }
            catch { return null; }
        })
        .filter(Boolean) as Post[])
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const TAG_COLORS: Record<string, string> = {
    "LED Strip": "#F97316",
    "Videotron": "#60a5fa",
    "Tutorial": "#34d399",
    "Case Study": "#a78bfa",
    "Tips Instalasi": "#fb923c",
    "Teknis": "#22d3ee",
    default: "#9ca3af",
};

export default function BlogPage() {
    const posts = getAllPosts();
    const featured = posts[0];
    const rest = posts.slice(1);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans">
            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/90 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-orange-400 font-black text-lg tracking-tight">← Linevolt</Link>
                    <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase">Blog & Edukasi</span>
                    <a href="https://wa.me/62817771343?text=Halo%20Linevolt%2C%20saya%20ingin%20konsultasi" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-400 transition-colors">
                        Konsultasi Gratis
                    </a>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/30 bg-orange-400/8 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                        Blog & Edukasi
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
                        Tips & Insight{" "}
                        <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Lighting</span>
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-base">
                        Panduan teknis, studi kasus, dan edukasi seputar LED Strip Addressable, Videotron, dan Custom Lighting dari para expert kami.
                    </p>
                </div>

                {/* Featured Post */}
                {featured && (
                    <Link href={`/blog/${featured.slug}`} className="group block mb-12">
                        <div className="relative rounded-3xl overflow-hidden border border-white/8 bg-[#0d0d0d] hover:border-orange-400/30 transition-all duration-500" style={{ minHeight: 360 }}>
                            {featured.coverImage ? (
                                <Image src={featured.coverImage} alt={featured.title} fill className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500" />
                            ) : null}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 to-[#050505] opacity-60" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end" style={{ minHeight: 360 }}>
                                <div className="flex items-center gap-3 mb-4 flex-wrap">
                                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">ARTIKEL UNGGULAN</span>
                                    {featured.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full border" style={{ color: TAG_COLORS[tag] || TAG_COLORS.default, borderColor: `${TAG_COLORS[tag] || TAG_COLORS.default}40`, background: `${TAG_COLORS[tag] || TAG_COLORS.default}10` }}>{tag}</span>
                                    ))}
                                </div>
                                <h2 className="text-2xl md:text-4xl font-black text-white mb-4 max-w-3xl group-hover:text-orange-300 transition-colors">
                                    {featured.title}
                                </h2>
                                <p className="text-gray-400 max-w-2xl mb-6 text-sm leading-relaxed">{featured.excerpt}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>{featured.author}</span>
                                    <span>·</span>
                                    <span>{formatDate(featured.publishedAt)}</span>
                                    <span>·</span>
                                    <span>{featured.readTime} baca</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map(post => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                            <article className="h-full rounded-2xl overflow-hidden border border-white/8 bg-[#0d0d0d] hover:border-orange-400/30 transition-all duration-300 flex flex-col">
                                {/* Cover image or gradient placeholder */}
                                <div className="relative w-full h-44 overflow-hidden bg-[#0a0a0a]">
                                    {post.coverImage ? (
                                        <Image src={post.coverImage} alt={post.title} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-amber-900/20 to-[#0a0a0a]" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        {post.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full border" style={{ color: TAG_COLORS[tag] || TAG_COLORS.default, borderColor: `${TAG_COLORS[tag] || TAG_COLORS.default}40`, background: `${TAG_COLORS[tag] || TAG_COLORS.default}10` }}>{tag}</span>
                                        ))}
                                    </div>
                                    <h2 className="text-base font-black text-white mb-3 leading-snug group-hover:text-orange-300 transition-colors flex-1">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                                    <div className="flex items-center justify-between text-xs text-gray-600 mt-auto">
                                        <span>{formatDate(post.publishedAt)}</span>
                                        <span className="text-orange-400 font-semibold">{post.readTime} baca →</span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-20 text-center rounded-3xl border border-orange-400/20 bg-orange-400/5 p-12">
                    <h2 className="text-2xl md:text-3xl font-black mb-4">Punya Proyek Lighting?</h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">Konsultasikan kebutuhan LED Strip atau Videotron Anda langsung dengan tim ahli kami — gratis, tanpa komitmen.</p>
                    <a href="https://wa.me/62817771343?text=Halo%20Linevolt%2C%20saya%20ingin%20konsultasi%20proyek%20lighting" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300">
                        Konsultasi Gratis via WhatsApp
                    </a>
                </div>
            </main>
        </div>
    );
}
