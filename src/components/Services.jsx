import { motion } from "framer-motion";
import services from "../data/services";
import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";
import CTAButton from "./CTAButton";

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading
            label="Services"
            heading="Designed for every mood."
            description="A menu built around how you actually live in your hands — from a five-minute polish change to hand-painted, one-of-one detail."
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CTAButton href="#gallery" variant="outline" icon={false} className="hidden md:inline-flex">
              View All Services
            </CTAButton>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <CTAButton href="#gallery" variant="outline" icon={false}>
            View All Services
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
