import BookingWizard from "./BookingWizard";

/**
 * Section "Rendez-vous" — réservation en ligne façon Doctolib, en 3 étapes.
 */
export default function BookingSection() {
  return (
    <section id="rendez-vous" className="relative scroll-mt-24 overflow-hidden py-24">
      <div className="absolute inset-0 bg-grid-faint" aria-hidden="true" />
      <div className="absolute inset-0 bg-section-glow" aria-hidden="true" />

      <div className="section-container relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Réservation en ligne</span>
          <h2 className="section-title">
            Prenez rendez-vous <span className="text-neon-gradient">en 3 étapes</span>
          </h2>
          <p className="section-lead mx-auto">
            Choisissez votre prestation, sélectionnez votre créneau et recevez une confirmation
            immédiate par e-mail. Simple, rapide et sans appel téléphonique.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <BookingWizard />
        </div>
      </div>
    </section>
  );
}
