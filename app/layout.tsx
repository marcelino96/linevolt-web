import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Root layout: must have html+body for Next.js 16.
// suppressHydrationWarning on <html> prevents a fatal hydration crash caused by
// the lang attribute differing between SSR and CSR (safely handled by next-intl).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
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
