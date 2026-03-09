import { client, isSanityConfigured } from "@/sanity/lib/client";
import { PORTFOLIO_QUERY } from "@/sanity/lib/queries";
import { PortfolioGrid } from "./PortfolioGrid";
import portfolioData from "@/content/portfolio.json";

// Server component — fetches data from Sanity at build time (ISR)
export async function Portfolio() {
  const projects = isSanityConfigured()
    ? await client.fetch(PORTFOLIO_QUERY, {}, { next: { revalidate: 300 } })
    : portfolioData.map((p) => ({
        _id: p.id,
        name: p.name,
        slug: p.id,
        category: p.category,
        location: p.location,
        year: p.year,
        tag: p.tag,
        tagEN: p.tagEN,
        images: p.images,
        color: p.color,
        gradient: p.gradient,
      }));

  return <PortfolioGrid projects={projects} />;
}
