import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware for automatic language detection.
 * Redirects English-browser users from / to /en (once, via cookie).
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only apply to the root path
    if (pathname !== "/") {
        return NextResponse.next();
    }

    // Don't redirect if locale cookie already set
    const localeCookie = request.cookies.get("NEXT_LOCALE");
    if (localeCookie) {
        return NextResponse.next();
    }

    // Check Accept-Language header
    const acceptLanguage = request.headers.get("accept-language") || "";
    const primaryLang = acceptLanguage.split(",")[0]?.trim().toLowerCase() || "";

    // Redirect to /en if browser language is English (not Indonesian)
    if (primaryLang.startsWith("en") && !primaryLang.startsWith("id")) {
        const url = request.nextUrl.clone();
        url.pathname = "/en";
        const response = NextResponse.redirect(url);
        // Set cookie for 30 days to avoid repeated redirects
        response.cookies.set("NEXT_LOCALE", "en", {
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
        });
        return response;
    }

    return NextResponse.next();
}

export const config = {
    // Only run middleware on the root path
    matcher: ["/"],
};
