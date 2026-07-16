import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { COMPANY } from "@/lib/services";

/**
 * Fraunces — serif "old style" à empattements marqués, chaleureuse et
 * artisanale : portée par les titres, elle casse le look SaaS générique.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${COMPANY.name} — Nettoyage & detailing intérieur | ${COMPANY.area}`,
  description: `${COMPANY.slogan} Auto, canapé, tapis, textiles : nettoyage en profondeur, élimination des taches et odeurs, résultat professionnel garanti. Intervention à domicile — ${COMPANY.area}.`,
  keywords: [
    "nettoyage auto",
    "detailing intérieur",
    "nettoyage canapé",
    "nettoyage tapis",
    "injection extraction",
    "Vosges",
    "Haute-Marne",
  ],
  openGraph: {
    title: `${COMPANY.name} — Nettoyage & detailing intérieur`,
    description: COMPANY.slogan,
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
