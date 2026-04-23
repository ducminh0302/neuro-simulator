import Link from "next/link";
import { TrendingUp } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Card, Pill, SectionHeading, StatCard } from "@/components/ui";
import { simulationIndexPath } from "@/lib/site";

export const metadata = { title: "Dashboard · Nexus Digital Agency" };

const learningProgressPct = 85;

const metrics: Array<{
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}> = [
    { label: "Active Clients", value: "18", sub: "Premium portfolio" },
    { label: "Campaigns Optimized", value: "142", sub: "Across 4 platforms" },
    { label: "Monthly Ad Spend", value: "$2.4M", sub: "Managed budget" },
    { label: "Avg. ROI Lift", value: "+34.2%", sub: "AI Enhanced", accent: true },
  ];

const engagementDrivers = [
  {
    rank: 1,
    title: "Visual Stop-Rate",
    body: "First 3 frames with high-contrast motion increase thumb-stop rates by 52%.",
    score: "+0.912",
  },
  {
    rank: 2,
    title: "Platform Native Feel",
    body: "Using lo-fi, organic aesthetics on TikTok drives 2.4× higher comment engagement.",
    score: "+0.784",
  },
  {
    rank: 3,
    title: "Sound Syncing",
    body: "Beats-per-minute alignment with visual cuts increases completion rates significantly.",
    score: "+0.642",
  },
] as const;

const recentFindings = [
  "Meta Video Ads for 'Luxe Client' saw 42% higher retention with neural lighting adjustment.",
  "TikTok Spark Ads reach 89% presence score using the 'Organic-UGC' aesthetic model.",
  "Cross-platform campaign resonance peaked among 18-24 cohorts using the Vibe-Shift strategy.",
  "Ad fatigue predicted 14 days earlier than industry benchmarks using neural decay analysis.",
] as const;

const recentSimulations = [
  { name: "Simulacrum-Focus Simulator", meta: "Ad Creative Attention Map" },
  { name: "Gala Ready Simulator", meta: "Luxury Brand Aesthetic Testing" },
  { name: "Post Content Simulator", meta: "Social Feed Resonance Analysis" },
  { name: "Workspace Productivity", meta: "Team Creative Workflow Flow" },
] as const;

export default function DashboardPage() {
  return (
    <SiteShell active="dashboard" title="Agency Control Center" subtitle="Managing multi-platform campaigns and neural creative optimization.">
      <div className="space-y-8 pb-10">
        <SectionHeading
          eyebrow="Agency workspace"
          title={<>Nexus Digital Agency</>}
          description="Social Media Advertising"
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
                Calibrated from 142 neural observations across all channels — high confidence
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted">142 assets · fully calibrated</p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line/70">
                <div className="h-full rounded-full bg-accent" style={{ width: `${learningProgressPct}%` }} />
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
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="kicker">Insights</p>
                <h2 className="headline mt-2 text-2xl sm:text-3xl">Recent findings</h2>
              </div>
              <Link
                href="#"
                className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
              >
                View all →
              </Link>
            </div>
            <ul className="mt-6 space-y-4">
              {recentFindings.map((line) => (
                <li
                  key={line}
                  className="border-l-2 border-accent/40 bg-panelSoft/50 py-2 pl-4 text-base leading-relaxed text-ink/90"
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
