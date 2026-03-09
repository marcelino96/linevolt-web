"use client";

import dynamic from "next/dynamic";
import config from "@/sanity.config";

// Sanity Studio must be rendered client-side only (no SSR)
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false }
);

export function StudioView() {
  return <NextStudio config={config} />;
}
