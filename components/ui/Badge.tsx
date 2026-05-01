import { cn } from "@/lib/utils";

/* ─── Generic Badge ─────────────────────────────────────────── */
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return <span className={cn("badge", className)}>{children}</span>;
}

/* ─── Mode Badge (Online / In-Person / Hybrid) ───────────────── */
const MODE_STYLES: Record<string, string> = {
  online: "badge-online",
  offline: "badge-offline",
  hybrid: "badge-hybrid",
};

const MODE_LABELS: Record<string, string> = {
  online: "Online",
  offline: "In-Person",
  hybrid: "Hybrid",
};

export function ModeBadge({ mode }: { mode: string }) {
  const key = mode?.toLowerCase() ?? "offline";
  return (
    <span className={cn("badge mode-badge", MODE_STYLES[key] ?? "badge-offline")}>
      {MODE_LABELS[key] ?? mode}
    </span>
  );
}
