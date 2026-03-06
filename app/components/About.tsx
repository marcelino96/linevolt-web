"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, scaleIn, AnimatedSection, SectionLabel } from "./shared";

export function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="divider-gradient mb-20 mx-8" />
      <AnimatedSection className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <SectionLabel>Tentang Kami</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-black leading-tight mb-6"
            >
              Lebih Dari Sekedar{" "}
              <span className="text-gradient">Instalasi Lampu</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-6 text-base">
              <span className="text-orange-400 font-semibold">LINEVOLT</span> berspesialisasi dalam{" "}
              <em>Addressable LED Strips</em> dan Lighting, berfokus pada pengiriman produk dan
              layanan berkualitas tinggi yang memenuhi kebutuhan pasar modern.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-8 text-base">
              Kami percaya bahwa LED strip dan pencahayaan bukan hanya tentang estetika, tapi juga
              tentang karakteristik—bagaimana cahaya bekerja secara teknis, berinteraksi dengan
              ruang, mendukung fungsi, dan menciptakan pengalaman visual yang konsisten dan
              terkontrol.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="#services"
              className="group inline-flex items-center gap-2 text-orange-400 font-semibold hover:gap-3 transition-all"
            >
              Lihat Layanan Kami
              <ArrowUpRight size={16} className="group-hover:animate-bounce" />
            </motion.a>
          </div>

          {/* Right - Visual cards */}
          <motion.div variants={scaleIn} className="grid grid-cols-2 gap-4">
            {[
              { title: "Visi", text: "Menjadi brand terkemuka yang inovatif, adaptif, dan terpercaya di industri LED dan Lighting, baik nasional maupun internasional.", icon: "🔭" },
              { title: "Misi", text: "Menghadirkan produk dan layanan berkualitas tinggi dengan standar tertinggi dan membangun kepercayaan melalui layanan profesional.", icon: "🎯" },
              { title: "Komitmen", text: "Membangun hubungan jangka panjang dengan pelanggan melalui kualitas, kepercayaan, dan konsistensi layanan.", icon: "🤝" },
              { title: "Pendekatan", text: "Solusi kustom untuk setiap proyek—dari perencanaan, instalasi, programming, hingga maintenance.", icon: "⚡" },
            ].map((card, i) => (
              <div
                key={i}
                className="card-hover bg-[#0d0d0d] border border-white/6 rounded-2xl p-5 cursor-default"
                style={{
                  boxShadow: i === 0 ? "0 0 30px rgba(249,115,22,0.08)" : "none",
                }}
              >
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="font-bold text-white text-sm mb-2">{card.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{card.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}
