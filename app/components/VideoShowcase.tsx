"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const BG_VIDEO_SRC = "/videos/bg-video.mp4";

export function VideoShowcase() {
  const t = useTranslations("VideoShowcase");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  // ✅ Only mount video element once section is visible — prevents blocking main thread
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (inView) setVideoReady(true);
  }, [inView]);

  return (
    <section ref={ref} className="relative py-0 overflow-hidden" style={{ minHeight: "80vh" }}>
      <div className="absolute inset-0">
        {/* ✅ Dark placeholder shown until video loads */}
        {!videoReady && <div className="absolute inset-0 bg-[#0a0a0a]" />}
        {videoReady && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          >
            {/* ✅ WebM first — smaller file, faster load */}
            <source src={BG_VIDEO_SRC.replace(".mp4", ".webm")} type="video/webm" />
            <source src={BG_VIDEO_SRC} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0" style={{ background: "rgba(5,5,5,0.38)" }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.65) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.65) 100%)" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/50 bg-black/30 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse inline-block" />
          {t("badge")}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 max-w-4xl"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)" }}
        >
          {t("heading1")}{" "}
          <span style={{ color: "#F5A623" }}>{t("headingHighlight")}</span>
          <br />
          {t("heading2")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/90 text-lg max-w-xl mx-auto mb-10"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          {t("subheading")}
        </motion.p>
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          href="#contact"
          className="group flex items-center gap-3 px-8 py-4 bg-orange-500/90 backdrop-blur-sm text-white font-bold text-base rounded-full hover:bg-orange-400 hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] transition-all duration-300"
        >
          {t("cta")}
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
}
