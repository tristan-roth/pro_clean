"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MAX_BOOKING_DAYS_AHEAD, isBookableDate, toDateKey } from "@/lib/slots";
import type { AvailabilityResponse } from "@/lib/types";

interface StepScheduleProps {
  serviceId: string;
  date: string | null;
  time: string | null;
  onPick: (date: string, time: string) => void;
  refreshKey?: number;
}

/** En-têtes de colonnes, semaine commençant le lundi. */
const WEEKDAY_HEADERS = ["L", "M", "M", "J", "V", "S", "D"];

const MONTH_FORMATTER = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });
const DAY_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function StepSchedule({
  serviceId,
  date,
  time,
  onPick,
  refreshKey = 0,
}: StepScheduleProps) {
  const [viewDate, setViewDate] = useState<Date>(() =>
    date ? new Date(`${date}T00:00:00`) : new Date()
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(date);
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  /** Dernière date demandée — permet d'ignorer les réponses obsolètes. */
  const lastRequestedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!selectedDate) return;
    const requested = selectedDate;
    lastRequestedRef.current = requested;
    setLoading(true);
    setFetchError(false);

    fetch(`/api/availability?date=${requested}&serviceId=${encodeURIComponent(serviceId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("availability");
        return res.json() as Promise<AvailabilityResponse>;
      })
      .then((data) => {
        if (lastRequestedRef.current !== requested) return; // réponse obsolète
        setAvailability(data);
        setLoading(false);
      })
      .catch(() => {
        if (lastRequestedRef.current !== requested) return;
        setAvailability(null);
        setFetchError(true);
        setLoading(false);
      });
  }, [selectedDate, refreshKey, serviceId]);

  /* ------------------------------------------------------ Bornes du calendrier */
  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const viewMonthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const nextMonthStart = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
  const maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + MAX_BOOKING_DAYS_AHEAD);

  const canGoPrev = viewMonthStart.getTime() > currentMonthStart.getTime();
  const canGoNext = nextMonthStart.getTime() <= maxDate.getTime();

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const leadingBlanks = (viewMonthStart.getDay() + 6) % 7; // 0 = lundi

  const monthLabel = MONTH_FORMATTER.format(viewMonthStart);

  const readyAvailability =
    !loading && !fetchError && availability !== null && availability.date === selectedDate
      ? availability
      : null;
  const allBooked =
    readyAvailability !== null &&
    readyAvailability.slots.every((slot) => readyAvailability.booked.includes(slot));

  return (
    <div>
      <p className="mb-5 text-sm font-light text-silver-400">
        Choisissez la date puis l&apos;heure de l&apos;intervention.
      </p>

      {/* ------------------------------------------------------------ Calendrier */}
      <div className="rounded-2xl border border-white/[0.06] bg-obsidian-900/60 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
            }
            disabled={!canGoPrev}
            aria-label="Mois précédent"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-silver-300 transition-all duration-300 hover:border-white/25 hover:text-porcelain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft strokeWidth={1.5} className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="font-serif text-base capitalize italic text-porcelain" aria-live="polite">
            {monthLabel}
          </p>
          <button
            type="button"
            onClick={() =>
              setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
            }
            disabled={!canGoNext}
            aria-label="Mois suivant"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-silver-300 transition-all duration-300 hover:border-white/25 hover:text-porcelain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight strokeWidth={1.5} className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAY_HEADERS.map((label, index) => (
            <span
              key={`${label}-${index}`}
              className="py-1 text-[10px] font-semibold uppercase tracking-caps text-silver-600"
              aria-hidden="true"
            >
              {label}
            </span>
          ))}

          {Array.from({ length: leadingBlanks }).map((_, index) => (
            <span key={`blank-${index}`} aria-hidden="true" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const dayNumber = index + 1;
            const dayDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), dayNumber);
            const key = toDateKey(dayDate);
            const bookable = isBookableDate(key);
            const isSelected = key === selectedDate;

            return (
              <button
                key={key}
                type="button"
                disabled={!bookable}
                onClick={() => setSelectedDate(key)}
                aria-label={`Choisir le ${DAY_FORMATTER.format(dayDate)}`}
                aria-pressed={isSelected}
                className={`flex h-10 w-full items-center justify-center rounded-lg text-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-vapor-400 ${
                  isSelected
                    ? "bg-porcelain font-semibold text-obsidian-950"
                    : bookable
                      ? "text-silver-300 hover:bg-white/[0.06] hover:text-porcelain"
                      : "cursor-not-allowed text-silver-600/40"
                }`}
              >
                {dayNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* -------------------------------------------------------------- Créneaux */}
      <div className="mt-5" aria-live="polite">
        {!selectedDate && (
          <p className="text-sm font-light text-silver-500">
            Sélectionnez une date pour afficher les créneaux disponibles.
          </p>
        )}

        {selectedDate && loading && (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-11 animate-pulse rounded-xl bg-obsidian-700/60" />
            ))}
          </div>
        )}

        {selectedDate && !loading && fetchError && (
          <p role="alert" className="text-sm text-red-400">
            Impossible de charger les disponibilités. Choisissez à nouveau la date pour réessayer.
          </p>
        )}

        {readyAvailability && allBooked && (
          <p className="text-sm text-amber-200">
            Journée complète — choisissez une autre date.
          </p>
        )}

        {readyAvailability && !allBooked && (
          <>
            <div className="grid grid-cols-3 gap-2">
              {readyAvailability.slots.map((slot) => {
                const isBooked = readyAvailability.booked.includes(slot);
                const isSelected = selectedDate === date && slot === time;

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isBooked}
                    title={isBooked ? "Créneau déjà réservé" : undefined}
                    onClick={() => onPick(readyAvailability.date, slot)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400 ${
                      isSelected
                        ? "border-transparent bg-porcelain font-semibold text-obsidian-950"
                        : isBooked
                          ? "cursor-not-allowed border-white/10 text-silver-600 line-through opacity-40"
                          : "border-white/15 text-silver-300 hover:border-vapor-400/50 hover:text-porcelain"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            {/* Légende */}
            <div className="mt-4 flex items-center gap-5 text-xs text-silver-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-vapor-400" aria-hidden="true" />
                Disponible
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-silver-600/50" aria-hidden="true" />
                <span className="line-through">Réservé</span>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
