import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import FadeIn from "@/components/fx/FadeIn";
import RevealText from "@/components/fx/RevealText";

interface Comparison {
  title: string;
  caption: string;
  detail: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

/**
 * Textures de démonstration (SVG procéduraux).
 * Pour passer aux vraies photos : déposer les fichiers .jpg dans /public/gallery
 * et remplacer les extensions ci-dessous (ex. /gallery/siege-avant.jpg).
 */
const COMPARISONS: Comparison[] = [
  {
    title: "Siège auto",
    caption:
      "Injection-extraction en profondeur : taches, auréoles et odeurs disparaissent du tissu.",
    detail: "Tissu d'origine constructeur — traitement complet en 40 min",
    beforeSrc: "/gallery/siege-avant.svg",
    afterSrc: "/gallery/siege-apres.svg",
    beforeAlt: "Tissu de siège auto taché et encrassé, avant nettoyage",
    afterAlt: "Tissu de siège auto net et ravivé, après nettoyage",
  },
  {
    title: "Canapé tissu",
    caption:
      "Détachage ciblé puis extraction : le lin retrouve sa couleur, coussins et accoudoirs compris.",
    detail: "Lin naturel — auréoles anciennes et tache de café",
    beforeSrc: "/gallery/canape-avant.svg",
    afterSrc: "/gallery/canape-apres.svg",
    beforeAlt: "Lin de canapé marqué d'auréoles et de taches de café, avant nettoyage",
    afterAlt: "Lin de canapé propre et homogène, après nettoyage",
  },
  {
    title: "Tapis laine",
    caption:
      "Brossage et injection-extraction : les couleurs sont ravivées, les fibres assainies.",
    detail: "Laine tissée main — couleurs ternies par les années",
    beforeSrc: "/gallery/tapis-avant.svg",
    afterSrc: "/gallery/tapis-apres.svg",
    beforeAlt: "Tapis en laine aux couleurs ternies et taché, avant nettoyage",
    afterAlt: "Tapis en laine aux couleurs profondes ravivées, après nettoyage",
  },
];

export default function Gallery() {
  return (
    <section id="galerie" className="relative scroll-mt-24 py-28">
      {/* Voile discret en haut de section */}
      <div className="absolute inset-x-0 top-0 h-64 bg-section-veil" aria-hidden="true" />

      <div className="section-container relative">
        <div className="flex flex-col items-start">
          <FadeIn>
            <span className="section-eyebrow">Avant / Après</span>
          </FadeIn>
          <h2 className="section-title max-w-2xl">
            <RevealText text="La preuve," as="span" className="block" />
            <RevealText
              text="par la matière."
              as="span"
              className="text-gesture block"
              delay={0.3}
            />
          </h2>
          <FadeIn delay={0.2}>
            <p className="section-lead">
              Faites glisser la buse le long de la fibre pour révéler la
              transformation.
            </p>
          </FadeIn>
        </div>

        {/* Rangées éditoriales alternées — le slider respire, le texte l'accompagne */}
        <div className="mt-20 space-y-20 lg:space-y-24">
          {COMPARISONS.map((comparison, index) => {
            const reversed = index % 2 === 1;
            return (
              <FadeIn key={comparison.title}>
                <figure className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  <div
                    className={`lg:col-span-7 xl:col-span-8 ${
                      reversed ? "lg:order-2" : ""
                    }`}
                  >
                    <BeforeAfterSlider
                      beforeSrc={comparison.beforeSrc}
                      afterSrc={comparison.afterSrc}
                      beforeAlt={comparison.beforeAlt}
                      afterAlt={comparison.afterAlt}
                    />
                  </div>

                  <figcaption
                    className={`lg:col-span-5 xl:col-span-4 ${
                      reversed ? "lg:order-1 lg:text-right" : ""
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="font-serif text-5xl font-light italic text-white/10"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-serif text-2xl font-medium text-porcelain sm:text-3xl">
                      {comparison.title}
                    </h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-silver-400">
                      {comparison.caption}
                    </p>
                    <p
                      className={`mt-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-caps text-silver-500 ${
                        reversed ? "lg:justify-end" : ""
                      }`}
                    >
                      <span className="h-px w-6 bg-vapor-400/50" aria-hidden="true" />
                      {comparison.detail}
                    </p>
                  </figcaption>
                </figure>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn>
          <p className="mt-16 text-center text-xs font-light text-silver-600">
            Textures d&apos;illustration — résultats réels visibles sur nos réseaux
            sociaux.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
