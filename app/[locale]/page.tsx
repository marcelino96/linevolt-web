import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";

// ✅ Above-fold: load immediately (critical for LCP)
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";

// ✅ Server components — direct imports (they do their own Sanity fetch server-side)
import { Portfolio } from "../components/Portfolio";
import { BlogPreview } from "../components/BlogPreview";

// ✅ Below-fold: code-split to reduce initial bundle
const LangSwitcher = dynamic(() => import("../components/LangSwitcher").then(m => ({ default: m.LangSwitcher })));
const VideoShowcase = dynamic(() => import("../components/VideoShowcase").then(m => ({ default: m.VideoShowcase })));
const About = dynamic(() => import("../components/About").then(m => ({ default: m.About })));
const Services = dynamic(() => import("../components/Services").then(m => ({ default: m.Services })));
const AdvatekSection = dynamic(() => import("../components/AdvatekSection").then(m => ({ default: m.AdvatekSection })));
const WhyUs = dynamic(() => import("../components/WhyUs").then(m => ({ default: m.WhyUs })));
const CTABanner = dynamic(() => import("../components/CTABanner").then(m => ({ default: m.CTABanner })));
const Contact = dynamic(() => import("../components/Contact").then(m => ({ default: m.Contact })));
const Footer = dynamic(() => import("../components/Footer").then(m => ({ default: m.Footer })));
const WAButton = dynamic(() => import("../components/WAButton").then(m => ({ default: m.WAButton })));

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Navbar />
      <LangSwitcher />
      <Hero />
      <VideoShowcase />
      <About />
      <Services />
      <AdvatekSection />
      <Portfolio />
      <BlogPreview />
      <WhyUs />
      <CTABanner />
      <Contact />
      <Footer />
      <WAButton />
    </main>
  );
}

