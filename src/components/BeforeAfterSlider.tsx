"use client";

import { useCallback, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

function clamp(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
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
      className="relative aspect-[4/3] cursor-ew-resize select-none touch-none overflow-hidden rounded-2xl border border-white/10 bg-night-900"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
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
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-night-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-steel-300 backdrop-blur">
          Avant
        </span>
      </div>

      <span className="absolute right-3 top-3 rounded-full border border-neon-400/50 bg-night-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-neon-300 backdrop-blur">
        Après
      </span>

      {/* Barre de séparation + poignée */}
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-neon" aria-hidden="true" />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparer avant et après"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-neon-400 bg-night-900/90 text-neon-300 shadow-neon backdrop-blur transition-transform duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="m9 7-5 5 5 5" />
            <path d="m15 7 5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
