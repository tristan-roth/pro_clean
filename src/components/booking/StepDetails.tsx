"use client";

import { useState } from "react";
import { ArrowLeft, CalendarDays, LoaderCircle } from "lucide-react";
import type { BookingFormData } from "./BookingWizard";

/** Réexport local pour les consommateurs du formulaire de coordonnées. */
export type FormData = BookingFormData;

interface StepDetailsProps {
  formData: BookingFormData;
  onChange: (patch: Partial<BookingFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
  error: string | null;
  recap: {
    serviceName: string;
    price: string;
    duration: string;
    dateLabel: string;
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/;

type FieldErrors = Partial<Record<keyof BookingFormData, string>>;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-red-400">
      {message}
    </p>
  );
}

export default function StepDetails({
  formData,
  onChange,
  onSubmit,
  onBack,
  submitting,
  error,
  recap,
}: StepDetailsProps) {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validate(): boolean {
    const errors: FieldErrors = {};
    if (!formData.firstName.trim()) errors.firstName = "Le prénom est requis.";
    if (!formData.lastName.trim()) errors.lastName = "Le nom est requis.";

    if (!formData.phone.trim()) {
      errors.phone = "Le numéro de téléphone est requis.";
    } else if (!PHONE_RE.test(formData.phone.trim())) {
      errors.phone = "Numéro de téléphone invalide (ex. 06 12 34 56 78).";
    }

    if (!formData.email.trim()) {
      errors.email = "L'adresse e-mail est requise.";
    } else if (!EMAIL_RE.test(formData.email.trim())) {
      errors.email = "Adresse e-mail invalide.";
    }

    if (formData.address.trim().length < 10) {
      errors.address = "Merci d'indiquer l'adresse complète du lieu d'intervention.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <div>
      {/* --------------------------------------------------------- Récapitulatif */}
      <div className="mb-7 rounded-2xl border border-white/[0.06] bg-obsidian-900/70 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-caps text-silver-500">
          Votre rendez-vous
        </p>
        <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-serif text-lg font-medium text-porcelain">
            {recap.serviceName}
          </span>
          <span className="font-serif text-sm italic text-vapor-300">{recap.price}</span>
          <span className="text-xs text-silver-500">{recap.duration}</span>
        </div>
        <p className="mt-2.5 inline-flex items-center gap-2 text-sm text-silver-300">
          <CalendarDays strokeWidth={1.5} className="h-4 w-4 text-vapor-400" aria-hidden="true" />
          {recap.dateLabel}
        </p>
      </div>

      {/* ------------------------------------------------------------ Formulaire */}
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (validate()) onSubmit();
        }}
        className="space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="booking-first-name" className="form-label">
              Prénom
            </label>
            <input
              id="booking-first-name"
              type="text"
              className="form-input"
              autoComplete="given-name"
              required
              placeholder="Marie"
              value={formData.firstName}
              onChange={(event) => onChange({ firstName: event.target.value })}
              aria-invalid={Boolean(fieldErrors.firstName)}
              aria-describedby={fieldErrors.firstName ? "booking-first-name-error" : undefined}
            />
            <FieldError id="booking-first-name-error" message={fieldErrors.firstName} />
          </div>
          <div>
            <label htmlFor="booking-last-name" className="form-label">
              Nom
            </label>
            <input
              id="booking-last-name"
              type="text"
              className="form-input"
              autoComplete="family-name"
              required
              placeholder="Dupont"
              value={formData.lastName}
              onChange={(event) => onChange({ lastName: event.target.value })}
              aria-invalid={Boolean(fieldErrors.lastName)}
              aria-describedby={fieldErrors.lastName ? "booking-last-name-error" : undefined}
            />
            <FieldError id="booking-last-name-error" message={fieldErrors.lastName} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="booking-phone" className="form-label">
              Téléphone
            </label>
            <input
              id="booking-phone"
              type="tel"
              className="form-input"
              autoComplete="tel"
              required
              placeholder="06 12 34 56 78"
              value={formData.phone}
              onChange={(event) => onChange({ phone: event.target.value })}
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? "booking-phone-error" : undefined}
            />
            <FieldError id="booking-phone-error" message={fieldErrors.phone} />
          </div>
          <div>
            <label htmlFor="booking-email" className="form-label">
              E-mail
            </label>
            <input
              id="booking-email"
              type="email"
              className="form-input"
              autoComplete="email"
              required
              placeholder="marie.dupont@exemple.fr"
              value={formData.email}
              onChange={(event) => onChange({ email: event.target.value })}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "booking-email-error" : undefined}
            />
            <FieldError id="booking-email-error" message={fieldErrors.email} />
          </div>
        </div>

        <div>
          <label htmlFor="booking-address" className="form-label">
            Adresse complète d&apos;intervention
          </label>
          <textarea
            id="booking-address"
            rows={2}
            className="form-input resize-none"
            autoComplete="street-address"
            required
            placeholder="12 rue des Lilas, 88000 Épinal"
            value={formData.address}
            onChange={(event) => onChange({ address: event.target.value })}
            aria-invalid={Boolean(fieldErrors.address)}
            aria-describedby={fieldErrors.address ? "booking-address-error" : undefined}
          />
          <FieldError id="booking-address-error" message={fieldErrors.address} />
        </div>

        <div>
          <label htmlFor="booking-notes" className="form-label">
            Précisions <span className="normal-case text-silver-600">(optionnel)</span>
          </label>
          <textarea
            id="booking-notes"
            rows={3}
            className="form-input resize-none"
            placeholder="État, matière, accès, parking…"
            value={formData.notes}
            onChange={(event) => onChange({ notes: event.target.value })}
          />
        </div>

        <p className="text-xs font-light text-silver-600">
          Vos données ne servent qu&apos;à la gestion de votre rendez-vous.
        </p>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" className="btn-ghost" onClick={onBack} disabled={submitting}>
            <ArrowLeft strokeWidth={1.5} className="h-4 w-4" aria-hidden="true" />
            Retour
          </button>
          <button type="submit" className="btn-metal" disabled={submitting}>
            {submitting ? (
              <>
                <LoaderCircle
                  strokeWidth={1.75}
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
                Envoi en cours…
              </>
            ) : (
              "Confirmer le rendez-vous"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
