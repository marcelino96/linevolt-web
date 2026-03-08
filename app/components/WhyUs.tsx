"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, Users, Clock, CheckCircle2 } from "lucide-react";
import { fadeUp, stagger, scaleIn, AnimatedSection, SectionLabel } from "./shared";
import { useTranslations } from "next-intl";

export function WhyUs() {
  const t = useTranslations("WhyUs");

  const WHY_US = [
    { icon: Users, title: t("teamTitle"), desc: t("teamDesc") },
    { icon: Shield, title: t("qualityTitle"), desc: t("qualityDesc") },
    { icon: Clock, title: t("responsiveTitle"), desc: t("responsiveDesc") },
    { icon: TrendingUp, title: t("adaptiveTitle"), desc: t("adaptiveDesc") },
    { icon: CheckCircle2, title: t("transparentTitle"), desc: t("transparentDesc") },
  ];

  return (
    <section id="why-us" className="relative pt-32 pb-12 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 70%)" }}
      />
      <AnimatedSection className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>{t("label")}</SectionLabel>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black leading-tight">
            {t("headingPrefix")}{" "}
            <span className="text-gradient">{t("headingHighlight")}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 mt-4 max-w-lg mx-auto">
            {t("subheading")}
          </motion.p>
        </div>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={scaleIn}
                className={`card-hover relative group bg-[#0d0d0d] rounded-2xl p-8 border border-white/6 overflow-hidden ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
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
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
