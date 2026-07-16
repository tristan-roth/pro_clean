"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * Lampe d'inspection de detailing.
 *
 * Calque fixe derrière tout le contenu :
 *  1. la trame textile, à peine perceptible sur toute la page ;
 *  2. la même trame, plus lumineuse, révélée uniquement dans le halo
 *     radial qui suit la souris — comme une lampe qui inspecte la fibre.
 *
 * Le suivi est amorti par un spring pour un mouvement "physique",
 * légèrement en retard sur le curseur.
 */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.3);
  const springX = useSpring(x, { stiffness: 120, damping: 26, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 26, mass: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !hasPointer) return; // tactile : halo statique élégant

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX / window.innerWidth);
      y.set(event.clientY / window.innerHeight);
    };

    const apply = () => {
      el.style.setProperty("--spot-x", `${(springX.get() * 100).toFixed(2)}%`);
      el.style.setProperty("--spot-y", `${(springY.get() * 100).toFixed(2)}%`);
    };
    const unsubX = springX.on("change", apply);
    const unsubY = springY.on("change", apply);

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      unsubX();
      unsubY();
    };
  }, [x, y, springX, springY]);

  const spotMask =
    "radial-gradient(circle 420px at var(--spot-x, 50%) var(--spot-y, 30%), black 0%, rgba(0,0,0,0.4) 45%, transparent 72%)";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ "--spot-x": "50%", "--spot-y": "30%" } as React.CSSProperties}
    >
      {/* Trame textile de fond, permanente et discrète */}
      <div className="bg-weave absolute inset-0 opacity-40" />

      {/* Trame révélée sous la lampe */}
      <div
        className="bg-weave absolute inset-0 opacity-100"
        style={{
          WebkitMaskImage: spotMask,
          maskImage: spotMask,
        }}
      />

      {/* Halo lumineux très subtil — la "lumière" de la lampe */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 460px at var(--spot-x, 50%) var(--spot-y, 30%), rgba(207,233,242,0.045) 0%, rgba(207,233,242,0.015) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
