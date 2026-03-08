import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const BASE_URL = "https://linevolt.id";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      metadataBase: new URL(BASE_URL),
      title: { default: "Linevolt | LED Strip & Custom Lighting Installation | SCBD, Batam, Jakarta", template: "%s | Linevolt" },
      description: "Linevolt is Indonesia's specialist in Addressable LED Strip and Lighting. We provide custom LED installation, stage lighting, programming, and maintenance for restaurants, bars, hotels, and premium venues.",
      keywords: ["LED strip installation service", "custom lighting Jakarta", "lighting installation SCBD", "LED strip Batam", "addressable LED Indonesia", "stage lighting Indonesia", "venue restaurant lighting", "Linevolt"],
      authors: [{ name: "Linevolt", url: BASE_URL }],
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
      alternates: { canonical: `${BASE_URL}/en`, languages: { "id-ID": BASE_URL, "en-US": `${BASE_URL}/en` } },
      openGraph: { title: "Linevolt | Premium LED & Lighting Installation", description: "Specialists in Addressable LED Strip and Custom Lighting for premium venues across Indonesia.", type: "website", locale: "en_US", alternateLocale: "id_ID", url: `${BASE_URL}/en`, siteName: "Linevolt", images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Linevolt LED & Lighting Installation" }] },
      twitter: { card: "summary_large_image", title: "Linevolt | LED Strip Addressable & Videotron Installation", description: "Specialists in Addressable LED Strip and Custom Lighting for premium venues across Indonesia.", images: ["/og-image.jpg"] },
      icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
    };
  }

  return {
    metadataBase: new URL(BASE_URL),
    title: { default: "Linevolt | Jasa Instalasi LED Strip Addressable & Videotron Permanen — Jakarta, Batam", template: "%s | Linevolt" },
    description: "Linevolt — spesialis instalasi LED Strip Addressable (WS2812B, SK6812), Videotron Permanen, dan Custom Lighting di Indonesia. Layanan: desain, instalasi, programming, dan maintenance untuk restoran, bar, hotel, stage & venue premium.",
    keywords: ["jasa instalasi LED strip addressable", "LED strip WS2812B Jakarta", "videotron permanen Indonesia", "biaya pasang videotron", "custom lighting restoran Jakarta", "lighting installation SCBD", "LED strip Batam", "addressable LED Indonesia", "stage lighting Indonesia", "lighting venue bar", "instalasi LED strip profesional", "Linevolt"],
    authors: [{ name: "Linevolt", url: BASE_URL }],
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    alternates: { canonical: BASE_URL, languages: { "id-ID": BASE_URL, "en-US": `${BASE_URL}/en` } },
    openGraph: { title: "Linevolt | Premium LED Strip & Videotron Installation", description: "Spesialis Addressable LED Strip, Videotron Permanen, dan Custom Lighting untuk venue premium di seluruh Indonesia.", type: "website", locale: "id_ID", alternateLocale: "en_US", url: BASE_URL, siteName: "Linevolt", images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Linevolt LED & Lighting Installation" }] },
    twitter: { card: "summary_large_image", title: "Linevolt | LED Strip Addressable & Videotron Installation", description: "Spesialis Addressable LED Strip dan Custom Lighting untuk venue premium di seluruh Indonesia.", images: ["/og-image.jpg"] },
    icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#business`,
  name: "Linevolt",
  description: "Perusahaan spesialis Addressable LED Strip dan Lighting yang berfokus pada pengiriman produk dan layanan berkualitas tinggi untuk venue premium.",
  url: BASE_URL,
  telephone: "+62817771343",
  email: "hello@linevolt.id",
  address: { "@type": "PostalAddress", addressCountry: "ID", addressRegion: "DKI Jakarta", addressLocality: "Jakarta Selatan" },
  geo: { "@type": "GeoCoordinates", latitude: -6.2088, longitude: 106.8456 },
  areaServed: [{ "@type": "City", name: "Jakarta" }, { "@type": "City", name: "Batam" }, { "@type": "City", name: "Malang" }, { "@type": "Country", name: "Indonesia" }],
  serviceType: ["Custom Addressable LED Strip Installation", "Videotron Permanen Installation", "Stage Lighting Installation", "Custom LED Fixtures", "Lighting Programming", "LED Maintenance"],
  priceRange: "$$",
  foundingDate: "2024",
  openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" },
  sameAs: ["https://www.instagram.com/linevolt.id"],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "id" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <Script id="json-ld-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#050505] text-white`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
