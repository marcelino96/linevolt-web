import { Inter } from "next/font/google";
import "./globals.css";
import { getLocale } from "next-intl/server";

// Load font + CSS at root so ALL pages (incl. /admin, /studio) inherit styling
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Single html+body in the tree — avoids hydration mismatch with nested layouts.
// getLocale() reads the locale set by next-intl middleware so lang is correct.
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let locale = "id";
  try {
    locale = await getLocale();
  } catch {
    // Routes outside next-intl middleware (/admin, /studio) — fall back to default
  }
  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#050505" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#050505] text-white`}>
        {children}
      </body>
    </html>
  );
}
