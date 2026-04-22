"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Download, Eye, Sparkles, TrendingUp, Users } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Card, Pill } from "@/components/ui";
import { abCompareNewPath, simulationIndexPath } from "@/lib/site";
import { cn } from "@/lib/utils";

type VariantResult = {
  name: string;
  creativeIds: string[];
  conversions: number;
  revenue: number;
  awareness: number;
  roas: number;
  sentiment: number;
};

function parseVariants(raw: string | null): Array<{ name: string; creativeIds: string[] }> {
  if (!raw) return [];
  return raw
    .split(",")
    .map((chunk) => {
      const [rawName, rawIds] = chunk.split(":");
      return {
        name: decodeURIComponent(rawName ?? "Variant"),
        creativeIds: (rawIds ?? "").split("|").filter(Boolean),
      };
    })
    .filter((v) => v.name.length > 0);
}

/** Deterministic hash so the same params always produce the same numbers. */
function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function simulateVariant(
  variant: { name: string; creativeIds: string[] },
  budget: number,
  channelCount: number,
): VariantResult {
  const seed = hash(`${variant.name}|${variant.creativeIds.join("|")}|${budget}|${channelCount}`);
  const baseConv = 18 + (seed % 22);
  const revenueMultiplier = 55 + (seed % 20);
  const awareness = 7 + ((seed >> 3) % 60) / 10;
  const sentiment = ((seed >> 5) % 50) / 100;
  const conversions = Math.round(baseConv + variant.creativeIds.length * 1.5);
  const revenue = Math.round(conversions * revenueMultiplier);
  const roas = Number((revenue / Math.max(budget, 1)).toFixed(2));

  return {
    name: variant.name,
    creativeIds: variant.creativeIds,
    conversions,
    revenue,
    awareness: Number(awareness.toFixed(1)),
    roas,
    sentiment: Number(sentiment.toFixed(2)),
  };
}

function AbCompareResultsInner() {
  const params = useSearchParams();
  const budget = Number(params.get("budget") ?? 30_000);
  const channelsRaw = params.get("channels") ?? "";
  const channels = channelsRaw ? channelsRaw.split(",").filter(Boolean) : [];
  const variantsRaw = params.get("variants");

  const parsedVariants = useMemo(() => parseVariants(variantsRaw), [variantsRaw]);

  const results = useMemo(
    () => parsedVariants.map((v) => simulateVariant(v, budget, channels.length)),
    [parsedVariants, budget, channels.length],
  );

  const winner = useMemo(() => {
    if (results.length === 0) return null;
    return results.reduce((best, current) =>
      current.conversions > best.conversions ? current : best,
    );
  }, [results]);

  const loser = useMemo(() => {
    if (results.length < 2 || !winner) return null;
    return results.reduce((worst, current) =>
      current.conversions < worst.conversions ? current : worst,
    );
  }, [results, winner]);

  const conversionLead = winner && loser ? winner.conversions - loser.conversions : 0;
  const revenueLead = winner && loser ? winner.revenue - loser.revenue : 0;

  if (results.length === 0) {
    return (
      <SiteShell active="simulate" title="Compare" subtitle="A/B comparison results">
        <div className="mx-auto max-w-3xl space-y-6 pb-20 text-center">
          <Link
            href={abCompareNewPath}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to comparison input
          </Link>
          <Card className="p-10">
            <p className="headline text-2xl">No comparison data</p>
            <p className="mt-2 text-sm text-muted">
              Go back to the comparison input and run a test to see results here.
            </p>
            <Link
              href={abCompareNewPath}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Start a comparison
            </Link>
          </Card>
        </div>
      </SiteShell>
    );
  }

  const title =
    results.length === 2
      ? `Compare: ${results[0].name} vs ${results[1].name}`
      : `Compare: ${results.map((r) => r.name).join(" · ")}`;

  return (
    <SiteShell active="simulate" title="Comparison results" subtitle="A/B head-to-head report">
      <div className="mx-auto max-w-6xl space-y-8 pb-20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link
              href={simulationIndexPath}
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              Simulations
            </Link>
            <h1 className="headline mt-3 text-4xl leading-tight text-ink md:text-5xl">
              {title}
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
              <span>comparison</span>
              <span>·</span>
              <span>10.0K agents</span>
              <span>·</span>
              <span>1.9s</span>
              {channels.length > 0 ? (
                <>
                  <span>·</span>
                  <span>{channels.join(", ")}</span>
                </>
              ) : null}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-panel px-5 py-2.5 text-sm font-semibold text-ink soft-border transition-all hover:bg-panelSoft hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>

        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="kicker">A/B Comparison</p>
            {winner ? (
              <p className="text-xs text-muted">
                Winner: <span className="font-semibold text-ink">{winner.name}</span>
              </p>
            ) : null}
          </div>

          <div className={cn("mt-5 grid gap-4", results.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
            {results.map((r) => {
              const isWinner = winner?.name === r.name;
              return (
                <div
                  key={r.name}
                  className={cn(
                    "rounded-2xl border p-5 transition-all",
                    isWinner
                      ? "border-ink bg-white shadow-soft"
                      : "border-line bg-panelSoft/40",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold text-ink">{r.name}</p>
                    {isWinner ? <Pill tone="neutral">Winner</Pill> : null}
                  </div>
                  <dl className="mt-4 space-y-2.5 text-sm">
                    <Row label="Conversions" value={r.conversions.toString()} />
                    <Row label="Revenue" value={`$${r.revenue.toLocaleString()}`} />
                    <Row label="Awareness" value={`${r.awareness.toFixed(1)}%`} />
                    <Row label="ROAS" value={`${r.roas.toFixed(2)}x`} />
                  </dl>
                </div>
              );
            })}
          </div>

          {winner && loser ? (
            <p className="mt-5 text-sm text-muted">
              {winner.name} leads by{" "}
              <span className="font-semibold text-ink">{conversionLead} conversions</span>
              <span className="mx-2">·</span>
              <span className="font-semibold text-ink">${revenueLead.toLocaleString()} more revenue</span>
            </p>
          ) : null}
        </Card>

        {winner ? <DetailsSection result={winner} /> : null}
      </div>
    </SiteShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold text-ink">{value}</dd>
    </div>
  );
}

function DetailsSection({ result }: { result: VariantResult }) {
  const cards = [
    {
      icon: <TrendingUp className="h-4 w-4 text-muted" />,
      label: "Predicted Revenue",
      value: `$${result.revenue.toLocaleString()}`,
      tint: "from-[#dcfce7] to-transparent",
      stroke: "#16a34a",
    },
    {
      icon: <Users className="h-4 w-4 text-muted" />,
      label: "Conversions",
      value: result.conversions.toString(),
      tint: "from-[#dbeafe] to-transparent",
      stroke: "#2563eb",
    },
    {
      icon: <Eye className="h-4 w-4 text-muted" />,
      label: "Awareness Lift",
      value: `${result.awareness.toFixed(1)}%`,
      tint: "from-[#ccfbf1] to-transparent",
      stroke: "#0d9488",
    },
    {
      icon: <Sparkles className="h-4 w-4 text-muted" />,
      label: "Avg Sentiment",
      value: result.sentiment.toFixed(2),
      tint: "from-[#e9d5ff] to-transparent",
      stroke: "#7c3aed",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-sm">
        <span className="text-muted">Viewing:</span>
        <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
          {result.name}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="overflow-hidden p-5">
            <div className="flex items-center gap-2 text-xs font-medium text-muted">
              {c.icon}
              {c.label}
            </div>
            <p className="headline mt-3 text-3xl text-ink">{c.value}</p>
            <div className={cn("mt-4 h-12 rounded-lg bg-gradient-to-b", c.tint)}>
              <svg viewBox="0 0 100 40" className="h-full w-full" preserveAspectRatio="none">
                <path
                  d="M0,30 C15,24 25,10 40,18 C55,26 65,12 80,16 C90,19 95,14 100,10"
                  fill="none"
                  stroke={c.stroke}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function AbCompareResultsPage() {
  return (
    <Suspense fallback={null}>
      <AbCompareResultsInner />
    </Suspense>
  );
}
