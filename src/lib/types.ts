/**
 * Types partagés entre le front (module de réservation) et le back (API + store).
 */

export type ServiceCategory = "auto" | "canape" | "tapis" | "textiles";

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  /** Prix affiché, ex. "dès 89 €" */
  price: string;
  /** Durée indicative de l'intervention, ex. "≈ 2 h 30" */
  duration: string;
  highlights: string[];
}

/** Créneau horaire au format "HH:MM" */
export type TimeSlot = string;

export type BookingStatus = "confirmed" | "cancelled";

export interface BookingRequest {
  serviceId: string;
  /** Date au format ISO "YYYY-MM-DD" */
  date: string;
  time: TimeSlot;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  /** Adresse complète du lieu d'intervention */
  address: string;
  /** Précisions optionnelles (état, accès, etc.) */
  notes?: string;
}

export interface Booking extends BookingRequest {
  id: string;
  status: BookingStatus;
  createdAt: string;
}

/** Réponse de GET /api/availability?date=YYYY-MM-DD */
export interface AvailabilityResponse {
  date: string;
  /** Tous les créneaux ouverts ce jour-là */
  slots: TimeSlot[];
  /** Créneaux déjà réservés (à griser côté front) */
  booked: TimeSlot[];
}

export interface BookingResponse {
  ok: boolean;
  booking?: Booking;
  error?: string;
}
