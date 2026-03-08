import { defineField, defineType } from "sanity";

export const portfolioSchema = defineType({
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "LED Strip – Installation", value: "installation" },
          { title: "LED Strip – Event", value: "event" },
          { title: "Videotron Installation", value: "videotron" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "tag",
      title: "Tag Label (ID)",
      type: "string",
    }),
    defineField({
      name: "tagEN",
      title: "Tag Label (EN)",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Images (Slideshow)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
      // Sanity CDN auto-serves WebP/AVIF via auto("format") in image URL builder
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "color",
      title: "Accent Color (hex)",
      type: "string",
      initialValue: "#F97316",
    }),
    defineField({
      name: "gradient",
      title: "Gradient Fallback (Tailwind classes)",
      type: "string",
      initialValue: "from-amber-900/80 to-orange-900/60",
    }),
    defineField({
      name: "order",
      title: "Display Order (lower = first)",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Newest First",
      name: "newestFirst",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "images.0",
    },
  },
});
