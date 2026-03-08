import createImageUrlBuilder from "@sanity/image-url";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
});

/**
 * Returns an image URL from a Sanity image source.
 * auto("format") makes Sanity CDN serve AVIF → WebP → JPEG automatically
 * depending on browser support — no manual conversion needed.
 */
export const urlForImage = (source: SanityImageSource) =>
  builder.image(source).auto("format").fit("max");

export const imageUrl = (source: SanityImageSource, width: number, height?: number) => {
  let img = builder
    .image(source)
    .auto("format") // AVIF/WebP auto-selected by CDN
    .quality(85)
    .width(width);
  if (height) img = img.height(height);
  return img.url();
};
