import BookingWizard from "./BookingWizard";
import FadeIn from "@/components/fx/FadeIn";
import RevealText from "@/components/fx/RevealText";

/**
 * Section "Rendez-vous" — réservation en ligne en 3 étapes,
 * transitions horizontales fluides entre chaque écran.
 */
export default function BookingSection() {
  return (
    <section id="rendez-vous" className="relative scroll-mt-24 overflow-hidden py-28">
      <div className="absolute inset-x-0 top-0 h-64 bg-section-veil" aria-hidden="true" />

      <div className="section-container relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <FadeIn>
            <span className="section-eyebrow">Réservation en ligne</span>
          </FadeIn>
          <h2 className="section-title">
            <RevealText text="Votre rendez-vous," as="span" className="block" />
            <RevealText
              text="en trois gestes."
              as="span"
              className="text-gesture block"
              delay={0.3}
            />
          </h2>
          <FadeIn delay={0.2}>
            <p className="section-lead mx-auto text-center">
              Choisissez votre prestation, sélectionnez votre créneau et recevez
              une confirmation immédiate par e-mail. Simple, rapide, sans appel
              téléphonique.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.25}>
          <div className="mx-auto mt-16 max-w-3xl">
            <BookingWizard />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
