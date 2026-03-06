"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

/* ─── Animation Variants ────────────────────────────────────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

export const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" as const } },
};

/* ─── SectionLabel ──────────────────────────────────────────────────────── */

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={fadeUp}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/30 bg-orange-400/8 text-orange-400 text-xs font-semibold tracking-widest uppercase mb-4"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 glow-orange inline-block" />
      {children}
    </motion.span>
  );
}

/* ─── AnimatedSection ───────────────────────────────────────────────────── */

export function AnimatedSection({
  children,
  className = "",
  id = "",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
