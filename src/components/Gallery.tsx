import BeforeAfterSlider from "@/components/BeforeAfterSlider";

interface Comparison {
  title: string;
  caption: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

const COMPARISONS: Comparison[] = [
  {
    title: "Siège auto",
    caption:
      "Injection-extraction en profondeur : taches, auréoles et odeurs disparaissent du tissu.",
    beforeSrc: "/gallery/siege-avant.svg",
    afterSrc: "/gallery/siege-apres.svg",
    beforeAlt: "Siège auto en tissu taché, avant nettoyage",
    afterAlt: "Siège auto en tissu impeccable, après nettoyage",
  },
  {
    title: "Canapé tissu",
    caption:
      "Détachage ciblé puis extraction : le canapé retrouve un tissu net, coussins et accoudoirs compris.",
    beforeSrc: "/gallery/canape-avant.svg",
    afterSrc: "/gallery/canape-apres.svg",
    beforeAlt: "Canapé en tissu marqué de taches de café, avant nettoyage",
    afterAlt: "Canapé en tissu éclatant, après nettoyage",
  },
  {
    title: "Tapis",
    caption:
      "Brossage et injection-extraction : les couleurs sont ravivées, les fibres assainies.",
    beforeSrc: "/gallery/tapis-avant.svg",
    afterSrc: "/gallery/tapis-apres.svg",
    beforeAlt: "Tapis aux couleurs ternies et taché, avant nettoyage",
    afterAlt: "Tapis aux couleurs ravivées, après nettoyage",
  },
];

export default function Gallery() {
  return (
    <section
      id="galerie"
      className="relative scroll-mt-24 bg-night-900/50 bg-section-glow py-24"
    >
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Avant / Après</span>
          <h2 className="section-title">
            La preuve par <span className="text-neon-gradient">l&apos;image</span>
          </h2>
          <p className="section-lead mx-auto">
            Faites glisser la barre pour découvrir la transformation.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {COMPARISONS.map((comparison) => (
            <figure key={comparison.title} className="group">
              <div className="rounded-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-neon-sm">
                <BeforeAfterSlider
                  beforeSrc={comparison.beforeSrc}
                  afterSrc={comparison.afterSrc}
                  beforeAlt={comparison.beforeAlt}
                  afterAlt={comparison.afterAlt}
                />
              </div>
              <figcaption className="mt-4 px-1">
                <h3 className="font-display text-lg font-semibold text-white">
                  {comparison.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-steel-400">
                  {comparison.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-steel-500">
          Photos d&apos;illustration — résultats réels visibles sur nos réseaux sociaux.
        </p>
      </div>
    </section>
  );
}
