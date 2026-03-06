"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Award, ExternalLink, CheckCircle2 } from "lucide-react";

export function AdvatekSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const products = [
    { model: "PixLite® A4-S Mk3", slug: "a4s-mk3", desc: "Hingga 24 universe, desain ramping, proteksi fault elektrikal. Ideal untuk instalasi komersial profesional.", href: "https://www.advateklighting.com/products/a4-s-mk3" },
    { model: "PixLite® E16-S Mk3", slug: "e16s-mk3", desc: "Controller 16-output paling cost-efficient. Mendukung hingga 96 universe — sempurna untuk proyek skala besar.", href: "https://www.advateklighting.com/products/e16-s-mk3" },
    { model: "PixLite® T8-S Mk3", slug: "t8s-mk3", desc: "Transmisi data jarak jauh 300m. Solusi tinggi-dampak untuk instalasi terdistribusi dan outdoor.", href: "https://www.advateklighting.com/products/t8-s-mk3" },
  ];

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      {/* Subtle BG glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
      <div className="divider-gradient mb-20 mx-8" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/40 bg-orange-400/8 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-5">
            <Award size={12} />
            Official Dealer · Australia
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Ditenagai <span className="text-gradient">Teknologi Terbaik</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Linevolt adalah <strong className="text-white">Authorized Dealer resmi Advatek Lighting</strong> di Indonesia.
            Setiap instalasi LED pixel kami menggunakan controller <strong className="text-orange-400">PixLite® Mk3</strong> — standar global untuk instalasi pencahayaan profesional yang tidak kompromi soal keandalan.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden border border-orange-400/15 mb-8"
          style={{
            background: "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(5,5,5,0.95) 40%, rgba(5,5,5,0.98) 100%)",
          }}
        >
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-20" />
          {/* Top orange glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-orange-400/30 bg-orange-400/10">
                  <Award size={26} className="text-orange-400" />
                </div>
                <div>
                  <div className="text-xs text-orange-400 font-semibold tracking-widest uppercase mb-0.5">Authorized Dealer</div>
                  <div className="text-2xl font-black text-white">Advatek PixLite® Mk3</div>
                  <div className="text-gray-400 text-sm">Professional Pixel Control · Made in Australia</div>
                </div>
              </div>
              <a
                href="https://www.advateklighting.com/products/collections/professional-pixel-control"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-400/40 text-orange-400 text-sm font-semibold hover:bg-orange-400/10 transition-all duration-300 shrink-0"
              >
                Lihat Produk <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Product cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {products.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="rounded-2xl overflow-hidden border border-white/6 bg-white/3 hover:border-orange-400/25 hover:bg-orange-400/5 transition-all duration-300"
                >
                  <div className="relative w-full h-52 bg-[#0a0a0a] flex items-center justify-center border-b border-white/6">
                    <div className="relative w-full h-full">
                      <Image src={`/images/advatek/${p.slug}.webp`} alt={p.model} fill className="object-contain p-2" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-orange-400 font-bold text-sm mb-2">{p.model}</div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{p.desc}</p>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-orange-400/70 hover:text-orange-400 transition-colors">
                      Lihat Detail <ExternalLink size={10} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Badge row */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["Fault Protection", "Long Range 300m", "96 Universes Max", "DMX Compatible", "Global Benchmark", "Australian Quality"].map((badge, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 text-gray-400 text-xs">
                  <CheckCircle2 size={11} className="text-orange-400" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-gray-500 text-sm"
        >
          Sebagai dealer resmi, kami menjamin keaslian produk, garansi penuh, dan dukungan teknis langsung.
        </motion.p>
      </div>
    </section>
  );
}
