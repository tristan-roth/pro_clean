"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Inclinaison maximale en degrés. */
  maxTilt?: number;
}

/**
 * Carte à inclinaison 3D subtile au survol.
 *
 * Le pointeur pilote deux motion values normalisées (-0.5 → 0.5) amorties
 * par des springs. Les éléments enfants portant `data-tilt-parallax`
 * reçoivent les variables CSS `--tilt-x` / `--tilt-y` et flottent en
 * parallaxe au-dessus de la surface (voir globals.css).
 */
export default function TiltCard({ children, className, maxTilt = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 180, damping: 20, mass: 0.5 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    px.set(nx);
    py.set(ny);
    el.style.setProperty("--tilt-x", nx.toFixed(3));
    el.style.setProperty("--tilt-y", ny.toFixed(3));
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
    const el = ref.current;
    if (el) {
      el.style.setProperty("--tilt-x", "0");
      el.style.setProperty("--tilt-y", "0");
    }
  }

  return (
    <div style={{ perspective: "900px" }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
