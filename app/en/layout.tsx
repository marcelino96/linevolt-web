import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Linevolt | LED Strip & Custom Lighting Installation | SCBD, Batam, Jakarta",
    description:
        "Linevolt is Indonesia's specialist in Addressable LED Strip and Lighting. We provide custom LED installation, stage lighting, programming, and maintenance for restaurants, bars, hotels, and premium venues.",
    keywords: [
        "LED strip installation service",
        "custom lighting Jakarta",
        "lighting installation SCBD",
        "LED strip Batam",
        "addressable LED Indonesia",
        "stage lighting Indonesia",
        "venue restaurant lighting",
        "Linevolt",
    ],
    openGraph: {
        title: "Linevolt | Premium LED & Lighting Installation",
        description:
            "Specialists in Addressable LED Strip and Custom Lighting for premium venues across Indonesia.",
        type: "website",
        locale: "en_US",
    },
    alternates: {
        canonical: "/en",
        languages: {
            id: "/",
            en: "/en",
        },
    },
};

// No html/body tags here — root layout.tsx handles that
export default function EnLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
