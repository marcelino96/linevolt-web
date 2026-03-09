import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  // Both languages share the same URL paths; locale is stored in NEXT_LOCALE cookie
  localePrefix: "never",
  // Cookie to persist locale across visits
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
});
