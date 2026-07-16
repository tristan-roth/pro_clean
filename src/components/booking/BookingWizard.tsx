"use client";

import { useState } from "react";
import { getServiceById } from "@/lib/services";
import { formatDateTimeFr } from "@/lib/slots";
import type { Booking, BookingRequest, BookingResponse } from "@/lib/types";
import StepService from "./StepService";
import StepSchedule from "./StepSchedule";
import StepDetails from "./StepDetails";
import StepConfirmation from "./StepConfirmation";

/** Données du formulaire de coordonnées, partagées avec StepDetails. */
export interface BookingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

const EMPTY_FORM: BookingFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
};

type WizardStep = 1 | 2 | 3 | 4;

const STEPS: { id: 1 | 2 | 3; label: string }[] = [
  { id: 1, label: "Prestation" },
  { id: 2, label: "Date & heure" },
  { id: 3, label: "Coordonnées" },
];

export default function BookingWizard() {
  const [step, setStep] = useState<WizardStep>(1);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [formData, setFormData] = useState<BookingFormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [slotConflict, setSlotConflict] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [booking, setBooking] = useState<Booking | null>(null);

  const service = serviceId ? getServiceById(serviceId) : undefined;

  const canContinue =
    (step === 1 && serviceId !== null) || (step === 2 && date !== null && time !== null);

  function goToStep(target: WizardStep) {
    setSubmitError(null);
    if (target !== 2) setSlotConflict(false);
    setStep(target);
  }

  async function handleSubmit() {
    if (!serviceId || !date || !time || submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    const payload: BookingRequest = {
      serviceId,
      date,
      time,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      notes: formData.notes.trim() || undefined,
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as BookingResponse;

      if (res.ok && data.ok && data.booking) {
        setBooking(data.booking);
        setStep(4);
      } else if (res.status === 409) {
        // Créneau pris entre-temps : retour à l'étape 2 + rafraîchissement des dispos.
        setTime(null);
        setSlotConflict(true);
        setRefreshKey((k) => k + 1);
        setStep(2);
      } else {
        setSubmitError(data.error ?? "Une erreur est survenue. Merci de réessayer.");
      }
    } catch {
      setSubmitError("Connexion impossible. Vérifiez votre réseau puis réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="glass-card p-5 sm:p-8">
      {/* ------------------------------------------------ Barre de progression */}
      <ol className="flex items-start" aria-label="Progression de la réservation">
        {STEPS.map((s, index) => {
          const isDone = step > s.id;
          const isCurrent = step === s.id;
          return (
            <li key={s.id} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <span
                  className={`h-px flex-1 transition-colors duration-300 ${
                    index === 0
                      ? "bg-transparent"
                      : step > STEPS[index - 1].id
                        ? "bg-neon-500/60"
                        : "bg-white/10"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                    isDone
                      ? "bg-cta-gradient text-night-950"
                      : isCurrent
                        ? "border-2 border-neon-400 bg-night-900 text-neon-300 shadow-neon-sm"
                        : "border border-white/15 text-steel-500"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isDone ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.id
                  )}
                </span>
                <span
                  className={`h-px flex-1 transition-colors duration-300 ${
                    index === STEPS.length - 1
                      ? "bg-transparent"
                      : step > s.id
                        ? "bg-neon-500/60"
                        : "bg-white/10"
                  }`}
                  aria-hidden="true"
                />
              </div>
              <span
                className={`mt-2 text-[11px] font-semibold uppercase tracking-wider ${
                  isCurrent
                    ? "text-neon-300"
                    : isDone
                      ? "hidden text-steel-300 sm:block"
                      : "hidden text-steel-500 sm:block"
                }`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="neon-divider my-6" aria-hidden="true" />

      {/* --------------------------------------------- Récapitulatif contextuel */}
      {step >= 2 && step <= 3 && service && (
        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-white/[0.07] bg-night-900/70 px-4 py-2.5 text-sm backdrop-blur-sm">
          <span className="font-semibold text-steel-100">{service.name}</span>
          <button
            type="button"
            onClick={() => goToStep(1)}
            aria-label="Modifier la prestation"
            className="text-xs font-medium text-neon-400/80 underline decoration-dotted underline-offset-2 transition-colors duration-200 hover:text-neon-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
          >
            modifier
          </button>
          {step === 3 && date && time && (
            <>
              <span className="text-steel-500" aria-hidden="true">
                •
              </span>
              <span className="text-steel-300">{formatDateTimeFr(date, time)}</span>
              <button
                type="button"
                onClick={() => goToStep(2)}
                aria-label="Modifier la date et l'heure"
                className="text-xs font-medium text-neon-400/80 underline decoration-dotted underline-offset-2 transition-colors duration-200 hover:text-neon-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
              >
                modifier
              </button>
            </>
          )}
        </div>
      )}

      {/* ------------------------------------------- Alerte créneau pris (409) */}
      {step === 2 && slotConflict && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2.5 rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-300"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          >
            <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
          Ce créneau vient d&apos;être réservé, choisissez-en un autre.
        </div>
      )}

      {/* ------------------------------------------------------ Contenu d'étape */}
      <div key={step} className="animate-fade-up">
        {step === 1 && (
          <StepService selectedId={serviceId} onSelect={(id) => setServiceId(id)} />
        )}

        {step === 2 && serviceId && (
          <StepSchedule
            serviceId={serviceId}
            date={date}
            time={time}
            refreshKey={refreshKey}
            onPick={(pickedDate, pickedTime) => {
              setDate(pickedDate);
              setTime(pickedTime);
              setSlotConflict(false);
            }}
          />
        )}

        {step === 3 && service && date && time && (
          <StepDetails
            formData={formData}
            onChange={(patch) => setFormData((prev) => ({ ...prev, ...patch }))}
            onSubmit={handleSubmit}
            onBack={() => goToStep(2)}
            submitting={submitting}
            error={submitError}
            recap={{
              serviceName: service.name,
              price: service.price,
              duration: service.duration,
              dateLabel: formatDateTimeFr(date, time),
            }}
          />
        )}

        {step === 4 && booking && service && (
          <StepConfirmation booking={booking} serviceName={service.name} />
        )}
      </div>

      {/* --------------------------------------- Navigation (étapes 1 et 2 uniquement) */}
      {step <= 2 && (
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step === 2 ? (
            <button type="button" className="btn-secondary" onClick={() => goToStep(1)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5m7-7l-7 7 7 7" />
              </svg>
              Retour
            </button>
          ) : (
            <span aria-hidden="true" />
          )}
          <button
            type="button"
            className="btn-primary"
            disabled={!canContinue}
            onClick={() => goToStep((step + 1) as WizardStep)}
          >
            Continuer
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
