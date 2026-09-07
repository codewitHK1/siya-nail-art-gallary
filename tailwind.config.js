/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      xs: "375px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        ivory: "#FBF7F2",
        blush: "#F4E7E1",
        "blush-deep": "#EAD3CB",
        rose: {
          DEFAULT: "#B7727C",
          light: "#CE9AA1",
          dark: "#8C4F58",
        },
        wine: {
          DEFAULT: "#5E1B2E",
          light: "#7A2A40",
        },
        gold: "#C6A374",
        charcoal: "#2B2422",
        "charcoal-soft": "#4A403C",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(43, 36, 34, 0.25)",
        card: "0 12px 32px -12px rgba(94, 27, 46, 0.18)",
        glass: "0 8px 32px -8px rgba(94, 27, 46, 0.15), inset 0 1px 0 0 rgba(255,255,255,0.6)",
        "glass-dark": "0 8px 32px -8px rgba(0,0,0,0.35), inset 0 1px 0 0 rgba(255,255,255,0.12)",
      },
      borderRadius: {
        organic: "40% 60% 55% 45% / 45% 40% 60% 55%",
      },
    },
  },
  plugins: [],
};
