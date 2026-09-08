// Unsplash serves whatever width you ask for in the URL, so the hard-coded
// `w=1600`–`w=2400` links were shipping desktop-sized photos to phones. These
// helpers turn one URL into a srcset the browser can pick from, and drop the
// quality from 90 to 80/70 (visually indistinguishable, roughly half the bytes).

const DEFAULT_WIDTHS = [400, 640, 900, 1280, 1800];

function withWidth(base, params, width) {
  const next = new URLSearchParams(params);
  next.set("w", String(width));
  next.set("q", width <= 640 ? "70" : "80");
  return `${base}?${next.toString()}`;
}

/**
 * Spread the result onto an <img>: {...responsiveImage(url, { sizes })}
 *
 * `sizes` must describe how wide the image renders at each breakpoint, or the
 * browser assumes 100vw and downloads more than it needs.
 * Non-Unsplash URLs (e.g. once you swap in local photos) pass straight through.
 */
export default function responsiveImage(url, { widths = DEFAULT_WIDTHS, sizes } = {}) {
  if (typeof url !== "string" || !url.includes("images.unsplash.com")) {
    return { src: url };
  }

  const [base, query] = url.split("?");
  const params = new URLSearchParams(query);
  const ordered = [...widths].sort((a, b) => a - b);

  return {
    src: withWidth(base, params, ordered[ordered.length - 1]),
    srcSet: ordered.map((w) => `${withWidth(base, params, w)} ${w}w`).join(", "),
    ...(sizes ? { sizes } : {}),
  };
}
