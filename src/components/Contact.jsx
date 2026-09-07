import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Instagram as InstagramIcon, Clock, ArrowUpRight } from "lucide-react";
import siteConfig from "../config/siteConfig";
import SectionHeading from "./SectionHeading";

const contactItems = [
  {
    icon: MapPin,
    label: "Studio Address",
    value: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
  },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.phone,
    href: siteConfig.whatsappUrl,
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: siteConfig.instagramHandle,
    href: siteConfig.instagramUrl,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading label="Visit Us" heading="Come see us in person." />

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {contactItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="glass flex h-10 w-10 items-center justify-center rounded-full text-wine">
                  <item.icon size={17} strokeWidth={1.7} />
                </span>
                <p className="mt-3 text-xs tracking-wide text-charcoal-soft">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="mt-1 inline-block text-base text-charcoal hover:text-wine transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 max-w-[220px] text-base text-charcoal">{item.value}</p>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.32 }}
            >
              <span className="glass flex h-10 w-10 items-center justify-center rounded-full text-wine">
                <Clock size={17} strokeWidth={1.7} />
              </span>
              <p className="mt-3 text-xs tracking-wide text-charcoal-soft">Business Hours</p>
              {siteConfig.openingHours.map((row) => (
                <p key={row.days} className="mt-1 text-base text-charcoal">
                  {row.days}
                  <span className="block text-sm text-charcoal-soft">{row.hours}</span>
                </p>
              ))}
            </motion.div>
          </div>

          <motion.a
            href={siteConfig.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass group relative flex min-h-[280px] flex-col items-start justify-end overflow-hidden rounded-[28px] p-8 shadow-glass"
            data-cursor="hover"
          >
            <div
              className="absolute inset-0 opacity-60 transition-transform duration-700 ease-lux group-hover:scale-105"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 40%, rgba(94,27,46,0.25), transparent 60%)",
              }}
            />
            <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-3 text-sm font-semibold text-wine shadow-glass">
              Open in Google Maps
              <ArrowUpRight size={16} className="transition-transform duration-500 ease-lux group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
