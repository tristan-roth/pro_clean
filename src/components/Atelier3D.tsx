"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useScroll } from "framer-motion";
import FadeIn from "@/components/fx/FadeIn";
import RevealText from "@/components/fx/RevealText";

/** Le canvas WebGL n'est chargé que côté client, à la demande. */
const ModelViewer = dynamic(() => import("./three/ModelViewer"), {
  ssr: false,
  loading: () => null,
});

const METHOD_STEPS = [
  {
    step: "01",
    title: "Inspection",
    text: "Chaque fibre est examinée sous la lampe : matière, taches, zones sensibles.",
  },
  {
    step: "02",
    title: "Injection",
    text: "Le détergent professionnel est injecté au cœur du textile, sans le détremper.",
  },
  {
    step: "03",
    title: "Extraction",
    text: "L'eau, les salissures et les odeurs sont extraites en profondeur. Séchage rapide.",
  },
];

/**
 * Section "L'atelier" — objet 3D interactif présenté comme une pièce sous
 * la lampe d'inspection. Le modèle (/public/scene.glb) tourne doucement
 * sur lui-même au fil du scroll.
 */
export default function Atelier3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} id="atelier" className="relative scroll-mt-24 py-28">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Colonne texte — la méthode */}
          <div className="lg:col-span-5">
            <FadeIn>
              <span className="section-eyebrow">La méthode</span>
            </FadeIn>
            <h2 className="section-title">
              <RevealText text="Le geste juste," as="span" className="block" />
              <RevealText
                text="en trois temps."
                as="span"
                className="text-gesture block"
                delay={0.3}
              />
            </h2>

            <ol className="mt-12 space-y-9">
              {METHOD_STEPS.map((item, index) => (
                <FadeIn key={item.step} delay={0.15 + index * 0.12}>
                  <li className="flex gap-6">
                    <span
                      aria-hidden="true"
                      className="font-serif text-3xl font-light italic leading-none text-vapor-300/80"
                    >
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl font-medium text-porcelain">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 max-w-sm text-sm font-light leading-relaxed text-silver-400">
                        {item.text}
                      </p>
                    </div>
                  </li>
                </FadeIn>
              ))}
            </ol>
          </div>

          {/* Colonne 3D — pièce sous la lampe, sur panneau carbone */}
          <FadeIn className="lg:col-span-7" delay={0.2}>
            <div className="bg-carbon relative aspect-square overflow-hidden rounded-3xl border border-white/[0.07] shadow-card sm:aspect-[4/3]">
              {/* Halo de lampe au-dessus de la pièce */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 45% at 50% 18%, rgba(255,244,230,0.07), transparent 65%)",
                }}
              />

              <div className="absolute inset-0" aria-label="Modèle 3D d'une pièce en cours de traitement" role="img">
                <ModelViewer scrollProgress={scrollYProgress} />
              </div>

              {/* Cartouche technique */}
              <p className="pointer-events-none absolute bottom-5 left-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-caps text-silver-500">
                <span className="h-px w-6 bg-vapor-400/50" aria-hidden="true" />
                Pièce en cours de traitement — faites défiler
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
