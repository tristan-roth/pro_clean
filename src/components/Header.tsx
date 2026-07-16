"use client";

import { useEffect, useState } from "react";
import { COMPANY } from "@/lib/services";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#galerie", label: "Galerie" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-neon-400/15 bg-night-950/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="section-container flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        {/* Logo */}
        <a
          href="#accueil"
          onClick={closeMenu}
          className="group flex items-baseline gap-1.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
          aria-label={`${COMPANY.name} — retour à l'accueil`}
        >
          <span className="font-display text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-steel-100">
            Pro
            <span className="text-neon-gradient">Clean</span>
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-steel-400 sm:inline">
            Auto &amp; Textil
          </span>
        </a>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-2 text-sm font-medium text-steel-300 transition-colors duration-300 hover:text-neon-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-neon-line transition-transform duration-300 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* CTA desktop */}
          <a href="#rendez-vous" className="btn-primary hidden px-5 py-2.5 md:inline-flex">
            Prendre Rendez-vous
          </a>

          {/* Bouton burger (mobile) */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-steel-200 transition-all duration-300 hover:border-neon-400/50 hover:text-neon-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400 md:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line
                x1="4"
                y1="7"
                x2="20"
                y2="7"
                className={`origin-center transition-transform duration-300 ${
                  menuOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                className={`transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <line
                x1="4"
                y1="17"
                x2="20"
                y2="17"
                className={`origin-center transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      <div
        id="menu-mobile"
        className={`overflow-hidden border-neon-400/15 bg-night-950/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-96 border-b opacity-100" : "max-h-0 border-b-0 opacity-0"
        }`}
      >
        <nav className="section-container flex flex-col gap-1 py-4" aria-label="Navigation mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-base font-medium text-steel-200 transition-all duration-300 hover:bg-neon-500/10 hover:text-neon-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
            >
              {link.label}
            </a>
          ))}
          <a href="#rendez-vous" onClick={closeMenu} className="btn-primary mt-3 w-full px-5 py-3">
            Prendre Rendez-vous
          </a>
        </nav>
      </div>
    </header>
  );
}
