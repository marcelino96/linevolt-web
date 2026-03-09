import { type NextRequest, NextResponse } from "next/server";

const LOCALES = ["id", "en"] as const;
const DEFAULT_LOCALE = "id";
const COOKIE_NAME = "NEXT_LOCALE";
// Header that next-intl reads to know which locale the request belongs to
const INTL_LOCALE_HEADER = "x-next-intl-locale";

type Locale = (typeof LOCALES)[number];

function getLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (cookie && (LOCALES as readonly string[]).includes(cookie)) {
    return cookie as Locale;
  }
  // Fall back to Accept-Language header
  const acceptLang = request.headers.get("accept-language") ?? "";
  if (acceptLang.toLowerCase().startsWith("en")) return "en";
  return DEFAULT_LOCALE;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect legacy /en/* URLs → /* and persist EN cookie
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const newPath =
      pathname === "/en" || pathname === "/en/" ? "/" : pathname.slice(3);
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    const response = NextResponse.redirect(url, 308);
    response.cookies.set(COOKIE_NAME, "en", {
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "lax",
    });
    return response;
  }

  const locale = getLocale(request);

  // Rewrite clean URL → internal locale-prefixed route
  // e.g. /blog → /id/blog, / → /id
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(INTL_LOCALE_HEADER, locale);

  return NextResponse.rewrite(rewriteUrl, {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!api|_next|admin|studio|.*\\..*).*)"],
};
