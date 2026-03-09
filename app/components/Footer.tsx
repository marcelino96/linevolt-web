"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const year = new Date().getFullYear();
  const showBlog = locale === "id";

  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-32">
            <Image src="/logo-alt.png" alt="Linevolt" fill className="object-contain object-left" />
          </div>
          <span className="text-gray-600 text-sm">{t("tagline")}</span>
        </div>
        <div className="text-gray-600 text-xs text-center">
          {t("copyright", { year })}
        </div>
        <div className="flex items-center gap-4">
          <a href="#about" className="text-xs text-gray-600 hover:text-orange-400 transition-colors">{t("about")}</a>
          <a href="#services" className="text-xs text-gray-600 hover:text-orange-400 transition-colors">{t("services")}</a>
          <a href="#portfolio" className="text-xs text-gray-600 hover:text-orange-400 transition-colors">{t("portfolio")}</a>
          {showBlog && <a href="/blog" className="text-xs text-gray-600 hover:text-orange-400 transition-colors">{t("blog")}</a>}
          <a href="#contact" className="text-xs text-gray-600 hover:text-orange-400 transition-colors">{t("contact")}</a>
        </div>
      </div>
    </footer>
  );
}
