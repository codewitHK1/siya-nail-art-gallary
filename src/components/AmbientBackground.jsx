import { motion } from "framer-motion";
import useIsTouchDevice from "../hooks/useIsTouchDevice";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

/**
 * Sits behind the entire page (fixed, z-index -10) so every glass surface
 * has soft, colourful light to refract. Purely decorative.
 *
 * The bloom is drawn as a radial gradient rather than a blurred solid — see
 * `.ambient-orb` in index.css. The slow drift is desktop-only: on phones the
 * orbs render once and never move, which keeps them off the raster path.
 */
const orbs = [
  {
    color: "rgba(206, 154, 161, 0.5)",
    className: "h-[32rem] w-[32rem] -top-40 -left-32",
    drift: { x: [0, 60, 0], y: [0, 40, 0] },
    duration: 24,
  },
  {
    color: "rgba(198, 163, 116, 0.3)",
    className: "h-[28rem] w-[28rem] top-1/3 -right-24",
    drift: { x: [0, -50, 0], y: [0, 60, 0] },
    duration: 28,
  },
  {
    color: "rgba(234, 211, 203, 0.6)",
    className: "h-[26rem] w-[26rem] bottom-0 left-1/4",
    drift: { x: [0, 40, 0], y: [0, -40, 0] },
    duration: 20,
  },
];

export default function AmbientBackground() {
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const still = isTouch || reducedMotion;

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-ivory">
      {orbs.map((orb) => (
        <motion.div
          key={orb.className}
          animate={still ? undefined : orb.drift}
          transition={
            still
              ? undefined
              : { duration: orb.duration, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ "--orb": orb.color }}
          className={`ambient-orb ${orb.className}`}
        />
      ))}
    </div>
  );
}
