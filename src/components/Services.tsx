import { CATEGORY_LABELS, COMPANY, SERVICES } from "@/lib/services";
import type { ServiceCategory } from "@/lib/types";

/** Extrait la valeur numérique d'un prix du catalogue, ex. "dès 89 €" → 89. */
function parsePrice(price: string): number {
  const match = price.match(/\d+/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

/** Prix plancher d'une catégorie, déduit du service le moins cher du catalogue. */
function minPriceFor(category: ServiceCategory): number {
  return Math.min(
    ...SERVICES.filter((service) => service.category === category).map((service) =>
      parsePrice(service.price),
    ),
  );
}

/** Croise les highlights des services d'une catégorie (tour à tour) et en retient 3. */
function highlightsFor(category: ServiceCategory): string[] {
  const services = SERVICES.filter((service) => service.category === category);
  const picked: string[] = [];
  for (let index = 0; picked.length < 3; index++) {
    const before = picked.length;
    for (const service of services) {
      const highlight = service.highlights[index];
      if (highlight && !picked.includes(highlight) && picked.length < 3) {
        picked.push(highlight);
      }
    }
    if (picked.length === before) break;
  }
  return picked;
}

type CategoryCard = {
  category: ServiceCategory;
  description: string;
  icon: JSX.Element;
};

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  className: "h-10 w-10",
  "aria-hidden": true,
} as const;

const CATEGORY_CARDS: CategoryCard[] = [
  {
    category: "auto",
    description:
      "Votre habitacle retrouve son état d’origine : sièges, moquettes et plastiques nettoyés en profondeur. Fini les taches incrustées et les mauvaises odeurs.",
    icon: (
      <svg {...ICON_PROPS}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.75 13 6.3 8.7a2.25 2.25 0 0 1 2.12-1.45h7.16A2.25 2.25 0 0 1 17.7 8.7L19.25 13"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 14.75A1.75 1.75 0 0 1 5.5 13h13a1.75 1.75 0 0 1 1.75 1.75v2.5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-.5H6.75v.5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z"
        />
        <path strokeLinecap="round" d="M7 15.65h.5M16.5 15.65h.5" />
      </svg>
    ),
  },
  {
    category: "canape",
    description:
      "Un canapé comme neuf grâce à l’injection-extraction professionnelle. Taches, auréoles et odeurs disparaissent, même sur les tissus délicats.",
    icon: (
      <svg {...ICON_PROPS}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.25V7.5A2.5 2.5 0 0 0 17 5H7a2.5 2.5 0 0 0-2.5 2.5v2.75"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.75 15.5a2.5 2.5 0 0 0 2.5 2.5h13.5a2.5 2.5 0 0 0 2.5-2.5v-3a1.9 1.9 0 1 0-3.8 0v1.25a.5.5 0 0 1-.5.5H7.05a.5.5 0 0 1-.5-.5V12.5a1.9 1.9 0 1 0-3.8 0z"
        />
        <path strokeLinecap="round" d="M5.25 18v1.5M18.75 18v1.5" />
      </svg>
    ),
  },
  {
    category: "tapis",
    description:
      "Vos tapis et moquettes retrouvent couleurs et douceur d’origine. Brossage, extraction en profondeur et fraîcheur qui dure.",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="5.75" y="3.75" width="12.5" height="16.5" rx="1.5" />
        <path strokeLinecap="round" d="M5.75 6.9h12.5M5.75 17.1h12.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.4 14.1 12 12 14.6 9.9 12z" />
      </svg>
    ),
  },
  {
    category: "textiles",
    description:
      "Matelas, chaises, têtes de lit, sièges de bureau… tous vos textiles traités avec soin. Une hygiène irréprochable, sans agresser les fibres.",
    icon: (
      <svg {...ICON_PROPS}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m15.7 4 4.3 1.9a1.4 1.4 0 0 1 .77 1.75l-.9 2.62a1 1 0 0 1-.95.68H17v7.55a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 18.5v-7.55H5.08a1 1 0 0 1-.95-.68l-.9-2.62A1.4 1.4 0 0 1 4 5.9L8.3 4a3.72 3.72 0 0 0 7.4 0z"
        />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-section-glow py-24">
      <div className="section-container">
        {/* En-tête de section */}
        <div className="flex flex-col items-center text-center">
          <span className="section-eyebrow">Nos prestations</span>
          <h2 className="section-title">Un nettoyage en profondeur, pour chaque support</h2>
          <p className="section-lead mx-auto">
            Taches incrustées, auréoles, mauvaises odeurs&nbsp;: notre matériel professionnel
            d’injection-extraction en vient à bout. Résultat professionnel garanti, directement
            à votre domicile.
          </p>
        </div>

        {/* Grille des 4 catégories */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_CARDS.map((card) => (
            <article
              key={card.category}
              className="glass-card group flex flex-col p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-neon-400/40 hover:shadow-neon"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-neon-400/20 bg-neon-500/10 text-neon-300 transition-all duration-300 group-hover:bg-neon-500/20 group-hover:shadow-neon-sm">
                {card.icon}
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-white">
                {CATEGORY_LABELS[card.category]}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-steel-300">{card.description}</p>

              <ul className="mt-5 space-y-2.5">
                {highlightsFor(card.category).map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-sm text-steel-200">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="mt-0.5 h-4 w-4 shrink-0 text-neon-400"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <div className="neon-divider opacity-30" aria-hidden="true" />
                <p className="mt-4 font-semibold text-neon-300">
                  à partir de {minPriceFor(card.category)}&nbsp;€
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Bandeau CTA devis */}
        <div className="glass-card mx-auto mt-16 flex max-w-3xl flex-col items-center gap-6 px-8 py-10 text-center sm:px-12">
          <p className="text-lg leading-relaxed text-steel-200">
            Une demande particulière&nbsp;? <span className="font-semibold text-white">Devis gratuit</span> au{" "}
            <a
              href={COMPANY.phoneHref}
              className="whitespace-nowrap font-semibold text-neon-300 transition-colors duration-300 hover:text-ice-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
            >
              {COMPANY.phone}
            </a>
          </p>
          <a href="#rendez-vous" className="btn-secondary">
            Prendre Rendez-vous
          </a>
        </div>
      </div>
    </section>
  );
}
