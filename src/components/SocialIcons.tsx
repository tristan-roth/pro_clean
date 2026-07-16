/**
 * Icônes de réseaux sociaux en lignes fines (1.25), même graisse que Lucide —
 * les icônes de marques ne sont plus fournies par lucide-react.
 */
interface IconProps {
  className?: string;
}

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function GoogleIcon({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 12h-9" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg {...BASE} className={className}>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" />
    </svg>
  );
}
