"use client";

import { useEffect, useState } from "react";
import { COMPANY } from "@/lib/services";

const NAV_LINKS = [
  { href: "#services", label: "Prestations" },
  { href: "#galerie", label: "Avant / Après" },
  { href: "#rendez-vous", label: "Rendez-vous" },
  { href: "#contact", label: "Contact" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "border-b border-white/[0.06] bg-obsidian-950/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="section-container flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        {/* Logo — serif artisanale + petites capitales */}
        <a
          href="#accueil"
          onClick={closeMenu}
          className="group flex items-baseline gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400"
          aria-label={`${COMPANY.name} — retour à l'accueil`}
        >
          <span className="font-serif text-[1.35rem] font-medium tracking-tight text-porcelain">
            ProClean
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-caps text-silver-500 sm:inline">
            Auto &amp; Textil
          </span>
        </a>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-9 md:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-2 text-[12px] font-medium uppercase tracking-caps text-silver-400 transition-colors duration-300 hover:text-porcelain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-vapor-400/70 transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* CTA desktop */}
          <a href="#rendez-vous" className="btn-metal hidden px-6 py-2.5 text-[11px] md:inline-flex">
            Rendez-vous
          </a>

          {/* Bouton burger (mobile) */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-silver-300 transition-all duration-300 hover:border-white/25 hover:text-porcelain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400 md:hidden"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line
                x1="4"
                y1="8"
                x2="20"
                y2="8"
                className={`origin-center transition-transform duration-300 ${
                  menuOpen ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <line
                x1="4"
                y1="16"
                x2="20"
                y2="16"
                className={`origin-center transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      <div
        id="menu-mobile"
        className={`overflow-hidden border-white/[0.06] bg-obsidian-950/95 backdrop-blur-md transition-all duration-500 ease-out-expo md:hidden ${
          menuOpen ? "max-h-96 border-b opacity-100" : "max-h-0 border-b-0 opacity-0"
        }`}
      >
        <nav className="section-container flex flex-col gap-1 py-5" aria-label="Navigation mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-caps text-silver-300 transition-all duration-300 hover:bg-white/[0.04] hover:text-porcelain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400"
            >
              {link.label}
            </a>
          ))}
          <a href="#rendez-vous" onClick={closeMenu} className="btn-metal mt-4 w-full">
            Prendre rendez-vous
          </a>
        </nav>
      </div>
    </header>
  );
}
