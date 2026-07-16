import { Mail, MapPin, Phone, UserRound } from "lucide-react";
import { COMPANY } from "@/lib/services";
import { FacebookIcon, GoogleIcon, InstagramIcon, YoutubeIcon } from "@/components/SocialIcons";

const QUICK_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Prestations" },
  { href: "#galerie", label: "Avant / Après" },
  { href: "#rendez-vous", label: "Rendez-vous" },
  { href: "#contact", label: "Contact" },
] as const;

const SOCIALS = [
  {
    label: "Facebook",
    href: COMPANY.socials.facebook,
    icon: <FacebookIcon className="h-[18px] w-[18px]" />,
  },
  {
    label: "Instagram",
    href: COMPANY.socials.instagram,
    icon: <InstagramIcon className="h-[18px] w-[18px]" />,
  },
  {
    label: "Google",
    href: COMPANY.socials.google,
    icon: <GoogleIcon className="h-[18px] w-[18px]" />,
  },
  {
    label: "YouTube",
    href: COMPANY.socials.youtube,
    icon: <YoutubeIcon className="h-[18px] w-[18px]" />,
  },
] as const;

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-obsidian-900/60" role="contentinfo">
      <div className="section-container grid gap-12 py-16 md:grid-cols-3 md:gap-8 lg:py-20">
        {/* Colonne 1 — logo + slogan + zone */}
        <div>
          <a
            href="#accueil"
            className="inline-flex items-baseline gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400"
            aria-label={`${COMPANY.name} — retour à l'accueil`}
          >
            <span className="font-serif text-xl font-medium tracking-tight text-porcelain">
              ProClean
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-caps text-silver-500">
              Auto &amp; Textil
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-silver-400">
            {COMPANY.slogan}
          </p>
          <p className="mt-5 flex items-center gap-2.5 text-sm font-light text-silver-500">
            <MapPin strokeWidth={1.25} className="h-4 w-4 shrink-0 text-vapor-400" aria-hidden="true" />
            Zone d&apos;intervention : {COMPANY.area}
          </p>
        </div>

        {/* Colonne 2 — liens rapides */}
        <nav aria-label="Liens rapides">
          <h3 className="text-[11px] font-semibold uppercase tracking-caps text-silver-500">
            Liens rapides
          </h3>
          <ul className="mt-5 space-y-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-3 text-sm font-light text-silver-400 transition-colors duration-300 hover:text-porcelain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400"
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-3 bg-white/20 transition-all duration-300 group-hover:w-5 group-hover:bg-vapor-400/60"
                  />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Colonne 3 — contact + réseaux sociaux */}
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-caps text-silver-500">
            Contact
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center gap-3 font-light text-silver-400 transition-colors duration-300 hover:text-porcelain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400"
              >
                <Phone strokeWidth={1.25} className="h-4 w-4 shrink-0 text-vapor-400" aria-hidden="true" />
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center gap-3 font-light text-silver-400 transition-colors duration-300 hover:text-porcelain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400"
              >
                <Mail strokeWidth={1.25} className="h-4 w-4 shrink-0 text-vapor-400" aria-hidden="true" />
                {COMPANY.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-3 font-light text-silver-500">
              <UserRound strokeWidth={1.25} className="h-4 w-4 shrink-0 text-vapor-400" aria-hidden="true" />
              Fondateur : {COMPANY.founder}
            </li>
          </ul>

          <div className="mt-7 flex items-center gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (nouvel onglet)`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-silver-400 transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-vapor-400/50 hover:text-vapor-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Ligne du bas */}
      <div className="border-t border-white/[0.05]">
        <div className="section-container flex flex-col items-center justify-between gap-2 py-6 text-xs font-light text-silver-600 sm:flex-row">
          <p>© 2026 {COMPANY.name} — Tous droits réservés</p>
          <p className="font-serif italic">
            Fait avec soin, dans les Vosges.
          </p>
        </div>
      </div>
    </footer>
  );
}
