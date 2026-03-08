// Root layout required by Next.js.
// Actual layout (html/body/metadata) lives in app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
