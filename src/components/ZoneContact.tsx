import type { ReactNode } from "react";
import { COMPANY } from "@/lib/services";

const VOSGES_CITIES = [
  "Épinal",
  "Vittel",
  "Contrexéville",
  "Neufchâteau",
  "Mirecourt",
  "Remiremont",
];

const HAUTE_MARNE_CITIES = [
  "Chaumont",
  "Saint-Dizier",
  "Langres",
  "Bourbonne-les-Bains",
  "Nogent",
  "Joinville",
];

const SOCIAL_LINKS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Facebook",
    href: COMPANY.socials.facebook,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: COMPANY.socials.instagram,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Google",
    href: COMPANY.socials.google,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 12h8.5a8.5 8.5 0 1 1-2.5-6" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: COMPANY.socials.youtube,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
];

export default function ZoneContact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 bg-night-900/50 bg-section-glow py-24"
    >
      <div className="section-container">
        {/* En-tête */}
        <div className="flex flex-col items-center text-center">
          <span className="section-eyebrow">Zone d&apos;intervention</span>
          <h2 className="section-title">Nous venons à vous</h2>
          <p className="section-lead mx-auto">
            Intervention à domicile dans les Vosges (88) et la Haute-Marne (52)
            — sans frais cachés.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Colonne gauche — carte stylisée + villes desservies */}
          <div className="glass-card p-6">
            <div
              className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-night-900/60 bg-grid-faint"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 420 400"
                className="h-auto w-full"
                role="presentation"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="zone-map-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Silhouette hexagonale très stylisée de la France */}
                <path
                  d="M222 26 C272 44 320 76 356 112 C368 176 360 240 340 296 C306 326 266 344 222 354 C178 348 134 340 96 326 C68 270 44 214 34 152 C92 106 158 58 222 26 Z"
                  className="fill-night-800/50 stroke-steel-500/30"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Halo radial bleu derrière la zone Grand Est */}
                <ellipse
                  cx="284"
                  cy="128"
                  rx="118"
                  ry="88"
                  fill="url(#zone-map-glow)"
                />

                {/* Haute-Marne (52) — forme organique */}
                <path
                  d="M236 106 C248 96 266 94 277 104 C287 113 290 128 284 142 C278 156 263 165 248 159 C233 153 226 138 229 122 C230.5 115.5 232 110 236 106 Z"
                  className="fill-neon-500/15 stroke-neon-400/50"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Vosges (88) — forme organique adjacente */}
                <path
                  d="M281 104 C293 94 314 92 328 102 C341 111 346 127 338 141 C330 155 312 162 297 156 C285 151 279 139 280 126 C280.4 118 279.5 110 281 104 Z"
                  className="fill-neon-500/15 stroke-neon-400/50"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Marqueurs néon superposés */}
              <div className="pointer-events-none absolute inset-0">
                {/* Pin Vosges */}
                <div className="absolute left-[73.8%] top-[31.8%] -translate-x-1/2 -translate-y-1/2">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-400 opacity-60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-neon-300 shadow-neon-sm" />
                  </span>
                  <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-neon-400/30 bg-night-900/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-neon-300">
                    Vosges (88)
                  </span>
                </div>

                {/* Pin Haute-Marne */}
                <div className="absolute left-[61%] top-[32.8%] -translate-x-1/2 -translate-y-1/2">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-400 opacity-60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-neon-300 shadow-neon-sm" />
                  </span>
                  <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-neon-400/30 bg-night-900/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-neon-300">
                    Haute-Marne (52)
                  </span>
                </div>
              </div>
            </div>

            {/* Villes desservies */}
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Vosges <span className="text-neon-300">(88)</span>
                </h3>
                <ul className="mt-3 space-y-2">
                  {VOSGES_CITIES.map((city) => (
                    <li
                      key={city}
                      className="flex items-center gap-2.5 text-sm text-steel-300"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon-400 shadow-neon-sm"
                        aria-hidden="true"
                      />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Haute-Marne <span className="text-neon-300">(52)</span>
                </h3>
                <ul className="mt-3 space-y-2">
                  {HAUTE_MARNE_CITIES.map((city) => (
                    <li
                      key={city}
                      className="flex items-center gap-2.5 text-sm text-steel-300"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon-400 shadow-neon-sm"
                        aria-hidden="true"
                      />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 text-sm italic text-steel-400">
              …et toutes les communes alentour —{" "}
              <span className="not-italic font-semibold text-neon-300">
                demandez&nbsp;!
              </span>
            </p>
          </div>

          {/* Colonne droite — contact direct */}
          <div className="glass-card flex flex-col gap-6 p-8">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                Parlons de votre projet
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-300">
                Devis gratuit et sans engagement — nous vous répondons
                rapidement pour organiser votre intervention à domicile.
              </p>
            </div>

            {/* Carte téléphone */}
            <a
              href={COMPANY.phoneHref}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-night-900/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-400/50 hover:shadow-neon-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neon-400/30 bg-neon-500/15 text-neon-300 transition-colors duration-300 group-hover:bg-neon-500/25">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-steel-400">
                  Appelez-nous
                </span>
                <span className="text-2xl font-bold text-white">
                  {COMPANY.phone}
                </span>
              </span>
            </a>

            {/* Carte e-mail */}
            <a
              href={`mailto:${COMPANY.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-night-900/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-400/50 hover:shadow-neon-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neon-400/30 bg-neon-500/15 text-neon-300 transition-colors duration-300 group-hover:bg-neon-500/25">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-steel-400">
                  Écrivez-nous
                </span>
                <span className="break-all text-lg font-bold text-white sm:text-xl">
                  {COMPANY.email}
                </span>
              </span>
            </a>

            {/* Fondateur */}
            <div className="flex items-center gap-4">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cta-gradient font-display font-bold text-night-950"
                aria-hidden="true"
              >
                RR
              </span>
              <div>
                <p className="font-semibold text-white">{COMPANY.founder}</p>
                <p className="text-sm text-steel-400">Fondateur</p>
              </div>
            </div>

            <div className="neon-divider" aria-hidden="true" />

            {/* Réseaux sociaux */}
            <div>
              <p className="text-sm font-semibold text-steel-200">
                Suivez nos transformations&nbsp;:
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} — ${COMPANY.name} (nouvel onglet)`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-night-900/60 text-steel-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-400/60 hover:text-neon-300 hover:shadow-neon-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Disponibilités */}
            <div className="flex items-center gap-3 rounded-xl border border-neon-400/20 bg-neon-500/10 px-4 py-3 text-sm text-steel-200">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 shrink-0 text-neon-300"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>
                Disponible du lundi au samedi,{" "}
                <span className="font-semibold text-white">9&nbsp;h – 18&nbsp;h</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
