import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { galleryCategories, galleryItems } from "../data/gallery";
import SectionHeading from "./SectionHeading";
import GalleryCard from "./GalleryCard";

// Asymmetric masonry-style spans for an editorial feel
const spanPattern = [
  "row-span-2",
  "row-span-1",
  "row-span-1",
  "row-span-2",
  "row-span-1",
  "row-span-1",
  "row-span-1",
  "row-span-2",
  "row-span-1",
];

export default function Gallery() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? galleryItems : galleryItems.filter((g) => g.category === active);

  return (
    <section id="gallery" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          label="Gallery"
          heading="Our Latest Obsessions"
          description="A running edit of what's currently on our tables — filter by mood."
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ease-lux ${
                active === cat
                  ? "bg-wine text-ivory shadow-glass"
                  : "glass text-charcoal-soft hover:shadow-glass"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 auto-rows-[160px] gap-4 md:grid-cols-3 md:auto-rows-[220px] lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                className={spanPattern[i % spanPattern.length]}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
