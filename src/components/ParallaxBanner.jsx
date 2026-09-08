import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import localImage from "../utils/localImage";

export default function ParallaxBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative h-[70vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -top-[8%] -bottom-[8%]">
        <img
          {...localImage("banner-nail-art", { sizes: "100vw" })}
          alt="Close-up of hand-painted luxury nail art"
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </motion.div>
      <div className="absolute inset-0 bg-charcoal/40" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass-dark rounded-[32px] px-10 py-8 font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-ivory"
        >
          Small details.
          <br />
          <span className="italic">Big confidence.</span>
        </motion.h2>
      </div>
    </section>
  );
}
