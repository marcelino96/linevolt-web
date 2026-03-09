"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.06, ease: "backOut" as const },
  }),
};

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  coverImageAlt?: string;
  tags?: string[];
  publishedAt: string;
  readTime: string;
  author: string;
};

export function BlogListClient({
  posts,
  locale,
  isEn,
}: {
  posts: Post[];
  locale: string;
  isEn: boolean;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back to home */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href={`/${locale === "id" ? "" : locale}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-400 transition-colors mb-8 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {isEn ? "Back to Home" : "Kembali ke Beranda"}
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mb-12"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/30 bg-orange-400/8 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
          Blog & Edukasi
        </span>
        <h1 className="text-4xl md:text-5xl font-black mb-3">
          Tips & Insight{" "}
          <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            Lighting
          </span>
        </h1>
        <p className="text-gray-400">
          {isEn
            ? "Latest insights on LED and custom lighting."
            : "Wawasan terbaru seputar instalasi LED dan custom lighting."}
        </p>
      </motion.div>

      {!posts?.length ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-24 text-gray-600"
        >
          <p className="text-lg">{isEn ? "No articles yet." : "Belum ada artikel."}</p>
          <p className="text-sm mt-2">
            {isEn
              ? "Add posts in Sanity Studio (/studio)."
              : "Tambah artikel di Sanity Studio (/studio)."}
          </p>
        </motion.div>
      ) : (
        <>
          {/* Featured post */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mb-10"
          >
            <Link href={`/blog/${posts[0].slug}`} className="group block">
              <div
                className="relative rounded-3xl overflow-hidden border border-white/8 bg-[#0d0d0d] hover:border-orange-400/30 transition-all duration-500"
                style={{ minHeight: 320 }}
              >
                {posts[0].coverImage && (
                  <Image
                    src={posts[0].coverImage}
                    alt={posts[0].coverImageAlt || posts[0].title}
                    fill
                    className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end" style={{ minHeight: 320 }}>
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      ARTIKEL UNGGULAN
                    </span>
                    {posts[0].tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black text-white mb-3 group-hover:text-orange-300 transition-colors">
                    {posts[0].title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 max-w-2xl">{posts[0].excerpt}</p>
                  <span className="text-xs text-gray-500">
                    {posts[0].author} ·{" "}
                    {new Date(posts[0].publishedAt).toLocaleDateString(
                      isEn ? "en-US" : "id-ID",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}{" "}
                    · {posts[0].readTime}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, i) => (
              <motion.div
                key={post._id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={scaleIn}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="h-full rounded-2xl overflow-hidden border border-white/8 bg-[#0d0d0d] hover:border-orange-400/30 transition-all duration-300 flex flex-col">
                    <div className="relative w-full h-44 overflow-hidden bg-[#0a0a0a]">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.coverImageAlt || post.title}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 to-[#0a0a0a]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {post.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-semibold px-2 py-0.5 rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="font-black text-base text-white mb-2 leading-snug group-hover:text-orange-300 transition-colors line-clamp-2 flex-1">
                        {post.title}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-600 mt-auto">
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(
                            isEn ? "en-US" : "id-ID",
                            { year: "numeric", month: "short", day: "numeric" }
                          )}
                        </span>
                        <span className="text-orange-400 font-semibold">{post.readTime} →</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
