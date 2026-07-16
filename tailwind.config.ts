import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fonds — noir / anthracite premium
        night: {
          950: "#04060a",
          900: "#070b12",
          850: "#0a0f18",
          800: "#0d141f",
          700: "#131c2b",
          600: "#1a2537",
        },
        // Accent principal — bleu néon / électrique
        neon: {
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        // Accent secondaire — cyan glacé (reflets "propre")
        ice: {
          300: "#67e8f9",
          400: "#22d3ee",
        },
        // Texte
        steel: {
          100: "#eef4fb",
          200: "#d5e0ee",
          300: "#a9b8cc",
          400: "#7e8ea6",
          500: "#5c6b82",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Halos néon — à utiliser sur les CTA et cartes actives
        "neon-sm": "0 0 12px -2px rgba(56, 189, 248, 0.45)",
        neon: "0 0 24px -4px rgba(56, 189, 248, 0.55), 0 0 64px -12px rgba(14, 165, 233, 0.35)",
        "neon-lg":
          "0 0 40px -6px rgba(56, 189, 248, 0.6), 0 0 100px -16px rgba(14, 165, 233, 0.45)",
        card: "0 20px 50px -24px rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        // Dégradés subtils sur fond noir/anthracite
        "hero-glow":
          "radial-gradient(ellipse 80% 55% at 50% -12%, rgba(14, 165, 233, 0.22), transparent 65%)",
        "section-glow":
          "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(14, 165, 233, 0.10), transparent 70%)",
        "card-sheen":
          "linear-gradient(160deg, rgba(125, 211, 252, 0.08) 0%, transparent 38%, transparent 100%)",
        "neon-line":
          "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.75), transparent)",
        "cta-gradient": "linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 24px -4px rgba(56, 189, 248, 0.45)" },
          "50%": { boxShadow: "0 0 40px -4px rgba(56, 189, 248, 0.75)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-glow": "pulse-glow 2.6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
