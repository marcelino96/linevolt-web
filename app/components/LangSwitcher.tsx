"use client";

import { motion } from "framer-motion";

export function LangSwitcher() {
  return (
    <motion.a
      href="/en"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed top-20 right-6 z-40 flex items-center gap-1.5 px-3 py-1.5 bg-[#0d0d0d]/80 backdrop-blur-sm border border-white/10 rounded-full text-xs text-gray-400 hover:text-orange-400 hover:border-orange-400/30 transition-all"
      title="Switch to English"
    >
      🌐 EN
    </motion.a>
  );
}
