import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import useIsTouchDevice from "../hooks/useIsTouchDevice";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const SPRING = { stiffness: 210, damping: 26, mass: 0.6 };

/**
 * Pointer-driven 3D tilt with a specular glare that tracks the cursor.
 *
 * Children can sit on their own depth planes with `translateZ(...)` — the
 * wrapper keeps `transform-style: preserve-3d`, so avoid `overflow: hidden`
 * on this element itself (browsers flatten 3D contexts that clip) and put
 * any clipping on a child instead.
 *
 * Falls back to a plain, untransformed element on touch pointers and under
 * `prefers-reduced-motion`.
 */
export default function Tilt3D({
  children,
  max = 9,
  lift = 16,
  scale = 1.02,
  glare = true,
  className = "",
  style,
  ...rest
}) {
  const ref = useRef(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const disabled = isTouch || reducedMotion;

  // Pointer offset from the element's centre, normalised to -0.5 … 0.5.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const hover = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), SPRING);
  const z = useSpring(useTransform(hover, [0, 1], [0, lift]), SPRING);
  const s = useSpring(useTransform(hover, [0, 1], [1, scale]), SPRING);

  // Glare centre in %, chased by its own spring so the highlight lags the
  // pointer slightly — that lag is what reads as a physical surface.
  const gx = useSpring(useTransform(px, [-0.5, 0.5], [15, 85]), SPRING);
  const gy = useSpring(useTransform(py, [-0.5, 0.5], [5, 95]), SPRING);
  const glareOpacity = useSpring(useTransform(hover, [0, 1], [0, 1]), SPRING);
  const glareImage = useMotionTemplate`radial-gradient(40% 40% at ${gx}% ${gy}%, rgba(255,255,255,0.5), rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 72%)`;

  if (disabled) {
    return (
      <div ref={ref} className={className} style={style} {...rest}>
        {children}
      </div>
    );
  }

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    hover.set(0);
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => hover.set(1)}
      onPointerLeave={handleLeave}
      className={`preserve-3d ${className}`}
      style={{
        rotateX,
        rotateY,
        z,
        scale: s,
        transformPerspective: 900,
        ...style,
      }}
      {...rest}
    >
      {children}

      {glare && (
        <motion.span
          aria-hidden
          className="tilt-glare"
          style={{ backgroundImage: glareImage, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  );
}
