import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

// next-intl handles locale detection via NEXT_LOCALE cookie (localePrefix: "never").
// /studio, /api, /admin are excluded so they are never caught by i18n routing.
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect legacy /en/* URLs → /* and persist EN cookie for backward compatibility
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const newPath = pathname === "/en" || pathname === "/en/" ? "/" : pathname.slice(3);
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    const response = NextResponse.redirect(url, 308);
    response.cookies.set("NEXT_LOCALE", "en", {
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "lax",
    });
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|admin|studio|.*\..*).*)"]
};
