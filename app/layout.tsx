import { Inter } from "next/font/google";
import "./globals.css";

// Load font at root so ALL pages (incl. /admin, /studio) inherit it
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Root layout required by Next.js App Router.
// app/[locale]/layout.tsx overrides <html lang> and adds i18n + metadata.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-[#050505] text-white`}>
        {children}
      </body>
    </html>
  );
}
