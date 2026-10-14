import type { CategoryIcon } from "./foundation-courses";

// Ícones das categorias da Fundação (traço fino, cor herdada do texto).
const paths: Record<CategoryIcon, React.ReactNode> = {
  wallet: <><rect x="3" y="6" width="18" height="14" rx="3" /><path d="M3 10h18M16 15h2" /></>,
  chip: <><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" /></>,
  chess: <><path d="M9 20h6M8 17h8l-1-5H9z" /><circle cx="12" cy="7" r="3" /><path d="M10.5 10h3" /></>,
  ball: <><circle cx="12" cy="12" r="9" /><path d="m12 8 3 2.2-1.2 3.6h-3.6L9 10.2zM12 3v5M15 10.2l5-1.7M13.8 13.8l3 4.2M10.2 13.8l-3 4.2M9 10.2 4 8.5" /></>,
  spark: <path d="M12 3c.6 4.4 1.6 5.4 6 6-4.4.6-5.4 1.6-6 6-.6-4.4-1.6-5.4-6-6 4.4-.6 5.4-1.6 6-6zM18 15c.3 1.8.7 2.2 2.5 2.5-1.8.3-2.2.7-2.5 2.5-.3-1.8-.7-2.2-2.5-2.5 1.8-.3 2.2-.7 2.5-2.5z" />,
};

export function CategoryGlyph({ icon, size = 28 }: { icon: CategoryIcon; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}

export function PlayGlyph({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" fill="currentColor" /></svg>;
}

export function ExternalGlyph({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>;
}
