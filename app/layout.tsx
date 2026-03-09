import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "./components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

// Root layout: must have html+body for Next.js 16.
// suppressHydrationWarning on <html> prevents a fatal hydration crash caused by
// the lang attribute differing between SSR and CSR (safely handled by next-intl).
// NOTE: next/font/google self-hosts Inter — no preconnect to Google Fonts needed.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#050505" />
        {GSC_VERIFICATION && (
          <meta name="google-site-verification" content={GSC_VERIFICATION} />
        )}
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#050505] text-white`}>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
