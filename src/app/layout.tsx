import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { COMPANY } from "@/lib/services";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
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
    <html lang="fr" className={`${outfit.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
