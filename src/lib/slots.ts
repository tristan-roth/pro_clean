import type { TimeSlot } from "./types";

/**
 * Règles d'ouverture des créneaux de réservation.
 * - Interventions du lundi au samedi (fermé le dimanche).
 * - Créneaux de départ fixes ; la durée réelle dépend de la prestation.
 * - Réservation possible de demain à +60 jours.
 */
export const OPEN_SLOTS: TimeSlot[] = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];

export const CLOSED_WEEKDAYS = [0]; // 0 = dimanche

export const MAX_BOOKING_DAYS_AHEAD = 60;

/** Formate une date en clé ISO locale "YYYY-MM-DD" (sans décalage UTC). */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isValidDateKey(key: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return false;
  const parsed = new Date(`${key}T00:00:00`);
  return !Number.isNaN(parsed.getTime()) && toDateKey(parsed) === key;
}

/** Une date est réservable si elle est ouvrée, strictement future et sous l'horizon max. */
export function isBookableDate(key: string, now: Date = new Date()): boolean {
  if (!isValidDateKey(key)) return false;
  const date = new Date(`${key}T00:00:00`);
  if (CLOSED_WEEKDAYS.includes(date.getDay())) return false;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const max = new Date(today);
  max.setDate(max.getDate() + MAX_BOOKING_DAYS_AHEAD);

  return date.getTime() > today.getTime() && date.getTime() <= max.getTime();
}

export function isValidSlot(time: string): time is TimeSlot {
  return OPEN_SLOTS.includes(time);
}

/** "2026-08-04" + "10:30" → "lundi 4 août 2026 à 10h30" */
export function formatDateTimeFr(dateKey: string, time: TimeSlot): string {
  const date = new Date(`${dateKey}T00:00:00`);
  const formatted = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return `${formatted} à ${time.replace(":", "h")}`;
}
