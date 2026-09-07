import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * variant: "solid" (wine bg) | "outline" (charcoal border) | "ghost" (on dark bg)
 */
export default function CTAButton({
  children,
  href,
  onClick,
  variant = "solid",
  icon = true,
  className = "",
  as = "a",
}) {
  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-500 ease-lux overflow-hidden";

  const variants = {
    solid: "bg-wine text-ivory hover:text-ivory shadow-glass",
    outline: "glass text-charcoal hover:shadow-glass",
    ghost: "glass-dark text-ivory hover:bg-white/[0.14]",
  };

  const Comp = as === "button" ? motion.button : motion.a;

  return (
    <Comp
      href={as === "a" ? href : undefined}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`${base} ${variants[variant]} ${className}`}
      data-cursor="hover"
    >
      {variant === "solid" && (
        <span className="absolute inset-0 -z-10 bg-wine-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-lux" />
      )}
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowUpRight
          size={16}
          className="relative z-10 transition-transform duration-500 ease-lux group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      )}
    </Comp>
  );
}
