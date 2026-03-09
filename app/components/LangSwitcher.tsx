"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export function LangSwitcher() {
  const t = useTranslations("LangSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const targetLocale = locale === "id" ? "en" : "id";

  function switchLocale() {
    // next-intl middleware automatically sets NEXT_LOCALE cookie on navigation
    // For "as-needed" prefix: Indonesian stays at /, English goes to /en
    let targetPath: string;

    if (targetLocale === "en") {
      // Switching to English: add /en prefix
      targetPath = "/en" + (pathname === "/" ? "" : pathname);
    } else {
      // Switching to Indonesian: navigate to Indonesian home to avoid invalid nested routes
      targetPath = "/";
    }

    startTransition(() => {
      router.push(targetPath);
      router.refresh();
    });
  }

  return (
    <motion.button
      onClick={switchLocale}
      disabled={isPending}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed top-20 right-6 z-40 flex items-center gap-1.5 px-3 py-1.5 bg-[#0d0d0d]/80 backdrop-blur-sm border border-white/10 rounded-full text-xs text-gray-400 hover:text-orange-400 hover:border-orange-400/30 transition-all disabled:opacity-50 cursor-pointer"
      title={t("title")}
    >
      🌐 {t("label")}
    </motion.button>
  );
}
