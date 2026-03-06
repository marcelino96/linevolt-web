import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const BASE_URL = "https://linevolt.id";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Linevolt | Jasa Instalasi LED Strip Addressable & Videotron Permanen — Jakarta, Batam",
    template: "%s | Linevolt",
  },
  description:
    "Linevolt — spesialis instalasi LED Strip Addressable (WS2812B, SK6812), Videotron Permanen, dan Custom Lighting di Indonesia. Layanan: desain, instalasi, programming, dan maintenance untuk restoran, bar, hotel, stage & venue premium.",
  keywords: [
    "jasa instalasi LED strip addressable",
    "LED strip WS2812B Jakarta",
    "videotron permanen Indonesia",
    "biaya pasang videotron",
    "custom lighting restoran Jakarta",
    "lighting installation SCBD",
    "LED strip Batam",
    "addressable LED Indonesia",
    "stage lighting Indonesia",
    "lighting venue bar",
    "instalasi LED strip profesional",
    "Linevolt",
  ],
  authors: [{ name: "Linevolt", url: BASE_URL }],
  creator: "Linevolt",
  publisher: "Linevolt",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: BASE_URL,
    languages: { "id-ID": BASE_URL, "en-US": `${BASE_URL}/en` },
  },
  openGraph: {
    title: "Linevolt | Premium LED Strip & Videotron Installation",
    description: "Spesialis Addressable LED Strip, Videotron Permanen, dan Custom Lighting untuk venue premium di seluruh Indonesia.",
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: BASE_URL,
    siteName: "Linevolt",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Linevolt LED & Lighting Installation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linevolt | LED Strip Addressable & Videotron Installation",
    description: "Spesialis Addressable LED Strip dan Custom Lighting untuk venue premium di seluruh Indonesia.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#business`,
  name: "Linevolt",
  description: "Perusahaan spesialis Addressable LED Strip dan Lighting yang berfokus pada pengiriman produk dan layanan berkualitas tinggi untuk venue premium.",
  url: BASE_URL,
  telephone: "+62817771343",
  email: "hello@linevolt.id",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
    addressRegion: "DKI Jakarta",
    addressLocality: "Jakarta Selatan",
  },
  geo: { "@type": "GeoCoordinates", latitude: -6.2088, longitude: 106.8456 },
  areaServed: [
    { "@type": "City", name: "Jakarta" },
    { "@type": "City", name: "Batam" },
    { "@type": "City", name: "Malang" },
    { "@type": "Country", name: "Indonesia" },
  ],
  serviceType: [
    "Custom Addressable LED Strip Installation",
    "Videotron Permanen Installation",
    "Stage Lighting Installation",
    "Custom LED Fixtures",
    "Lighting Programming",
    "LED Maintenance",
  ],
  priceRange: "$$",
  foundingDate: "2024",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: ["https://www.instagram.com/linevolt.id"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa biaya instalasi LED strip addressable per meter?",
      acceptedAnswer: { "@type": "Answer", text: "Biaya instalasi LED strip addressable berkisar antara Rp 350.000 hingga Rp 600.000 per meter, tergantung jenis LED (WS2812B, SK6812, WS2815), controller yang digunakan, dan kompleksitas instalasi. Harga sudah termasuk material, controller, power supply, dan jasa pemasangan." },
    },
    {
      "@type": "Question",
      name: "Apa perbedaan LED strip addressable dan LED strip biasa?",
      acceptedAnswer: { "@type": "Answer", text: "LED strip addressable memungkinkan kontrol per-LED secara individual — setiap titik cahaya bisa diatur warna dan kecerahan berbeda. Ini memungkinkan efek animasi, chase, rainbow, dan efek visual dinamis lainnya. LED strip biasa hanya bisa satu warna per zona, tanpa efek animasi individual." },
    },
    {
      "@type": "Question",
      name: "Berapa biaya pasang videotron permanen?",
      acceptedAnswer: { "@type": "Answer", text: "Biaya videotron permanen sangat bervariasi tergantung ukuran, pixel pitch, dan lingkungan pemasangan. Estimasi: indoor P3 (8m²) sekitar Rp 115-140 juta, outdoor P8 (18m²) sekitar Rp 180-220 juta. Sudah termasuk LED panel, struktur, controller, power system, dan instalasi." },
    },
    {
      "@type": "Question",
      name: "Berapa lama garansi instalasi LED strip dari Linevolt?",
      acceptedAnswer: { "@type": "Answer", text: "Linevolt memberikan garansi 1 tahun untuk semua pekerjaan instalasi dan komponen. Garansi mencakup penggantian LED yang rusak karena cacat produksi, perbaikan koneksi yang longgar, dan re-kalibrasi controller tanpa biaya." },
    },
    {
      "@type": "Question",
      name: "Apakah Linevolt melayani proyek di luar Jakarta?",
      acceptedAnswer: { "@type": "Answer", text: "Ya, Linevolt melayani seluruh Indonesia. Kami sudah menyelesaikan proyek di Jakarta, SCBD, Batam, Malang, dan berbagai kota lain. Untuk proyek di luar Jakarta, biaya perjalanan akan diinformasikan secara transparan di proposal." },
    },
    {
      "@type": "Question",
      name: "Berapa lama proses instalasi LED strip?",
      acceptedAnswer: { "@type": "Answer", text: "Durasi instalasi tergantung skala proyek. Instalasi LED strip sederhana (10-20 meter) biasanya selesai 1-2 hari. Proyek besar dengan programming dan sistem otomasi bisa membutuhkan 1-2 minggu termasuk commissioning dan testing." },
    },
    {
      "@type": "Question",
      name: "Apa itu pixel pitch videotron dan bagaimana memilihnya?",
      acceptedAnswer: { "@type": "Answer", text: "Pixel pitch adalah jarak antar LED dalam milimeter. Semakin kecil angkanya, semakin tinggi resolusi. P2-P3 cocok untuk indoor jarak dekat (< 5 meter). P5-P8 untuk indoor jarak menengah atau semi-outdoor. P10-P16 untuk outdoor jarak jauh (> 10 meter). Pilih berdasarkan jarak pandang minimum pengunjung." },
    },
    {
      "@type": "Question",
      name: "Apakah LED strip bisa dipasang di outdoor?",
      acceptedAnswer: { "@type": "Answer", text: "Ya, dengan memilih LED strip yang tepat. Untuk outdoor, gunakan LED strip dengan rating IP65 (water-resistant) atau IP67/IP68 (waterproof penuh). Selain itu, power supply dan controller juga harus memiliki rating IP yang sesuai. Linevolt mengkhususkan diri dalam instalasi outdoor yang tahan cuaca dan panas." },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <Script id="json-ld-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <Script id="json-ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#050505] text-white`}>
        {children}
      </body>
    </html>
  );
}
