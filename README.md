# ProClean Auto & Textil — Site vitrine & réservation

Site moderne dark premium (accents bleu néon) pour **ProClean Auto & Textil** —
nettoyage & detailing intérieur (auto, canapé, tapis, textiles) dans les
**Vosges & Haute-Marne**.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 3** — design system dans `tailwind.config.ts` + `src/app/globals.css`
- **Supabase** (optionnel) — persistance des réservations
- **Resend** (optionnel) — e-mails de confirmation (client + fondateur)

## Démarrage

```bash
npm install
npm run dev        # http://localhost:3000
```

Le site est **fonctionnel sans aucune configuration** : sans variables
d'environnement, les réservations sont stockées en mémoire (avec quelques
créneaux pré-réservés pour la démo) et les e-mails sont simulés en console.

## Passage en production

1. **Supabase** — créez un projet, exécutez [`supabase/schema.sql`](supabase/schema.sql)
   dans le SQL Editor, puis renseignez `SUPABASE_URL` et
   `SUPABASE_SERVICE_ROLE_KEY` dans `.env.local` (voir `.env.example`).
   L'index unique `bookings_unique_active_slot` garantit qu'un créneau ne peut
   jamais être réservé deux fois, même en cas de clics simultanés.
2. **Resend** — créez une clé API et renseignez `RESEND_API_KEY`, `EMAIL_FROM`
   (domaine vérifié) et `FOUNDER_EMAIL`. Pour utiliser Nodemailer à la place,
   seule la fonction `sendEmail()` de [`src/lib/email.ts`](src/lib/email.ts)
   est à adapter.

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Polices, métadonnées SEO
│   ├── page.tsx                # Assemblage des sections
│   ├── globals.css             # Design system (classes .btn-primary, .glass-card…)
│   └── api/
│       ├── availability/       # GET  ?date=YYYY-MM-DD → créneaux libres/réservés
│       └── bookings/           # POST → validation, blocage du créneau, e-mails
├── components/
│   ├── Header.tsx, Hero.tsx, Services.tsx
│   ├── Gallery.tsx, BeforeAfterSlider.tsx   # Slider avant/après interactif
│   ├── booking/                # Module de RDV par étapes (style Doctolib)
│   ├── ZoneContact.tsx, Footer.tsx
└── lib/
    ├── services.ts             # Catalogue des prestations + coordonnées
    ├── slots.ts                # Règles des créneaux (horaires, jours fermés)
    ├── store.ts                # Persistance (Supabase ou mémoire)
    ├── email.ts                # Templates + envoi Resend
    └── types.ts
```

## Personnalisation

- **Prestations & tarifs** : `src/lib/services.ts`
- **Horaires / jours d'ouverture** : `src/lib/slots.ts`
- **Coordonnées & réseaux sociaux** : objet `COMPANY` dans `src/lib/services.ts`
  (⚠️ mettre à jour les URL réelles des réseaux sociaux)
- **Photos avant/après** : remplacer les SVG de `public/gallery/` par de vraies
  photos (mêmes noms de fichiers, ou adapter `src/components/Gallery.tsx`)
