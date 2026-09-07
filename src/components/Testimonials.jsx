import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import testimonials from "../data/testimonials";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  const [paused, setPaused] = useState(false);
  const track = [...testimonials, ...testimonials];

  return (
    <section id="reviews" className="py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading align="center" label="Reviews" heading="Loved by our clients." />
      </div>

      <div
        className="mt-16 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex gap-6 w-max px-6"
          animate={{ x: paused ? undefined : ["0%", "-50%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          drag="x"
          dragConstraints={{ left: -800, right: 0 }}
        >
          {track.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="glass w-[320px] shrink-0 rounded-[24px] p-8 shadow-glass sm:w-[380px]"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-5 font-display text-xl leading-snug text-charcoal">
                “{t.quote}”
              </p>
              <div className="mt-6">
                <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                <p className="text-xs text-charcoal-soft">{t.service}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
