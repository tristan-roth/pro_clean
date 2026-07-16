"use client";

import { CATEGORY_LABELS, SERVICES } from "@/lib/services";

interface StepServiceProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function StepService({ selectedId, onSelect }: StepServiceProps) {
  return (
    <div>
      <p className="mb-4 text-sm text-steel-300">
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
              className={`group relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400 ${
                selected
                  ? "border-neon-400 bg-neon-500/10 shadow-neon-sm"
                  : "border-white/10 bg-night-800/60 hover:-translate-y-1 hover:border-neon-400/40 hover:shadow-neon-sm"
              }`}
            >
              {selected && (
                <span
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-cta-gradient text-night-950"
                  aria-hidden="true"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}

              <span className="inline-flex rounded-full border border-neon-400/25 bg-neon-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-neon-300">
                {CATEGORY_LABELS[service.category]}
              </span>
              <h3 className="mt-2.5 pr-8 font-display text-base font-semibold leading-snug text-white">
                {service.name}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-steel-400">
                {service.description}
              </p>
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <span className="text-sm font-bold text-neon-300">{service.price}</span>
                <span className="text-xs text-steel-400">{service.duration}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
