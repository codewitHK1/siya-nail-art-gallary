// `slug` names a self-hosted image set under /public/images — see
// src/data/imageManifest.json and scripts/vendor_images.py. To swap in the
// studio's own photography, point SOURCES in that script at the new files and
// re-run it; nothing else in the app needs to change.

export const galleryCategories = [
  "All",
  "Minimal",
  "French",
  "Chrome",
  "Bridal",
  "Luxury",
  "Creative",
];

export const galleryItems = [
  {
    id: "g1",
    title: "Quiet Ivory",
    category: "Minimal",
    slug: "quiet-ivory",
  },
  {
    id: "g2",
    title: "Soft Edge French",
    category: "French",
    slug: "soft-edge-french",
  },
  {
    id: "g3",
    title: "Liquid Chrome",
    category: "Chrome",
    slug: "liquid-chrome",
  },
  {
    id: "g4",
    title: "Something Borrowed",
    category: "Bridal",
    slug: "something-borrowed",
  },
  {
    id: "g5",
    title: "Wine & Gold",
    category: "Luxury",
    slug: "wine-and-gold",
  },
  {
    id: "g6",
    title: "Hand-Painted Bloom",
    category: "Creative",
    slug: "hand-painted-bloom",
  },
  {
    id: "g7",
    title: "Bare Essentials",
    category: "Minimal",
    slug: "bare-essentials",
  },
  {
    id: "g8",
    title: "Mirror Finish",
    category: "Chrome",
    slug: "mirror-finish",
  },
  {
    id: "g9",
    title: "Editorial Red",
    category: "Luxury",
    slug: "editorial-red",
  },
];

export default galleryItems;
