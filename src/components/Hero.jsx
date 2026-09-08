import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import AnimatedText from "./AnimatedText";
import CTAButton from "./CTAButton";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

// Drop your own footage in /public/videos/hero-bg.mp4 (see README — "Hero video
// background"). Until then this poster image is shown as a static fallback.
const VIDEO_SRC = "/videos/hero-bg.mp4";
const POSTER_SRC =
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1920&q=90";

// `drift` is how far each label travels on scroll — the spread is what makes
// them read as sitting at different depths in front of the footage.
const floatingLabels = [
  { label: "Gel Extensions", className: "left-6 top-[38%] md:left-14", drift: -160 },
  { label: "Luxury Nail Art", className: "right-6 top-[24%] md:right-16", drift: -260 },
  { label: "Minimal Designs", className: "left-6 bottom-[16%] md:left-20", drift: -110 },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!videoRef.current) return;
    if (reducedMotion) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [reducedMotion]);

  // 0 while the hero is pinned at the top of the viewport, 1 once it has been
  // scrolled fully past. Everything below is keyed off this single progress.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // The backdrop pushes away from the viewer: it grows, sinks, hinges back on
  // its bottom edge and defocuses — so the next section reads as arriving in
  // front of it rather than merely scrolling over it.
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const mediaRotateX = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const mediaBlur = useTransform(scrollYProgress, [0, 0.55, 1], [0, 2, 14]);
  const mediaFilter = useMotionTemplate`blur(${mediaBlur}px) saturate(115%)`;
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.9]);

  // Copy leaves faster than the backdrop — the speed difference is the depth.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -170]);
  const copyScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  // One transform per label, created unconditionally and in a fixed order so
  // the hook order never depends on `reducedMotion` or the array contents.
  const labelDrift = [
    useTransform(scrollYProgress, [0, 1], [0, floatingLabels[0].drift]),
    useTransform(scrollYProgress, [0, 1], [0, floatingLabels[1].drift]),
    useTransform(scrollYProgress, [0, 1], [0, floatingLabels[2].drift]),
  ];
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const mediaStyle = reducedMotion
    ? { filter: "none" }
    : {
        scale: mediaScale,
        y: mediaY,
        rotateX: mediaRotateX,
        filter: mediaFilter,
        transformPerspective: 1400,
        transformOrigin: "50% 100%",
      };

  const copyStyle = reducedMotion
    ? { y: 0, scale: 1, opacity: 1 }
    : { y: copyY, scale: copyScale, opacity: copyOpacity };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100vh] items-center overflow-hidden bg-charcoal"
    >
      {/* Video background */}
      <motion.div className="absolute inset-0 will-change-transform" style={mediaStyle}>
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_SRC}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        {/* Overlay: wine/charcoal gradient wash so text stays legible over any footage */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-wine/40" />
        <div className="absolute inset-0 bg-charcoal/20" />
      </motion.div>

      {/* Separate veil so the darkening survives the media layer's blur */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-charcoal"
        style={reducedMotion ? { opacity: 0 } : { opacity: veilOpacity }}
      />

      {/* Decorative floating glass labels over the video.
          Two nested layers on purpose: the outer one is driven by scroll, the
          inner one owns the entrance and the idle float, so the two never
          compete for the same `y` — and the pill's glass fades with its text. */}
      {floatingLabels.map((item, i) => (
        <motion.div
          key={item.label}
          className={`absolute z-20 hidden sm:block ${item.className}`}
          style={
            reducedMotion
              ? { y: 0, opacity: 1 }
              : { y: labelDrift[i], opacity: labelOpacity }
          }
        >
          <motion.div
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
            className="glass-dark rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-ivory shadow-glass-dark"
          >
            {item.label}
          </motion.div>
        </motion.div>
      ))}

      {/* Foreground editorial copy */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-4xl px-6 md:px-10 pt-28 will-change-transform"
        style={copyStyle}
      >
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
      </motion.div>

      {/* Scroll cue — fades out as soon as the transition begins */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3"
        style={reducedMotion ? { opacity: 1 } : { opacity: cueOpacity }}
      >
        <span className="text-[10px] font-semibold tracking-[0.28em] text-blush/70">
          SCROLL
        </span>
        <span className="scroll-cue" />
      </motion.div>
    </section>
  );
}
