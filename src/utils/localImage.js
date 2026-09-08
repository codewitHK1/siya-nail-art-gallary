import manifest from "../data/imageManifest.json";

/**
 * Build a srcset for one of the self-hosted photos in /public/images.
 *
 * These used to be hotlinked from images.unsplash.com, which meant every
 * visitor's page load depended on a third party that throttles hotlinked
 * traffic — and three of the URLs had gone 404 outright. The files are now
 * served from the same origin as the site, so they cannot be rate-limited or
 * disappear.
 *
 * Slugs and the widths available for each come from src/data/imageManifest.json,
 * which scripts/vendor_images.py regenerates.
 *
 * `sizes` should describe how wide the image actually renders at each
 * breakpoint; without it the browser assumes 100vw and over-downloads.
 */
export default function localImage(slug, { sizes } = {}) {
  const entry = manifest[slug];

  if (!entry) {
    if (import.meta.env.DEV) {
      console.warn(
        `localImage: no manifest entry for "${slug}". ` +
          `Add it to SOURCES in scripts/vendor_images.py and re-run the script.`
      );
    }
    return { src: "" };
  }

  const { widths } = entry;

  return {
    src: `/images/${slug}-${widths[widths.length - 1]}.webp`,
    srcSet: widths.map((w) => `/images/${slug}-${w}.webp ${w}w`).join(", "),
    ...(sizes ? { sizes } : {}),
  };
}
