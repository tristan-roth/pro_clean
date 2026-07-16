import type { ReactNode } from "react";
import { COMPANY } from "@/lib/services";

/** Supports traités, affichés en pilules sous le titre. */
const SUPPORTS: { label: string; icon: ReactNode }[] = [
  {
    label: "Auto",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4"
      >
        <path d="M19 17h2a1 1 0 0 0 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.3-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4a1 1 0 0 0 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    label: "Canapé",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4"
      >
        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
        <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
        <path d="M4 18v2" />
        <path d="M20 18v2" />
      </svg>
    ),
  },
  {
    label: "Tapis",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4"
      >
        <rect x="5" y="3" width="14" height="18" rx="1" />
        <path d="M5 7h14" />
        <path d="M5 17h14" />
        <path d="M10 12h4" />
      </svg>
    ),
  },
  {
    label: "Textiles",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4"
      >
        <path d="M20.4 3.5 16 2a4 4 0 0 1-8 0L3.6 3.5a2 2 0 0 0-1.3 2.2l.6 3.5a1 1 0 0 0 1 .8H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.1a1 1 0 0 0 1-.8l.6-3.5a2 2 0 0 0-1.3-2.2Z" />
      </svg>
    ),
  },
];

/** Les trois promesses affichées sous les CTA. */
const PROMISES: { label: string; icon: ReactNode }[] = [
  {
    label: "Nettoyage en profondeur",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
  {
    label: "Taches & odeurs éliminées",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path d="m12 3 1.9 5.7a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3Z" />
      </svg>
    ),
  },
  {
    label: "Résultat professionnel garanti",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path d="m12 3 7 3v5c0 4.5-3 8.2-7 9.5C8 19.2 5 15.5 5 11V6l7-3Z" />
        <path d="m9 11.5 2 2 4-4" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-night-950 bg-hero-glow pb-20 pt-32 sm:pt-36"
    >
      {/* Grille technique en filigrane */}
      <div className="absolute inset-0 bg-grid-faint" aria-hidden="true" />

      {/* Halos décoratifs */}
      <div
        className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-neon-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-ice-400/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="section-container relative z-10 flex flex-col items-center text-center">
        {/* Badge eyebrow */}
        <p className="section-eyebrow animate-fade-up">
          <span
            className="h-1.5 w-1.5 rounded-full bg-neon-400 shadow-neon-sm"
            aria-hidden="true"
          />
          Detailing &amp; nettoyage à domicile — {COMPANY.area}
        </p>

        {/* Titre principal */}
        <h1
          className="animate-fade-up font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="block text-white">Redonnez une seconde vie</span>
          <span className="block text-neon-gradient">
            à vos textiles &amp; votre véhicule
          </span>
        </h1>

        {/* Sous-titre */}
        <p
          className="section-lead mx-auto animate-fade-up text-center"
          style={{ animationDelay: "0.2s" }}
        >
          Nettoyage &amp; detailing intérieur. Nous nous déplaçons directement à
          votre domicile, partout dans les Vosges et la Haute-Marne.
        </p>

        {/* Pilules des supports traités */}
        <ul
          className="mt-8 flex animate-fade-up flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "0.3s" }}
        >
          {SUPPORTS.map((support) => (
            <li
              key={support.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-night-800/60 px-4 py-2 text-sm font-medium text-steel-200 backdrop-blur-sm transition-all duration-300 hover:border-neon-400/40 hover:text-white"
            >
              <span className="text-neon-300">{support.icon}</span>
              {support.label}
            </li>
          ))}
        </ul>

        {/* Appels à l'action */}
        <div
          className="mt-10 flex w-full animate-fade-up flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          style={{ animationDelay: "0.4s" }}
        >
          <a href="#rendez-vous" className="btn-primary w-full animate-pulse-glow sm:w-auto">
            Prendre Rendez-vous
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
          <a href="#galerie" className="btn-secondary w-full sm:w-auto">
            Voir les résultats
          </a>
        </div>

        {/* Trois promesses */}
        <div
          className="mt-14 grid w-full max-w-3xl animate-fade-up grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3"
          style={{ animationDelay: "0.5s" }}
        >
          {PROMISES.map((promise) => (
            <div
              key={promise.label}
              className="flex items-center justify-center gap-3 bg-night-900/90 px-5 py-4 transition-colors duration-300 hover:bg-night-850"
            >
              <span className="shrink-0 text-neon-300">{promise.icon}</span>
              <span className="text-sm font-semibold text-steel-200">
                {promise.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Indicateur de scroll */}
      <a
        href="#services"
        aria-label="Faire défiler vers la section services"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-steel-400 transition-colors duration-300 hover:text-neon-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400 sm:block"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-6 w-6 animate-bounce"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>

      {/* Liseré néon en bas de section */}
      <div className="neon-divider absolute bottom-0 left-0" aria-hidden="true" />
    </section>
  );
}
