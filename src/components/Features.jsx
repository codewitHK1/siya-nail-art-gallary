import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Gem, Palette, Timer, MessageCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";

const features = [
  { icon: Sparkles, title: "Premium Products", text: "Only professional-grade polishes and gels, sourced for longevity and finish." },
  { icon: Gem, title: "Certified Nail Artists", text: "Every artist is trained and certified in advanced extension and art techniques." },
  { icon: ShieldCheck, title: "Hygienic Tools", text: "Hospital-grade sterilisation between every single client, without exception." },
  { icon: Palette, title: "Custom Designs", text: "Nothing off a wall chart — every set is planned around your hands and style." },
  { icon: Timer, title: "Long Lasting Finish", text: "Prepped and cured for a set that holds its shine for weeks, not days." },
  { icon: MessageCircle, title: "Personal Consultation", text: "A short conversation before every appointment so the result is never a surprise." },
];

export default function Features() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          label="Why Blush"
          heading="Care that shows in the finish."
          description="The details clients notice tend to be the ones we obsess over before you even sit down."
        />

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              <span className="glass flex h-12 w-12 items-center justify-center rounded-full text-wine shadow-glass">
                <f.icon size={20} strokeWidth={1.6} />
              </span>
              <h3 className="font-display text-2xl text-charcoal">{f.title}</h3>
              <p className="text-sm leading-relaxed text-charcoal-soft">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
