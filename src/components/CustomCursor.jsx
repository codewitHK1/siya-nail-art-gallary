import { useEffect, useRef, useState } from "react";
import useIsTouchDevice from "../hooks/useIsTouchDevice";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    document.body.classList.add("has-custom-cursor");

    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 7}px, ${e.clientY - 7}px, 0)`;
      }
    };

    const over = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        const kind = target.getAttribute("data-cursor");
        setActive(true);
        setLabel(kind === "view" ? "VIEW" : "");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <div
      ref={dotRef}
      className="custom-cursor"
      style={{
        width: active ? (label ? 64 : 26) : 14,
        height: active ? (label ? 64 : 26) : 14,
        transition: "width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <span style={{ opacity: label ? 1 : 0 }}>{label}</span>
    </div>
  );
}
