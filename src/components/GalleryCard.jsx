import { motion } from "framer-motion";
import responsiveImage from "../utils/responsiveImage";

export default function GalleryCard({ item, className = "" }) {
  return (
    <motion.figure
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-[20px] bg-charcoal/5 ${className}`}
      data-cursor="view"
    >
      <img
        {...responsiveImage(item.image, {
          widths: [300, 400, 600, 800, 1100],
          sizes: "(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw",
        })}
        alt={`${item.title} — ${item.category} nail art`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/0 to-charcoal/0 opacity-0 transition-opacity duration-500 ease-lux group-hover:opacity-100" />
      <figcaption className="glass-dark absolute inset-x-3 bottom-3 translate-y-3 rounded-2xl px-4 py-3 opacity-0 transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-display text-xl text-ivory">{item.title}</p>
        <p className="text-xs tracking-wide text-blush">{item.category}</p>
      </figcaption>
    </motion.figure>
  );
}
