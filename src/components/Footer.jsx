import { Heart } from "lucide-react";
import siteConfig from "../config/siteConfig";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal py-16 text-blush">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl text-ivory">{siteConfig.businessName}</p>
            <p className="mt-3 max-w-xs text-sm text-blush/70">{siteConfig.tagline}</p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-ivory transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 text-sm">
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-ivory transition-colors">
              Instagram
            </a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-ivory transition-colors">
              WhatsApp
            </a>
            <a href="#" className="hover:text-ivory transition-colors">Privacy</a>
            <a href="#" className="hover:text-ivory transition-colors">Terms</a>
          </div>
        </div>

        <div className="hairline mt-12 opacity-20" />

        <div className="mt-8 flex flex-col-reverse items-center gap-3 text-xs text-blush/60 md:flex-row md:justify-between">
          <p>© {year} {siteConfig.businessName}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart size={12} fill="currentColor" /> for beautiful nails
          </p>
        </div>
      </div>
    </footer>
  );
}
