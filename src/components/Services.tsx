import { Armchair, BedDouble, Car, Layers, Phone } from "lucide-react";
import { CATEGORY_LABELS, COMPANY, SERVICES } from "@/lib/services";
import type { ServiceCategory } from "@/lib/types";
import TiltCard from "@/components/fx/TiltCard";
import FadeIn from "@/components/fx/FadeIn";
import RevealText from "@/components/fx/RevealText";

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
  /** Largeur de la carte dans la grille bento (sur 12 colonnes). */
  span: "wide" | "narrow";
};

const ICON_PROPS = {
  strokeWidth: 1.1,
  className: "h-9 w-9",
  "aria-hidden": true,
} as const;

/**
 * Grille bento asymétrique : deux rangées 7/5 puis 5/7,
 * pour casser la monotonie des 4 colonnes égales.
 */
const CATEGORY_CARDS: CategoryCard[] = [
  {
    category: "auto",
    span: "wide",
    description:
      "Votre habitacle retrouve son état d'origine : sièges, moquettes et plastiques nettoyés en profondeur. Fini les taches incrustées et les mauvaises odeurs.",
    icon: <Car {...ICON_PROPS} />,
  },
  {
    category: "canape",
    span: "narrow",
    description:
      "Un canapé comme neuf grâce à l'injection-extraction professionnelle. Taches, auréoles et odeurs disparaissent, même sur les tissus délicats.",
    icon: <Armchair {...ICON_PROPS} />,
  },
  {
    category: "tapis",
    span: "narrow",
    description:
      "Vos tapis et moquettes retrouvent couleurs et douceur d'origine. Brossage, extraction en profondeur et fraîcheur qui dure.",
    icon: <Layers {...ICON_PROPS} />,
  },
  {
    category: "textiles",
    span: "wide",
    description:
      "Matelas, chaises, têtes de lit, sièges de bureau… tous vos textiles traités avec soin. Une hygiène irréprochable, sans agresser les fibres.",
    icon: <BedDouble {...ICON_PROPS} />,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-28">
      <div className="section-container">
        {/* En-tête de section */}
        <div className="flex flex-col items-start">
          <FadeIn>
            <span className="section-eyebrow">Nos prestations</span>
          </FadeIn>
          <h2 className="section-title max-w-2xl">
            <RevealText text="Un savoir-faire," as="span" className="block" />
            <RevealText
              text="quatre matières."
              as="span"
              className="text-gesture block"
              delay={0.35}
            />
          </h2>
          <FadeIn delay={0.2}>
            <p className="section-lead">
              Taches incrustées, auréoles, mauvaises odeurs&nbsp;: notre matériel
              professionnel d&apos;injection-extraction en vient à bout. Résultat
              garanti, directement à votre domicile.
            </p>
          </FadeIn>
        </div>

        {/* Grille bento asymétrique */}
        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {CATEGORY_CARDS.map((card, index) => (
            <FadeIn
              key={card.category}
              delay={0.1 + (index % 2) * 0.12}
              className={card.span === "wide" ? "lg:col-span-7" : "lg:col-span-5"}
            >
              <TiltCard className="material-card group h-full transition-shadow duration-500 hover:shadow-card-hover">
                <article className="relative flex h-full flex-col p-8 sm:p-10">
                  {/* Numéro gravé en fond — flotte en parallaxe au tilt */}
                  <span
                    data-tilt-parallax="deep"
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-4 right-6 select-none font-serif text-[7rem] font-light italic leading-none text-white/[0.04]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icône ligne fine */}
                  <div
                    data-tilt-parallax
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 text-silver-300 transition-colors duration-500 group-hover:border-vapor-400/40 group-hover:text-vapor-300"
                  >
                    {card.icon}
                  </div>

                  <h3 className="mt-7 font-serif text-2xl font-medium text-porcelain">
                    {CATEGORY_LABELS[card.category]}
                  </h3>

                  <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-silver-400">
                    {card.description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {highlightsFor(card.category).map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-sm text-silver-300"
                      >
                        <span
                          className="mt-[0.55em] h-px w-4 shrink-0 bg-vapor-400/60"
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-baseline justify-between gap-4 pt-8">
                    <p className="text-[11px] font-semibold uppercase tracking-caps text-silver-500">
                      à partir de
                    </p>
                    <p className="font-serif text-3xl font-medium text-porcelain">
                      {minPriceFor(card.category)}
                      <span className="ml-1 text-lg text-silver-400">€</span>
                    </p>
                  </div>
                </article>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

        {/* Bandeau devis — simple filet, ton direct */}
        <FadeIn delay={0.15}>
          <div className="mx-auto mt-20 flex max-w-2xl flex-col items-center gap-6 text-center">
            <div className="hairline-divider" aria-hidden="true" />
            <p className="text-lg font-light leading-relaxed text-silver-300">
              Une demande particulière&nbsp;?{" "}
              <span className="font-serif italic text-porcelain">Devis gratuit</span>{" "}
              et sans engagement.
            </p>
            <a
              href={COMPANY.phoneHref}
              className="btn-ghost"
              aria-label={`Appeler le ${COMPANY.phone}`}
            >
              <Phone strokeWidth={1.25} className="h-4 w-4" aria-hidden="true" />
              {COMPANY.phone}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
