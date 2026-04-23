"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  DollarSign,
  Download,
  Eye,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";

import { Card } from "@/components/ui";
import { BrainViewerLazy } from "@/components/brain/BrainViewerLazy";

// Small lowercase-friendly chip to match the design (Pill component enforces UPPERCASE).
function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-panelSoft px-2.5 py-0.5 text-xs font-medium text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
import { simulationIndexPath } from "@/lib/site";
import { cn } from "@/lib/utils";

// ---------- sparklines for the 4 hero KPI cards ----------
const revenueSpark = "M0,26 L12,24 L24,23 L36,27 L50,32 L62,32 L74,20 L86,14 L100,14";
const conversionsSpark = "M0,18 L12,22 L24,26 L36,30 L50,33 L62,30 L74,24 L86,20 L100,20";
const awarenessSpark = "M0,30 L14,29 L28,28 L42,26 L56,22 L70,16 L84,14 L100,14";
const sentimentSpark = "M0,30 L14,30 L30,30 L46,28 L62,22 L76,16 L90,12 L100,12";

// ---------- brain activation metrics ----------
type BrainMetric = { label: string; value: number; active: boolean };

const brainMetrics: BrainMetric[] = [
  { label: "Attention", value: 68, active: true },
  { label: "Sustained", value: 45, active: false },
  { label: "Arousal", value: 35, active: false },
  { label: "Valence", value: 62, active: true },
  { label: "Reward", value: 55, active: true },
  { label: "Memory", value: 52, active: true },
  { label: "Social", value: 72, active: true },
  { label: "Curiosity", value: 38, active: false },
];

// ---------- agent journey data ----------
type JourneyEvent = {
  day: number;
  stage?: string;
  emotion?: string;
  text: string;
  action?: string;
};

type Agent = {
  initial: string;
  name: string;
  age: number;
  gender: string;
  outcome: string;
  summary: string;
  wom: number;
  exp: number;
  confidence: string;
  events: JourneyEvent[];
};

const fatimaEvents: JourneyEvent[] = [
  {
    day: 1,
    stage: "reminded of brand",
    emotion: "curious",
    text:
      "Saw it while scrolling during Emma's nap - the before/after transformation was really eye-catching. I've tried GlowUp before so I paused to look.",
    action: "liked post",
  },
  {
    day: 2,
    text: "Same ad again while checking Instagram before coffee. Looked familiar but I was rushing to get breakfast ready.",
  },
  {
    day: 3,
    stage: "growing interest",
    emotion: "interested",
    text:
      "Third time seeing this - the aesthetic is so clean and minimalist. Clicked through to see their profile and looked at a few posts.",
    action: "visited profile",
  },
  {
    day: 5,
    stage: "considering purchase",
    emotion: "excited",
    text:
      "Saw a new creative showing their vitamin C serum - my current one is almost empty! Saved it to check out later.",
    action: "saved post",
  },
  {
    day: 6,
    text: "Same transformation post again. Starting to feel repetitive but still looks good.",
  },
  {
    day: 7,
    stage: "active consideration",
    emotion: "interested",
    text:
      "Saw a different ad showing multiple products - clicked through to their website to browse the full range.",
    action: "visited website",
  },
  {
    day: 8,
    emotion: "curious",
    text:
      "Stopped to read the comments on their post - wanted to see real reviews from other users before potentially buying.",
    action: "read comments",
  },
  {
    day: 9,
    stage: "ad fatigue setting in",
    emotion: "slightly annoyed",
    text: "This is getting repetitive - I've seen this exact creative like 5 times now. Need something fresh.",
  },
  {
    day: 10,
    stage: "intent to purchase",
    emotion: "excited",
    text:
      "New post showing a bundle deal - my FOMO kicked in seeing 'limited time offer'! Added the vitamin C serum and cleanser to cart.",
    action: "added to cart",
  },
  {
    day: 11,
    stage: "reminded",
    text: "Reminder that I had items in my cart - went back to the website to look at my saved items.",
  },
];

const jasmineEvents: JourneyEvent[] = [
  {
    day: 1,
    emotion: "intrigued",
    text: "Caught a high-energy Reel with bright, clean colors. The vibes were immaculate.",
    action: "watched 75%",
  },
  {
    day: 3,
    stage: "building interest",
    text: "Targeted again with a product demo showing the texture. Looks very satisfying.",
  },
  {
    day: 5,
    emotion: "convinced",
    text: "Saw an influencer I trust using the product in her GRWM. It actually looks glowy.",
    action: "commented",
  },
  {
    day: 8,
    stage: "price check",
    text: "Visited the site to check if they have any student discounts or first-purchase offers.",
  },
  {
    day: 12,
    stage: "conversion",
    text: "Used a 10% influencer discount code from my favorite creator. Finally pulled the trigger!",
    action: "purchased",
  },
];

const ahmedEvents: JourneyEvent[] = [
  {
    day: 2,
    text: "Saw a minimalist ad during my gym scroll. The black-and-white aesthetic felt premium.",
  },
  {
    day: 5,
    emotion: "interested",
    text: "Second exposure. I liked that they emphasize simple ingredients. No fluff.",
  },
  {
    day: 9,
    stage: "validating",
    text: "Saw a post with over 500 comments. People seem to really love the results.",
    action: "read 15 comments",
  },
  {
    day: 12,
    stage: "final push",
    text: "Got a 'Last chance for early access' notification. My FOMO won this time.",
    action: "purchased",
  },
];

const leilaEvents: JourneyEvent[] = [
  {
    day: 1,
    emotion: "peaceful",
    text: "The minimalist aesthetic initially caught my eye. It didn't feel like a loud ad.",
  },
  {
    day: 4,
    stage: "social validation",
    text: "My friend shared a Story using the same serum. Seeing it on a real person helped.",
  },
  {
    day: 11,
    text: "Repeated exposure made it feel like a staple. Decided it was time to upgrade my routine.",
    action: "purchased",
  },
];

const zaraEvents: JourneyEvent[] = [
  {
    day: 1,
    text: "Drawn to the clear transformation results. I've been looking for something for my skin texture.",
  },
  {
    day: 7,
    text: "Bookmarked the site. I'm waiting for a sale before I commit to a full set.",
    action: "bookmarked",
  },
  {
    day: 13,
    stage: "flash sale",
    text: "Notification for a 24-hour flash sale hit. This was exactly what I was waiting for.",
    action: "purchased",
  },
];

const oliviaEvents: JourneyEvent[] = [
  {
    day: 2,
    text: "Saw the brand featured in a 'top skincare picks' list. Familiarity is building.",
  },
  {
    day: 10,
    emotion: "comfortable",
    text: "The ads have started feeling like a regular part of my feed. Trust is increasing.",
  },
  {
    day: 14,
    text: "A friend sent me a referral link right as a sale started. Irresistible deal.",
    action: "purchased",
  },
];

const mayaEvents: JourneyEvent[] = [
  {
    day: 3,
    text: "The product demo looked effective and the scientific backing impressed me.",
  },
  {
    day: 15,
    stage: "practical need",
    text: "Ran out of my current CeraVe cleanser. Perfect timing to try something new.",
  },
  {
    day: 15,
    text: "It's payday, and I saw a post showing the effectiveness one last time. Done.",
    action: "purchased",
  },
];

const sophia39Events: JourneyEvent[] = [
  {
    day: 1,
    text: "Saw a subtle ad in my feed. Clean design, but I wasn't in a shopping mood.",
  },
  {
    day: 6,
    emotion: "convinced",
    text: "Detailed testimonial from someone my age popped up. They had similar skin concerns.",
  },
  {
    day: 12,
    text: "A colleague mentioned they use it. That final bit of social proof was all I needed.",
    action: "purchased",
  },
];

const emmaEvents: JourneyEvent[] = [
  {
    day: 1,
    text: "The color palette and photography piqued my interest. Very professional look.",
  },
  {
    day: 5,
    stage: "deep consideration",
    text: "Spent 10 minutes reading the full ingredient list and research whitepapers on their site.",
  },
  {
    day: 13,
    text: "Saw a high-quality before/after that looked authentic, not filtered. Convinced me.",
    action: "purchased",
  },
];

const sophia52Events: JourneyEvent[] = [
  {
    day: 1,
    text: "Ignored the first ad. I usually skip past anything that looks like a promotion.",
  },
  {
    day: 10,
    text: "Noticed it again. The minimalist packaging looks premium and suited for my vanity.",
  },
  {
    day: 21,
    text: "A limited-time discount offer appeared. The FOMO and the prestige factor led to purchase.",
    action: "purchased",
  },
];

const agents: Agent[] = [
  {
    initial: "F",
    name: "Fatima",
    age: 44,
    gender: "female",
    outcome: "purchased",
    summary:
      "Fatima's FOMO and impulsive nature led her to purchase after seeing multiple creatives over 12 days, with the final trigger being a friend's recommendation which validated her desire to buy.",
    wom: 4,
    exp: 14,
    confidence: "85.0%",
    events: fatimaEvents,
  },
  {
    initial: "J",
    name: "Jasmine",
    age: 24,
    gender: "female",
    outcome: "purchased",
    summary:
      "Started curious about the brand after seeing eye-catching ads, built consideration over several touchpoints, and converted when she saw a limited-time influencer discount code.",
    wom: 4,
    exp: 12,
    confidence: "85.0%",
    events: jasmineEvents,
  },
  {
    initial: "A",
    name: "Ahmed",
    age: 32,
    gender: "male",
    outcome: "purchased",
    summary:
      "Ahmed's impulsive and FOMO-driven personality led him to gradually warm up to GlowUp through repeated exposure, eventually purchasing after seeing a high-social-proof post.",
    wom: 4,
    exp: 12,
    confidence: "85.0%",
    events: ahmedEvents,
  },
  {
    initial: "L",
    name: "Leila",
    age: 32,
    gender: "female",
    outcome: "purchased",
    summary:
      "The minimalist aesthetic initially caught my attention, but it was the combination of repeated exposure and my friend's positive review that ultimately convinced me to try the product.",
    wom: 151,
    exp: 11,
    confidence: "80.0%",
    events: leilaEvents,
  },
  {
    initial: "Z",
    name: "Zara",
    age: 31,
    gender: "female",
    outcome: "purchased",
    summary:
      "As a deal-seeking skincare enthusiast, I was initially drawn to the transformation results but waited for a discount. The flash sale notification was the final push I needed.",
    wom: 15,
    exp: 13,
    confidence: "80.0%",
    events: zaraEvents,
  },
  {
    initial: "O",
    name: "Olivia",
    age: 32,
    gender: "female",
    outcome: "purchased",
    summary:
      "The frequent exposure built awareness and familiarity, but the combination of a flash sale and friend recommendation made the purchase irresistible at the 14-day mark.",
    wom: 3,
    exp: 14,
    confidence: "80.0%",
    events: oliviaEvents,
  },
  {
    initial: "M",
    name: "Maya",
    age: 23,
    gender: "female",
    outcome: "purchased",
    summary:
      "Maya converted after 15 days due to a perfect storm of practical need (running out of CeraVe), financial timing (payday), and seeing the product's effectiveness on social media.",
    wom: 1,
    exp: 12,
    confidence: "80.0%",
    events: mayaEvents,
  },
  {
    initial: "S",
    name: "Sophia",
    age: 39,
    gender: "female",
    outcome: "purchased",
    summary:
      "Sophia was gradually warmed up by repeated ad exposure but only converted when her friend provided social proof that the product actually worked as advertised.",
    wom: 1,
    exp: 12,
    confidence: "80.0%",
    events: sophia39Events,
  },
  {
    initial: "E",
    name: "Emma",
    age: 52,
    gender: "female",
    outcome: "purchased",
    summary:
      "Emma's journey was a classic research-driven purchase influenced by social proof. The eye-catching visuals initially piqued her interest, leading to deep consideration.",
    wom: 1,
    exp: 13,
    confidence: "80.0%",
    events: emmaEvents,
  },
  {
    initial: "S",
    name: "Sophia",
    age: 52,
    gender: "female",
    outcome: "purchased",
    summary:
      "Initially ad-averse and ignored the campaign, but the limited-time discount offer triggered FOMO and led to purchase after several weeks of subtle consideration.",
    wom: 1,
    exp: 12,
    confidence: "80.0%",
    events: sophia52Events,
  },
];

// ---------- daily performance chart data ----------
const dailyPerfPoints = [
  { x: 0, v: 47000 },
  { x: 1, v: 22000 },
  { x: 2, v: 2000 },
  { x: 3, v: 1500 },
  { x: 4, v: 1500 },
  { x: 5, v: 8000 },
  { x: 6, v: 48000 },
  { x: 7, v: 30000 },
  { x: 8, v: 4000 },
  { x: 9, v: 1500 },
  { x: 10, v: 1500 },
  { x: 11, v: 1500 },
  { x: 12, v: 12000 },
  { x: 13, v: 40000 },
  { x: 14, v: 48000 },
];

// ---------- funnel ----------
type FunnelStage = { key: string; label: string; count: string; pct: string; width: number; color: string };

const funnelBreakdown: FunnelStage[] = [
  { key: "aware", label: "Aware", count: "8.8K", pct: "17.6%", width: 22, color: "bg-blue-500" },
  { key: "loyal", label: "Loyal", count: "0", pct: "0.0%", width: 0, color: "bg-teal-500" },
  { key: "unaware", label: "Unaware", count: "40.6K", pct: "81.2%", width: 100, color: "bg-neutral-800" },
  { key: "intending", label: "Intending", count: "37", pct: "0.1%", width: 1, color: "bg-amber-400" },
  { key: "purchased", label: "Purchased", count: "45", pct: "0.1%", width: 1, color: "bg-emerald-500" },
  { key: "considering", label: "Considering", count: "505", pct: "1.0%", width: 3, color: "bg-violet-500" },
];

// ---------- creative benchmarks ----------
type Benchmark = { label: string; value: number; percentile: string };

const benchmarks: Benchmark[] = [
  { label: "Attention Capture", value: 68, percentile: "P88" },
  { label: "Sustained Attention", value: 45, percentile: "P63" },
  { label: "Emotional Arousal", value: 35, percentile: "P75" },
  { label: "Emotional Valence", value: 62, percentile: "P63" },
  { label: "Reward", value: 55, percentile: "P75" },
  { label: "Memory Encoding", value: 52, percentile: "P88" },
  { label: "Social Resonance", value: 72, percentile: "P100" },
  { label: "Curiosity", value: 38, percentile: "P63" },
];

// ---------- awareness / sentiment / memory chart ----------
type SeriesPoint = { x: number; y: number };

const awarenessSeries: SeriesPoint[] = [
  { x: 0, y: 0.118 },
  { x: 2, y: 0.122 },
  { x: 4, y: 0.124 },
  { x: 6, y: 0.128 },
  { x: 7, y: 0.14 },
  { x: 8, y: 0.142 },
  { x: 10, y: 0.144 },
  { x: 12, y: 0.144 },
  { x: 14, y: 0.144 },
];

const sentimentSeries: SeriesPoint[] = [
  { x: 0, y: 0.06 },
  { x: 2, y: 0.078 },
  { x: 4, y: 0.072 },
  { x: 6, y: 0.062 },
  { x: 7, y: 0.104 },
  { x: 8, y: 0.096 },
  { x: 10, y: 0.084 },
  { x: 12, y: 0.076 },
  { x: 14, y: 0.072 },
];

const memorySeries: SeriesPoint[] = [
  { x: 0, y: 0.012 },
  { x: 2, y: 0.014 },
  { x: 4, y: 0.016 },
  { x: 6, y: 0.02 },
  { x: 7, y: 0.03 },
  { x: 8, y: 0.032 },
  { x: 10, y: 0.034 },
  { x: 12, y: 0.034 },
  { x: 14, y: 0.034 },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export function HaileyBieberSimulatorSection() {
  const [expandedAgent, setExpandedAgent] = useState<string | null>("Fatima");

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href={simulationIndexPath}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Simulations
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="headline text-3xl leading-tight text-ink md:text-[2.25rem]">
              Hailey Bieber Instagram Feed Campaign
            </h1>
            <Chip>Deep Simulation</Chip>
          </div>
          <p className="mt-2 text-sm text-muted">
            single · 50.0K agents · 745.7s · 30 archetypes · 75.8% confidence
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-panel px-5 py-2.5 text-sm font-semibold text-ink soft-border transition-all hover:-translate-y-0.5 hover:bg-panelSoft"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* Hero KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <HeroKpi
          icon={<DollarSign className="h-4 w-4 text-muted" />}
          label="Predicted Revenue"
          value="$2,250"
          tint="from-[#dcfce7] to-transparent"
          stroke="#16a34a"
          path={revenueSpark}
        />
        <HeroKpi
          icon={<Users className="h-4 w-4 text-muted" />}
          label="Conversions"
          value="45"
          tint="from-[#dbeafe] to-transparent"
          stroke="#2563eb"
          path={conversionsSpark}
        />
        <HeroKpi
          icon={<Eye className="h-4 w-4 text-muted" />}
          label="Awareness Lift"
          value="4.7%"
          tint="from-[#ccfbf1] to-transparent"
          stroke="#0d9488"
          path={awarenessSpark}
        />
        <HeroKpi
          icon={<TrendingUp className="h-4 w-4 text-muted" />}
          label="Avg Sentiment"
          value="0.03"
          tint="from-[#e9d5ff] to-transparent"
          stroke="#7c3aed"
          path={sentimentSpark}
        />
      </div>

      {/* 3 secondary metric cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SecondaryKpi label="WOM Amplification" value="1.00x" />
        <SecondaryKpi label="Viral Coefficient" value="K = 0.077" />
        <SecondaryKpi label="Prediction Confidence" value="75.8%" />
      </div>

      {/* Brain Activation */}
      <Card className="p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold text-ink">Brain Activation</p>
          <p className="text-xs text-muted">
            Overall: <span className="font-semibold text-ink">53/100</span>
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[1fr,360px]">
          {/* 3D brain viewer */}
          <div className="aspect-[4/3] rounded-2xl bg-black overflow-hidden border border-line/20">
            <BrainViewerLazy predictionKey="stim.predictions" />
          </div>

          {/* Product image + metrics */}
          <div className="space-y-5">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
              <img
                src="/hailey-bieber.jpg"
                alt="Hailey Bieber Campaign"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-2">
              {brainMetrics.map((metric) => (
                <BrainBar key={metric.label} metric={metric} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted">Impressions</p>
            <p className="mt-1 text-base font-semibold text-ink">405.6K</p>
          </div>
          <div>
            <p className="text-xs text-muted">Avg Attention</p>
            <p className="mt-1 text-base font-semibold text-ink">35.0%</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">
          Clean beauty advertisement featuring model with direct eye contact holding minimalist skincare product against
          face.
        </p>

        <button
          type="button"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 sm:w-auto sm:self-end"
        >
          Improve this creative
        </button>
      </Card>

      {/* Agent Decision Journeys */}
      <Card className="p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold text-ink">Agent Decision Journeys</p>
          <p className="text-xs text-muted">10 archetypes simulated</p>
        </div>

        <div className="mt-5 space-y-3">
          {agents.map((agent) => (
            <AgentRow
              key={agent.name}
              agent={agent}
              expanded={expandedAgent === agent.name}
              onToggle={() => setExpandedAgent(expandedAgent === agent.name ? null : agent.name)}
            />
          ))}
        </div>
      </Card>

      {/* Daily Performance + Funnel Distribution */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Daily Performance</p>
            <div className="flex items-center gap-3 text-[11px] text-muted">
              <LegendDot color="#8b5cf6" label="Impressions" />
              <LegendDot color="#14b8a6" label="Unique Reached" />
            </div>
          </div>
          <div className="mt-4">
            <DailyPerformanceChart />
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-semibold text-ink">Funnel Distribution</p>
          <div className="mt-4 flex items-center justify-center">
            <FunnelDonut />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-muted">
            <LegendDot color="#3b82f6" label="aware" />
            <LegendDot color="#14b8a6" label="loyal" />
            <LegendDot color="#171717" label="unaware" />
            <LegendDot color="#f59e0b" label="intending" />
            <LegendDot color="#10b981" label="purchased" />
            <LegendDot color="#8b5cf6" label="considering" />
          </div>
        </Card>
      </div>

      {/* Funnel Breakdown */}
      <Card className="p-6 sm:p-8">
        <p className="text-base font-semibold text-ink">Funnel Breakdown</p>
        <div className="mt-5 space-y-3.5">
          {funnelBreakdown.map((stage) => (
            <div key={stage.key} className="grid grid-cols-[100px,1fr,120px] items-center gap-4 text-sm">
              <div className="text-right text-muted">{stage.label}</div>
              <div className="h-2 rounded-full bg-panelSoft">
                <div
                  className={cn("h-full rounded-full", stage.color)}
                  style={{ width: `${stage.width}%` }}
                />
              </div>
              <div className="text-right font-medium text-ink">
                {stage.count} <span className="text-muted">({stage.pct})</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Social Influence Cascade */}
      <Card className="p-6 sm:p-8">
        <p className="text-base font-semibold text-ink">Social Influence Cascade</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MiniStat label="Cascade Depth" value="2 rounds" />
          <MiniStat label="Influence Events" value="37" />
          <MiniStat label="Successful Activations" value="1" />
          <MiniStat label="Network Clustering" value="0.33" />
        </div>

        <div className="mt-6">
          <p className="text-xs text-muted">Influence Chain</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-panelSoft/70 px-4 py-3 text-sm">
            <div className="flex flex-wrap items-center gap-3">
              <Chip>Word of mouth</Chip>
              <span className="text-muted">Round 1</span>
              <span className="font-semibold text-ink">Jasmine</span>
              <span className="text-muted">→</span>
              <span className="font-semibold text-ink">Zara</span>
            </div>
            <Chip>considering → intent</Chip>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-muted">Community Clusters</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <ClusterCard
              name="Cluster 1"
              converted="11/24"
              tags={["moisturizers", "cleansers", "art"]}
            />
            <ClusterCard
              name="Cluster 2"
              converted="2/6"
              tags={["serums", "cleansers", "food"]}
            />
          </div>
        </div>
      </Card>

      {/* Creative Benchmarks */}
      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline gap-2">
          <p className="text-base font-semibold text-ink">Creative Benchmarks</p>
          <span className="text-xs text-muted">vs. 8 historical creatives</span>
        </div>
        <p className="mt-1 text-xs text-muted">
          Strong historical grounding: 8 similar creatives found across 8 total observations.
        </p>

        <div className="mt-5 space-y-4">
          {benchmarks.map((b) => (
            <BenchmarkBar key={b.label} {...b} />
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 sm:p-8">
        <p className="text-base font-semibold text-ink">Recommendations</p>

        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Budget</p>
          <RecommendationItem>
            Instagram Feed is 2.7x more effective than baseline — consider increasing allocation here.
          </RecommendationItem>
        </div>

        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Creative</p>
          <div className="mt-2 space-y-2">
            <RecommendationItem>
              Social Resonance is a key strength (top 10%, score 72). Lean into this.
            </RecommendationItem>
            <RecommendationItem>
              Low word-of-mouth potential. Consider adding social proof, UGC elements, or shareable moments to the
              creative.
            </RecommendationItem>
          </div>
        </div>
      </Card>

      {/* Awareness, Sentiment & Memory */}
      <Card className="p-6">
        <p className="text-sm font-semibold text-ink">Awareness, Sentiment &amp; Memory</p>
        <div className="mt-4">
          <AwarenessChart />
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

function HeroKpi({
  icon,
  label,
  value,
  tint,
  stroke,
  path,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tint: string;
  stroke: string;
  path: string;
}) {
  return (
    <Card className="overflow-hidden p-5">
      <div className="flex items-center gap-2 text-xs font-medium text-muted">
        {icon}
        {label}
      </div>
      <p className="headline mt-3 text-3xl text-ink">{value}</p>
      <div className={cn("mt-4 h-12 rounded-lg bg-gradient-to-b", tint)}>
        <svg viewBox="0 0 100 40" className="h-full w-full" preserveAspectRatio="none">
          <path d={path} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </Card>
  );
}

function SecondaryKpi({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 text-xl font-semibold text-ink">{value}</p>
    </Card>
  );
}

function BrainBar({ metric }: { metric: BrainMetric }) {
  return (
    <div className="grid grid-cols-[80px,1fr,32px] items-center gap-3 text-sm">
      <span className={cn("text-muted", !metric.active && "text-muted/60")}>{metric.label}</span>
      <div className="h-1.5 rounded-full bg-panelSoft">
        <div
          className={cn("h-full rounded-full", metric.active ? "bg-ink" : "bg-neutral-300")}
          style={{ width: `${metric.value}%` }}
        />
      </div>
      <span
        className={cn(
          "text-right text-xs font-semibold",
          metric.active ? "text-ink" : "text-muted/70",
        )}
      >
        {metric.value}
      </span>
    </div>
  );
}

function AgentRow({
  agent,
  expanded,
  onToggle,
}: {
  agent: Agent;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full flex-wrap items-center gap-3 px-4 py-3 text-left"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
          {agent.initial}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-sm text-ink">
            <span className="font-semibold">{agent.name}</span>{" "}
            <span className="text-muted">
              {agent.age}, {agent.gender}
            </span>{" "}
            · <span className="text-muted">{agent.outcome}</span>
          </p>
          <p className={cn("text-xs text-muted", !expanded && "truncate")}>{agent.summary}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Share2 className="h-3.5 w-3.5" />
            {agent.wom}
          </span>
          <span>{agent.exp} exp</span>
          <span className="font-semibold text-ink">{agent.confidence}</span>
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
          />
        </div>
      </button>

      {expanded && agent.events.length > 0 ? (
        <div className="space-y-3 border-t border-line px-4 py-4 pl-16">
          {agent.events.map((event, idx) => (
            <JourneyEventRow key={`${agent.name}-${idx}`} event={event} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function JourneyEventRow({ event }: { event: JourneyEvent }) {
  const filled = Boolean(event.stage) || Boolean(event.action);
  return (
    <div className="grid grid-cols-[16px,1fr] gap-3">
      <div className="pt-1.5">
        <span
          className={cn(
            "block h-2 w-2 rounded-full",
            filled ? "bg-ink" : "border border-ink/30 bg-white",
          )}
        />
      </div>
      <div className="text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-ink">Day {event.day}</span>
          {event.stage ? <Chip>{event.stage}</Chip> : null}
          {event.emotion ? <span className="text-xs text-muted">{event.emotion}</span> : null}
        </div>
        <p className="mt-1 leading-relaxed text-muted">{event.text}</p>
        {event.action ? (
          <div className="mt-2">
            <Chip>{event.action}</Chip>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function DailyPerformanceChart() {
  const w = 520;
  const h = 200;
  const paddingL = 38;
  const paddingR = 10;
  const paddingT = 10;
  const paddingB = 24;
  const maxY = 60000;
  const maxX = 14;

  const plotW = w - paddingL - paddingR;
  const plotH = h - paddingT - paddingB;

  const points = dailyPerfPoints
    .map((p) => {
      const x = paddingL + (p.x / maxX) * plotW;
      const y = paddingT + plotH - (p.v / maxY) * plotH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const yTicks = [0, 15000, 30000, 45000, 60000];
  const xTicks = [0, 2, 4, 6, 8, 10, 12, 14];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full">
      {yTicks.map((v) => {
        const y = paddingT + plotH - (v / maxY) * plotH;
        return (
          <g key={v}>
            <line
              x1={paddingL}
              x2={w - paddingR}
              y1={y}
              y2={y}
              stroke="#eee"
              strokeWidth={1}
            />
            <text
              x={paddingL - 6}
              y={y + 3}
              fontSize={9}
              textAnchor="end"
              fill="#9ca3af"
            >
              {v.toLocaleString("en-US")}
            </text>
          </g>
        );
      })}

      <polyline points={points} fill="none" stroke="#14b8a6" strokeWidth={2} strokeLinejoin="round" />

      {xTicks.map((d) => {
        const x = paddingL + (d / maxX) * plotW;
        return (
          <text key={d} x={x} y={h - 6} fontSize={9} textAnchor="middle" fill="#9ca3af">
            Day {d}
          </text>
        );
      })}
    </svg>
  );
}

function FunnelDonut() {
  // rough proportions from the data: unaware dominant, aware small wedge, others tiny
  const segments = [
    { value: 81.2, color: "#171717" }, // unaware
    { value: 17.6, color: "#3b82f6" }, // aware
    { value: 1.0, color: "#8b5cf6" }, // considering
    { value: 0.1, color: "#10b981" }, // purchased
    { value: 0.1, color: "#f59e0b" }, // intending
  ];

  const size = 220;
  const radius = 90;
  const innerRadius = 62;
  const cx = size / 2;
  const cy = size / 2;

  const total = segments.reduce((acc, s) => acc + s.value, 0);
  let angle = -Math.PI / 2;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-56 w-56">
      {segments.map((seg, idx) => {
        const a = (seg.value / total) * Math.PI * 2;
        const x1 = (cx + Math.cos(angle) * radius).toFixed(3);
        const y1 = (cy + Math.sin(angle) * radius).toFixed(3);
        const x2 = (cx + Math.cos(angle + a) * radius).toFixed(3);
        const y2 = (cy + Math.sin(angle + a) * radius).toFixed(3);
        const ix1 = (cx + Math.cos(angle + a) * innerRadius).toFixed(3);
        const iy1 = (cy + Math.sin(angle + a) * innerRadius).toFixed(3);
        const ix2 = (cx + Math.cos(angle) * innerRadius).toFixed(3);
        const iy2 = (cy + Math.sin(angle) * innerRadius).toFixed(3);
        const large = a > Math.PI ? 1 : 0;

        const d = [
          `M ${x1} ${y1}`,
          `A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`,
          `L ${ix1} ${iy1}`,
          `A ${innerRadius} ${innerRadius} 0 ${large} 0 ${ix2} ${iy2}`,
          "Z",
        ].join(" ");

        angle += a;
        return <path key={idx} d={d} fill={seg.color} />;
      })}
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fontSize={20}
        fontWeight={700}
        fill="#111"
      >
        50.0K
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize={11} fill="#6b7280">
        Total
      </text>
    </svg>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-panelSoft/40 p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-base font-semibold text-ink">{value}</p>
    </div>
  );
}

function ClusterCard({
  name,
  converted,
  tags,
}: {
  name: string;
  converted: string;
  tags: string[];
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">{name}</p>
        <Chip>FOMO active</Chip>
      </div>
      <p className="mt-3 text-2xl font-semibold text-ink">{converted}</p>
      <p className="text-xs text-muted">converted</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
    </div>
  );
}

function BenchmarkBar({ label, value, percentile }: Benchmark) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink">{label}</span>
        <span className="text-ink">
          <span className="font-semibold">{value}</span>{" "}
          <span className="text-xs text-muted">{percentile}</span>
        </span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-panelSoft">
        <div className="h-full rounded-full bg-ink" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function RecommendationItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 rounded-2xl border-l-2 border-ink/40 bg-panelSoft/60 px-4 py-3 text-sm text-ink">
      {children}
    </div>
  );
}

function AwarenessChart() {
  const w = 520;
  const h = 240;
  const paddingL = 40;
  const paddingR = 10;
  const paddingT = 16;
  const paddingB = 28;
  const maxY = 0.16;
  const maxX = 14;

  const plotW = w - paddingL - paddingR;
  const plotH = h - paddingT - paddingB;

  const makePath = (series: SeriesPoint[]) =>
    series
      .map((p, idx) => {
        const x = paddingL + (p.x / maxX) * plotW;
        const y = paddingT + plotH - (p.y / maxY) * plotH;
        return `${idx === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");

  const yTicks = [0, 0.04, 0.08, 0.12, 0.16];
  const xTicks = [0, 2, 4, 6, 8, 10, 12, 14];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full">
      {yTicks.map((v) => {
        const y = paddingT + plotH - (v / maxY) * plotH;
        return (
          <g key={v}>
            <line x1={paddingL} x2={w - paddingR} y1={y} y2={y} stroke="#eee" strokeWidth={1} />
            <text x={paddingL - 6} y={y + 3} fontSize={9} textAnchor="end" fill="#9ca3af">
              {v.toFixed(2)}
            </text>
          </g>
        );
      })}

      <path d={makePath(awarenessSeries)} fill="none" stroke="#22c55e" strokeWidth={2} />
      <path d={makePath(sentimentSeries)} fill="none" stroke="#3b82f6" strokeWidth={2} />
      <path d={makePath(memorySeries)} fill="none" stroke="#8b5cf6" strokeWidth={2} />

      {xTicks.map((d) => {
        const x = paddingL + (d / maxX) * plotW;
        return (
          <text key={d} x={x} y={h - 6} fontSize={9} textAnchor="middle" fill="#9ca3af">
            Day {d}
          </text>
        );
      })}
    </svg>
  );
}
