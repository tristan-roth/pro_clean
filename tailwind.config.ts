import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fonds — noir obsidian profond, neutre (aucune teinte bleutée)
        obsidian: {
          950: "#060607",
          900: "#0a0a0c",
          850: "#0e0e11",
          800: "#131317",
          700: "#1a1a20",
          600: "#232329",
        },
        // Gris anthracite — surfaces, bordures, métal brossé
        anthracite: {
          700: "#2b2b32",
          600: "#3a3a42",
          500: "#4b4b54",
        },
        // Texte — du blanc pur au gris pierre
        porcelain: "#fbfbfc",
        silver: {
          200: "#e6e6ea",
          300: "#c3c3cb",
          400: "#94949e",
          500: "#6e6e78",
          600: "#4e4e57",
        },
        // Accent unique — bleu "eau / vapeur", précis et retenu
        vapor: {
          200: "#cfe9f2",
          300: "#a4d4e4",
          400: "#6fb3cb",
          500: "#4390ad",
          600: "#2f6f8a",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Ombres physiques, profondes et douces — jamais de halo néon
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -30px rgba(0,0,0,0.85)",
        "card-hover":
          "0 1px 0 0 rgba(255,255,255,0.07) inset, 0 40px 90px -36px rgba(0,0,0,0.95)",
        knob: "0 1px 0 rgba(255,255,255,0.25) inset, 0 -1px 0 rgba(0,0,0,0.5) inset, 0 8px 24px -6px rgba(0,0,0,0.8)",
        "vapor-edge": "0 0 0 1px rgba(111,179,203,0.25)",
      },
      backgroundImage: {
        // Voile lumineux très discret en haut de section
        "section-veil":
          "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(111,179,203,0.05), transparent 70%)",
        // Filet horizontal en dégradé (séparateur hairline)
        hairline:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
        "hairline-vapor":
          "linear-gradient(90deg, transparent, rgba(111,179,203,0.45), transparent)",
        // Surface métal brossé (boutons, poignées)
        "brushed-metal":
          "linear-gradient(180deg, #f6f6f7 0%, #dedee2 48%, #c9c9cf 52%, #e8e8ec 100%)",
      },
      letterSpacing: {
        caps: "0.22em",
      },
      keyframes: {
        "steam-rise": {
          "0%": { transform: "translateY(12px) translateX(0) scale(0.7)", opacity: "0" },
          "25%": { opacity: "0.5" },
          "100%": { transform: "translateY(-46px) translateX(6px) scale(1.5)", opacity: "0" },
        },
        "haze-wobble": {
          "0%, 100%": { transform: "translateX(-1.5px) scaleY(1)" },
          "50%": { transform: "translateX(1.5px) scaleY(1.02)" },
        },
        "slow-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-8px,0)" },
        },
        // Fil qui descend le long de l'indicateur de scroll
        "thread-down": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(300%)", opacity: "0" },
        },
      },
      animation: {
        "steam-rise": "steam-rise 2.4s ease-out infinite",
        "haze-wobble": "haze-wobble 1.8s ease-in-out infinite",
        "slow-drift": "slow-drift 7s ease-in-out infinite",
        "thread-down": "thread-down 2.2s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
