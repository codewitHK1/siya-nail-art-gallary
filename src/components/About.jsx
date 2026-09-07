import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import AnimatedText from "./AnimatedText";

const stats = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 5000, suffix: "+", label: "Happy Clients", display: "5K+" },
  { value: 1000, suffix: "+", label: "Unique Designs" },
  { value: 4.9, suffix: "", label: "Average Rating", decimals: 1 },
];

function Counter({ stat }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(stat.decimals ? "0.0" : "0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (stat.decimals) {
          setDisplay(v.toFixed(stat.decimals));
        } else if (stat.display) {
          setDisplay(v >= 1000 ? `${Math.round(v / 1000)}K` : Math.round(v).toString());
        } else {
          setDisplay(Math.round(v).toLocaleString());
        }
      },
    });
    return () => controls.stop();
  }, [inView, stat]);

  return (
    <div ref={ref} className="glass rounded-2xl px-4 py-4">
      <p className="font-display text-4xl md:text-5xl text-rose-dark">
        {display}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-charcoal-soft">{stat.label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass overflow-hidden rounded-[32px] aspect-[4/5] p-2 shadow-glass"
        >
          <img
            src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1800&q=90"
            alt="Interior of Blush Nail Studio"
            className="h-full w-full rounded-[24px] object-cover"
            loading="lazy"
          />
        </motion.div>

        <div>
          <span className="text-sm tracking-[0.2em] text-rose-dark">The Studio</span>
          <AnimatedText
            text="Where creativity meets self-care."
            as="h2"
            className="mt-4 font-display text-4xl sm:text-5xl leading-[1.05] text-charcoal"
          />
          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal-soft">
            Blush began as a single manicure table and a conviction that nail art deserved the
            same care as any other craft. Today our studio is a quiet, considered space where
            each appointment is unhurried — built around your hands, your calendar, and the
            kind of detail that photographs well and lasts even better.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-y-8 gap-x-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <Counter key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
