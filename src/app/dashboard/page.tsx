import Link from "next/link";
import { ArrowUpRight, Bell, BrainCircuit, ChartColumn, Sparkles, Telescope } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Card, Pill, ProgressBar, SectionHeading, StatCard, Surface } from "@/components/ui";

export const metadata = { title: "Dashboard Overview" };

const driverItems = [
  { label: "Attention", value: 88, bars: [40, 60, 50, 80, 70, 90] },
  { label: "Memory Encoding", value: 74, bars: [30, 45, 70, 55, 85, 75] },
  { label: "Brand Recall", value: 91, bars: [55, 65, 58, 78, 86, 94] },
];

const activity = [
  ["Creative Alpha", "Analyzed 11 min ago"],
  ["Audience Cluster", "Updated 24 min ago"],
  ["A/B Variant B", "Published 1h ago"],
  ["Simulation Run #42", "Completed 2h ago"],
];

export default function DashboardPage() {
  return (
    <SiteShell active="dashboard" title="Dashboard Overview" subtitle="A compact control center for campaigns, simulations, and model health.">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Control room"
          title="Dashboard"
          description="A static, connected view of the whole product: metrics, analysis, simulation health, and the next actions that matter."
          action={
            <Link href="/simulate" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
              Launch simulation <ArrowUpRight size={16} />
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="grid gap-6 md:grid-cols-2 lg:col-span-8 xl:grid-cols-4">
            <StatCard label="Content analyzed" value="1,492" delta="+12% vs last week" icon={<Telescope size={20} />} />
            <StatCard label="Active campaigns" value="08" delta="3 pending review" icon={<Sparkles size={20} />} />
            <StatCard label="Simulations run" value="45k" delta="+4% vs last month" icon={<BrainCircuit size={20} />} />
            <StatCard label="Prediction accuracy" value="94.2%" delta="Stable across all cohorts" icon={<ChartColumn size={20} />} accent />
          </div>

          <Card className="lg:col-span-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="headline text-2xl">Neuro-drivers</h2>
              <Bell size={18} className="text-muted" />
            </div>
            <div className="mt-6 space-y-5">
              {driverItems.map((item) => (
                <div key={item.label} className="space-y-3">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="kicker">{item.label}</p>
                      <p className="headline text-2xl">{item.value}</p>
                    </div>
                    <div className="flex h-8 items-end gap-1">
                      {item.bars.map((bar, index) => (
                        <span key={index} className="w-2 rounded-t-sm bg-accent" style={{ height: `${bar}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="h-px bg-line" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-12">
          <Surface className="xl:col-span-8 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="kicker">Operational view</p>
                <h2 className="headline mt-2 text-3xl">Live system pulse</h2>
              </div>
              <Pill tone="accent">Stable</Pill>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {activity.map(([name, detail]) => (
                <div key={name} className="rounded-[1.5rem] bg-white p-5 soft-border">
                  <p className="headline text-lg">{name}</p>
                  <p className="mt-2 text-sm text-muted">{detail}</p>
                </div>
              ))}
            </div>
          </Surface>

          <Card className="xl:col-span-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="headline text-2xl">Next steps</h2>
              <Sparkles size={18} className="text-accent" />
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted">Simulation readiness</span>
                  <span className="font-semibold text-ink">87%</span>
                </div>
                <ProgressBar value={87} />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted">Library coverage</span>
                  <span className="font-semibold text-ink">71%</span>
                </div>
                <ProgressBar value={71} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </SiteShell>
  );
}