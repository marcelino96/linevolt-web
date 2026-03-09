"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  coverImageAlt?: string;
  content?: string | { type: string; text: string }[];
  tags?: string[];
  publishedAt: string;
  readTime: string;
  author: string;
};

type ContentBlock = { type: string; text: string };

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function convertContentToMarkdown(content: string | ContentBlock[]): string {
  if (typeof content === "string") return content;
  return content
    .map((block) => {
      if (block.type === "heading") return `## ${block.text}`;
      return block.text;
    })
    .join("\n\n");
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
      const cells = row
        .split(" | ")
        .map((c: string) => `<td class="px-4 py-2 border-b border-white/8 text-sm text-gray-300">${c}</td>`)
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .replace(/(<tr>[\s\S]*?<\/tr>)/g, '<table class="w-full border-collapse border border-white/10 rounded-xl overflow-hidden my-6">$1</table>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-5 list-decimal text-gray-300 mb-1 text-sm leading-relaxed">$2</li>')
    .replace(/^- (.+)$/gm, '<li class="ml-5 list-disc text-gray-300 mb-1 text-sm leading-relaxed">$1</li>')
    .replace(/^(?!<[htlpuc]).+$/gm, '<p class="text-gray-400 leading-relaxed mb-4 text-[15px]">$&</p>')
    .replace(/\n\n/g, "")
    .replace(/<p class="text-gray-400 leading-relaxed mb-4 text-\[15px\]"><\/p>/g, "");
}

export function BlogPostClient({
  post,
  related,
  locale,
  isEn,
  waText,
  waNum,
}: {
  post: Post;
  related: Post[];
  locale: string;
  isEn: boolean;
  waText: string;
  waNum: string;
}) {
  return (
    <>
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-24">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs text-gray-600 mb-8"
        >
          <Link href={`/${locale}`} className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/blog`} className="hover:text-orange-400 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-xs">{post.title}</span>
        </motion.nav>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex gap-2 mb-6 flex-wrap"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-2.5 py-1 rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Cover image */}
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative w-full h-64 rounded-2xl overflow-hidden mb-8 border border-white/8"
          >
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover"
              priority
            />
            {/* Subtle shimmer overlay on load */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl md:text-4xl font-black text-white leading-tight mb-6"
        >
          {post.title}
        </motion.h1>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="flex items-center gap-4 text-xs text-gray-500 mb-10 pb-8 border-b border-white/8 flex-wrap"
        >
          <span className="font-semibold text-gray-400">{post.author}</span>
          <span>·</span>
          <span>{formatDate(post.publishedAt, locale)}</span>
          <span>·</span>
          <span className="text-orange-400">{post.readTime} {isEn ? "read" : "baca"}</span>
        </motion.div>

        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="text-lg text-gray-300 leading-relaxed mb-10 border-l-2 border-orange-500 pl-5 italic"
        >
          {post.excerpt}
        </motion.p>

        {/* Content */}
        {post.content && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="prose-custom"
            dangerouslySetInnerHTML={{
              __html: renderContent(convertContentToMarkdown(post.content)),
            }}
          />
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 rounded-3xl border border-orange-400/20 bg-orange-400/5 text-center"
        >
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
            href={`https://wa.me/${waNum}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300 text-sm"
          >
            {isEn ? "Chat via WhatsApp →" : "Chat via WhatsApp →"}
          </a>
        </motion.div>
      </main>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="border-t border-white/8 pt-16">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-black mb-8"
            >
              {isEn ? "Related Articles" : "Artikel Terkait"}
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link href={`/${locale}/blog/${p.slug}`} className="group block h-full">
                    <div className="rounded-2xl border border-white/8 bg-[#0d0d0d] p-5 hover:border-orange-400/30 transition-all duration-300 h-full flex flex-col">
                      {p.coverImage && (
                        <div className="relative w-full h-32 rounded-xl overflow-hidden mb-4">
                          <Image
                            src={p.coverImage}
                            alt={p.coverImageAlt || p.title}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          />
                        </div>
                      )}
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {p.tags?.slice(0, 1).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-semibold px-2 py-0.5 rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-bold text-sm text-white leading-snug group-hover:text-orange-300 transition-colors flex-1">
                        {p.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-2">
                        {p.readTime} {isEn ? "read" : "baca"}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
