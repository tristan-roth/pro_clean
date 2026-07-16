import { COMPANY } from "@/lib/services";
import RevealText from "@/components/fx/RevealText";
import FadeIn from "@/components/fx/FadeIn";

/** Supports traités — simple ligne typographique, sans pastilles. */
const SUPPORTS = ["Auto", "Canapé", "Tapis", "Matelas", "Textiles"];

/** Les trois engagements, présentés sur un filet discret. */
const PROMISES = [
  "Nettoyage en profondeur",
  "Taches & odeurs éliminées",
  "Résultat professionnel garanti",
];

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32 sm:pt-36"
    >
      {/* Voile lumineux vertical — halo de lampe au-dessus de la scène */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh] bg-section-veil"
        aria-hidden="true"
      />

      <div className="section-container relative z-10 flex flex-col items-center text-center">
        {/* Sur-titre */}
        <FadeIn delay={0.1}>
          <p className="inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-caps text-silver-400">
            <span className="h-px w-10 bg-white/20" aria-hidden="true" />
            Detailing &amp; soin des textiles — {COMPANY.area}
            <span className="h-px w-10 bg-white/20" aria-hidden="true" />
          </p>
        </FadeIn>

        {/* Titre principal — mélange sans-serif / serif / italique */}
        <h1 className="mt-8">
          <RevealText
            text="Une seconde vie,"
            as="span"
            className="block font-serif text-5xl font-medium leading-[1.06] tracking-tight text-porcelain sm:text-7xl lg:text-[5.25rem]"
            delay={0.25}
          />
          <RevealText
            text="fibre après fibre."
            as="span"
            className="block font-serif text-5xl font-medium italic leading-[1.15] tracking-tight text-vapor-300 sm:text-7xl lg:text-[5.25rem]"
            delay={0.75}
          />
        </h1>

        {/* Sous-titre */}
        <FadeIn delay={1.2}>
          <p className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-silver-400 sm:text-lg">
            Nettoyage en profondeur par injection-extraction, directement à
            votre domicile. L&apos;habitacle de votre véhicule et vos textiles,
            traités avec la précision d&apos;un geste d&apos;atelier.
          </p>
        </FadeIn>

        {/* Supports traités — ligne typographique ponctuée */}
        <FadeIn delay={1.35}>
          <p className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] font-semibold uppercase tracking-caps text-silver-500">
            {SUPPORTS.map((support, index) => (
              <span key={support} className="inline-flex items-center gap-4">
                {index > 0 && (
                  <span
                    className="h-[3px] w-[3px] rounded-full bg-vapor-400/70"
                    aria-hidden="true"
                  />
                )}
                {support}
              </span>
            ))}
          </p>
        </FadeIn>

        {/* Appels à l'action */}
        <FadeIn delay={1.5} className="w-full sm:w-auto">
          <div className="mt-11 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <a href="#rendez-vous" className="btn-metal w-full sm:w-auto">
              Prendre rendez-vous
            </a>
            <a href="#galerie" className="btn-ghost w-full sm:w-auto">
              Voir les résultats
            </a>
          </div>
        </FadeIn>

        {/* Engagements — simple filet, sans cartes */}
        <FadeIn delay={1.7} className="w-full">
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="hairline-divider" aria-hidden="true" />
            <ul className="flex flex-col items-center justify-between gap-3 py-5 text-[12px] font-medium uppercase tracking-caps text-silver-400 sm:flex-row">
              {PROMISES.map((promise) => (
                <li key={promise} className="flex items-center gap-2.5">
                  <span
                    className="h-1 w-1 rounded-full bg-vapor-400"
                    aria-hidden="true"
                  />
                  {promise}
                </li>
              ))}
            </ul>
            <div className="hairline-divider" aria-hidden="true" />
          </div>
        </FadeIn>
      </div>

      {/* Indicateur de scroll — fil vertical minimal */}
      <a
        href="#services"
        aria-label="Faire défiler vers la section services"
        className="group absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-caps text-silver-600 transition-colors duration-300 group-hover:text-silver-400">
          Découvrir
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-4 animate-thread-down bg-vapor-300/80" />
        </span>
      </a>
    </section>
  );
}
