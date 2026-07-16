import type { ReactNode } from "react";
import { Clock, Mail, Phone } from "lucide-react";
import { COMPANY } from "@/lib/services";
import { FacebookIcon, GoogleIcon, InstagramIcon, YoutubeIcon } from "@/components/SocialIcons";
import FadeIn from "@/components/fx/FadeIn";
import RevealText from "@/components/fx/RevealText";

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
    icon: <FacebookIcon className="h-5 w-5" />,
  },
  {
    label: "Instagram",
    href: COMPANY.socials.instagram,
    icon: <InstagramIcon className="h-5 w-5" />,
  },
  {
    label: "Google",
    href: COMPANY.socials.google,
    icon: <GoogleIcon className="h-5 w-5" />,
  },
  {
    label: "YouTube",
    href: COMPANY.socials.youtube,
    icon: <YoutubeIcon className="h-5 w-5" />,
  },
];

/**
 * Carte d'intervention — cartographie d'atelier minimaliste :
 * courbes de niveau discrètes, hairlines, un seul accent vapeur.
 */
function InterventionMap() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-obsidian-900/80"
      aria-hidden="true"
    >
      <svg viewBox="0 0 560 420" className="h-auto w-full" role="presentation">
        <defs>
          <radialGradient id="map-light" cx="62%" cy="32%" r="55%">
            <stop offset="0%" stopColor="#cfe9f2" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#cfe9f2" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Courbes de niveau — texture cartographique en filigrane */}
        <g fill="none" stroke="#ffffff" strokeOpacity="0.035" strokeWidth="1">
          <path d="M-20 90 C 120 60, 260 120, 400 84 S 600 110, 620 90" />
          <path d="M-20 150 C 130 118, 270 176, 410 140 S 600 168, 620 148" />
          <path d="M-20 210 C 140 176, 280 232, 420 196 S 600 226, 620 206" />
          <path d="M-20 270 C 150 234, 290 288, 430 252 S 600 284, 620 264" />
          <path d="M-20 330 C 160 292, 300 344, 440 308 S 600 342, 620 322" />
          <path d="M-20 390 C 170 350, 310 400, 450 364 S 600 400, 620 380" />
        </g>

        {/* Lumière d'inspection sur la zone couverte */}
        <rect width="560" height="420" fill="url(#map-light)" />

        {/* Silhouette de la France — trait hairline, aucun remplissage lourd */}
        <path
          d="M292 34 C 330 42, 366 58, 398 82 C 428 104, 452 132, 462 166 C 470 196, 466 228, 456 258 C 446 288, 428 314, 402 332 C 372 352, 336 364, 300 370 C 268 374, 236 370, 206 360 C 176 350, 150 332, 130 308 C 108 282, 94 250, 88 216 C 82 182, 86 148, 100 118 C 116 84, 144 60, 178 46 C 214 30, 254 28, 292 34 Z"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.14"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeDasharray="1 0"
        />

        {/* Rayon d'action — cercle pointillé autour de la base */}
        <circle
          cx="360"
          cy="152"
          r="86"
          fill="none"
          stroke="#6fb3cb"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
        <circle
          cx="360"
          cy="152"
          r="46"
          fill="none"
          stroke="#6fb3cb"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />

        {/* Haute-Marne (52) — à l'ouest */}
        <path
          d="M306 118 C 320 106, 342 104, 354 116 C 366 128, 368 148, 358 162 C 348 176, 328 180, 314 170 C 300 160, 296 140, 302 128 C 303.5 124, 304 121, 306 118 Z"
          fill="#6fb3cb"
          fillOpacity="0.08"
          stroke="#6fb3cb"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Vosges (88) — à l'est, adjacent */}
        <path
          d="M360 114 C 376 102, 400 102, 414 114 C 428 126, 430 148, 420 162 C 410 176, 388 182, 372 172 C 358 164, 352 146, 356 130 C 357 124, 358 118, 360 114 Z"
          fill="#6fb3cb"
          fillOpacity="0.08"
          stroke="#6fb3cb"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Repères : point, tige hairline, étiquette en petites capitales */}
        <g>
          <line x1="330" y1="142" x2="330" y2="96" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
          <circle cx="330" cy="142" r="3" fill="#a4d4e4" />
          <circle cx="330" cy="142" r="7" fill="none" stroke="#a4d4e4" strokeOpacity="0.35" strokeWidth="1" />
          <text
            x="330"
            y="86"
            textAnchor="middle"
            fill="#c3c3cb"
            fontSize="11"
            letterSpacing="2.5"
            style={{ textTransform: "uppercase", fontFamily: "var(--font-sans)" }}
          >
            HAUTE-MARNE — 52
          </text>
        </g>
        <g>
          <line x1="390" y1="140" x2="390" y2="204" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
          <circle cx="390" cy="140" r="3" fill="#a4d4e4" />
          <circle cx="390" cy="140" r="7" fill="none" stroke="#a4d4e4" strokeOpacity="0.35" strokeWidth="1" />
          <text
            x="390"
            y="222"
            textAnchor="middle"
            fill="#c3c3cb"
            fontSize="11"
            letterSpacing="2.5"
            style={{ textTransform: "uppercase", fontFamily: "var(--font-sans)" }}
          >
            VOSGES — 88
          </text>
        </g>

        {/* Cartouche d'échelle, clin d'œil cartographique */}
        <g>
          <line x1="36" y1="380" x2="96" y2="380" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
          <line x1="36" y1="376" x2="36" y2="384" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
          <line x1="96" y1="376" x2="96" y2="384" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
          <text x="42" y="370" fill="#6e6e78" fontSize="9" letterSpacing="1.5" style={{ fontFamily: "var(--font-sans)" }}>
            50 KM
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function ZoneContact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-28">
      <div className="section-container">
        {/* En-tête */}
        <div className="flex flex-col items-start">
          <FadeIn>
            <span className="section-eyebrow">Zone d&apos;intervention</span>
          </FadeIn>
          <h2 className="section-title">
            <RevealText text="Nous venons" as="span" className="block" />
            <RevealText text="jusqu'à vous." as="span" className="text-gesture block" delay={0.3} />
          </h2>
          <FadeIn delay={0.2}>
            <p className="section-lead">
              Intervention à domicile dans les Vosges (88) et la Haute-Marne (52)
              — sans frais cachés.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Colonne gauche — carte + villes desservies */}
          <FadeIn>
            <div className="material-card h-full p-6 sm:p-7">
              <InterventionMap />

              {/* Villes desservies */}
              <div className="mt-8 grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-caps text-porcelain">
                    Vosges <span className="text-vapor-300">88</span>
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {VOSGES_CITIES.map((city) => (
                      <li
                        key={city}
                        className="flex items-center gap-3 text-sm font-light text-silver-400"
                      >
                        <span className="h-px w-3 shrink-0 bg-vapor-400/50" aria-hidden="true" />
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-caps text-porcelain">
                    Haute-Marne <span className="text-vapor-300">52</span>
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {HAUTE_MARNE_CITIES.map((city) => (
                      <li
                        key={city}
                        className="flex items-center gap-3 text-sm font-light text-silver-400"
                      >
                        <span className="h-px w-3 shrink-0 bg-vapor-400/50" aria-hidden="true" />
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-7 font-serif text-sm italic text-silver-500">
                …et toutes les communes alentour —{" "}
                <span className="text-vapor-300">demandez&nbsp;!</span>
              </p>
            </div>
          </FadeIn>

          {/* Colonne droite — contact direct */}
          <FadeIn delay={0.12}>
            <div className="material-card flex h-full flex-col gap-7 p-8 sm:p-9">
              <div>
                <h3 className="font-serif text-2xl font-medium text-porcelain sm:text-[1.7rem]">
                  Parlons de votre projet
                </h3>
                <p className="mt-2.5 text-sm font-light leading-relaxed text-silver-400">
                  Devis gratuit et sans engagement — nous vous répondons
                  rapidement pour organiser votre intervention à domicile.
                </p>
              </div>

              {/* Téléphone */}
              <a
                href={COMPANY.phoneHref}
                className="group flex items-center gap-5 rounded-2xl border border-white/[0.07] bg-obsidian-900/60 p-5 transition-all duration-500 ease-out-expo hover:border-vapor-400/40 hover:bg-obsidian-800/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-silver-300 transition-colors duration-500 group-hover:border-vapor-400/40 group-hover:text-vapor-300">
                  <Phone strokeWidth={1.25} className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-caps text-silver-500">
                    Appelez-nous
                  </span>
                  <span className="font-serif text-2xl font-medium text-porcelain">
                    {COMPANY.phone}
                  </span>
                </span>
              </a>

              {/* E-mail */}
              <a
                href={`mailto:${COMPANY.email}`}
                className="group flex items-center gap-5 rounded-2xl border border-white/[0.07] bg-obsidian-900/60 p-5 transition-all duration-500 ease-out-expo hover:border-vapor-400/40 hover:bg-obsidian-800/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-silver-300 transition-colors duration-500 group-hover:border-vapor-400/40 group-hover:text-vapor-300">
                  <Mail strokeWidth={1.25} className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-caps text-silver-500">
                    Écrivez-nous
                  </span>
                  <span className="break-all text-base font-medium text-porcelain sm:text-lg">
                    {COMPANY.email}
                  </span>
                </span>
              </a>

              {/* Fondateur */}
              <div className="flex items-center gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-obsidian-700 font-serif text-sm italic text-porcelain"
                  aria-hidden="true"
                >
                  RR
                </span>
                <div>
                  <p className="font-medium text-porcelain">{COMPANY.founder}</p>
                  <p className="text-sm font-light text-silver-500">Fondateur</p>
                </div>
              </div>

              <div className="hairline-divider" aria-hidden="true" />

              {/* Réseaux sociaux */}
              <div>
                <p className="text-sm font-medium text-silver-300">
                  Suivez nos transformations&nbsp;:
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} — ${COMPANY.name} (nouvel onglet)`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-silver-400 transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-vapor-400/50 hover:text-vapor-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Disponibilités */}
              <div className="mt-auto flex items-center gap-3 rounded-xl border border-white/[0.07] bg-obsidian-900/60 px-4 py-3.5 text-sm font-light text-silver-300">
                <Clock strokeWidth={1.25} className="h-5 w-5 shrink-0 text-vapor-300" aria-hidden="true" />
                <span>
                  Disponible du lundi au samedi,{" "}
                  <span className="font-medium text-porcelain">9&nbsp;h – 18&nbsp;h</span>
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
