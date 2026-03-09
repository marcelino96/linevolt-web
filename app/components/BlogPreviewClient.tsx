"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "next-intl";

type BlogPost = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
};

export function BlogPreviewClient({ posts }: { posts: BlogPost[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const locale = useLocale();

  return (
    <section ref={ref} id="blog-preview" className="relative pt-20 pb-12 overflow-hidden">
      <div className="divider-gradient mb-20 mx-8" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/30 bg-orange-400/8 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />{" "}
              Blog & Edukasi
            </span>
            <h2 className="text-4xl md:text-5xl font-black">
              Tips & Insight{" "}
              <span className="text-gradient">Lighting</span>
            </h2>
          </div>
          <a
            href={`/${locale}/blog`}
            className="hidden md:flex items-center gap-2 text-orange-400 font-semibold hover:gap-3 transition-all text-sm"
          >
            Lihat Semua <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.a
              key={post._id}
              href={`/${locale}/blog/${post.slug}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group block"
            >
              <article className="h-full rounded-2xl border border-white/8 bg-[#0d0d0d] p-6 hover:border-orange-400/30 transition-all duration-300 card-hover">
                <div className="flex gap-2 mb-4">
                  {post.tags?.slice(0, 1).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-black text-base text-white mb-3 leading-snug group-hover:text-orange-300 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="text-xs text-orange-400 font-semibold">
                  {post.readTime} baca →
                </div>
              </article>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-orange-400 font-semibold text-sm"
          >
            Lihat Semua Artikel <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
