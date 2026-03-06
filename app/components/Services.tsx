"use client";

import { motion } from "framer-motion";
import {
  Settings,
  Lightbulb,
  Wrench,
  Monitor,
  Star,
  ChevronRight,
  Tv2,
  Zap,
} from "lucide-react";
import { fadeUp, stagger, scaleIn, AnimatedSection, SectionLabel } from "./shared";

const SERVICES = [
  {
    icon: Zap,
    title: "Custom Addressable LED Strip",
    desc: "Instalasi LED strip addressable yang dirancang khusus sesuai konsep visual, kebutuhan ruang, dan tujuan penggunaan.",
  },
  {
    icon: Tv2,
    title: "Videotron Installation",
    desc: "Instalasi layar videotron (LED display) untuk stage, gedung, mall, dan outdoor — dari perencanaan, pemasangan, hingga commissioning.",
  },
  {
    icon: Settings,
    title: "Custom Programming",
    desc: "Pemrograman sistem pencahayaan untuk menciptakan efek visual, pengaturan scene, otomasi, dan sinkronisasi sistem.",
  },
  {
    icon: Lightbulb,
    title: "Custom LED Fixtures",
    desc: "Pengembangan fixture LED kustom dengan desain dan spesifikasi yang dapat disesuaikan dengan kebutuhan proyek.",
  },
  {
    icon: Star,
    title: "Stage Lighting Installation",
    desc: "Instalasi sistem pencahayaan panggung yang lengkap, dari perencanaan hingga pengujian sistem.",
  },
  {
    icon: Wrench,
    title: "Maintenance LED Strip",
    desc: "Layanan pemeliharaan dan perbaikan untuk menjaga performa dan kualitas visual instalasi LED strip.",
  },
  {
    icon: Monitor,
    title: "Maintenance Stage Lighting",
    desc: "Pemeliharaan dan servis sistem stage lighting agar selalu siap untuk penggunaan optimal.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(249,115,22,0.05) 0%, transparent 70%)",
          }}
        />
      </div>
      <AnimatedSection className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Layanan Kami</SectionLabel>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black leading-tight"
          >
            Solusi Lighting{" "}
            <span className="text-gradient">All-In-One</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 mt-4 max-w-xl mx-auto">
            Dari perencanaan hingga maintenance, kami menangani setiap aspek
            proyek pencahayaan Anda.
          </motion.p>
        </div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                variants={scaleIn}
                className="card-hover group relative bg-[#0d0d0d] border border-white/6 rounded-2xl p-7 overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: "inset 0 0 30px rgba(249,115,22,0.07)" }} />
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-12 h-12 rounded-xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center mb-5 group-hover:bg-orange-400/15 transition-colors">
                  <Icon size={22} className="text-orange-400" />
                </div>
                <h3 className="font-bold text-base text-white mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={16} className="text-orange-400" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
