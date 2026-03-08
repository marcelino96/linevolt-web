"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { fadeUp, stagger, scaleIn, AnimatedSection, SectionLabel } from "./shared";
import { useTranslations } from "next-intl";
import portfolioData from "../../content/portfolio.json";

type PortfolioProject = {
  id?: string; name: string; location: string; year: string;
  tag: string; category?: string; image?: string; images?: string[]; gradient: string; color: string;
};

const PORTFOLIO = portfolioData;

function PortfolioCard({ project, i }: { project: PortfolioProject; i: number }) {
  const images: string[] = project.images?.length
    ? project.images
    : project.image ? [project.image] : [];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setActiveIdx(p => (p + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <motion.div
      variants={scaleIn}
      className={`group relative overflow-hidden rounded-3xl border border-white/8 cursor-pointer card-hover ${i === 0 ? "md:col-span-2" : ""}`}
      style={{ minHeight: i === 0 ? "400px" : "280px" }}
    >
      {images.length > 0 ? (
        <div className="absolute inset-0">
          {images.map((src, idx) => (
            <div key={idx} className="absolute inset-0 transition-opacity duration-1000 group-hover:scale-105 transition-transform duration-700" style={{ opacity: idx === activeIdx ? 1 : 0 }}>
              <Image src={src} alt={`${project.name} ${idx + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          ))}
        </div>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 group-hover:scale-105`} />
      )}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: `radial-gradient(circle, ${project.color}40 0%, transparent 70%)` }} />
      <div className="absolute inset-0 portfolio-overlay" />
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold border"
            style={{ color: project.color, borderColor: `${project.color}40`, backgroundColor: `${project.color}15` }}>
            {project.tag}
          </span>
          {images.length > 1 && (
            <div className="flex gap-1.5 mt-1">
              {images.map((_, idx) => (
                <button key={idx} onClick={e => { e.stopPropagation(); setActiveIdx(idx); }}
                  className="w-2 h-2 rounded-full transition-all duration-300 border-0"
                  style={{ background: idx === activeIdx ? project.color : "rgba(255,255,255,0.35)", transform: idx === activeIdx ? "scale(1.3)" : "scale(1)" }} />
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{project.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-orange-400" />{project.location}</span>
                <span className="text-gray-600">·</span>
                <span>{project.year}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-orange-400/50">
              <ArrowUpRight size={16} className="text-orange-400" />
            </div>
          </div>
        </div>
      </div>
      <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)" }} />
    </motion.div>
  );
}

export function Portfolio() {
  const t = useTranslations("Portfolio");
  const [activeTab, setActiveTab] = useState("all");
  const [activeLedSub, setActiveLedSub] = useState("all-led");
  const allProjects = PORTFOLIO as PortfolioProject[];

  const PORTFOLIO_MAIN_TABS = [
    { key: "all", label: t("tabAll") },
    { key: "led", label: t("tabLed") },
    { key: "videotron", label: t("tabVideotron") },
  ];

  const PORTFOLIO_LED_SUBTABS = [
    { key: "all-led", label: t("subtabAll") },
    { key: "installation", label: t("subtabInstallation") },
    { key: "event", label: t("subtabEvent") },
  ];

  const filtered = (() => {
    if (activeTab === "videotron") return allProjects.filter(p => p.category === "videotron");
    if (activeTab === "led") {
      const ledProjects = allProjects.filter(p => p.category === "installation" || p.category === "event");
      if (activeLedSub === "installation") return ledProjects.filter(p => p.category === "installation");
      if (activeLedSub === "event") return ledProjects.filter(p => p.category === "event");
      return ledProjects;
    }
    return allProjects;
  })();

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      <div className="divider-gradient mb-20 mx-8" />
      <AnimatedSection className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionLabel>{t("label")}</SectionLabel>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black leading-tight">
            {t("headingPrefix")}{" "}
            <span className="text-gradient">{t("headingHighlight")}</span>{" "}
            {t("headingSuffix")}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 mt-4 max-w-lg mx-auto">
            {t("subheading")}
          </motion.p>
        </div>

        <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-3">
          {PORTFOLIO_MAIN_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setActiveLedSub("all-led"); }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                  : "border border-white/15 text-gray-400 hover:border-orange-400/40 hover:text-orange-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className={`flex items-center justify-center gap-2 mb-10 transition-all duration-300 ${
            activeTab === "led" ? "opacity-100 h-auto mt-3" : "opacity-0 h-0 overflow-hidden pointer-events-none"
          }`}
        >
          {PORTFOLIO_LED_SUBTABS.map(sub => (
            <button
              key={sub.key}
              onClick={() => setActiveLedSub(sub.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeLedSub === sub.key
                  ? "bg-orange-400/20 border border-orange-400/60 text-orange-400"
                  : "border border-white/10 text-gray-500 hover:border-white/25 hover:text-gray-300"
              }`}
            >
              {sub.label}
            </button>
          ))}
        </motion.div>

        <motion.div variants={stagger} className="grid md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <PortfolioCard key={project.id || i} project={project} i={i} />
          ))}
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
