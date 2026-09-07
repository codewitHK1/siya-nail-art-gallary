import { motion } from "framer-motion";

/**
 * Sits behind the entire page (fixed, z-index -10) so every glass surface
 * has soft, colourful light to refract. Purely decorative — disabled
 * visually under reduced motion via CSS (see index.css) since the
 * transform-only drift is what gets removed, not the orbs themselves.
 */
export default function AmbientBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-ivory">
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="ambient-orb h-[32rem] w-[32rem] -top-40 -left-32 bg-rose-light/50"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="ambient-orb h-[28rem] w-[28rem] top-1/3 -right-24 bg-gold/30"
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="ambient-orb h-[26rem] w-[26rem] bottom-0 left-1/4 bg-blush-deep/60"
      />
    </div>
  );
}
