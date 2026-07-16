import { COMPANY } from "@/lib/services";
import { formatDateTimeFr } from "@/lib/slots";
import type { Booking } from "@/lib/types";

interface StepConfirmationProps {
  booking: Booking;
  serviceName: string;
}

export default function StepConfirmation({ booking, serviceName }: StepConfirmationProps) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="flex h-20 w-20 animate-pulse-glow items-center justify-center rounded-full border-2 border-neon-400 bg-neon-500/10 text-neon-300">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4.5 12.5l5 5L19.5 7" />
        </svg>
      </div>

      <h3 className="mt-6 font-display text-2xl font-bold text-white sm:text-3xl">
        Rendez-vous <span className="text-neon-gradient">confirmé&nbsp;!</span>
      </h3>

      <dl className="mt-6 w-full max-w-md space-y-4 rounded-2xl border border-white/[0.07] bg-night-900/70 p-6 text-left">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-steel-500">
            Prestation
          </dt>
          <dd className="mt-0.5 font-semibold text-white">{serviceName}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-steel-500">
            Date &amp; heure
          </dt>
          <dd className="mt-0.5 font-semibold text-neon-300">
            {formatDateTimeFr(booking.date, booking.time)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-steel-500">
            Adresse d&apos;intervention
          </dt>
          <dd className="mt-0.5 text-steel-200">{booking.address}</dd>
        </div>
      </dl>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-steel-300">
        Un e-mail de confirmation vient de vous être envoyé à{" "}
        <span className="font-semibold text-neon-300">{booking.email}</span>.
      </p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-steel-400">
        {COMPANY.founder}, fondateur de {COMPANY.name}, a également reçu votre demande et vous
        contactera si besoin avant l&apos;intervention.
      </p>

      <a href="#accueil" className="btn-secondary mt-8">
        Retour à l&apos;accueil
      </a>
    </div>
  );
}
