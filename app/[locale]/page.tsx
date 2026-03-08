import { setRequestLocale } from "next-intl/server";
import { Navbar } from "../components/Navbar";
import { LangSwitcher } from "../components/LangSwitcher";
import { Hero } from "../components/Hero";
import { VideoShowcase } from "../components/VideoShowcase";
import { About } from "../components/About";
import { Services } from "../components/Services";
import { AdvatekSection } from "../components/AdvatekSection";
import { Portfolio } from "../components/Portfolio";
import { WhyUs } from "../components/WhyUs";
import { CTABanner } from "../components/CTABanner";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { WAButton } from "../components/WAButton";

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
      <WhyUs />
      <CTABanner />
      <Contact />
      <Footer />
      <WAButton />
    </main>
  );
}
