/**
 * Sanity Seed Script
 * ------------------
 * Imports all blog posts and portfolio items from local JSON files into Sanity.
 * Images are uploaded to Sanity's asset CDN (auto-served as WebP/AVIF).
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-sanity.mjs
 *
 * Requirements:
 *   .env.local must have:
 *     NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
 *     NEXT_PUBLIC_SANITY_DATASET=production
 *     SANITY_API_TOKEN=your_token_with_editor_role
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// ─── Validate env vars ────────────────────────────────────────────────────────
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || projectId === "placeholder" || projectId.trim() === "") {
  console.error("\n❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local");
  console.error("    1. Create a free project at https://sanity.io");
  console.error("    2. Copy the Project ID from the dashboard");
  console.error("    3. Add it to .env.local\n");
  process.exit(1);
}

if (!token || token.trim() === "") {
  console.error("\n❌  SANITY_API_TOKEN is not set in .env.local");
  console.error("    1. Go to https://sanity.io/manage → your project → API → Tokens");
  console.error("    2. Create a token with 'Editor' role");
  console.error("    3. Add it to .env.local\n");
  process.exit(1);
}

// ─── Sanity client (write access) ────────────────────────────────────────────
const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-09",
  useCdn: false,
  token,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Resolve the best available image file.
 * Prefers .webp → .avif → original extension.
 */
function resolveLocalImage(imgPath) {
  const fullBase = path.join(ROOT, "public", imgPath);
  const ext = path.extname(imgPath);
  const noExt = fullBase.slice(0, -ext.length);
  const candidates = [noExt + ".webp", noExt + ".avif", fullBase];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

/**
 * Upload a local image to Sanity assets, returns asset _id or null on failure.
 */
async function uploadImage(imgPath, label) {
  const localFile = resolveLocalImage(imgPath);
  if (!localFile) {
    console.log(`     ⚠️  Image not found locally: ${imgPath}`);
    return null;
  }
  const filename = path.basename(localFile);
  try {
    const asset = await client.assets.upload(
      "image",
      fs.createReadStream(localFile),
      { filename }
    );
    console.log(`     ↑  ${filename}  →  ${asset._id.slice(-20)}`);
    return asset._id;
  } catch (err) {
    console.log(`     ⚠️  Upload failed for "${label}": ${err.message}`);
    return null;
  }
}

// ─── Seed: Blog Posts ─────────────────────────────────────────────────────────
async function seedBlog() {
  console.log("\n📝  Seeding blog posts...");

  const blogDir = path.join(ROOT, "content", "blog");
  if (!fs.existsSync(blogDir)) {
    console.log("    No content/blog/ directory found, skipping.");
    return;
  }

  const files = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  let count = 0;
  for (const file of files) {
    const post = JSON.parse(
      fs.readFileSync(path.join(blogDir, file), "utf-8")
    );

    console.log(`\n  → "${post.title.slice(0, 60)}"`);

    // Upload cover image
    let coverImageField;
    if (post.coverImage) {
      const assetId = await uploadImage(post.coverImage, post.slug);
      if (assetId) {
        coverImageField = {
          _type: "image",
          asset: { _type: "reference", _ref: assetId },
          alt: post.title,
        };
      }
    }

    // Normalize content to markdown string
    const content =
      typeof post.content === "string"
        ? post.content
        : post.content
            .map((b) => (b.type === "heading" ? `## ${b.text}` : b.text))
            .join("\n\n");

    const doc = {
      _type: "blog",
      _id: `blog-${post.slug}`,
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      content,
      tags: post.tags || [],
      publishedAt: new Date(post.publishedAt).toISOString(),
      readTime: post.readTime || "5 menit",
      author: post.author || "Tim Linevolt",
      ...(coverImageField && { coverImage: coverImageField }),
    };

    await client.createOrReplace(doc);
    console.log(`     ✅  Created: ${post.slug}`);
    count++;
  }

  console.log(`\n  ✓ ${count} blog post(s) seeded`);
}

// ─── Seed: Portfolio ──────────────────────────────────────────────────────────
async function seedPortfolio() {
  console.log("\n🖼️   Seeding portfolio...");

  const portfolioFile = path.join(ROOT, "content", "portfolio.json");
  if (!fs.existsSync(portfolioFile)) {
    console.log("    No content/portfolio.json found, skipping.");
    return;
  }

  const items = JSON.parse(fs.readFileSync(portfolioFile, "utf-8"));

  let count = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    console.log(`\n  → "${item.name}" (${item.category})`);

    // Upload all images
    const sanityImages = [];
    for (const imgPath of item.images || []) {
      if (!imgPath) continue;
      const assetId = await uploadImage(imgPath, item.name);
      if (assetId) {
        sanityImages.push({
          _type: "image",
          _key: `img-${i}-${sanityImages.length}`,
          asset: { _type: "reference", _ref: assetId },
          alt: item.name,
        });
      }
    }

    const doc = {
      _type: "portfolio",
      _id: `portfolio-${item.id}`,
      name: item.name,
      slug: { _type: "slug", current: item.id },
      category: item.category,
      location: item.location || "",
      year: item.year || "",
      tag: item.tag || "",
      tagEN: item.tagEN || "",
      color: item.color || "#F97316",
      gradient: item.gradient || "from-amber-900/80 to-orange-900/60",
      order: i + 1,
      images: sanityImages,
    };

    await client.createOrReplace(doc);
    console.log(`     ✅  Created: ${item.name}`);
    count++;
  }

  console.log(`\n  ✓ ${count} portfolio item(s) seeded`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("═══════════════════════════════════════════");
  console.log("  Linevolt → Sanity Seed");
  console.log(`  Project : ${projectId}`);
  console.log(`  Dataset : ${dataset}`);
  console.log("═══════════════════════════════════════════");

  await seedBlog();
  await seedPortfolio();

  console.log("\n═══════════════════════════════════════════");
  console.log("  🎉  Seed complete!");
  console.log("  → Open /studio to verify your content");
  console.log("  → After verifying, you can delete content/blog/ and content/portfolio.json");
  console.log("═══════════════════════════════════════════\n");
}

main().catch((err) => {
  console.error("\n❌  Seed failed:", err.message);
  process.exit(1);
});
