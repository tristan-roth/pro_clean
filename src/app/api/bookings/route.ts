import { NextRequest, NextResponse } from "next/server";
import { getBookingStore } from "@/lib/store";
import { getServiceById } from "@/lib/services";
import { isBookableDate, isValidSlot } from "@/lib/slots";
import { sendClientConfirmation, sendFounderNotification } from "@/lib/email";
import type { BookingRequest, BookingResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/;

function validate(body: Partial<BookingRequest>): string | null {
  if (!body.serviceId || !getServiceById(body.serviceId)) return "Prestation inconnue.";
  if (!body.date || !isBookableDate(body.date)) return "Date non réservable.";
  if (!body.time || !isValidSlot(body.time)) return "Créneau horaire invalide.";
  if (!body.firstName?.trim()) return "Le prénom est requis.";
  if (!body.lastName?.trim()) return "Le nom est requis.";
  if (!body.phone || !PHONE_RE.test(body.phone.trim())) return "Numéro de téléphone invalide.";
  if (!body.email || !EMAIL_RE.test(body.email.trim())) return "Adresse e-mail invalide.";
  if (!body.address || body.address.trim().length < 10)
    return "Merci d'indiquer l'adresse complète du lieu d'intervention.";
  return null;
}

/**
 * POST /api/bookings
 * Valide la demande, bloque le créneau (refus si déjà pris), puis envoie les
 * e-mails de confirmation au client et au fondateur.
 */
export async function POST(request: NextRequest) {
  let body: Partial<BookingRequest>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<BookingResponse>({ ok: false, error: "Corps JSON invalide." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json<BookingResponse>({ ok: false, error: validationError }, { status: 400 });
  }

  const sanitized: BookingRequest = {
    serviceId: body.serviceId!,
    date: body.date!,
    time: body.time!,
    firstName: body.firstName!.trim(),
    lastName: body.lastName!.trim(),
    phone: body.phone!.trim(),
    email: body.email!.trim().toLowerCase(),
    address: body.address!.trim(),
    notes: body.notes?.trim() || undefined,
  };

  try {
    const booking = await getBookingStore().createBooking(sanitized);

    if (!booking) {
      return NextResponse.json<BookingResponse>(
        { ok: false, error: "Ce créneau vient d'être réservé. Merci d'en choisir un autre." },
        { status: 409 }
      );
    }

    // Les e-mails ne doivent pas faire échouer une réservation déjà enregistrée.
    const emailResults = await Promise.allSettled([
      sendClientConfirmation(booking),
      sendFounderNotification(booking),
    ]);
    for (const result of emailResults) {
      if (result.status === "rejected") {
        console.error("[ProClean] Envoi e-mail échoué :", result.reason);
      }
    }

    return NextResponse.json<BookingResponse>({ ok: true, booking }, { status: 201 });
  } catch (error) {
    console.error("[ProClean] /api/bookings :", error);
    return NextResponse.json<BookingResponse>(
      { ok: false, error: "Une erreur est survenue. Merci de réessayer ou de nous appeler." },
      { status: 500 }
    );
  }
}
