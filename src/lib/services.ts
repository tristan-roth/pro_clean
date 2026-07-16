import type { Service, ServiceCategory } from "./types";

/**
 * Catalogue des prestations ProClean Auto & Textil.
 * Source unique de vérité pour la section Services ET le module de réservation.
 */
export const SERVICES: Service[] = [
  {
    id: "auto-interieur-complet",
    category: "auto",
    name: "Pack Auto Intérieur Complet",
    description:
      "Nettoyage en profondeur de l'habitacle : sièges, moquettes, plastiques, vitres. Extraction injection sur tous les textiles.",
    price: "dès 89 €",
    duration: "≈ 2 h 30",
    highlights: ["Sièges & moquettes injection-extraction", "Plastiques nourris", "Neutralisation des odeurs"],
  },
  {
    id: "auto-express",
    category: "auto",
    name: "Pack Auto Express",
    description:
      "Remise au propre rapide de l'habitacle : aspiration complète, dépoussiérage, vitres intérieures.",
    price: "dès 49 €",
    duration: "≈ 1 h 15",
    highlights: ["Aspiration intégrale", "Dépoussiérage complet", "Vitres intérieures"],
  },
  {
    id: "canape-2-3-places",
    category: "canape",
    name: "Canapé 2-3 places",
    description:
      "Nettoyage par injection-extraction de votre canapé tissu : taches, auréoles et odeurs éliminées en profondeur.",
    price: "dès 79 €",
    duration: "≈ 1 h 30",
    highlights: ["Détachage ciblé", "Injection-extraction", "Séchage rapide"],
  },
  {
    id: "canape-angle",
    category: "canape",
    name: "Canapé d'angle / 4 places et +",
    description:
      "Traitement complet des grands canapés et canapés d'angle, coussins et accoudoirs compris.",
    price: "dès 109 €",
    duration: "≈ 2 h",
    highlights: ["Coussins & accoudoirs inclus", "Anti-acariens en option", "Résultat garanti"],
  },
  {
    id: "tapis-moquette",
    category: "tapis",
    name: "Tapis & Moquettes",
    description:
      "Vos tapis et moquettes retrouvent couleurs et fraîcheur : brossage, injection-extraction et neutralisation des odeurs.",
    price: "dès 39 €",
    duration: "≈ 1 h",
    highlights: ["Ravivage des couleurs", "Élimination des taches", "Désodorisation"],
  },
  {
    id: "textiles-matelas",
    category: "textiles",
    name: "Matelas & Textiles",
    description:
      "Matelas, chaises, têtes de lit, sièges de bureau… un traitement hygiénique complet pour tous vos textiles.",
    price: "dès 59 €",
    duration: "≈ 1 h 30",
    highlights: ["Hygiène en profondeur", "Anti-acariens", "Adapté à tous les tissus"],
  },
];

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  auto: "Auto",
  canape: "Canapé",
  tapis: "Tapis",
  textiles: "Textiles",
};

/** Coordonnées de l'entreprise — source unique pour header, contact et footer. */
export const COMPANY = {
  name: "ProClean Auto & Textil",
  founder: "Riccetti Romaric",
  phone: "07 86 76 24 48",
  phoneHref: "tel:+33786762448",
  email: "procleanauto01@gmail.com",
  area: "Vosges & Haute-Marne",
  slogan:
    "Nettoyage & detailing intérieur. Redonnez une seconde vie à vos textiles et à l'intérieur de votre véhicule !",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61558XXXXXXXX",
    instagram: "https://www.instagram.com/procleanautoettextil",
    google: "https://g.page/r/proclean-auto-textil",
    youtube: "https://www.youtube.com/@ProCleanAutoTextil",
  },
} as const;
