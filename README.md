# Shiya's Nail Studio — Website

A production-ready, animated marketing site for a premium nail-art studio, built with
React + Vite + Tailwind CSS + Framer Motion. 100% static — deploys free on Netlify with
no backend, database, or API keys.

## 1. Install

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Opens at `http://localhost:5173`.

## 3. Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with `npm run preview`.

## 4. Deploy to Netlify

**Option A — drag and drop:** run `npm run build`, then drag the `dist` folder into
Netlify's "Deploys" tab.

**Option B — connect your Git repo (recommended):**

1. Push this project to GitHub/GitLab/Bitbucket.
2. In Netlify: "Add new site" → "Import an existing project" → pick the repo.
3. Build command: `npm run build`
4. Publish directory: `dist`

Both `netlify.toml` and `public/_redirects` are already included, so SPA-style routing
(if you add React Router later) and the build settings work with zero extra config.
No environment variables are required.

## 5. Where to edit things

Everything editable lives in plain data/config files — you never need to touch a
component to update business info or content.

| What                                          | File                       |
| --------------------------------------------- | -------------------------- |
| Business name, tagline                        | `src/config/siteConfig.js` |
| Phone number                                  | `src/config/siteConfig.js` |
| WhatsApp number (used for all WhatsApp links) | `src/config/siteConfig.js` |
| Address                                       | `src/config/siteConfig.js` |
| Instagram handle & URL                        | `src/config/siteConfig.js` |
| Google Maps link                              | `src/config/siteConfig.js` |
| Business hours                                | `src/config/siteConfig.js` |
| Services & prices                             | `src/data/services.js`     |
| Gallery images & categories                   | `src/data/gallery.js`      |
| Testimonials                                  | `src/data/testimonials.js` |
| Colors, fonts, spacing tokens                 | `tailwind.config.js`       |

### Replacing gallery images

Open `src/data/gallery.js` and swap any `image` URL for your own photo — either a
hosted URL or a local path like `/images/gallery/01.jpg` (drop the file into
`public/images/gallery/` first). Nothing else needs to change; `Gallery.jsx` and
`Instagram.jsx` both read from this one file.

### Adding/removing a service

Add or remove an object in the `services` array in `src/data/services.js`. Cards on
the Services section render automatically from this list.

### Hero video background

The home screen now plays a looping muted video behind the headline, with a
dark gradient overlay so the text stays readable over any footage. It falls
back to a high-res poster image automatically if no video file is present.

To add your own:

1. Get a short (15–30s), seamlessly-looping clip — see `public/videos/README.txt`
   for free sources (Pexels, Coverr, Pixabay) and compression tips.
2. Save it as `public/videos/hero-bg.mp4`.
3. That's it — `Hero.jsx` already points at that path.

The video automatically pauses for visitors with "reduce motion" enabled at
the OS level, showing the poster image instead.

## 6. Project structure

```
src/
  components/       All UI sections and reusable pieces (Navbar, Hero, Services, …)
  data/             Editable content: services.js, gallery.js, testimonials.js
  config/           siteConfig.js — business info used across the whole site
  hooks/            usePrefersReducedMotion, useIsTouchDevice
  styles/           index.css — Tailwind entry + custom cursor/marquee CSS
  App.jsx           Assembles all sections in order
  main.jsx          React entry point
public/
  _redirects        Netlify SPA fallback
  favicon.svg
netlify.toml         Netlify build settings
tailwind.config.js    Design tokens (colors, fonts, radii, easing)
```

## 7. Notes

- **Fonts:** Fraunces (headings — a modern optical-size serif) + Plus Jakarta Sans
  (body), loaded via Google Fonts in `index.html`.
- **Glass effect:** soft blurred gradient orbs (`AmbientBackground.jsx`) sit fixed
  behind the whole page; every card, pill, and nav surface uses the `.glass` /
  `.glass-dark` utility classes in `src/styles/index.css` (`backdrop-filter: blur()`)
  so they pick up frosted color from whatever's behind them. Tune the orb colors/size
  in `AmbientBackground.jsx`, and the blur/opacity in `.glass`/`.glass-dark`.
- **Images:** all placeholder photography is now loaded at high resolution
  (1600–2400px wide, quality 90) for a crisp, HD look on large screens.
- **Custom cursor:** desktop only — automatically disabled on touch devices and when
  the OS-level "reduce motion" setting is on.
- **Reduced motion:** all animations respect `prefers-reduced-motion`.
- **Gallery placeholder images** are hosted on Unsplash for convenience. Replace them
  with your own studio photography before launch — see above.
- **WhatsApp number** in `siteConfig.js` must be digits only with country code (no `+`,
  spaces, or dashes), e.g. `919876543210`.

# siya-nail-art-gallary
