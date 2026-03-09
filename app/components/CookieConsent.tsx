"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const locale = useLocale();
  const isEn = locale === "en";

  useEffect(() => {
    // Small delay so it doesn't clash with page entry animations
    const timer = setTimeout(() => {
      try {
        if (!localStorage.getItem("cookie_consent")) setVisible(true);
      } catch {}
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  function accept() {
    try { localStorage.setItem("cookie_consent", "accepted"); } catch {}
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem("cookie_consent", "declined"); } catch {}
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99] w-[calc(100%-3rem)] max-w-md"
        >
          <div className="rounded-2xl border border-white/12 bg-[#0d0d0d]/96 backdrop-blur-xl px-6 py-5 shadow-2xl shadow-black/60">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🍪</span>
              <p className="text-orange-400 text-xs font-bold tracking-widest uppercase">
                {isEn ? "Cookie & Privacy" : "Cookie & Privasi"}
              </p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {isEn
                ? "We use cookies to remember your language preference and improve your browsing experience. No personal data is sold to third parties."
                : "Kami menggunakan cookie untuk menyimpan preferensi bahasa dan meningkatkan pengalaman browsing Anda. Data pribadi tidak dijual ke pihak ketiga."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={accept}
                className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-400 transition-colors"
              >
                {isEn ? "Accept" : "Terima"}
              </button>
              <button
                onClick={decline}
                className="flex-1 py-2.5 rounded-xl border border-white/15 text-gray-400 font-semibold text-sm hover:border-white/30 hover:text-white transition-colors"
              >
                {isEn ? "Decline" : "Tolak"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
