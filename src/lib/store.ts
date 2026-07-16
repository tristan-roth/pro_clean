import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Booking, BookingRequest, TimeSlot } from "./types";

/**
 * Couche de persistance des réservations.
 *
 * - Si SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont définis, les réservations
 *   sont stockées dans Supabase (table `bookings`, voir supabase/schema.sql).
 *   L'index unique sur (booking_date, booking_time) garantit qu'un créneau ne
 *   peut jamais être réservé deux fois, même en cas de requêtes simultanées.
 * - Sinon, un store en mémoire prend le relais : le site est ainsi
 *   immédiatement fonctionnel en démo, avec quelques créneaux pré-réservés
 *   pour visualiser le grisage dans le calendrier.
 */

interface BookingStore {
  getBookedSlots(date: string): Promise<TimeSlot[]>;
  /** Retourne null si le créneau vient d'être pris par quelqu'un d'autre. */
  createBooking(request: BookingRequest): Promise<Booking | null>;
}

/* ------------------------------- Supabase -------------------------------- */

interface BookingRow {
  id: string;
  service_id: string;
  booking_date: string;
  booking_time: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  notes: string | null;
  status: "confirmed" | "cancelled";
  created_at: string;
}

function rowToBooking(row: BookingRow): Booking {
  return {
    id: row.id,
    serviceId: row.service_id,
    date: row.booking_date,
    time: row.booking_time.slice(0, 5),
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    email: row.email,
    address: row.address,
    notes: row.notes ?? undefined,
    status: row.status,
    createdAt: row.created_at,
  };
}

class SupabaseBookingStore implements BookingStore {
  constructor(private client: SupabaseClient) {}

  async getBookedSlots(date: string): Promise<TimeSlot[]> {
    const { data, error } = await this.client
      .from("bookings")
      .select("booking_time")
      .eq("booking_date", date)
      .eq("status", "confirmed");
    if (error) throw new Error(`Supabase (getBookedSlots): ${error.message}`);
    return (data ?? []).map((r: { booking_time: string }) => r.booking_time.slice(0, 5));
  }

  async createBooking(request: BookingRequest): Promise<Booking | null> {
    const { data, error } = await this.client
      .from("bookings")
      .insert({
        service_id: request.serviceId,
        booking_date: request.date,
        booking_time: request.time,
        first_name: request.firstName,
        last_name: request.lastName,
        phone: request.phone,
        email: request.email,
        address: request.address,
        notes: request.notes ?? null,
        status: "confirmed",
      })
      .select()
      .single();

    if (error) {
      // 23505 = violation d'unicité : le créneau vient d'être réservé.
      if (error.code === "23505") return null;
      throw new Error(`Supabase (createBooking): ${error.message}`);
    }
    return rowToBooking(data as BookingRow);
  }
}

/* ------------------------- Fallback en mémoire ---------------------------- */

interface MemoryState {
  bookings: Booking[];
  seeded: boolean;
}

// globalThis pour survivre au hot-reload du serveur de dev Next.js.
const globalStore = globalThis as unknown as { __procleanStore?: MemoryState };

function memoryState(): MemoryState {
  if (!globalStore.__procleanStore) {
    globalStore.__procleanStore = { bookings: [], seeded: false };
  }
  return globalStore.__procleanStore;
}

/** Pré-réserve quelques créneaux pour que le grisage soit visible en démo. */
function seedDemoBookings(state: MemoryState) {
  if (state.seeded) return;
  state.seeded = true;

  const demo: Array<{ daysAhead: number; time: TimeSlot }> = [
    { daysAhead: 1, time: "09:00" },
    { daysAhead: 1, time: "13:30" },
    { daysAhead: 2, time: "10:30" },
    { daysAhead: 3, time: "15:00" },
    { daysAhead: 3, time: "16:30" },
  ];

  for (const { daysAhead, time } of demo) {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    if (date.getDay() === 0) date.setDate(date.getDate() + 1); // jamais un dimanche
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
    state.bookings.push({
      id: `demo-${key}-${time}`,
      serviceId: "auto-interieur-complet",
      date: key,
      time,
      firstName: "Créneau",
      lastName: "Réservé",
      phone: "",
      email: "",
      address: "",
      status: "confirmed",
      createdAt: new Date().toISOString(),
    });
  }
}

class MemoryBookingStore implements BookingStore {
  async getBookedSlots(date: string): Promise<TimeSlot[]> {
    const state = memoryState();
    seedDemoBookings(state);
    return state.bookings
      .filter((b) => b.date === date && b.status === "confirmed")
      .map((b) => b.time);
  }

  async createBooking(request: BookingRequest): Promise<Booking | null> {
    const state = memoryState();
    seedDemoBookings(state);

    const taken = state.bookings.some(
      (b) => b.date === request.date && b.time === request.time && b.status === "confirmed"
    );
    if (taken) return null;

    const booking: Booking = {
      ...request,
      id: `bk-${request.date}-${request.time}-${state.bookings.length + 1}`,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    state.bookings.push(booking);
    return booking;
  }
}

/* ------------------------------- Sélection -------------------------------- */

let storeInstance: BookingStore | null = null;

export function getBookingStore(): BookingStore {
  if (storeInstance) return storeInstance;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key) {
    storeInstance = new SupabaseBookingStore(
      createClient(url, key, { auth: { persistSession: false } })
    );
  } else {
    console.warn(
      "[ProClean] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY absents — store en mémoire (démo)."
    );
    storeInstance = new MemoryBookingStore();
  }
  return storeInstance;
}
