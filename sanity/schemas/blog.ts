import { defineField, defineType } from "sanity";

export const blogSchema = defineType({
  name: "blog",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (SEO Description)",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.required().max(300).warning("Keep under 300 chars"),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      // Images uploaded here are auto-served as WebP/AVIF by Sanity CDN
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text (for SEO & accessibility)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "content",
      title: "Content (Markdown)",
      description:
        'Paste AI-generated markdown here. Supports ## headings, **bold**, *italic*, `code`, - lists, numbered lists.',
      type: "text",
      rows: 30,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "LED Strip",
          "Videotron",
          "Tutorial",
          "Case Study",
          "Tips Instalasi",
          "Teknis",
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      initialValue: "5 menit",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "Tim Linevolt",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title (override)",
      type: "string",
      validation: (Rule) =>
        Rule.max(60).warning("Keep under 60 chars for Google"),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description (override)",
      type: "text",
      rows: 2,
      validation: (Rule) =>
        Rule.max(160).warning("Keep under 160 chars for Google"),
    }),

    // ── English Translations (optional — falls back to ID if empty) ──────────
    defineField({
      name: "titleEN",
      title: "Title (English)",
      type: "string",
      description: "English version of the title. Leave blank to use Indonesian title.",
    }),
    defineField({
      name: "excerptEN",
      title: "Excerpt (English)",
      type: "text",
      rows: 3,
      description: "English SEO description. Leave blank to use Indonesian excerpt.",
      validation: (Rule) =>
        Rule.max(300).warning("Keep under 300 chars"),
    }),
    defineField({
      name: "contentEN",
      title: "Content (English, Markdown)",
      type: "text",
      rows: 30,
      description: "English version of the article in Markdown. Leave blank to show Indonesian content.",
    }),
    defineField({
      name: "readTimeEN",
      title: "Read Time (English)",
      type: "string",
      initialValue: "5 min read",
      description: 'e.g. "5 min read". Leave blank to use Indonesian value.',
    }),
    defineField({
      name: "seoTitleEN",
      title: "SEO Title (English override)",
      type: "string",
      validation: (Rule) =>
        Rule.max(60).warning("Keep under 60 chars for Google"),
    }),
    defineField({
      name: "seoDescriptionEN",
      title: "SEO Description (English override)",
      type: "text",
      rows: 2,
      validation: (Rule) =>
        Rule.max(160).warning("Keep under 160 chars for Google"),
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString("id-ID")
          : "No date",
        media,
      };
    },
  },
});
