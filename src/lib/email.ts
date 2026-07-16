import { Resend } from "resend";
import type { Booking } from "./types";
import { COMPANY, getServiceById } from "./services";
import { formatDateTimeFr } from "./slots";

/**
 * Envoi des e-mails de confirmation via Resend.
 * Sans RESEND_API_KEY, les envois sont simulés (logués en console) : la
 * réservation fonctionne quand même, prête à être branchée en production.
 *
 * Alternative Nodemailer : remplacer sendEmail() par un transporteur SMTP —
 * le reste (templates, appels) est inchangé.
 */

const FROM_ADDRESS = process.env.EMAIL_FROM ?? "ProClean Auto & Textil <onboarding@resend.dev>";
const FOUNDER_EMAIL = process.env.FOUNDER_EMAIL ?? COMPANY.email;

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(`[ProClean][email simulé] → ${to} — "${subject}"`);
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({ from: FROM_ADDRESS, to, subject, html });
  if (error) throw new Error(`Resend: ${error.message}`);
}

/* ------------------------------ Templates --------------------------------- */

/** Enveloppe HTML commune — dark premium, accents bleu néon, compatible clients mail. */
function emailShell(title: string, bodyRows: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#04060a;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#04060a;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#0d141f;border:1px solid rgba(56,189,248,0.18);border-radius:16px;overflow:hidden;">
        <tr>
          <td style="padding:28px 32px;background:linear-gradient(135deg,#070b12,#0d141f);border-bottom:2px solid #0ea5e9;">
            <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:0.5px;">Pro<span style="color:#38bdf8;">Clean</span> Auto &amp; Textil</span>
            <div style="margin-top:6px;font-size:12px;color:#7e8ea6;letter-spacing:2px;text-transform:uppercase;">Nettoyage &amp; detailing intérieur — ${COMPANY.area}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 20px;font-size:22px;color:#ffffff;">${title}</h1>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#070b12;border:1px solid rgba(255,255,255,0.08);border-radius:12px;">
              ${bodyRows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 28px;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:12px;color:#5c6b82;line-height:1.7;">
              ${COMPANY.name} — ${COMPANY.founder}<br>
              📞 <a href="${COMPANY.phoneHref}" style="color:#38bdf8;text-decoration:none;">${COMPANY.phone}</a>
              &nbsp;·&nbsp; ✉️ <a href="mailto:${COMPANY.email}" style="color:#38bdf8;text-decoration:none;">${COMPANY.email}</a><br>
              Interventions à domicile — ${COMPANY.area}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function recapRow(label: string, value: string, highlight = false): string {
  return `<tr>
    <td style="padding:12px 18px;border-bottom:1px solid rgba(255,255,255,0.05);font-size:12px;color:#7e8ea6;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;">${label}</td>
    <td style="padding:12px 18px;border-bottom:1px solid rgba(255,255,255,0.05);font-size:14px;font-weight:${highlight ? "700" : "500"};color:${highlight ? "#38bdf8" : "#eef4fb"};">${value}</td>
  </tr>`;
}

function bookingRecapRows(booking: Booking): string {
  const service = getServiceById(booking.serviceId);
  return [
    recapRow("Prestation", service ? `${service.name} (${service.price})` : booking.serviceId, true),
    recapRow("Date & heure", formatDateTimeFr(booking.date, booking.time), true),
    recapRow("Durée estimée", service?.duration ?? "—"),
    recapRow("Client", `${booking.firstName} ${booking.lastName}`),
    recapRow("Téléphone", booking.phone),
    recapRow("E-mail", booking.email),
    recapRow("Adresse d'intervention", booking.address),
    booking.notes ? recapRow("Précisions", booking.notes) : "",
  ].join("");
}

/* ------------------------------- Envois ------------------------------------ */

export async function sendClientConfirmation(booking: Booking): Promise<void> {
  const html = emailShell(
    `✅ Votre rendez-vous est confirmé, ${booking.firstName} !`,
    bookingRecapRows(booking) +
      `<tr><td colspan="2" style="padding:16px 18px;font-size:13px;color:#a9b8cc;line-height:1.7;">
        Nous nous déplaçons chez vous — merci de prévoir un accès à une prise électrique et un point d'eau.
        Besoin de modifier ou d'annuler ? Appelez-nous au <a href="${COMPANY.phoneHref}" style="color:#38bdf8;text-decoration:none;font-weight:600;">${COMPANY.phone}</a>.
      </td></tr>`
  );
  await sendEmail(
    booking.email,
    `Rendez-vous confirmé — ${formatDateTimeFr(booking.date, booking.time)}`,
    html
  );
}

export async function sendFounderNotification(booking: Booking): Promise<void> {
  const html = emailShell(
    `🗓️ Nouvelle réservation — ${booking.firstName} ${booking.lastName}`,
    bookingRecapRows(booking)
  );
  await sendEmail(
    FOUNDER_EMAIL,
    `Nouvelle réservation : ${formatDateTimeFr(booking.date, booking.time)}`,
    html
  );
}
