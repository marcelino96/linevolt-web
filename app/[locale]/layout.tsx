import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { CookieConsent } from "@/app/components/CookieConsent";
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
      alternates: { canonical: BASE_URL, languages: { "id-ID": BASE_URL, "en-US": BASE_URL } },
      openGraph: { title: "Linevolt | Premium LED & Lighting Installation", description: "Specialists in Addressable LED Strip and Custom Lighting for premium venues across Indonesia.", type: "website", locale: "en_US", alternateLocale: "id_ID", url: BASE_URL, siteName: "Linevolt", images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Linevolt LED & Lighting Installation" }] },
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
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${BASE_URL}/#business`,
  name: "Linevolt",
  alternateName: "Linevolt Indonesia",
  description: "Spesialis instalasi Addressable LED Strip (WS2812B, SK6812, WS2815), Videotron Permanen, dan Custom Lighting untuk venue premium di Indonesia.",
  url: BASE_URL,
  telephone: "+62817771343",
  email: "hello@linevolt.id",
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo-alt.png`,
    width: 400,
    height: 100,
  },
  image: `${BASE_URL}/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "SCBD Jakarta Selatan",
    addressLocality: "Jakarta Selatan",
    addressRegion: "DKI Jakarta",
    postalCode: "12190",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -6.2296,
    longitude: 106.8105,
  },
  hasMap: "https://maps.google.com/?q=SCBD+Jakarta+Selatan",
  areaServed: [
    { "@type": "City", name: "Jakarta", sameAs: "https://www.wikidata.org/wiki/Q3630" },
    { "@type": "City", name: "Batam", sameAs: "https://www.wikidata.org/wiki/Q1322346" },
    { "@type": "City", name: "Malang", sameAs: "https://www.wikidata.org/wiki/Q297946" },
    { "@type": "Country", name: "Indonesia", sameAs: "https://www.wikidata.org/wiki/Q252" },
  ],
  knowsAbout: [
    "Addressable LED Strip WS2812B",
    "SK6812 RGBW LED",
    "WS2815 LED Strip",
    "Videotron Indoor Outdoor",
    "LED Control Software MADRIX",
    "Custom Lighting Installation",
    "Stage Lighting Programming",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Layanan Instalasi Lighting",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Instalasi LED Strip Addressable", description: "Instalasi WS2812B, SK6812, WS2815 untuk restoran, bar, hotel, dan venue premium." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Instalasi Videotron Permanen", description: "Pemasangan videotron indoor dan outdoor untuk bisnis dan venue." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Stage & Venue Lighting", description: "Desain dan instalasi lighting untuk stage, club, dan venue entertainment." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lighting Programming", description: "Programming efek lighting dengan MADRIX, Resolume, dan MadMapper." } },
    ],
  },
  priceRange: "$$",
  currenciesAccepted: "IDR",
  paymentAccepted: "Transfer Bank, Cash",
  foundingDate: "2024",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.instagram.com/linevolt.id",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+62817771343",
    contactType: "customer service",
    areaServed: "ID",
    availableLanguage: ["Indonesian", "English"],
    contactOption: "TollFree",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Linevolt",
  url: BASE_URL,
  description: "Spesialis instalasi LED Strip Addressable dan Custom Lighting premium di Indonesia.",
  publisher: { "@id": `${BASE_URL}/#business` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/blog?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
  inLanguage: ["id-ID", "en-US"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa biaya instalasi LED strip addressable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Biaya instalasi LED strip addressable bervariasi tergantung panjang kabel, jenis LED (WS2812B, SK6812, WS2815), dan kompleksitas desain. Hubungi Linevolt untuk konsultasi dan estimasi harga gratis via WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Apa perbedaan LED strip addressable dan non-addressable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LED strip addressable (seperti WS2812B dan SK6812) memungkinkan setiap LED dikontrol secara individual untuk menciptakan efek warna dan animasi yang kompleks. LED non-addressable hanya dapat mengubah seluruh strip sekaligus.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Linevolt melayani instalasi di luar Jakarta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Linevolt melayani instalasi di seluruh Indonesia termasuk Jakarta, Batam, Malang, Surabaya, dan kota-kota besar lainnya. Hubungi kami untuk jadwal survei.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa lama garansi instalasi lighting dari Linevolt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Linevolt memberikan garansi instalasi dan material sesuai dengan paket yang dipilih. Hubungi tim kami untuk detail garansi pada setiap jenis proyek.",
      },
    },
    {
      "@type": "Question",
      name: "Software apa yang digunakan untuk programming LED addressable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Linevolt menggunakan software profesional seperti MADRIX, Resolume Avenue, MadMapper, dan Advatek PixelPatroller untuk programming dan kontrol LED addressable dengan efek visual yang kompleks.",
      },
    },
  ],
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
    <>
      {/* JSON-LD: LocalBusiness with GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* JSON-LD: WebSite with SearchAction (Sitelinks searchbox) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* JSON-LD: FAQPage for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NextIntlClientProvider messages={messages}>
        {children}
        <CookieConsent />
      </NextIntlClientProvider>
    </>
  );
}
