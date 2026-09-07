import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="glass group relative flex flex-col justify-between rounded-[28px] p-8 min-h-[240px] shadow-glass transition-all duration-500 ease-lux hover:bg-wine/85 hover:border-wine/40"
      data-cursor="hover"
    >
      <div>
        <h3 className="font-display text-2xl text-charcoal transition-colors duration-500 ease-lux group-hover:text-ivory">
          {service.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-soft transition-colors duration-500 ease-lux group-hover:text-blush">
          {service.description}
        </p>
      </div>

      <div className="mt-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-charcoal-soft/80 transition-colors duration-500 ease-lux group-hover:text-blush/80">
            <Clock size={13} />
            <span>{service.time}</span>
          </div>
          <p className="mt-1 font-display text-3xl text-rose-dark transition-colors duration-500 ease-lux group-hover:text-blush-deep">
            {service.price}
          </p>
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 transition-all duration-500 ease-lux group-hover:border-ivory/40 group-hover:rotate-45">
          <ArrowRight size={18} className="text-charcoal transition-colors duration-500 ease-lux group-hover:text-ivory" />
        </span>
      </div>
    </motion.div>
  );
}
