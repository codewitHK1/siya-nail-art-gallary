import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import SectionHeading from "./SectionHeading";
import localImage from "../utils/localImage";

const BEFORE_IMG = "transformation-before";
const AFTER_IMG = "transformation-after";

export default function Transformation() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, pct)));
  };

  const handlePointerDown = (e) => {
    dragging.current = true;
    updateFromClientX(e.clientX ?? e.touches?.[0]?.clientX);
  };
  const handlePointerMove = (e) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX ?? e.touches?.[0]?.clientX);
  };
  const stopDragging = () => (dragging.current = false);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <SectionHeading align="center" label="Results" heading="The Transformation" />

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-14 aspect-[4/3] w-full select-none overflow-hidden rounded-[28px] shadow-soft touch-none"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={stopDragging}
        >
          <img
            {...localImage(AFTER_IMG, {
              sizes: "(max-width: 767px) 92vw, 1024px",
            })}
            alt="Nails after Blush treatment"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <img
              {...localImage(BEFORE_IMG, {
                sizes: "(max-width: 767px) 100vw, 1100px",
              })}
              alt="Nails before Blush treatment"
              className="h-full w-full object-cover"
              style={{ width: `${(100 / position) * 100}%`, maxWidth: "none" }}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>

          <span className="glass-dark absolute left-4 top-4 rounded-full px-3 py-1 text-xs tracking-wide text-ivory">
            Before
          </span>
          <span className="glass-dark absolute right-4 top-4 rounded-full px-3 py-1 text-xs tracking-wide text-ivory">
            After
          </span>

          <div
            className="absolute top-0 bottom-0 w-[2px] bg-ivory"
            style={{ left: `${position}%` }}
          >
            <div className="glass absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-glass">
              <MoveHorizontal size={18} className="text-wine" />
            </div>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-sm text-charcoal-soft">
          Drag the divider to compare
        </p>
      </div>
    </section>
  );
}
