"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  function setLocale(newLocale: string) {
    // Set cookie directly — same URL, no redirect needed (localePrefix: "never")
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div className="flex items-center text-xs font-bold select-none">
      <button
        onClick={() => setLocale("id")}
        className={`px-2 py-0.5 transition-colors ${
          locale === "id"
            ? "text-orange-400 border-b border-orange-400"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        ID
      </button>
      <span className="text-gray-600 mx-0.5">|</span>
      <button
        onClick={() => setLocale("en")}
        className={`px-2 py-0.5 transition-colors ${
          locale === "en"
            ? "text-orange-400 border-b border-orange-400"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        EN
      </button>
    </div>
  );
}
