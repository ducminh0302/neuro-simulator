"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Database,
  Clipboard,
  Code,
  Download,
  Eye,
  FileText,
  Globe,
  History,
  LayoutGrid,
  Lightbulb,
  MessageSquare,
  MousePointerClick,
  Settings,
  ShoppingCart,
  Sparkles,
  Table,
  Target,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Card, Pill } from "@/components/ui";
import { simulationIndexPath } from "@/lib/site";
import { cn } from "@/lib/utils";

type VariantResult = {
  name: string;
  conversions: number;
  revenue: number;
  awareness: number;
  roas: number;
  sentiment: number;
  cpa: number;
  ctr: number;
};

const variants: VariantResult[] = [
  {
    name: "Variant A",
    conversions: 54,
    revenue: 3_150,
    awareness: 12.8,
    roas: 0.11,
    sentiment: 0.18,
    cpa: 42.5,
    ctr: 2.85,
  },
  {
    name: "Variant B",
    conversions: 38,
    revenue: 2_420,
    awareness: 11.2,
    roas: 0.08,
    sentiment: 0.24,
    cpa: 56.8,
    ctr: 1.94,
  },
];

const revenuePath = "M0,30 C15,24 25,10 40,18 C55,26 65,12 80,16 C90,19 95,14 100,10";
const conversionsPath = "M0,22 C12,18 22,28 34,24 C46,20 58,32 70,30 C82,28 92,22 100,20";
const awarenessPath = "M0,32 C18,30 32,26 48,22 C64,18 78,14 88,12 C94,11 98,10 100,10";
const sentimentPath = "M0,34 C16,30 30,26 44,22 C58,18 72,14 86,10 C92,8 96,6 100,5";

interface FunnelStage {
  key: string;
  label: string;
  icon: LucideIcon;
  a: number;
  b: number;
}

const funnelStages: FunnelStage[] = [
  { key: "impressions", label: "Impressions",  icon: Eye,              a: 10_000, b: 10_000 }, // equal            → 90 / 90
  { key: "clicks",      label: "Clicks",        icon: MousePointerClick, a: 4_200,  b: 980    }, // A crushes 4.3x   → 90 / 21
  { key: "addToCart",   label: "Add to cart",   icon: ShoppingCart,      a: 370,    b: 860    }, // B dominates 2.3x → 39 / 90
  { key: "conversions", label: "Conversions",   icon: Target,            a: 185,    b: 130    }, // close race A 1.4x→ 90 / 63
];


const dailyTrend: Array<{ day: number; a: number; b: number }> = [
  { day: 1, a: 1.2, b: 1.6 },
  { day: 2, a: 1.6, b: 2.1 },
  { day: 3, a: 2.0, b: 2.8 },
  { day: 4, a: 1.8, b: 2.5 },
  { day: 5, a: 2.3, b: 3.2 },
  { day: 6, a: 2.1, b: 3.0 },
  { day: 7, a: 2.5, b: 3.6 },
  { day: 8, a: 2.4, b: 3.5 },
  { day: 9, a: 2.7, b: 4.0 },
  { day: 10, a: 2.6, b: 3.8 },
  { day: 11, a: 3.0, b: 4.3 },
  { day: 12, a: 2.8, b: 4.1 },
  { day: 13, a: 3.1, b: 4.6 },
  { day: 14, a: 3.2, b: 4.8 },
];

const channelRows = [
  { channel: "Instagram Reels", aConv: 11, aRev: 682, bConv: 17, bRev: 1_028 },
  { channel: "TikTok", aConv: 9, aRev: 546, bConv: 14, bRev: 844 },
  { channel: "Facebook Feed", aConv: 6, aRev: 359, bConv: 7, bRev: 402 },
  { channel: "YouTube Shorts", aConv: 5, aRev: 304, bConv: 5, bRev: 263 },
];

const audienceSegments = [
  { label: "Gen Z · 18–24", a: 3.1, b: 4.7 },
  { label: "Millennials · 25–34", a: 2.8, b: 3.9 },
  { label: "Gen X · 35–44", a: 1.9, b: 2.3 },
  { label: "Boomers · 45+", a: 0.9, b: 1.1 },
];

const creativeScores = [
  { label: "Hook strength", a: 62, b: 84 },
  { label: "Visual saliency", a: 71, b: 88 },
  { label: "CTA clarity", a: 58, b: 79 },
  { label: "Copy resonance", a: 66, b: 81 },
  { label: "Brand fit", a: 78, b: 82 },
];

interface InsightItem {
  icon: LucideIcon;
  title: string;
  detail: string;
}

const insights: InsightItem[] = [
  {
    icon: Zap,
    title: "Stronger hook drives click lift",
    detail:
      "Variant A's high-contrast typography and immediate product value proposition drove a 32% lift in CTR, capturing early attention more effectively.",
  },
  {
    icon: ShoppingCart,
    title: "Variant B excels in engagement",
    detail:
      "Despite lower clicks, Variant B's story-driven approach led to a much higher add-to-cart rate (3.4% vs 1.4%), suggesting deeper product interest once clicked.",
  },
  {
    icon: Target,
    title: "Higher conversion efficiency in A",
    detail:
      "Variant A's direct CTA strategy ultimately won on total conversions (54 vs 38), though there's an opportunity to blend B's engagement tactics.",
  },
];

type TabId = "analysis" | "integrations" | "history" | "settings";

interface Tab {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

const TABS: Tab[] = [
  { id: "analysis", label: "Analysis", icon: Activity },
  { id: "integrations", label: "Integrations", icon: Globe },
  { id: "history", label: "Data History", icon: History },
  { id: "settings", label: "Settings", icon: Settings },
];

interface Service {
  id: string;
  name: string;
  description: string;
  status: "live" | "disconnected";
  lastSynced?: string;
  icon: LucideIcon;
  color: string;
}

interface IntegrationCategory {
  id: string;
  name: string;
  services: Service[];
}

const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
  {
    id: "advertising",
    name: "Advertising Platforms",
    services: [
      {
        id: "meta",
        name: "Meta Ads",
        description: "Sync conversion data automatically",
        status: "live",
        lastSynced: "2m ago",
        icon: MessageSquare,
        color: "bg-blue-600",
      },
      {
        id: "google",
        name: "Google Ads",
        description: "Import campaign performance metrics",
        status: "disconnected",
        icon: Target,
        color: "bg-red-500",
      },
      {
        id: "tiktok",
        name: "TikTok Ads",
        description: "Track video engagement and ROI",
        status: "disconnected",
        icon: Zap,
        color: "bg-black",
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    services: [
      {
        id: "ga4",
        name: "GA4",
        description: "Deep dive into user behavior and paths",
        status: "live",
        lastSynced: "10m ago",
        icon: Activity,
        color: "bg-orange-500",
      },
      {
        id: "mixpanel",
        name: "Mixpanel",
        description: "Advanced event tracking and retention",
        status: "disconnected",
        icon: Database,
        color: "bg-purple-600",
      },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    services: [
      {
        id: "slack",
        name: "Slack",
        description: "Real-time alerts for significant shifts",
        status: "live",
        lastSynced: "1m ago",
        icon: MessageSquare,
        color: "bg-emerald-500",
      },
      {
        id: "zapier",
        name: "Zapier",
        description: "Connect to 5000+ other applications",
        status: "disconnected",
        icon: Zap,
        color: "bg-orange-600",
      },
    ],
  },
];

export function AbVariantCompareSimulatorSection() {
  const [activeTab, setActiveTab] = useState<TabId>("analysis");
  const [activeVariantName, setActiveVariantName] = useState(variants[0].name);
  const [showMainExportMenu, setShowMainExportMenu] = useState(false);

  const winner = useMemo(
    () => variants.reduce((best, current) => (current.conversions > best.conversions ? current : best)),
    [],
  );
  const loser = useMemo(
    () => variants.reduce((worst, current) => (current.conversions < worst.conversions ? current : worst)),
    [],
  );

  const conversionLead = winner.conversions - loser.conversions;
  const revenueLead = winner.revenue - loser.revenue;
  const conversionLift = ((winner.conversions - loser.conversions) / loser.conversions) * 100;
  const revenueLift = ((winner.revenue - loser.revenue) / loser.revenue) * 100;
  const cpaLift = ((loser.cpa - winner.cpa) / loser.cpa) * 100;
  const ctrLift = ((winner.ctr - loser.ctr) / loser.ctr) * 100;

  const activeVariant =
    variants.find((v) => v.name === activeVariantName) ?? variants[0];

  const detailCards = [
    {
      icon: <TrendingUp className="h-4 w-4 text-muted" />,
      label: "Predicted Revenue",
      value: `$${activeVariant.revenue.toLocaleString("en-US")}`,
      tint: "from-[#dcfce7] to-transparent",
      stroke: "#16a34a",
      path: revenuePath,
    },
    {
      icon: <Users className="h-4 w-4 text-muted" />,
      label: "Conversions",
      value: activeVariant.conversions.toString(),
      tint: "from-[#dbeafe] to-transparent",
      stroke: "#2563eb",
      path: conversionsPath,
    },
    {
      icon: <Eye className="h-4 w-4 text-muted" />,
      label: "Awareness Lift",
      value: `${activeVariant.awareness.toFixed(1)}%`,
      tint: "from-[#ccfbf1] to-transparent",
      stroke: "#0d9488",
      path: awarenessPath,
    },
    {
      icon: <Sparkles className="h-4 w-4 text-muted" />,
      label: "Avg Sentiment",
      value: activeVariant.sentiment.toFixed(2),
      tint: "from-[#e9d5ff] to-transparent",
      stroke: "#7c3aed",
      path: sentimentPath,
    },
  ];

  return (
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
            Compare: {variants[0].name} vs {variants[1].name}
          </h1>

        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMainExportMenu(!showMainExportMenu)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all soft-border shadow-sm",
              showMainExportMenu ? "bg-ink text-white" : "bg-panel text-ink hover:bg-panelSoft hover:-translate-y-0.5"
            )}
          >
            <Download className="h-4 w-4" />
            Export to
          </button>
          
          {showMainExportMenu && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowMainExportMenu(false)} />
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white p-2 shadow-2xl soft-border z-40 animate-in fade-in zoom-in-95 duration-200">
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted">Simulation Export</p>
                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-panelSoft transition-colors text-left">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Executive Report</p>
                    <p className="text-[10px] text-muted">Generate PDF summary</p>
                  </div>
                </button>
                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-panelSoft transition-colors text-left">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Presentation Slides</p>
                    <p className="text-[10px] text-muted">Direct to Google Slides</p>
                  </div>
                </button>
                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-panelSoft transition-colors text-left">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Database className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">CRM Sync</p>
                    <p className="text-[10px] text-muted">Push to Salesforce/HubSpot</p>
                  </div>
                </button>
                <div className="my-1 border-t border-line" />
                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-ink hover:bg-panelSoft transition-colors text-left">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-panelSoft text-muted">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-semibold">Share internal link</p>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-line pb-px">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all",
                isActive ? "text-ink" : "text-muted hover:text-ink",
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-ink" : "text-muted")} />
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
              )}
            </button>
          );
        })}
      </div>

      {activeTab === "analysis" ? (
        <AnalysisTab
          winner={winner}
          loser={loser}
          conversionLead={conversionLead}
          revenueLead={revenueLead}
          conversionLift={conversionLift}
          revenueLift={revenueLift}
          cpaLift={cpaLift}
          ctrLift={ctrLift}
          activeVariant={activeVariant}
          setActiveVariantName={setActiveVariantName}
          detailCards={detailCards}
        />
      ) : activeTab === "integrations" ? (
        <IntegrationsTab />
      ) : activeTab === "history" ? (
        <DataHistoryTab />
      ) : (
        <SettingsTab />
      )}
    </div>
  );
}

function AnalysisTab({
  winner,
  loser,
  conversionLead,
  revenueLead,
  conversionLift,
  revenueLift,
  cpaLift,
  ctrLift,
  activeVariant,
  setActiveVariantName,
  detailCards,
}: {
  winner: VariantResult;
  loser: VariantResult;
  conversionLead: number;
  revenueLead: number;
  conversionLift: number;
  revenueLift: number;
  cpaLift: number;
  ctrLift: number;
  activeVariant: VariantResult;
  setActiveVariantName: (name: string) => void;
  detailCards: any[];
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
      <Card className="p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="kicker">A/B Comparison</p>
          <p className="text-xs text-muted">
            Winner: <span className="font-semibold text-ink">{winner.name}</span>
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {variants.map((v) => {
            const isWinner = winner.name === v.name;
            return (
              <div
                key={v.name}
                className={cn(
                  "rounded-2xl border p-5 transition-all",
                  isWinner ? "border-ink bg-white shadow-soft" : "border-line bg-panelSoft/40",
                )}
              >
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-ink">{v.name}</p>
                  {isWinner ? <Pill tone="neutral">Winner</Pill> : null}
                  <VerifiedBadge />
                </div>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <Row label="Conversions" value={v.conversions.toString()} />
                  <Row label="Revenue" value={`$${v.revenue.toLocaleString("en-US")}`} />
                  <Row label="Awareness" value={`${v.awareness.toFixed(1)}%`} />
                  <Row label="ROAS" value={`${v.roas.toFixed(2)}x`} />
                </dl>
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-sm text-muted">
          {winner.name} leads by{" "}
          <span className="font-semibold text-ink">{conversionLead} conversions</span>
          <span className="mx-2">·</span>
          <span className="font-semibold text-ink">
            ${revenueLead.toLocaleString("en-US")} more revenue
          </span>
        </p>
      </Card>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="kicker">Statistical significance</p>
              <p className="mt-1 text-sm font-semibold text-ink">
                Result is significant at 98.8% confidence · safe to ship {winner.name}
              </p>
            </div>
          </div>
          <Pill tone="soft">p = 0.012</Pill>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <LiftCard
            label="Conversions lift"
            value={`+${conversionLift.toFixed(1)}%`}
            sub={`${loser.conversions} → ${winner.conversions}`}
            positive
            verified
          />
          <LiftCard
            label="Revenue lift"
            value={`+${revenueLift.toFixed(1)}%`}
            sub={`$${loser.revenue.toLocaleString("en-US")} → $${winner.revenue.toLocaleString(
              "en-US",
            )}`}
            positive
            verified
          />
          <LiftCard
            label="CPA reduction"
            value={`-${cpaLift.toFixed(1)}%`}
            sub={`$${loser.cpa.toFixed(2)} → $${winner.cpa.toFixed(2)}`}
            positive
          />
          <LiftCard
            label="CTR lift"
            value={`+${ctrLift.toFixed(1)}%`}
            sub={`${loser.ctr.toFixed(2)}% → ${winner.ctr.toFixed(2)}%`}
            positive
            verified
          />
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted">Viewing:</span>
          <div className="inline-flex items-center gap-1 rounded-full bg-panel p-1 soft-border">
            {variants.map((v) => {
              const isActive = v.name === activeVariant.name;
              return (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setActiveVariantName(v.name)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                    isActive ? "bg-ink text-white" : "text-muted hover:text-ink",
                  )}
                >
                  {v.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {detailCards.map((c) => (
            <Card key={c.label} className="overflow-hidden p-5">
              <div className="flex items-center gap-2 text-xs font-medium text-muted">
                {c.icon}
                {c.label}
                <VerifiedBadge />
              </div>
              <p className="headline mt-3 text-3xl text-ink">{c.value}</p>
              <div className={cn("mt-4 h-12 rounded-lg bg-gradient-to-b", c.tint)}>
                <svg viewBox="0 0 100 40" className="h-full w-full" preserveAspectRatio="none">
                  <path
                    d={c.path}
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

      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="kicker">Conversion funnel</p>
            <p className="mt-1 text-sm text-muted">
              Where {winner.name} pulls ahead at each stage of the buyer journey.
            </p>
          </div>
          <LegendDots />
        </div>

        <div className="mt-6 space-y-4">
          {funnelStages.map((stage, idx) => {
            const Icon = stage.icon;
            const maxValue = Math.max(stage.a, stage.b);
            const aWidth = Math.round((stage.a / maxValue) * 90);
            const bWidth = Math.round((stage.b / maxValue) * 90);
            const delta = stage.b - stage.a;
            const deltaPct = stage.a === 0 ? 0 : ((stage.b - stage.a) / stage.a) * 100;
            const prev = idx === 0 ? null : funnelStages[idx - 1];
            const aConv = prev ? (stage.a / prev.a) * 100 : null;
            const bConv = prev ? (stage.b / prev.b) * 100 : null;

            const stageTints = [
              "bg-cyan-50/30",
              "bg-indigo-50/30",
              "bg-violet-50/30",
              "bg-emerald-50/30",
            ];
            const stageTint = stageTints[idx % stageTints.length];

            return (
              <div
                key={stage.key}
                className={cn("rounded-2xl p-4 soft-border transition-all", stageTint)}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white soft-border">
                      <Icon className="h-4 w-4 text-ink" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {stage.label}
                        {idx === 0 && <span className="ml-2 inline-block"><VerifiedBadge /></span>}
                      </p>
                      {aConv !== null && bConv !== null ? (
                        <p className="text-[11px] text-muted">
                          Step conversion · A {aConv.toFixed(1)}% · B {bConv.toFixed(1)}%
                        </p>
                      ) : (
                        <p className="text-[11px] text-muted">Equal traffic baseline</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={cn(
                        "text-xs font-semibold",
                        delta > 0 ? "text-indigo-600" : "text-cyan-600",
                      )}
                    >
                      {delta >= 0 ? "+" : ""}
                      {delta.toLocaleString("en-US")}{" "}
                      <span className="font-normal text-muted">
                        ({deltaPct >= 0 ? "+" : ""}
                        {deltaPct.toFixed(1)}%)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <FunnelBar
                    label="A"
                    count={stage.a}
                    widthPct={aWidth}
                    color="bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                  />
                  <FunnelBar
                    label="B"
                    count={stage.b}
                    widthPct={bWidth}
                    color="bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-[0_0_12px_rgba(79,70,229,0.3)]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="kicker">Daily conversion trend</p>
            <p className="mt-1 text-sm text-muted">
              Projected daily conversion rate across the 14-day simulation horizon.
            </p>
          </div>
          <LegendDots />
        </div>

        <TrendChart data={dailyTrend} />
      </Card>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="p-6 sm:p-8 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="kicker">Channel breakdown</p>
              <p className="mt-1 text-sm text-muted">
                Which platforms drive the winning variant&apos;s performance gap.
              </p>
            </div>
            <LegendDots />
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl soft-border">
            <table className="w-full text-sm">
              <thead className="bg-panelSoft/60">
                <tr className="text-left text-[10px] uppercase tracking-[0.16em] text-muted">
                  <th className="px-4 py-3 font-semibold">Channel</th>
                  <th className="px-4 py-3 font-semibold">A · Conv / Rev</th>
                  <th className="px-4 py-3 font-semibold">B · Conv / Rev</th>
                  <th className="px-4 py-3 text-right font-semibold">Δ Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white">
                {channelRows.map((row) => {
                  const delta = row.bRev - row.aRev;
                  const positive = delta >= 0;
                  return (
                    <tr key={row.channel}>
                      <td className="px-4 py-3 font-medium text-ink">
                        <div className="flex items-center gap-2">
                          {row.channel}
                          {row.channel.includes("Instagram") && <VerifiedBadge />}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted">
                        {row.aConv} · ${row.aRev.toLocaleString("en-US")}
                      </td>
                      <td className="px-4 py-3 text-ink">
                        <span className="font-semibold">{row.bConv}</span> ·{" "}
                        <span className="font-semibold">${row.bRev.toLocaleString("en-US")}</span>
                      </td>
                      <td
                        className={cn(
                          "px-4 py-3 text-right font-semibold",
                          positive ? "text-emerald-600" : "text-rose-600",
                        )}
                      >
                        {positive ? "+" : ""}${delta.toLocaleString("en-US")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 lg:col-span-2">
          <p className="kicker">Audience segments</p>
          <p className="mt-1 text-sm text-muted">Conversion rate by cohort (%)</p>

          <div className="mt-6 space-y-5">
            {audienceSegments.map((seg) => {
              const max = Math.max(...audienceSegments.map((s) => Math.max(s.a, s.b)));
              const aPct = (seg.a / max) * 100;
              const bPct = (seg.b / max) * 100;
              return (
                <div key={seg.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-ink">{seg.label}</span>
                    <span className="text-muted">
                      A {seg.a}% · <span className="font-semibold text-ink">B {seg.b}%</span>
                    </span>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="h-2 w-full rounded-full bg-line/60 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-cyan-500"
                        style={{ width: `${aPct}%` }}
                      />
                    </div>
                    <div className="h-2 w-full rounded-full bg-line/60 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-indigo-600"
                        style={{ width: `${bPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="kicker">Creative element scorecard</p>
            <p className="mt-1 text-sm text-muted">
              Agent-scored diagnostics on each creative dimension (0–100).
            </p>
          </div>
          <LegendDots />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {creativeScores.map((score) => {
            const delta = score.b - score.a;
            return (
              <div key={score.label} className="rounded-2xl bg-panelSoft/40 p-4 soft-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink">{score.label}</span>
                  <span
                    className={cn(
                      "font-semibold",
                      delta >= 0 ? "text-emerald-600" : "text-rose-600",
                    )}
                  >
                    {delta >= 0 ? "+" : ""}
                    {delta}
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  <ScoreBar label="A" value={score.a} color="bg-cyan-500" />
                  <ScoreBar label="B" value={score.b} color="bg-indigo-600" />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accentSoft">
            <Lightbulb className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="kicker">Why {winner.name} won</p>
            <p className="mt-1 text-sm text-muted">
              Top drivers extracted from the agent simulation cohort.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {insights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-panelSoft/50 p-5 soft-border transition-all hover:bg-white hover:shadow-soft"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white soft-border">
                  <Icon className="h-4 w-4 text-ink" />
                </div>
                <p className="mt-4 text-sm font-semibold text-ink">{item.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{item.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-ink p-5 text-white">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
              Recommended action
            </p>
            <p className="mt-1 text-sm font-semibold">
              Ship Variant A as the primary creative to maximize conversion volume, while testing
              Variant B&apos;s narrative style on high-intent retargeting audiences.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Apply recommendation
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </Card>
    </div>
  );
}

function DataHistoryTab() {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const history = [
    { id: "SIM-8429", name: "Q4 Holiday Narrative Test", date: "Oct 22, 2024", a: "4.2%", b: "5.1%", lift: "+21.4%", status: "Significant" },
    { id: "SIM-8311", name: "Social Proof vs. Benefit Lead", date: "Oct 15, 2024", a: "3.8%", b: "3.9%", lift: "+2.6%", status: "Inconclusive" },
    { id: "SIM-8104", name: "Vercel Style Clean Sweep", date: "Sep 28, 2024", a: "4.5%", b: "4.1%", lift: "-8.8%", status: "Significant" },
    { id: "SIM-7922", name: "Price Sensitivity Simulation", date: "Sep 12, 2024", a: "2.1%", b: "2.4%", lift: "+14.2%", status: "Completed" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Simulation History</h2>
          <p className="text-sm text-muted">A complete log of all past A/B simulations for this campaign.</p>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowExportMenu(!showExportMenu)}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all soft-border shadow-sm",
              showExportMenu ? "bg-ink text-white" : "bg-white text-ink hover:bg-panelSoft"
            )}
          >
            <Download className="h-3.5 w-3.5" />
            Export All
          </button>

          {showExportMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowExportMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white p-2 shadow-xl soft-border z-20 animate-in fade-in zoom-in-95 duration-200">
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted">Format</p>
                <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink hover:bg-panelSoft transition-colors">
                  <Table className="h-3.5 w-3.5 text-emerald-500" />
                  Export as CSV (.csv)
                </button>
                <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink hover:bg-panelSoft transition-colors">
                  <FileText className="h-3.5 w-3.5 text-rose-500" />
                  Export as PDF (.pdf)
                </button>
                <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink hover:bg-panelSoft transition-colors">
                  <Code className="h-3.5 w-3.5 text-blue-500" />
                  Export as JSON (.json)
                </button>
                <div className="my-1 border-t border-line" />
                <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink hover:bg-panelSoft transition-colors">
                  <Clipboard className="h-3.5 w-3.5 text-muted" />
                  Copy to Clipboard
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Card className="overflow-hidden soft-border">
        <table className="w-full text-sm">
          <thead className="bg-panelSoft/60 border-b border-line">
            <tr className="text-left text-[10px] uppercase tracking-[0.16em] text-muted">
              <th className="px-6 py-4 font-semibold">Simulation ID</th>
              <th className="px-6 py-4 font-semibold">Test Name</th>
              <th className="px-6 py-4 font-semibold">Variant A / B</th>
              <th className="px-6 py-4 font-semibold text-center">Relative Lift</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-white">
            {history.map((row) => (
              <tr key={row.id} className="group hover:bg-panelSoft/30 transition-colors">
                <td className="px-6 py-4 font-mono text-[11px] text-muted">{row.id}</td>
                <td className="px-6 py-4 font-medium text-ink">{row.name}</td>
                <td className="px-6 py-4 text-muted">
                  {row.a} / <span className="font-semibold text-ink">{row.b}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={cn(
                    "inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold",
                    row.lift.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  )}>
                    {row.lift}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 text-[11px] font-medium",
                    row.status === "Significant" ? "text-indigo-600" : "text-muted"
                  )}>
                    {row.status === "Significant" && <Sparkles className="h-3 w-3" />}
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-xs">View Report</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-4xl space-y-8">
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-ink">Simulation Parameters</h2>
          <p className="text-sm text-muted">Fine-tune how the neural engine calculates outcomes.</p>
        </div>
        
        <Card className="p-6 space-y-6">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted">Confidence Threshold</label>
              <div className="grid grid-cols-3 gap-2">
                {["90%", "95%", "99%"].map((val) => (
                  <button
                    key={val}
                    className={cn(
                      "rounded-lg py-2 text-xs font-semibold transition-all soft-border",
                      val === "95%" ? "bg-ink text-white shadow-lg" : "bg-white text-ink hover:bg-panelSoft"
                    )}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-muted">Lower thresholds yield results faster but with higher risk of false positives.</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted">Statistical Engine</label>
              <div className="flex p-1 bg-panelSoft rounded-xl soft-border">
                <button className="flex-1 rounded-lg py-1.5 text-xs font-semibold bg-white shadow-sm text-ink">Bayesian</button>
                <button className="flex-1 rounded-lg py-1.5 text-xs font-semibold text-muted hover:text-ink transition-colors">Frequentist</button>
              </div>
              <p className="text-[11px] text-muted">Bayesian analysis allows for early stopping and probability-to-be-best calculations.</p>
            </div>
          </div>

          <div className="border-t border-line pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">Auto-Deploy Winner</p>
                <p className="text-xs text-muted">Automatically push the winning variant to production if significance hits 99%.</p>
              </div>
              <button className="relative h-6 w-11 rounded-full bg-line transition-colors focus:outline-none">
                <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-ink">Notifications & Alerts</h2>
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Significance Alert</p>
                <p className="text-xs text-muted">Notify team when a variant reaches statistical significance.</p>
              </div>
            </div>
            <button className="relative h-6 w-11 rounded-full bg-indigo-600 transition-colors focus:outline-none">
              <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-line pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Underperformance Warning</p>
                <p className="text-xs text-muted">Alert if ROAS drops below $0.05 during the simulation period.</p>
              </div>
            </div>
            <button className="relative h-6 w-11 rounded-full bg-rose-600 transition-colors focus:outline-none">
              <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>
        </Card>
      </section>

      <div className="flex justify-end gap-3 pt-4 border-t border-line">
        <button className="rounded-full px-6 py-2.5 text-sm font-semibold text-ink hover:bg-panelSoft transition-colors">Discard changes</button>
        <button className="rounded-full bg-ink px-8 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 shadow-lg">Save Settings</button>
      </div>
    </div>
  );
}

function IntegrationsTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
      {INTEGRATION_CATEGORIES.map((category) => (
        <div key={category.id} className="space-y-4">
          <h2 className="kicker px-2">{category.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.services.map((service) => {
              const Icon = service.icon;
              const isLive = service.status === "live";
              return (
                <Card key={service.id} className="flex flex-col p-6 shadow-sm hover:shadow-soft transition-all">
                  <div className="flex items-start justify-between">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg", service.color)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      {isLive && (
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                          Live
                        </span>
                      )}
                      <button 
                        type="button"
                        className={cn(
                          "relative h-5 w-9 rounded-full transition-colors focus:outline-none",
                          isLive ? "bg-ink" : "bg-line"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 h-3 w-3 rounded-full bg-white transition-all",
                          isLive ? "left-5" : "left-1"
                        )} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 flex-1">
                    <h3 className="text-base font-semibold text-ink">{service.name}</h3>
                    <p className="mt-1 text-xs text-muted leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                    {isLive ? (
                      <p className="text-[10px] text-muted">
                        Last synced: <span className="font-medium text-ink">{service.lastSynced}</span>
                      </p>
                    ) : (
                      <p className="text-[10px] text-muted italic">Not connected</p>
                    )}
                    <button className={cn(
                      "text-xs font-semibold transition-colors",
                      isLive ? "text-muted hover:text-rose-500" : "text-blue-600 hover:text-blue-700"
                    )}>
                      {isLive ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Empty State Illustration Concept */}
      {INTEGRATION_CATEGORIES.length === 0 && (
        <div className="py-20 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-panelSoft opacity-50">
            <Globe className="h-12 w-12 text-muted" />
          </div>
          <h3 className="headline mt-6 text-2xl">No integrations found</h3>
          <p className="mt-2 text-muted">Connect your first service to start syncing live performance data.</p>
          <button className="mt-8 rounded-full bg-ink px-8 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-1">
            Get Started
          </button>
        </div>
      )}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <div 
      className="group relative inline-flex ml-1.5"
      title="Verified Data: Pulled via Direct API Integration"
    >
      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[1px] shadow-[0_0_8px_rgba(37,99,235,0.3)] cursor-help">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
          <CheckCircle2 className="h-2.5 w-2.5 text-blue-600" />
        </div>
      </div>
    </div>
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

function LiftCard({
  label,
  value,
  sub,
  positive,
  verified,
}: {
  label: string;
  value: string;
  sub: string;
  positive: boolean;
  verified?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-panelSoft/50 p-4 soft-border">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
        {verified && <VerifiedBadge />}
      </div>
      <p
        className={cn(
          "mt-2 text-2xl font-semibold tracking-tight",
          positive ? "text-emerald-600" : "text-rose-600",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-[11px] text-muted">{sub}</p>
    </div>
  );
}

function LegendDots() {
  return (
    <div className="flex items-center gap-4 text-[11px] text-muted">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-cyan-500" />
        Variant A
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-indigo-600" />
        Variant B
      </span>
    </div>
  );
}

function FunnelBar({
  label,
  count,
  widthPct,
  color,
}: {
  label: string;
  count: number;
  widthPct: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-4 text-[11px] font-semibold text-muted">{label}</span>
      <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-line/50">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${widthPct}%` }}
        />
      </div>
      <span className="w-16 text-right text-xs font-semibold text-ink">
        {count.toLocaleString()}
      </span>
    </div>
  );
}

function ScoreBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-4 text-[10px] font-semibold text-muted">{label}</span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-line/60">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${value}%` }} />
      </div>
      <span className="w-8 text-right text-[11px] font-semibold text-ink">{value}</span>
    </div>
  );
}

function TrendChart({ data }: { data: Array<{ day: number; a: number; b: number }> }) {
  const width = 800;
  const height = 260;
  const padding = { top: 20, right: 16, bottom: 32, left: 36 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const maxY = Math.max(...data.flatMap((d) => [d.a, d.b])) * 1.1;
  const minY = 0;

  const xScale = (day: number) =>
    padding.left + ((day - data[0].day) / (data[data.length - 1].day - data[0].day)) * innerW;
  const yScale = (value: number) =>
    padding.top + innerH - ((value - minY) / (maxY - minY)) * innerH;

  const toPath = (key: "a" | "b") =>
    data
      .map((d, i) => {
        const x = xScale(d.day);
        const y = yScale(d[key]);
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");

  const toArea = (key: "a" | "b") => {
    const line = toPath(key);
    const last = data[data.length - 1];
    const first = data[0];
    return `${line} L${xScale(last.day).toFixed(2)},${yScale(0).toFixed(2)} L${xScale(first.day).toFixed(2)},${yScale(0).toFixed(2)} Z`;
  };

  const gridYs = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="mt-5 overflow-hidden rounded-2xl bg-panelSoft/30 p-4 soft-border">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Daily conversion trend"
      >
        <defs>
          <linearGradient id="abTrendA" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="abTrendB" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridYs.map((g, i) => {
          const y = padding.top + innerH * g;
          const value = (maxY * (1 - g)).toFixed(1);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                x2={padding.left + innerW}
                y1={y}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="3 4"
              />
              <text
                x={padding.left - 8}
                y={y + 3}
                textAnchor="end"
                fontSize="10"
                fill="#94a3b8"
              >
                {value}%
              </text>
            </g>
          );
        })}

        {data.map((d) => {
          if (d.day % 2 !== 1) return null;
          const x = xScale(d.day);
          return (
            <text
              key={d.day}
              x={x}
              y={height - padding.bottom + 18}
              textAnchor="middle"
              fontSize="10"
              fill="#94a3b8"
            >
              D{d.day}
            </text>
          );
        })}

        <path d={toArea("a")} fill="url(#abTrendA)" />
        <path
          d={toPath("a")}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path d={toArea("b")} fill="url(#abTrendB)" />
        <path
          d={toPath("b")}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {data.map((d) => (
          <g key={`dot-${d.day}`}>
            <circle cx={xScale(d.day)} cy={yScale(d.a)} r="2.5" fill="#06b6d4" />
            <circle cx={xScale(d.day)} cy={yScale(d.b)} r="3" fill="#4f46e5" />
          </g>
        ))}
      </svg>
    </div>
  );
}
