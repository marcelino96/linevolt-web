"use client";

import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { fadeUp, stagger, scaleIn, AnimatedSection, SectionLabel } from "./shared";

const WHY_US = [
  {
    icon: Users,
    title: "Tim Profesional & Berpengalaman",
    desc: "Kami memiliki tim yang profesional dan berpengalaman di bidangnya masing-masing.",
  },
  {
    icon: Shield,
    title: "Produk Berkualitas Tinggi",
    desc: "Produk berkualitas tinggi dengan quality control yang ketat dan standar internasional.",
  },
  {
    icon: Clock,
    title: "Cepat, Responsif & Solutif",
    desc: "Layanan yang cepat, responsif terhadap setiap pertanyaan, dan selalu memberikan solusi terbaik.",
  },
  {
    icon: TrendingUp,
    title: "Adaptif Terhadap Tren",
    desc: "Kami selalu mengikuti tren terbaru dan kebutuhan pasar yang terus berkembang.",
  },
  {
    icon: CheckCircle2,
    title: "Budaya Kerja Transparan",
    desc: "Budaya kerja yang transparan dan terukur—Anda tahu setiap langkah progress proyek Anda.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative pt-32 pb-12 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 70%)",
        }}
      />
      <AnimatedSection className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Mengapa Kami</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black leading-tight"
          >
            Standar Kami,{" "}
            <span className="text-gradient">Jaminan Anda</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 mt-4 max-w-lg mx-auto">
            5 alasan kuat mengapa lebih dari 20 proyek premium mempercayakan
            pencahayaan mereka kepada Linevolt.
          </motion.p>
        </div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_US.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={scaleIn}
                className={`card-hover relative group bg-[#0d0d0d] rounded-2xl p-8 border border-white/6 overflow-hidden ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
              >
                {/* Number */}
                <div className="absolute top-6 right-6 text-6xl font-black text-white/3 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-orange-400/5 border border-orange-400/15 group-hover:bg-orange-400/12 group-hover:border-orange-400/30 transition-all duration-300">
                    <Icon size={26} className="text-orange-400" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>

                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
