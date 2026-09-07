import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import siteConfig from "../config/siteConfig";
import CTAButton from "./CTAButton";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-lux ${
          scrolled ? "glass py-3 shadow-glass" : "bg-transparent py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          <a
            href="#home"
            className={`font-display text-xl md:text-2xl tracking-wide transition-colors duration-500 ${
              scrolled ? "text-charcoal" : "text-ivory"
            }`}
          >
            {siteConfig.businessName.toUpperCase()}
          </a>

          <ul className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`group relative text-sm font-medium transition-colors duration-300 ${
                    scrolled
                      ? "text-charcoal-soft hover:text-charcoal"
                      : "text-blush hover:text-ivory"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-400 ease-lux group-hover:w-full ${
                      scrolled ? "bg-rose-dark" : "bg-ivory"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <CTAButton
              href="#booking"
              variant={scrolled ? "outline" : "ghost"}
              icon={false}
              className="!px-6 !py-2.5 text-xs"
            >
              Book Appointment
            </CTAButton>
          </div>

          <button
            aria-label="Open menu"
            className={`lg:hidden transition-colors duration-500 ${scrolled ? "text-charcoal" : "text-ivory"}`}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] bg-wine/90 glass-dark flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-6">
              <span className="font-display text-xl text-ivory">
                {siteConfig.businessName.toUpperCase()}
              </span>
              <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="text-ivory">
                <X size={28} />
              </button>
            </div>

            <ul className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-4xl text-ivory/90 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="px-8 pb-10">
              <CTAButton href="#booking" variant="ghost" onClick={() => setMenuOpen(false)}>
                Book Appointment
              </CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
