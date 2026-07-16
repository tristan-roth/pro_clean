import { Check } from "lucide-react";
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
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-vapor-400/50 bg-vapor-500/10 text-vapor-300">
        <Check strokeWidth={1.25} className="h-9 w-9" aria-hidden="true" />
      </div>

      <h3 className="mt-7 font-serif text-2xl font-medium text-porcelain sm:text-3xl">
        Rendez-vous <span className="text-gesture">confirmé.</span>
      </h3>

      <dl className="mt-7 w-full max-w-md space-y-4 rounded-2xl border border-white/[0.06] bg-obsidian-900/70 p-6 text-left">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-caps text-silver-500">
            Prestation
          </dt>
          <dd className="mt-1 font-serif text-lg font-medium text-porcelain">{serviceName}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-caps text-silver-500">
            Date &amp; heure
          </dt>
          <dd className="mt-1 font-medium text-vapor-300">
            {formatDateTimeFr(booking.date, booking.time)}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-caps text-silver-500">
            Adresse d&apos;intervention
          </dt>
          <dd className="mt-1 text-silver-300">{booking.address}</dd>
        </div>
      </dl>

      <p className="mt-7 max-w-md text-sm font-light leading-relaxed text-silver-400">
        Un e-mail de confirmation vient de vous être envoyé à{" "}
        <span className="font-medium text-porcelain">{booking.email}</span>.
      </p>
      <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-silver-500">
        {COMPANY.founder}, fondateur de {COMPANY.name}, a également reçu votre demande et vous
        contactera si besoin avant l&apos;intervention.
      </p>

      <a href="#accueil" className="btn-ghost mt-9">
        Retour à l&apos;accueil
      </a>
    </div>
  );
}
