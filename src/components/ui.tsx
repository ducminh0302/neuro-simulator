import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return <div className={`rounded-[2rem] bg-panel soft-border shadow-soft ${className}`}>{children}</div>;
}

export function Surface({ children, className = "" }: CardProps) {
  return <div className={`rounded-[2.5rem] bg-panelSoft soft-border ${className}`}>{children}</div>;
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
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl space-y-3">
        {eyebrow ? <p className="kicker">{eyebrow}</p> : null}
        <h1 className="headline text-4xl md:text-6xl leading-[0.92]">{title}</h1>
        {description ? <p className="text-base md:text-lg text-muted leading-relaxed">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" | "soft" }) {
  const toneClass =
    tone === "accent"
      ? "bg-accent text-white"
      : tone === "soft"
        ? "bg-accentSoft text-accent"
        : "bg-panelSoft text-ink";

  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneClass}`}>{children}</span>;
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
    <Card className={`p-6 ${accent ? "bg-accent text-white" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <p className={`kicker ${accent ? "text-white/70" : ""}`}>{label}</p>
      </div>
      <div className="mt-10 space-y-2">
        <div className={`headline text-4xl md:text-5xl leading-none ${accent ? "text-white" : ""}`}>{value}</div>
        {delta ? <p className={`text-sm ${accent ? "text-white/80" : "text-muted"}`}>{delta}</p> : null}
      </div>
    </Card>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-line/70 overflow-hidden">
      <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${value}%` }} />
    </div>
  );
}