"use client";

import { Check } from "lucide-react";
import { CATEGORY_LABELS, SERVICES } from "@/lib/services";

interface StepServiceProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function StepService({ selectedId, onSelect }: StepServiceProps) {
  return (
    <div>
      <p className="mb-5 text-sm font-light text-silver-400">
        Quelle prestation souhaitez-vous réserver&nbsp;?
      </p>
      <div
        role="radiogroup"
        aria-label="Choix de la prestation"
        className="grid gap-4 sm:grid-cols-2"
      >
        {SERVICES.map((service) => {
          const selected = service.id === selectedId;
          return (
            <div
              key={service.id}
              role="radio"
              aria-checked={selected}
              tabIndex={0}
              onClick={() => onSelect(service.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(service.id);
                }
              }}
              className={`group relative cursor-pointer rounded-2xl border p-5 transition-all duration-500 ease-out-expo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vapor-400 ${
                selected
                  ? "border-vapor-400/60 bg-vapor-500/[0.08] shadow-vapor-edge"
                  : "border-white/[0.08] bg-obsidian-900/60 hover:-translate-y-0.5 hover:border-white/20 hover:bg-obsidian-800/80"
              }`}
            >
              {selected && (
                <span
                  className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-porcelain text-obsidian-950"
                  aria-hidden="true"
                >
                  <Check strokeWidth={2.25} className="h-3.5 w-3.5" />
                </span>
              )}

              <span className="text-[10px] font-semibold uppercase tracking-caps text-vapor-300/90">
                {CATEGORY_LABELS[service.category]}
              </span>
              <h3 className="mt-2.5 pr-8 font-serif text-lg font-medium leading-snug text-porcelain">
                {service.name}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm font-light leading-relaxed text-silver-500">
                {service.description}
              </p>
              <div className="mt-4 flex items-baseline justify-between gap-2">
                <span className="font-serif text-base italic text-porcelain">
                  {service.price}
                </span>
                <span className="text-xs text-silver-500">{service.duration}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
