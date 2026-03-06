import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://linevolt.id";

function getBlogSlugs(): string[] {
    const blogDir = path.join(process.cwd(), "content", "blog");
    if (!fs.existsSync(blogDir)) return [];
    return fs.readdirSync(blogDir)
        .filter(f => f.endsWith(".json"))
        .map(f => f.replace(".json", ""));
}

export default function sitemap(): MetadataRoute.Sitemap {
    const blogSlugs = getBlogSlugs();
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ];
    const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));
    return [...staticRoutes, ...blogRoutes];
}
