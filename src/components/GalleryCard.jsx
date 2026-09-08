import { motion } from "framer-motion";
import Tilt3D from "./Tilt3D";

export default function GalleryCard({ item, className = "" }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94, rotateX: 10 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.94, rotateX: -8 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200 }}
      className={`relative z-0 hover:z-20 ${className}`}
    >
      <Tilt3D max={10} lift={22} glare={false} className="group relative h-full">
        <figure className="relative h-full" data-cursor="view">
          {/* Clipping lives on this inner layer: an `overflow: hidden` on the
              tilting element itself would flatten the 3D context. */}
          <div className="h-full overflow-hidden rounded-[20px] bg-charcoal/5">
            <img
              src={item.image}
              alt={`${item.title} — ${item.category} nail art`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/0 to-charcoal/0 opacity-0 transition-opacity duration-500 ease-lux group-hover:opacity-100" />
          </div>

          {/* Wrapper owns the depth plane so the caption keeps its own
              transform free for the hover slide. */}
          <div
            className="pointer-events-none absolute inset-x-3 bottom-3"
            style={{ transform: "translateZ(48px)" }}
          >
            <figcaption className="glass-dark translate-y-3 rounded-2xl px-4 py-3 opacity-0 shadow-glass-dark transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-display text-xl text-ivory">{item.title}</p>
              <p className="text-xs tracking-wide text-blush">{item.category}</p>
            </figcaption>
          </div>
        </figure>
      </Tilt3D>
    </motion.div>
  );
}
