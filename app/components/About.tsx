"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, scaleIn, AnimatedSection, SectionLabel } from "./shared";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("About");

  const cards = [
    { title: t("visionTitle"), text: t("visionText"), icon: "🔭" },
    { title: t("missionTitle"), text: t("missionText"), icon: "🎯" },
    { title: t("commitmentTitle"), text: t("commitmentText"), icon: "🤝" },
    { title: t("approachTitle"), text: t("approachText"), icon: "⚡" },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="divider-gradient mb-20 mx-8" />
      <AnimatedSection className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <SectionLabel>{t("label")}</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-black leading-tight mb-6"
            >
              {t("headingPrefix")}{" "}
              <span className="text-gradient">{t("headingHighlight")}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-6 text-base">
              <span className="text-orange-400 font-semibold">LINEVOLT</span>{" "}
              {t("p1Suffix")}
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-8 text-base">
              {t("p2")}
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="#services"
              className="group inline-flex items-center gap-2 text-orange-400 font-semibold hover:gap-3 transition-all"
            >
              {t("cta")}
              <ArrowUpRight size={16} className="group-hover:animate-bounce" />
            </motion.a>
          </div>

          {/* Right - Visual cards */}
          <motion.div variants={scaleIn} className="grid grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <div
                key={i}
                className="card-hover bg-[#0d0d0d] border border-white/6 rounded-2xl p-5 cursor-default"
                style={{ boxShadow: i === 0 ? "0 0 30px rgba(249,115,22,0.08)" : "none" }}
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
