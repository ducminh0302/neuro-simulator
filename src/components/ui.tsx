import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

/**
 * Card — Vercel-style flat surface: solid dark bg, 1px border, small radius,
 * no ambient shadow by default. Hover subtly lifts border color.
 */
export function Card({ children, className = "", onClick }: CardProps) {
  const interactive = typeof onClick === "function";
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl2 border border-line bg-panel transition-colors duration-fast",
        interactive && "cursor-pointer hover:border-lineHover",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Surface — slightly raised card, used for nested sections or alternate bg.
 */
export function Surface({ children, className = "", onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn("rounded-xl2 border border-line bg-panelSoft", className)}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl space-y-2">
        {eyebrow ? <p className="kicker">{eyebrow}</p> : null}
        <h1 className="headline text-2xl md:text-3xl leading-tight">{title}</h1>
        {description ? (
          <p className="text-sm md:text-base text-muted leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/**
 * Pill — a small status tag. Vercel uses subtle neutral chips, not pill-shaped
 * uppercase tags; we mimic that look (small radius, lower-case, subtle bg).
 */
export function Pill({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?:
    | "neutral"
    | "accent"
    | "soft"
    | "success"
    | "warning"
    | "danger"
    | "info";
  className?: string;
}) {
  const toneClass: Record<string, string> = {
    neutral: "bg-hover text-muted border border-line",
    accent: "bg-ink text-canvas border border-ink",
    soft: "bg-panelSoft text-ink border border-line",
    success: "bg-success/10 text-success border border-success/30",
    warning: "bg-warning/10 text-warning border border-warning/30",
    danger: "bg-danger/10 text-danger border border-danger/30",
    info: "bg-info/10 text-info border border-info/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium tracking-tight",
        toneClass[tone] ?? toneClass.neutral,
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatCard({
  label,
  value,
  delta,
  accent = false,
}: {
  label: string;
  value: string;
  delta?: string;
  accent?: boolean;
}) {
  return (
    <Card
      className={cn(
        "p-5",
        accent && "bg-ink text-canvas border-ink",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className={cn("kicker", accent && "text-canvas/70")}>{label}</p>
      </div>
      <div className="mt-6 space-y-1">
        <div
          className={cn(
            "headline text-3xl md:text-4xl leading-none font-mono tabular-nums",
            accent && "text-canvas",
          )}
        >
          {value}
        </div>
        {delta ? (
          <p className={cn("text-xs", accent ? "text-canvas/70" : "text-muted")}>
            {delta}
          </p>
        ) : null}
      </div>
    </Card>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-line">
      <div
        className="h-full rounded-full bg-ink transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
