"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, TriangleAlert } from "lucide-react";
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

/** Glissement horizontal entre étapes — la direction suit la navigation. */
const slideVariants = {
  enter: (direction: number) => ({ x: direction * 72, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction * -72, opacity: 0 }),
};

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
  /** Sens de la dernière navigation : 1 = avancer, -1 = revenir. */
  const directionRef = useRef(1);

  const service = serviceId ? getServiceById(serviceId) : undefined;

  const canContinue =
    (step === 1 && serviceId !== null) || (step === 2 && date !== null && time !== null);

  function goToStep(target: WizardStep) {
    directionRef.current = target > step ? 1 : -1;
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
        directionRef.current = 1;
        setBooking(data.booking);
        setStep(4);
      } else if (res.status === 409) {
        // Créneau pris entre-temps : retour à l'étape 2 + rafraîchissement des dispos.
        directionRef.current = -1;
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
    <div className="material-card p-5 sm:p-9">
      {/* ------------------------------------------------ Barre de progression */}
      <ol className="flex items-start" aria-label="Progression de la réservation">
        {STEPS.map((s, index) => {
          const isDone = step > s.id;
          const isCurrent = step === s.id;
          return (
            <li key={s.id} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <span
                  className={`h-px flex-1 transition-colors duration-500 ${
                    index === 0
                      ? "bg-transparent"
                      : step > STEPS[index - 1].id
                        ? "bg-vapor-400/60"
                        : "bg-white/10"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-base italic transition-all duration-500 ${
                    isDone
                      ? "border border-vapor-400/50 bg-vapor-500/15 text-vapor-300"
                      : isCurrent
                        ? "border border-porcelain bg-porcelain text-obsidian-950"
                        : "border border-white/15 text-silver-500"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isDone ? (
                    <Check strokeWidth={1.75} className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    s.id
                  )}
                </span>
                <span
                  className={`h-px flex-1 transition-colors duration-500 ${
                    index === STEPS.length - 1
                      ? "bg-transparent"
                      : step > s.id
                        ? "bg-vapor-400/60"
                        : "bg-white/10"
                  }`}
                  aria-hidden="true"
                />
              </div>
              <span
                className={`mt-3 text-[10px] font-semibold uppercase tracking-caps ${
                  isCurrent
                    ? "text-porcelain"
                    : isDone
                      ? "hidden text-silver-400 sm:block"
                      : "hidden text-silver-600 sm:block"
                }`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="hairline-divider my-7" aria-hidden="true" />

      {/* --------------------------------------------- Récapitulatif contextuel */}
      {step >= 2 && step <= 3 && service && (
        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-white/[0.06] bg-obsidian-900/70 px-4 py-3 text-sm">
          <span className="font-medium text-porcelain">{service.name}</span>
          <button
            type="button"
            onClick={() => goToStep(1)}
            aria-label="Modifier la prestation"
            className="text-xs font-medium text-vapor-400 underline decoration-dotted underline-offset-2 transition-colors duration-200 hover:text-vapor-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400"
          >
            modifier
          </button>
          {step === 3 && date && time && (
            <>
              <span className="text-silver-600" aria-hidden="true">
                •
              </span>
              <span className="text-silver-300">{formatDateTimeFr(date, time)}</span>
              <button
                type="button"
                onClick={() => goToStep(2)}
                aria-label="Modifier la date et l'heure"
                className="text-xs font-medium text-vapor-400 underline decoration-dotted underline-offset-2 transition-colors duration-200 hover:text-vapor-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400"
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
          className="mb-5 flex items-start gap-2.5 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200"
        >
          <TriangleAlert strokeWidth={1.5} className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          Ce créneau vient d&apos;être réservé, choisissez-en un autre.
        </div>
      )}

      {/* ---------------------------- Contenu d'étape — glissement horizontal */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={directionRef.current} initial={false}>
          <motion.div
            key={step}
            custom={directionRef.current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --------------------------------------- Navigation (étapes 1 et 2 uniquement) */}
      {step <= 2 && (
        <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step === 2 ? (
            <button type="button" className="btn-ghost" onClick={() => goToStep(1)}>
              <ArrowLeft strokeWidth={1.5} className="h-4 w-4" aria-hidden="true" />
              Retour
            </button>
          ) : (
            <span aria-hidden="true" />
          )}
          <button
            type="button"
            className="btn-metal"
            disabled={!canContinue}
            onClick={() => goToStep((step + 1) as WizardStep)}
          >
            Continuer
            <ArrowRight strokeWidth={1.5} className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
