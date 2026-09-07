import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import AnimatedText from "./AnimatedText";
import CTAButton from "./CTAButton";
import siteConfig from "../config/siteConfig";

export default function BookingCTA() {
  const whatsappHref = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(siteConfig.bookingMessage)}`;

  return (
    <section id="booking" className="relative overflow-hidden bg-wine py-28 md:py-36">
      <motion.div
        aria-hidden
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(198,163,116,0.35), transparent 55%), radial-gradient(circle at 70% 70%, rgba(206,154,161,0.3), transparent 55%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-10">
        <AnimatedText
          text="Ready for your next set?"
          as="h2"
          className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-ivory"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mx-auto mt-6 max-w-md text-lg text-blush"
        >
          Book your appointment and let your nails do the talking.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <CTAButton href={whatsappHref} variant="ghost">
            Book Appointment
          </CTAButton>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="glass-dark group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-ivory transition-colors duration-500 ease-lux hover:bg-white/[0.14]"
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
