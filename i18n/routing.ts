import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  // Default locale (Indonesian) at /, English at /en — backward compatible
  localePrefix: "as-needed",
  // Cookie to persist locale across visits
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
});
