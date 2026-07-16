import { NextRequest, NextResponse } from "next/server";
import { getBookingStore } from "@/lib/store";
import { OPEN_SLOTS, isBookableDate, isValidDateKey } from "@/lib/slots";
import type { AvailabilityResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

/**
 * GET /api/availability?date=YYYY-MM-DD
 * Retourne les créneaux ouverts et ceux déjà réservés pour la date donnée.
 */
export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") ?? "";

  if (!isValidDateKey(date)) {
    return NextResponse.json({ error: "Paramètre 'date' invalide (attendu : YYYY-MM-DD)." }, { status: 400 });
  }

  if (!isBookableDate(date)) {
    const response: AvailabilityResponse = { date, slots: OPEN_SLOTS, booked: OPEN_SLOTS };
    return NextResponse.json(response);
  }

  try {
    const booked = await getBookingStore().getBookedSlots(date);
    const response: AvailabilityResponse = { date, slots: OPEN_SLOTS, booked };
    return NextResponse.json(response);
  } catch (error) {
    console.error("[ProClean] /api/availability :", error);
    return NextResponse.json({ error: "Impossible de récupérer les disponibilités." }, { status: 500 });
  }
}
