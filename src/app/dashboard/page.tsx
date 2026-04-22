import Link from "next/link";
import { TrendingUp } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Card, Pill, SectionHeading, StatCard } from "@/components/ui";
import { simulationIndexPath, simulationNewPath } from "@/lib/site";

export const metadata = { title: "Dashboard · GlowUp Skincare" };

const learningProgressPct = 70;

const metrics: Array<{
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}> = [
  { label: "Content", value: "21", sub: "39 scored" },
  { label: "Campaigns", value: "0", sub: "44 observations" },
  { label: "Simulations", value: "10", sub: "completed" },
  { label: "Prediction Accuracy", value: "—", sub: "No predictions yet" },
];

const engagementDrivers = [
  {
    rank: 1,
    title: "Memory",
    body: "Strong memory increases engagement significantly for your brand.",
    score: "+0.582",
  },
  {
    rank: 2,
    title: "Attention",
    body: "Strong attention decreases engagement significantly for your brand.",
    score: "-0.418",
  },
  {
    rank: 3,
    title: "Emotional Arousal",
    body: "Emotional Arousal has a moderate effect on engagement.",
    score: "+0.393",
  },
] as const;

const recentFindings = [
  "Social Resonance is a key strength (top 10%, score 72). Lean into this.",
  "Instagram Feed is 2.0× more effective than baseline — consider increasing allocation here.",
  "Sustained Attention is in the bottom 25% for this cohort — test clearer hooks in the first 2s.",
  "In Story placements, Instagram Feed is underperforming (0.3× baseline) — reallocate or refresh creative.",
] as const;

const recentSimulations = [
  { name: "IG Feed Post Test", meta: "single · 50.0K agents" },
  { name: "Compare: Variant A vs Variant B", meta: "comparison · 10.0K agents" },
  { name: "Niacinamide Launch - Acne Solutions", meta: "single · 10.0K agents" },
] as const;

export default function DashboardPage() {
  return (
    <SiteShell active="dashboard" title="Dashboard Overview" subtitle="A compact control center for campaigns, simulations, and model health.">
      <div className="space-y-8 pb-10">
        <SectionHeading
          eyebrow="Brand workspace"
          title={<>GlowUp Skincare</>}
          description="D2C skincare"
          action={
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={simulationNewPath}
                className="inline-flex items-center gap-2 rounded-full bg-panel px-6 py-3 text-sm font-medium soft-border transition-colors hover:bg-panelSoft"
              >
                A/B Compare
              </Link>
              <Link
                href={simulationNewPath}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                + New Simulation
              </Link>
            </div>
          }
        />

        <Card className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accentSoft text-accent">
              <TrendingUp className="h-5 w-5" strokeWidth={2} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="kicker">Learning status</p>
              <h2 className="headline mt-2 text-2xl sm:text-3xl">Calibrated from live observations</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                Calibrated from 30 observations across 1 platform — strong predictions
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted">30 observations — calibrated</p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line/70">
                <div className="h-full rounded-full bg-ink" style={{ width: `${learningProgressPct}%` }} />
              </div>
            </div>
          </div>
        </Card>

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="kicker">Overview</p>
              <h2 className="headline mt-2 text-2xl sm:text-3xl">Key metrics</h2>
            </div>
            <Pill tone="soft">Live</Pill>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((m) => (
              <StatCard key={m.label} label={m.label} value={m.value} delta={m.sub} accent={m.accent} />
            ))}
          </div>
        </section>

        <Card className="p-6 sm:p-8">
          <p className="kicker">Engagement model</p>
          <h2 className="headline mt-2 text-2xl sm:text-3xl">Top engagement drivers</h2>
          <ul className="mt-8 space-y-0 divide-y divide-line/70">
            {engagementDrivers.map((row) => (
              <li key={row.rank} className="flex gap-4 py-6 first:pt-0 last:pb-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">{row.rank}</div>
                <div className="min-w-0 flex-1">
                  <p className="headline text-lg text-ink">{row.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{row.body}</p>
                </div>
                <p className="shrink-0 tabular-nums text-sm font-semibold text-ink sm:text-base">{row.score}</p>
              </li>
            ))}
          </ul>
        </Card>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="p-6 sm:p-8 lg:col-span-3">
            <p className="kicker">Insights</p>
            <h2 className="headline mt-2 text-2xl sm:text-3xl">Recent findings</h2>
            <ul className="mt-6 space-y-4">
              {recentFindings.map((line) => (
                <li
                  key={line}
                  className="border-l-2 border-accent/40 bg-panelSoft/50 py-1 pl-4 text-sm leading-relaxed text-ink/90"
                >
                  {line}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 sm:p-8 lg:col-span-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="kicker">Activity</p>
                <h2 className="headline mt-2 text-2xl">Recent simulations</h2>
              </div>
              <Link
                href={simulationIndexPath}
                className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
              >
                View all →
              </Link>
            </div>
            <ul className="mt-6 space-y-3">
              {recentSimulations.map((s) => (
                <li key={s.name} className="rounded-[1.25rem] bg-panelSoft p-4 soft-border">
                  <p className="headline text-base text-ink">{s.name}</p>
                  <p className="mt-1.5 text-xs text-muted">{s.meta}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </SiteShell>
  );
}
