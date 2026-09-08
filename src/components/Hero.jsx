import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import CTAButton from "./CTAButton";
import responsiveImage from "../utils/responsiveImage";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

// Flip this to true once you have actually dropped footage at
// /public/videos/hero-bg.mp4 (see public/videos/README.txt).
//
// It stays false while the file is missing because netlify.toml / _redirects
// rewrite every unknown path to /index.html with a 200 — so the <video> would
// download the HTML document and fail to decode it, costing a request and a
// decode error on every single visit for no visual benefit.
const HERO_VIDEO_ENABLED = false;

const VIDEO_SRC = "/videos/hero-bg.mp4";
const BACKDROP_SRC =
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1920&q=90";

const floatingLabels = [
  { label: "Gel Extensions", className: "left-6 top-[38%] md:left-14" },
  { label: "Luxury Nail Art", className: "right-6 top-[24%] md:right-16" },
  { label: "Minimal Designs", className: "left-6 bottom-[16%] md:left-20" },
];

export default function Hero() {
  const videoRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!HERO_VIDEO_ENABLED || !videoRef.current) return;
    if (reducedMotion) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [reducedMotion]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100vh] items-center overflow-hidden bg-charcoal"
    >
      {/* Video background, or a responsive still while no footage exists */}
      <div className="absolute inset-0">
        {HERO_VIDEO_ENABLED ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={BACKDROP_SRC}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <img
            {...responsiveImage(BACKDROP_SRC, {
              widths: [480, 768, 1080, 1440, 1920],
              sizes: "100vw",
            })}
            alt=""
            aria-hidden
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        )}

        {/* Overlay: wine/charcoal gradient wash so text stays legible over any footage */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-wine/40" />
        <div className="absolute inset-0 bg-charcoal/20" />
      </div>

      {/* Decorative floating glass labels over the video */}
      {floatingLabels.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: 1.3 + i * 0.2, duration: 0.6 },
            y: {
              delay: 1.6,
              duration: 5 + i,
              repeat: reducedMotion ? 0 : Infinity,
              ease: "easeInOut",
            },
          }}
          className={`glass-dark absolute z-20 hidden rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-ivory shadow-glass-dark sm:block ${item.className}`}
        >
          {item.label}
        </motion.div>
      ))}

      {/* Foreground editorial copy */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 md:px-10 pt-28">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="glass-dark mb-6 inline-block rounded-full px-4 py-1.5 text-sm tracking-[0.05em] text-blush shadow-glass-dark"
        >
          Kolkata's studio for considered nail art
        </motion.span>

        <AnimatedText
          text="Your Nails."
          as="h1"
          className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.98] text-ivory"
          delay={0.3}
        />
        <AnimatedText
          text="Your Canvas."
          as="h1"
          className="font-display italic text-6xl sm:text-7xl md:text-8xl leading-[0.98] text-blush"
          delay={0.55}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-md text-lg leading-relaxed text-blush/90"
        >
          Elevated nail artistry designed to make every detail feel uniquely
          yours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <CTAButton href="#booking">Book Your Appointment</CTAButton>
          <CTAButton href="#gallery" variant="ghost" icon={false}>
            Explore Our Work
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
