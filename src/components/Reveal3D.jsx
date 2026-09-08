import { motion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Scroll-triggered entrance that hinges content up out of depth rather than
 * just sliding it. `from` picks which edge the hinge swings from.
 */
const HINGE = {
  bottom: { rotateX: 14, y: 56 },
  top: { rotateX: -14, y: -56 },
  left: { rotateY: -14, x: 56 },
  right: { rotateY: 14, x: -56 },
};

export default function Reveal3D({
  children,
  from = "bottom",
  delay = 0,
  duration = 0.9,
  amount = 0.35,
  className = "",
  as = "div",
  ...rest
}) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motion[as] ?? motion.div;

  if (reducedMotion) {
    const Static = as;
    return (
      <Static className={className} {...rest}>
        {children}
      </Static>
    );
  }

  const hinge = HINGE[from] ?? HINGE.bottom;

  return (
    <Component
      initial={{ opacity: 0, ...hinge }}
      whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
      style={{ transformPerspective: 1200 }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
