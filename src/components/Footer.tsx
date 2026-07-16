import { COMPANY } from "@/lib/services";

const QUICK_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "#galerie", label: "Galerie" },
  { href: "#rendez-vous", label: "Rendez-vous" },
  { href: "#contact", label: "Contact" },
] as const;

const SOCIALS = [
  {
    label: "Facebook",
    href: COMPANY.socials.facebook,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: COMPANY.socials.instagram,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Google",
    href: COMPANY.socials.google,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path d="M21 12a9 9 0 1 1-2.64-6.36" />
        <path d="M21 12h-9" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: COMPANY.socials.youtube,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="m10 9 5 3-5 3z" />
      </svg>
    ),
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-night-900" role="contentinfo">
      <div className="neon-divider" aria-hidden="true" />

      <div className="section-container grid gap-12 py-14 md:grid-cols-3 md:gap-8 lg:py-16">
        {/* Colonne 1 — logo + slogan + zone */}
        <div>
          <a
            href="#accueil"
            className="inline-flex items-baseline gap-1.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
            aria-label={`${COMPANY.name} — retour à l'accueil`}
          >
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Pro
              <span className="text-neon-gradient">Clean</span>
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-steel-400">
              Auto &amp; Textil
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel-300">{COMPANY.slogan}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-steel-400">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-neon-400"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Zone d&apos;intervention : {COMPANY.area}
          </p>
        </div>

        {/* Colonne 2 — liens rapides */}
        <nav aria-label="Liens rapides">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-400">
            Liens rapides
          </h3>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex items-center gap-2 text-sm text-steel-300 transition-colors duration-300 hover:text-neon-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
                >
                  <span aria-hidden="true" className="h-px w-3 bg-neon-400/40" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Colonne 3 — contact + réseaux sociaux */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-400">
            Contact
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center gap-2.5 text-steel-300 transition-colors duration-300 hover:text-neon-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-neon-400"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />
                </svg>
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center gap-2.5 text-steel-300 transition-colors duration-300 hover:text-neon-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-neon-400"
                >
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="m2 7 10 6 10-6" />
                </svg>
                {COMPANY.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-steel-400">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-neon-400"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0" />
              </svg>
              Fondateur : {COMPANY.founder}
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (nouvel onglet)`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-steel-300 transition-all duration-300 hover:-translate-y-1 hover:border-neon-400/60 hover:text-neon-300 hover:shadow-neon-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Ligne du bas */}
      <div className="border-t border-white/[0.06]">
        <div className="section-container flex flex-col items-center justify-between gap-2 py-5 text-xs text-steel-500 sm:flex-row">
          <p>© 2026 {COMPANY.name} — Tous droits réservés</p>
          <p>
            Site réalisé avec <span aria-hidden="true">❤️</span>
            <span className="sr-only">amour</span> dans les Vosges
          </p>
        </div>
      </div>
    </footer>
  );
}
