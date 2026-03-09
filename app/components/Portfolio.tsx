import { client, isSanityConfigured } from "@/sanity/lib/client";
import { PORTFOLIO_QUERY } from "@/sanity/lib/queries";
import { PortfolioGrid } from "./PortfolioGrid";

// Server component — fetches data from Sanity at build time (ISR)
export async function Portfolio() {
  const projects = isSanityConfigured()
    ? await client.fetch(PORTFOLIO_QUERY, {}, { next: { revalidate: 300 } })
    : [];

  return <PortfolioGrid projects={projects} />;
}
