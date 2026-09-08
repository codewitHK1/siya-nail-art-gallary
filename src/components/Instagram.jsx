import { motion } from "framer-motion";
import { Instagram as InstagramIcon, Heart } from "lucide-react";
import siteConfig from "../config/siteConfig";
import { galleryItems } from "../data/gallery";
import SectionHeading from "./SectionHeading";
import localImage from "../utils/localImage";
import CTAButton from "./CTAButton";

const posts = galleryItems.slice(0, 6).map((item, i) => ({
  ...item,
  likes: [212, 189, 341, 158, 275, 203][i],
}));

export default function Instagram() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <SectionHeading align="center" label={siteConfig.instagramHandle} heading="Follow the obsession." />
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
          {posts.map((post, i) => (
            <motion.a
              key={post.id}
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative aspect-square overflow-hidden rounded-2xl"
              data-cursor="hover"
            >
              <img
                {...localImage(post.slug, {
                  sizes: "(max-width: 479px) 50vw, (max-width: 767px) 33vw, 17vw",
                })}
                alt={`Instagram post: ${post.title}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-lux group-hover:scale-110"
              />
              <div className="glass-dark absolute inset-0 flex flex-col items-center justify-center gap-2 text-ivory opacity-0 transition-all duration-400 ease-lux group-hover:opacity-100">
                <InstagramIcon size={22} />
                <span className="flex items-center gap-1 text-xs">
                  <Heart size={12} fill="currentColor" /> {post.likes}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <CTAButton href={siteConfig.instagramUrl} variant="outline" icon={false}>
            Follow on Instagram
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
