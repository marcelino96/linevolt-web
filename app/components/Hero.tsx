"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, ArrowUpRight } from "lucide-react";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* Background orbs */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="orb-orange absolute -top-40 -left-40 opacity-60" />
        <div className="orb-orange absolute -bottom-40 -right-40 opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(249,115,22,0.07) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-400/30 bg-orange-400/8 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          Lighting Installation Company · Est. 2025
        </motion.div>

        {/* Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6"
        >
          <span className="text-white">Illuminate</span>
          <br />
          <span className="text-gradient glow-orange-text relative inline-block">
            Your Space
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute inset-x-0 -bottom-2 h-1 bg-orange-400 origin-left rounded-full"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Spesialis{" "}
          <span className="text-orange-400 font-semibold">Addressable LED Strip</span> dan Custom
          Lighting. Dari desain, instalasi, programming, hingga maintenance — kami hadirkan
          pengalaman visual yang tidak terlupakan.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://wa.me/62817771343?text=Halo%20Linevolt%2C%20saya%20ingin%20konsultasi%20proyek%20lighting%20saya"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-orange-500 text-white font-bold text-base rounded-full hover:bg-orange-400 hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] transition-all duration-300"
          >
            Konsultasi Gratis
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#portfolio"
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 text-white font-semibold text-base hover:border-orange-400/40 hover:text-orange-400 transition-all duration-300"
          >
            Lihat Portofolio
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-20 grid grid-cols-3 gap-px max-w-xl mx-auto rounded-2xl overflow-hidden border border-white/8"
        >
          {[
            { label: "Proyek Selesai", value: "20+" },
            { label: "Kota di Indonesia", value: "5+" },
            { label: "Kepuasan Klien", value: "100%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#0d0d0d] py-5 px-4 text-center first:rounded-l-2xl last:rounded-r-2xl"
            >
              <div className="text-2xl font-black text-gradient">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-orange-400/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
