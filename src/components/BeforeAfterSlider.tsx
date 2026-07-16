"use client";

import { useCallback, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

function clamp(value: number): number {
  return Math.min(100, Math.max(0, value));
}

/**
 * Comparateur avant/après.
 *
 * La ligne de transition simule le passage d'une buse d'injection-extraction :
 * bande de "brume de chaleur" (backdrop-blur masqué + ondulation), voile de
 * vapeur distordu par un filtre SVG feTurbulence animé, et volutes qui montent
 * le long de la ligne — le tout s'intensifie pendant le glissement.
 */
export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const filterId = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        setPos((p) => clamp(p - 5));
        break;
      case "ArrowRight":
        event.preventDefault();
        setPos((p) => clamp(p + 5));
        break;
      case "Home":
        event.preventDefault();
        setPos(0);
        break;
      case "End":
        event.preventDefault();
        setPos(100);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className="group/slider relative aspect-[4/3] cursor-ew-resize select-none touch-none overflow-hidden rounded-2xl border border-white/[0.08] bg-obsidian-900 shadow-card"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      {/* Filtre de distorsion "chaleur" — turbulence animée */}
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.09"
              numOctaves="2"
              seed="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="7s"
                values="0.015 0.09;0.02 0.13;0.015 0.09"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
          </filter>
        </defs>
      </svg>

      {/* Image "après" en fond, pleine surface */}
      <img
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay "avant", rogné par le clip-path — l'image reste pleine largeur */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 calc(100% - ${pos}%) 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Étiquettes typographiques minimales */}
      <span className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-caps text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
        Avant
      </span>
      <span className="absolute right-4 top-4 text-[10px] font-semibold uppercase tracking-caps text-vapor-200 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
        Après
      </span>

      {/* ------------------------------------------------ Ligne de transition */}
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        {/* Brume de chaleur : flou du fond, fondu sur les bords, ondulation */}
        <div
          aria-hidden="true"
          className={`absolute inset-y-0 w-14 -translate-x-1/2 animate-haze-wobble backdrop-blur-[3px] transition-opacity duration-300 ${
            dragging ? "opacity-100" : "opacity-70"
          }`}
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 35%, black 65%, transparent)",
            maskImage:
              "linear-gradient(90deg, transparent, black 35%, black 65%, transparent)",
          }}
        />

        {/* Voile de vapeur distordu par la turbulence */}
        <div
          aria-hidden="true"
          className={`absolute inset-y-0 w-10 -translate-x-1/2 transition-opacity duration-300 ${
            dragging ? "opacity-90" : "opacity-50"
          }`}
          style={{
            filter: `url(#${filterId})`,
            background:
              "linear-gradient(90deg, transparent, rgba(230,244,248,0.16) 40%, rgba(230,244,248,0.22) 50%, rgba(230,244,248,0.16) 60%, transparent)",
          }}
        />

        {/* Volutes de vapeur montant le long de la buse */}
        <div aria-hidden="true" className="absolute inset-y-0 w-8 -translate-x-1/2">
          {[
            { top: "18%", delay: "0s", size: "h-2.5 w-2.5" },
            { top: "42%", delay: "0.9s", size: "h-2 w-2" },
            { top: "64%", delay: "1.6s", size: "h-3 w-3" },
            { top: "84%", delay: "0.5s", size: "h-2 w-2" },
          ].map((wisp, index) => (
            <span
              key={index}
              className={`absolute left-1/2 ${wisp.size} -translate-x-1/2 animate-steam-rise rounded-full bg-white/60 blur-[5px] transition-opacity duration-300 ${
                dragging ? "opacity-100" : "opacity-45"
              }`}
              style={{ top: wisp.top, animationDelay: wisp.delay }}
            />
          ))}
        </div>

        {/* Fil de séparation */}
        <div
          className="absolute inset-y-0 w-px -translate-x-1/2 bg-white/90 [box-shadow:0_0_14px_rgba(255,255,255,0.35)]"
          aria-hidden="true"
        />

        {/* Poignée — molette en métal brossé */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparer avant et après"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          className={`absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brushed-metal text-obsidian-950 shadow-knob transition-transform duration-300 ease-out-expo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vapor-400 ${
            dragging ? "scale-110" : "group-hover/slider:scale-105"
          }`}
        >
          <ChevronLeft strokeWidth={1.75} className="h-4 w-4 -mr-0.5" aria-hidden="true" />
          <ChevronRight strokeWidth={1.75} className="h-4 w-4 -ml-0.5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
