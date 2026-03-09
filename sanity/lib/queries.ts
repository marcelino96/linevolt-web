import { defineQuery } from "next-sanity";

// ── Portfolio ─────────────────────────────────────────────────────────────────

export const PORTFOLIO_QUERY = defineQuery(`
  *[_type == "portfolio"] | order(order asc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    category,
    location,
    year,
    tag,
    tagEN,
    "images": images[].asset->url,
    description,
    color,
    gradient
  }
`);

// ── Blog list ─────────────────────────────────────────────────────────────────

export const BLOG_LIST_QUERY = defineQuery(`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    titleEN,
    "slug": slug.current,
    excerpt,
    excerptEN,
    "coverImage": coverImage.asset->url,
    "coverImageAlt": coalesce(coverImage.alt, title),
    tags,
    publishedAt,
    readTime,
    readTimeEN,
    author
  }
`);

// Blog list preview (homepage — latest 3)
export const BLOG_PREVIEW_QUERY = defineQuery(`
  *[_type == "blog"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    titleEN,
    "slug": slug.current,
    excerpt,
    excerptEN,
    tags,
    readTime,
    readTimeEN
  }
`);

// ── Blog single post ──────────────────────────────────────────────────────────

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    titleEN,
    "slug": slug.current,
    excerpt,
    excerptEN,
    "coverImage": coverImage.asset->url,
    "coverImageAlt": coalesce(coverImage.alt, title),
    content,
    contentEN,
    tags,
    publishedAt,
    readTime,
    readTimeEN,
    author,
    seoTitle,
    seoTitleEN,
    seoDescription,
    seoDescriptionEN
  }
`);

// All slugs for generateStaticParams
export const BLOG_ALL_SLUGS_QUERY = defineQuery(`
  *[_type == "blog"] { "slug": slug.current }
`);
