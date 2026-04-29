"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  DollarSign,
  Download,
  Eye,
  Pause,
  Play,
  TrendingUp,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";

import { Card } from "@/components/ui";
import { BrainViewerLazy } from "@/components/brain/BrainViewerLazy";
import { simulationIndexPath } from "@/lib/site";
import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------
// VIDEO CONFIG
// -----------------------------------------------------------------------------
// The user will upload a real video later. Set VIDEO_SRC to the public URL
// (e.g. "/videos/niacinamide.mp4") and the player below will use it directly.
// When VIDEO_SRC is empty, the player renders a black placeholder but the
// play/pause + progress + second-by-second brain metrics still animate so the
// layout can be previewed end-to-end.
const VIDEO_SRC = "/the-odinary.mp4";
const VIDEO_DURATION = 14; // seconds — updated for the-odinary.mp4

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

// ---------- sparklines for the 4 hero KPI cards ----------
const revenueSpark = "M0,26 L12,24 L24,23 L36,27 L50,32 L62,32 L74,22 L86,18 L100,20";
const conversionsSpark = "M0,30 L14,30 L28,29 L42,29 L56,29 L70,28 L84,28 L100,28";
const awarenessSpark = "M0,30 L14,28 L28,26 L42,23 L56,19 L70,16 L84,13 L100,10";
const sentimentSpark = "M0,30 L14,28 L28,26 L42,23 L56,20 L70,17 L84,14 L100,11";

// ---------- brain activation metrics: second-by-second keyframes ----------
type BrainMetric = { label: string; value: number };

// Keyframes are taken directly from the design mocks. For any second the player
// is at, we look up the largest keyframe whose second <= currentSecond.
const brainMetricsTimeline: Record<number, BrainMetric[]> = {
  0: [
    { label: "Attention", value: 72 },
    { label: "Sustained", value: 45 },
    { label: "Arousal", value: 32 },
    { label: "Valence", value: 62 },
    { label: "Reward", value: 48 },
    { label: "Memory", value: 52 },
    { label: "Social", value: 22 },
    { label: "Curiosity", value: 48 },
  ],
  3: [
    { label: "Attention", value: 71 },
    { label: "Sustained", value: 58 },
    { label: "Arousal", value: 35 },
    { label: "Valence", value: 65 },
    { label: "Reward", value: 53 },
    { label: "Memory", value: 48 },
    { label: "Social", value: 24 },
    { label: "Curiosity", value: 50 },
  ],
  6: [
    { label: "Attention", value: 73 },
    { label: "Sustained", value: 58 },
    { label: "Arousal", value: 35 },
    { label: "Valence", value: 66 },
    { label: "Reward", value: 54 },
    { label: "Memory", value: 47 },
    { label: "Social", value: 24 },
    { label: "Curiosity", value: 43 },
  ],
  9: [
    { label: "Attention", value: 75 },
    { label: "Sustained", value: 62 },
    { label: "Arousal", value: 40 },
    { label: "Valence", value: 68 },
    { label: "Reward", value: 58 },
    { label: "Memory", value: 50 },
    { label: "Social", value: 26 },
    { label: "Curiosity", value: 48 },
  ],
  12: [
    { label: "Attention", value: 82 },
    { label: "Sustained", value: 65 },
    { label: "Arousal", value: 45 },
    { label: "Valence", value: 72 },
    { label: "Reward", value: 65 },
    { label: "Memory", value: 78 },
    { label: "Social", value: 30 },
    { label: "Curiosity", value: 55 },
  ],
  14: [
    { label: "Attention", value: 85 },
    { label: "Sustained", value: 60 },
    { label: "Arousal", value: 38 },
    { label: "Valence", value: 70 },
    { label: "Reward", value: 72 },
    { label: "Memory", value: 88 },
    { label: "Social", value: 32 },
    { label: "Curiosity", value: 50 },
  ],
};

function getBrainMetricsAt(second: number): BrainMetric[] {
  const keyframes = Object.keys(brainMetricsTimeline)
    .map(Number)
    .sort((a, b) => a - b);

  let startK = keyframes[0];
  let endK = keyframes[0];

  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i] <= second) {
      startK = keyframes[i];
      endK = keyframes[i + 1] ?? startK;
    }
  }

  const startVals = brainMetricsTimeline[startK];
  const endVals = brainMetricsTimeline[endK];

  return startVals.map((m, i) => {
    let val = m.value;
    if (startK !== endK) {
      const ratio = (second - startK) / (endK - startK);
      val = m.value + (endVals[i].value - m.value) * ratio;
    }

    // Add deterministic jitter per second so every second is unique
    const jitter = ((second * 17 + i * 11) % 7) - 3; // range -3 to 3
    return {
      label: m.label,
      value: Math.round(Math.max(5, Math.min(95, val + jitter))),
    };
  });
}

// ---------- agent decision journeys ----------
type AgentExperience = {
  day: number;
  note: string;
  tags?: string[];
  actions?: string[];
};

type Agent = {
  name: string;
  age: number;
  gender: string;
  outcome: string;
  description: string;
  exp: number;
  confidence: string;
  journey?: AgentExperience[];
  keyTrigger?: string;
};

const agents: Agent[] = [
  {
    name: "Mia",
    age: 24,
    gender: "female",
    outcome: "aware",
    description:
      "Mia saw the GlowUp ads repeatedly but they failed to capture her attention or provide compelling reasons to switch from her current routine.",
    exp: 13,
    confidence: "90.0%",
    keyTrigger: "Lack of visual differentiator in creative",
    journey: [
      { day: 1, note: "Saw a flash of the product while scrolling. Looked like another generic serum." },
      { day: 3, note: "Ad appeared again. This time I noticed the brand name, but nothing else.", tags: ["recognition"] },
      { day: 7, note: "Seen this ad 3 times now. The models look perfect, but is it real?", tags: ["skeptical"] },
      { day: 10, note: "Starting to feel like spam. Why do I keep seeing this?", tags: ["fatigue"] },
      { day: 15, note: "Scrolled past immediately. I'm actively ignoring this brand now.", actions: ["ignored"] }
    ]
  },
  {
    name: "Sophia",
    age: 33,
    gender: "female",
    outcome: "aware",
    description:
      "Sophia became aware of GlowUp through repeated exposure but the ads lacked the social proof, influencer endorsements, and expert testimonials needed for high-price skincare.",
    exp: 12,
    confidence: "90.0%",
    keyTrigger: "Missing dermatologist validation",
    journey: [
      { day: 2, note: "Noticed a minimalist ad. Looks premium, but I need to know if it works for sensitivity." },
      { day: 5, note: "Checked comments to see if any dermatologists were mentioned. Found nothing.", tags: ["researching"] },
      { day: 8, note: "Still seeing the same ad. I wish they'd show some clinical trial data.", tags: ["seeking proof"] },
      { day: 12, note: "Influencer I follow posted about a different brand. Lost interest in GlowUp.", actions: ["switched interest"] }
    ]
  },
  {
    name: "Isabella",
    age: 29,
    gender: "female",
    outcome: "aware",
    description:
      "Isabella noticed GlowUp briefly but the generic, non-educational content failed to overcome her strong brand loyalty to Glow Recipe's established efficacy.",
    exp: 12,
    confidence: "90.0%",
    keyTrigger: "Strong existing brand loyalty",
    journey: [
      { day: 1, note: "Briefly saw an ad. My current Glow Recipe serum is almost out, but I'll stick to what I know." },
      { day: 6, note: "Compared the ingredients list in my head. GlowUp seems basic in comparison.", tags: ["comparison"] },
      { day: 11, note: "The ad doesn't explain WHY their niacinamide is better. Scrolled past.", tags: ["unconvinced"] }
    ]
  },
  {
    name: "Ava",
    age: 25,
    gender: "female",
    outcome: "aware",
    description:
      "Despite multiple exposures, the generic content failed to create desire or showcase unique value. Already having tried the brand's competitors, she felt the brand didn't bring anything new.",
    exp: 12,
    confidence: "90.0%",
    keyTrigger: "Market saturation of similar products",
    journey: [
      { day: 2, note: "Seen the bottle. Looks like The Ordinary but more expensive." },
      { day: 5, note: "Another niacinamide ad. Everyone is making one now.", tags: ["jaded"] },
      { day: 9, note: "If they had a unique ingredient like Zinc or Copper, I'd maybe click.", tags: ["product-fit"] },
      { day: 14, note: "Closing the ad. I have enough skincare for now.", actions: ["dismissed"] }
    ]
  },
  {
    name: "Aria",
    age: 23,
    gender: "female",
    outcome: "aware",
    description:
      "Aria became aware of GlowUp Skincare through repeated exposure but was never given a compelling reason to switch from her current favorites.",
    exp: 12,
    confidence: "90.0%",
    keyTrigger: "No compelling differentiator or social proof provided",
    journey: [
      {
        day: 2,
        note:
          "Saw a basic skincare ad while quickly scrolling. Didn't even register the brand name - just another skincare company.",
      },
      {
        day: 3,
        note:
          "Generic skincare content popped up but it looked like every other brand. Nothing stood out as different from what I already use.",
      },
      {
        day: 4,
        tags: ["slightly annoyed"],
        note:
          "Starting to see this brand repeatedly and it's interrupting my feed. The content feels generic and promotional.",
      },
      {
        day: 6,
        tags: ["annoyed"],
        note:
          "This brand is following me across platforms now. The ads don't show real results or have anyone I recognize endorsing it.",
        actions: ["considered hiding ad"],
      },
      {
        day: 7,
        tags: ["now aware of brand name", "skeptical"],
        note:
          "Noticed the name 'GlowUp Skincare' this time. Sounds like every other skincare brand promising glowing skin.",
      },
      {
        day: 8,
        tags: ["annoyed"],
        note:
          "Seeing this too frequently now. My Good Molecules products work fine, don't need another random brand.",
      },
      {
        day: 9,
        tags: ["very annoyed"],
        note:
          "This is getting repetitive. The content isn't engaging and I'm starting to actively avoid it.",
      },
      {
        day: 11,
        note:
          "Saw it in search results while looking for something else. Still don't see what makes this different from The Ordinary or what I currently use.",
      },
      {
        day: 12,
        tags: ["annoyed"],
        note:
          "Still seeing this brand everywhere. No compelling reason to switch from my current routine that's working.",
      },
      {
        day: 13,
        tags: ["very annoyed"],
        note:
          "Getting tired of this brand following me around. The ads feel intrusive and don't offer anything compelling.",
      },
      {
        day: 14,
        tags: ["annoyed"],
        note:
          "Another generic skincare ad. Nothing about before/after results, no influencer I trust, no reason to care.",
      },
      {
        day: 15,
        note:
          "Final day seeing this. Never gave me a reason to try it over my current products or showed real proof it works.",
      },
    ],
  },
  {
    name: "Zara",
    age: 30,
    gender: "female",
    outcome: "aware",
    description:
      "Despite 13 ad exposures over 15 days, the generic creative failed to capture my attention beyond brief recognition, leading to high ad fatigue without intent.",
    exp: 12,
    confidence: "90.0%",
    keyTrigger: "Creative ad fatigue",
    journey: [
      { day: 1, note: "Cool aesthetic, but seen it all before." },
      { day: 4, note: "Wait, didn't I just see this? The image is slightly different.", tags: ["confusion"] },
      { day: 8, note: "Ads are becoming invisible to me now. Just scrolling past.", tags: ["blindness"] },
      { day: 13, note: "Actively frustrated by the frequency of these posts.", tags: ["frustration"] }
    ]
  },
  {
    name: "Ava",
    age: 39,
    gender: "female",
    outcome: "aware",
    description:
      "Ava became aware of GlowUp through repeated exposure but never engaged meaningfully due to lack of discounts, deals, or bundle offers that usually trigger her purchase behavior.",
    exp: 12,
    confidence: "90.0%",
    keyTrigger: "No price incentive or introductory offer",
    journey: [
      { day: 3, note: "Saw the serum. Looks nice. Is there a first-purchase discount?" },
      { day: 7, note: "Clicked the 'Shop Now' button to check the price. $35 is steep without a code.", actions: ["clicked shop"] },
      { day: 11, note: "Waiting for a sale or a Black Friday teaser. Nothing yet.", tags: ["price-sensitive"] },
      { day: 15, note: "Buying my usual brand instead since they sent me a 20% off coupon.", actions: ["churned"] }
    ]
  },
  {
    name: "Mei",
    age: 23,
    gender: "female",
    outcome: "aware",
    description:
      "Despite seeing GlowUp ads multiple times across platforms, my ad-averse personality and preference for authentic content prevented any real connection with the brand.",
    exp: 12,
    confidence: "90.0%",
    keyTrigger: "Overly produced/artificial creative style",
    journey: [
      { day: 2, note: "Ad looks too 'AI' or too airbrushed. Don't trust it." },
      { day: 6, note: "I want to see a real person using it, not a studio shot.", tags: ["authenticity"] },
      { day: 10, note: "Still no UGC (user generated content) in their ads. Red flag.", tags: ["skeptical"] }
    ]
  },
  {
    name: "Sophia",
    age: 39,
    gender: "female",
    outcome: "aware",
    description:
      "Sophia became aware of GlowUp through repeated exposure but never moved past basic awareness due to lack of influencer social proof and dermatologist-backed claims.",
    exp: 12,
    confidence: "85.0%",
    keyTrigger: "Lack of clinical authority",
    journey: [
      { day: 4, note: "Saw the serum on my Discover page. Need to see a review first." },
      { day: 9, note: "Searched on TikTok for 'GlowUp review'. Only found brand posts.", tags: ["investigating"] },
      { day: 14, note: "If it's not being talked about in my skincare groups, I'm not buying it.", tags: ["unconvinced"] }
    ]
  },
  {
    name: "Rosa",
    age: 20,
    gender: "female",
    outcome: "aware",
    description:
      "Rosa noticed GlowUp initially when actively searching for skincare but quickly became annoyed by repetitive, generic ads that followed her across her social feed without evolving the message.",
    exp: 10,
    confidence: "85.0%",
    keyTrigger: "Repetitive retargeting without value-add",
    journey: [
      { day: 1, note: "I was looking for niacinamide. This popped up. Convenient." },
      { day: 3, note: "Okay, I saw it. Now it's on my Reels too. Too much.", tags: ["overwhelmed"] },
      { day: 7, note: "Every time I open Instagram, this bottle is there. I'm over it.", tags: ["annoyed"] },
      { day: 12, note: "I'm blocking ads from this account. It's annoying.", actions: ["blocked ad"] }
    ]
  }
];

// ---------- daily performance data (Impressions + Unique Reached) ----------
type DailyPoint = { day: number; impressions: number; unique: number };

const dailyPerformance: DailyPoint[] = [
  { day: 0, impressions: 29400, unique: 9400 },
  { day: 1, impressions: 33200, unique: 9700 },
  { day: 2, impressions: 29500, unique: 9600 },
  { day: 3, impressions: 22100, unique: 9300 },
  { day: 4, impressions: 18200, unique: 9200 },
  { day: 5, impressions: 22500, unique: 9400 },
  { day: 6, impressions: 28700, unique: 9600 },
  { day: 7, impressions: 31500, unique: 9800 },
  { day: 8, impressions: 32092, unique: 9970 },
  { day: 9, impressions: 29100, unique: 9700 },
  { day: 10, impressions: 22800, unique: 9400 },
  { day: 11, impressions: 18500, unique: 9200 },
  { day: 12, impressions: 21600, unique: 9300 },
  { day: 13, impressions: 28200, unique: 9500 },
  { day: 14, impressions: 33500, unique: 9800 },
];

// ---------- funnel distribution (donut + breakdown) ----------
type FunnelSegment = {
  label: string;
  count: number;
  percent: number;
  dot: string;
  bar: string;
};

const funnelSegments: FunnelSegment[] = [
  { label: "Aware", count: 4460, percent: 44.6, dot: "bg-[#2f7bff]", bar: "bg-[#2f7bff]" },
  { label: "Loyal", count: 0, percent: 0, dot: "bg-[#14b8a6]", bar: "bg-[#14b8a6]" },
  { label: "Unaware", count: 4200, percent: 42.0, dot: "bg-[#262626]", bar: "bg-[#262626]" },
  { label: "Intending", count: 160, percent: 1.6, dot: "bg-[#f59e0b]", bar: "bg-[#f59e0b]" },
  { label: "Purchased", count: 94, percent: 0.9, dot: "bg-[#22c55e]", bar: "bg-[#22c55e]" },
  { label: "Considering", count: 1080, percent: 10.8, dot: "bg-[#7c3aed]", bar: "bg-[#7c3aed]" },
];

// ---------- creative benchmarks ----------
type Benchmark = { label: string; score: number; percentile: string };

const benchmarks: Benchmark[] = [
  { label: "Attention Capture", score: 45, percentile: "P39" },
  { label: "Sustained Attention", score: 20, percentile: "P0" },
  { label: "Emotional Valence", score: 55, percentile: "P33" },
  { label: "Reward", score: 35, percentile: "P6" },
  { label: "Memory Encoding", score: 30, percentile: "P0" },
  { label: "Social Resonance", score: 30, percentile: "P28" },
  { label: "Curiosity", score: 30, percentile: "P17" },
];

const performanceDrivers = ["Memory Encoding", "Attention Capture"];

const budgetRecommendations: string[] = [];

const creativeRecommendations = [
  "Improve sustained attention: current score (20) is in the bottom 25% of historical content. Sustained Attention is weak (bottom 25%) — this may significantly limit performance.",
  "Improve reward: current score (35) is in the bottom 25% of historical content. Reward is weak (bottom 25%) — this may significantly limit performance.",
  "Improve memory encoding: current score (30) is in the bottom 25% of historical content. Memory Encoding is weak (bottom 25%) — this may significantly limit performance.",
  "Improve curiosity: current score (30) is in the bottom 25% of historical content. Curiosity is weak (bottom 25%) — this may significantly limit performance.",
  "Low word-of-mouth potential. Consider adding social proof, UGC elements, or shareable moments to the creative.",
];

// =============================================================================
// MAIN SECTION
// =============================================================================
export function NiacinamideLaunchSimulatorSection() {
  const [expandedAgentIdx, setExpandedAgentIdx] = useState<number>(-1); // default: all closed

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-24">
      {/* ---------- header ---------- */}
      <div className="space-y-3">
        <Link
          href={simulationIndexPath}
          className="inline-flex items-center gap-1.5 text-sm text-inkMuted transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Simulations
        </Link>

        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <h1 className="headline text-3xl leading-tight text-ink md:text-[2.25rem]">
              Niacinamide Launch - Acne Solutions
            </h1>
          </div>
        </div>
      </div>

      {/* ---------- hero KPI cards ---------- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={<DollarSign className="h-4 w-4" />}
          label="Predicted Revenue"
          value="$5,797"
          sparkD={revenueSpark}
          sparkColor="#22c55e"
          sparkFill="rgba(34,197,94,0.12)"
        />
        <KpiCard
          icon={<Users className="h-4 w-4" />}
          label="Conversions"
          value="94"
          sparkD={conversionsSpark}
          sparkColor="#2f7bff"
          sparkFill="rgba(47,123,255,0.10)"
        />
        <KpiCard
          icon={<Eye className="h-4 w-4" />}
          label="Awareness Lift"
          value="21.2%"
          sparkD={awarenessSpark}
          sparkColor="#14b8a6"
          sparkFill="rgba(20,184,166,0.10)"
        />
        <KpiCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Avg Sentiment"
          value="0.11"
          sparkD={sentimentSpark}
          sparkColor="#7c3aed"
          sparkFill="rgba(124,58,237,0.10)"
        />
      </div>

      {/* ---------- secondary KPIs ---------- */}
      <div className="grid gap-4 md:grid-cols-3">
        <MiniStat label="WOM Amplification" value="0.00x" />
        <MiniStat label="Viral Coefficient" value="K = 0.000" />
        <MiniStat label="Prediction Confidence" value="87.2%" />
      </div>

      {/* ---------- brain activation with video ---------- */}
      <BrainActivationBlock />

      {/* ---------- agent decision journeys ---------- */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Agent Decision Journeys</h2>
          <span className="text-xs text-inkMuted">10 archetypes simulated</span>
        </div>
        <div className="mt-4 space-y-2">
          {agents.map((agent, idx) => (
            <AgentRow
              key={`${agent.name}-${idx}`}
              agent={agent}
              expanded={expandedAgentIdx === idx}
              onToggle={() => setExpandedAgentIdx(expandedAgentIdx === idx ? -1 : idx)}
            />
          ))}
        </div>
      </Card>

      {/* ---------- daily performance + funnel distribution ---------- */}
      <div className="grid gap-4 md:grid-cols-2">
        <DailyPerformanceCard />
        <FunnelDistributionCard />
      </div>

      {/* ---------- funnel breakdown ---------- */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-ink">Funnel Breakdown</h2>
        <div className="mt-4 space-y-3">
          {funnelSegments.map((segment) => (
            <FunnelBar key={segment.label} segment={segment} />
          ))}
        </div>
      </Card>

      {/* ---------- creative benchmarks ---------- */}
      <Card className="p-5">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-ink">Creative Benchmarks</h2>
          <span className="text-xs text-inkMuted">vs. 18 historical creatives</span>
        </div>
        <p className="mt-1 text-xs text-inkMuted">
          Strong historical grounding: 18 similar creatives found across 18 total observations.
        </p>
        <div className="mt-5 space-y-4">
          {benchmarks.map((b) => (
            <BenchmarkRow key={b.label} benchmark={b} />
          ))}
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-ink">Top Performance Drivers (Learned)</p>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {performanceDrivers.map((driver, i) => (
              <div
                key={driver}
                className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <span className="text-sm text-ink">{driver}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ---------- recommendations ---------- */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-ink">Recommendations</h2>

        {budgetRecommendations.length > 0 && (
          <div className="mt-4">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-inkMuted">BUDGET</p>
            <div className="mt-2 space-y-2">
              {budgetRecommendations.map((rec) => (
                <RecommendationItem key={rec} text={rec} />
              ))}
            </div>
          </div>
        )}

        {creativeRecommendations.length > 0 && (
          <div className="mt-5">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-inkMuted">CREATIVE</p>
            <div className="mt-2 space-y-2">
              {creativeRecommendations.map((rec) => (
                <RecommendationItem key={rec} text={rec} />
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* ---------- awareness, sentiment & memory ---------- */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-ink">Awareness, Sentiment &amp; Memory</h2>
        <AwarenessSentimentMemoryChart />
      </Card>
    </div>
  );
}

// =============================================================================
// KPI Card
// =============================================================================
function KpiCard({
  icon,
  label,
  value,
  sparkD,
  sparkColor,
  sparkFill,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sparkD: string;
  sparkColor: string;
  sparkFill: string;
}) {
  // Convert stroke path "M0,y L..." into a closed fill path by appending a
  // bottom line back to the left edge, so we can paint the soft gradient area
  // underneath the stroke.
  const fillD = `${sparkD} L100,44 L0,44 Z`;

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-sm text-inkMuted">
        <span className="text-inkMuted">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-ink">{value}</div>
      <svg
        className="mt-3 h-10 w-full"
        viewBox="0 0 100 44"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={fillD} fill={sparkFill} />
        <path d={sparkD} fill="none" stroke={sparkColor} strokeWidth="1.6" />
      </svg>
    </Card>
  );
}

// =============================================================================
// Mini stat tile
// =============================================================================
function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white px-5 py-4">
      <div className="text-xs text-inkMuted">{label}</div>
      <div className="mt-1 text-xl font-semibold tracking-tight text-ink">{value}</div>
    </div>
  );
}

// =============================================================================
// Brain Activation (with video + second-by-second metrics)
// =============================================================================
function BrainActivationBlock() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(VIDEO_DURATION);

  // Simulation mode: when no real video is set, advance currentTime via an
  // interval so the layout & metrics can still be previewed end-to-end.
  useEffect(() => {
    if (VIDEO_SRC) return;
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setCurrentTime((t) => {
        const next = t + 0.1;
        if (next >= duration) {
          setIsPlaying(false);
          return 0;
        }
        return next;
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [isPlaying, duration]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else void videoRef.current.play();
      return;
    }
    setIsPlaying((p) => !p);
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const nextTime = ratio * duration;
    setCurrentTime(nextTime);
    if (videoRef.current) videoRef.current.currentTime = nextTime;
  };

  const secondsFloor = Math.floor(currentTime);
  const metrics = getBrainMetricsAt(secondsFloor);
  const progressPct = Math.min(100, (currentTime / duration) * 100);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Brain Activation</h2>
        <span className="text-xs text-inkMuted">Overall: 52/100</span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* LEFT: 3D Brain Viewer */}
        <div className="aspect-square rounded-2xl bg-black md:aspect-auto md:min-h-[420px] overflow-hidden border border-line/20">
          <BrainViewerLazy
            predictionKey="stim.predictions"
            segmentIndex={secondsFloor}
            autoRotateSpeed={0.125}
          />
        </div>

        {/* RIGHT: video + second-by-second metrics */}
        <div className="space-y-4">
          {/* Video surface */}
          <div className="relative overflow-hidden rounded-2xl bg-black group">
            {VIDEO_SRC ? (
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="aspect-video w-full object-cover"
                playsInline
                muted={isMuted}
              />
            ) : (
              <div className="aspect-video w-full" />
            )}

            {/* Mute button overlay */}
            {VIDEO_SRC && (
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
            )}
          </div>

          {/* Custom controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePlayPause}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition hover:bg-ink/90"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5" fill="currentColor" />
              ) : (
                <Play className="h-3.5 w-3.5 translate-x-[1px]" fill="currentColor" />
              )}
            </button>
            <div
              className="relative h-1.5 flex-1 cursor-pointer rounded-full bg-[#e4e4e7]"
              onClick={handleSeek}
              role="slider"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={Math.round(currentTime)}
              tabIndex={0}
            >
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-ink"
                style={{ width: `${progressPct}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-ink"
                style={{ left: `calc(${progressPct}% - 6px)` }}
              />
            </div>
            <span className="text-xs tabular-nums text-inkMuted">
              {secondsFloor}s/{Math.floor(duration)}s
            </span>
          </div>

          {/* Second-by-second brain metrics */}
          <div className="space-y-2.5">
            {metrics.map((metric) => {
              const isBoldNumber = metric.value >= 60;
              const isBarDark = metric.value >= 40;
              return (
                <div key={metric.label} className="grid grid-cols-[110px_1fr_40px] items-center gap-3">
                  <span className="text-sm text-ink">{metric.label}</span>
                  <div className="h-2 rounded-full bg-[#e4e4e7]">
                    <div
                      className={cn(
                        "h-full rounded-full transition-[width] duration-300",
                        isBarDark ? "bg-ink" : "bg-[#c7c7cb]",
                      )}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-right text-sm tabular-nums",
                      isBoldNumber ? "font-semibold text-ink" : "text-inkMuted",
                    )}
                  >
                    {metric.value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer KPIs */}
          <div className="mt-2 grid grid-cols-2 gap-4 border-t border-line pt-4">
            <div>
              <div className="text-xs text-inkMuted">Impressions</div>
              <div className="mt-0.5 text-lg font-semibold text-ink">158.2K</div>
            </div>
            <div>
              <div className="text-xs text-inkMuted">Avg Attention</div>
              <div className="mt-0.5 text-lg font-semibold text-ink">17.3%</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// =============================================================================
// Agent row (collapsed + expanded journey)
// =============================================================================
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
    <div className="rounded-2xl border border-line bg-white transition">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-4 py-3 text-left transition hover:bg-panelSoft"
        aria-expanded={expanded}
        aria-controls={`agent-journey-${agent.name}`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
          {agent.name.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-ink">{agent.name}</span>
            <span className="text-xs text-inkMuted">
              {agent.age}, {agent.gender}
            </span>
            <span className="text-xs text-inkFaint">·</span>
            <span className="text-xs text-inkMuted">{agent.outcome}</span>
          </div>
          <p className={cn("mt-0.5 text-sm text-inkMuted", !expanded && "truncate")}>
            {agent.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <span className="text-xs text-inkMuted">{agent.exp} exp</span>
          <span className="text-sm font-semibold text-ink">{agent.confidence}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-inkMuted transition-transform",
              expanded ? "rotate-180" : "",
            )}
          />
        </div>
      </button>

      {expanded && agent.journey && (
        <div id={`agent-journey-${agent.name}`} className="border-t border-line px-6 py-4">
          <div className="space-y-3">
            {agent.journey.map((exp) => (
              <div key={exp.day} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4d4d8]" />
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-ink">Day {exp.day}</span>
                    {exp.tags?.map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>
                  <p className="text-sm text-inkMuted">{exp.note}</p>
                  {exp.actions?.map((action) => (
                    <div key={action} className="mt-1">
                      <Chip>{action}</Chip>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {agent.keyTrigger && (
            <div className="mt-4 rounded-xl bg-panelSoft px-4 py-2.5 text-sm text-ink">
              <span className="text-inkMuted">Key trigger:</span> {agent.keyTrigger}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Daily Performance line chart (with hover tooltip)
// =============================================================================
function DailyPerformanceCard() {
  const [hoverDay, setHoverDay] = useState<number>(8); // defaults to the point shown in the mock

  // SVG viewport: 0..460 wide, 0..220 tall. 30px left padding for the y-axis
  // labels, 20px bottom padding for the x-axis labels.
  const chartW = 460;
  const chartH = 220;
  const padL = 34;
  const padR = 8;
  const padT = 10;
  const padB = 28;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  const xMax = dailyPerformance.length - 1;
  const yMax = 34000;

  const x = (day: number) => padL + (day / xMax) * plotW;
  const y = (val: number) => padT + plotH - (val / yMax) * plotH;

  const impressionsPath = dailyPerformance
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.day).toFixed(1)},${y(p.impressions).toFixed(1)}`)
    .join(" ");
  const uniquePath = dailyPerformance
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.day).toFixed(1)},${y(p.unique).toFixed(1)}`)
    .join(" ");

  const hoverPoint = dailyPerformance.find((p) => p.day === hoverDay) ?? dailyPerformance[8];

  const yLabels = [0, 8500, 17000, 25500, 34000];

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Daily Performance</h2>
        <div className="flex items-center gap-4 text-xs text-inkMuted">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-5 bg-[#7c3aed]" />
            Impressions
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-5 bg-[#14b8a6]" />
            Unique Reached
          </span>
        </div>
      </div>

      <div className="relative mt-4">
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          className="w-full"
          onMouseLeave={() => setHoverDay(8)}
        >
          {/* y-axis grid + labels */}
          {yLabels.map((val) => (
            <g key={val}>
              <line
                x1={padL}
                x2={chartW - padR}
                y1={y(val)}
                y2={y(val)}
                stroke="#f0f0f3"
                strokeWidth="1"
              />
              <text
                x={padL - 6}
                y={y(val) + 3}
                fontSize="10"
                fill="#9b9ba0"
                textAnchor="end"
              >
                {val}
              </text>
            </g>
          ))}

          {/* Impressions */}
          <path d={impressionsPath} fill="none" stroke="#7c3aed" strokeWidth="1.8" />
          {/* Unique reached */}
          <path d={uniquePath} fill="none" stroke="#14b8a6" strokeWidth="1.8" />

          {/* hover point dot */}
          <circle
            cx={x(hoverPoint.day)}
            cy={y(hoverPoint.impressions)}
            r="3.5"
            fill="#7c3aed"
          />

          {/* x-axis labels every 2 days */}
          {dailyPerformance
            .filter((_, i) => i % 2 === 0)
            .map((p) => (
              <text
                key={p.day}
                x={x(p.day)}
                y={chartH - 8}
                fontSize="10"
                fill="#9b9ba0"
                textAnchor="middle"
              >
                Day {p.day}
              </text>
            ))}

          {/* invisible hover overlay: one rect per day, widths split evenly */}
          {dailyPerformance.map((p, i) => {
            const prevX = i === 0 ? padL : (x(p.day) + x(dailyPerformance[i - 1].day)) / 2;
            const nextX =
              i === dailyPerformance.length - 1
                ? chartW - padR
                : (x(p.day) + x(dailyPerformance[i + 1].day)) / 2;
            return (
              <rect
                key={p.day}
                x={prevX}
                y={padT}
                width={nextX - prevX}
                height={plotH}
                fill="transparent"
                onMouseEnter={() => setHoverDay(p.day)}
              />
            );
          })}
        </svg>

        {/* tooltip */}
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-xl border border-line bg-white px-3 py-2 text-xs shadow-[0_4px_14px_rgba(18,18,23,0.08)]"
          style={{
            left: `calc(${padL}px + ${(hoverPoint.day / xMax) * 100}% * (100% - ${padL + padR}px) / 100%)`,
            top: `calc(${(y(hoverPoint.impressions) / chartH) * 100}% - 8px)`,
          }}
        >
          <div className="font-semibold text-ink">Day {hoverPoint.day}</div>
          <div className="mt-0.5 text-inkMuted">
            Impressions : <span className="text-ink">{hoverPoint.impressions}</span>
          </div>
          <div className="text-inkMuted">
            Unique Reached : <span className="text-ink">{hoverPoint.unique}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// =============================================================================
// Funnel Distribution donut
// =============================================================================
function FunnelDistributionCard() {
  const cx = 110;
  const cy = 110;
  const rOuter = 80;
  const rInner = 50;

  const total = funnelSegments.reduce((sum, s) => sum + s.count, 0) || 1;
  let angle = -Math.PI / 2; // start at top
  const arcs = funnelSegments.map((segment) => {
    const portion = segment.count / total;
    const sweep = portion * Math.PI * 2;
    const start = angle;
    const end = angle + sweep;
    angle = end;

    if (segment.count === 0) return null;

    const largeArc = sweep > Math.PI ? 1 : 0;
    const x1 = (cx + rOuter * Math.cos(start)).toFixed(3);
    const y1 = (cy + rOuter * Math.sin(start)).toFixed(3);
    const x2 = (cx + rOuter * Math.cos(end)).toFixed(3);
    const y2 = (cy + rOuter * Math.sin(end)).toFixed(3);
    const x3 = (cx + rInner * Math.cos(end)).toFixed(3);
    const y3 = (cy + rInner * Math.sin(end)).toFixed(3);
    const x4 = (cx + rInner * Math.cos(start)).toFixed(3);
    const y4 = (cy + rInner * Math.sin(start)).toFixed(3);
    const d = `M${x1},${y1} A${rOuter},${rOuter} 0 ${largeArc} 1 ${x2},${y2} L${x3},${y3} A${rInner},${rInner} 0 ${largeArc} 0 ${x4},${y4} Z`;
    return { d, fill: segment.dot.replace("bg-[", "").replace("]", "") };
  });

  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold text-ink">Funnel Distribution</h2>
      <div className="mt-4 flex items-center justify-center">
        <svg viewBox="0 0 220 220" className="h-56 w-56">
          {arcs.map((arc, i) =>
            arc ? <path key={i} d={arc.d} fill={arc.fill} /> : null,
          )}
          <text
            x={cx}
            y={cy - 2}
            fontSize="18"
            fontWeight="600"
            fill="#1b1b1f"
            textAnchor="middle"
          >
            10.0K
          </text>
          <text x={cx} y={cy + 14} fontSize="10" fill="#9b9ba0" textAnchor="middle">
            Total
          </text>
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs">
        {funnelSegments.map((segment) => (
          <span key={segment.label} className="inline-flex items-center gap-1.5">
            <span className={cn("inline-block h-1.5 w-1.5 rounded-full", segment.dot)} />
            <span className="text-inkMuted">{segment.label}</span>
          </span>
        ))}
      </div>
    </Card>
  );
}

// =============================================================================
// Funnel bar (breakdown)
// =============================================================================
function FunnelBar({ segment }: { segment: FunnelSegment }) {
  const displayCount =
    segment.count >= 1000 ? `${(segment.count / 1000).toFixed(1)}K` : segment.count.toString();
  return (
    <div className="grid grid-cols-[120px_1fr_auto] items-center gap-4">
      <span className="text-sm text-ink">{segment.label}</span>
      <div className="h-2 rounded-full bg-[#f0f0f3]">
        <div
          className={cn("h-full rounded-full", segment.bar)}
          style={{ width: `${segment.percent}%` }}
        />
      </div>
      <span className="text-sm tabular-nums text-ink">
        {displayCount} <span className="text-inkMuted">({segment.percent.toFixed(1)}%)</span>
      </span>
    </div>
  );
}

// =============================================================================
// Benchmark row
// =============================================================================
function BenchmarkRow({ benchmark }: { benchmark: Benchmark }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink">{benchmark.label}</span>
        <span className="tabular-nums">
          <span className="font-semibold text-ink">{benchmark.score}</span>{" "}
          <span className="text-inkMuted">{benchmark.percentile}</span>
        </span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-[#f0f0f3]">
        <div className="h-full rounded-full bg-ink" style={{ width: `${benchmark.score}%` }} />
      </div>
    </div>
  );
}

// =============================================================================
// Recommendation item
// =============================================================================
function RecommendationItem({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink">
      {text}
    </div>
  );
}

// =============================================================================
// Awareness, Sentiment & Memory chart
// =============================================================================
function AwarenessSentimentMemoryChart() {
  // We build three simple upward curves that match the shape in the design.
  // Values are normalized to 0..0.32 (the max y-axis label).
  const days = Array.from({ length: 15 }, (_, i) => i);
  const awareness = [
    0.11, 0.135, 0.16, 0.18, 0.2, 0.22, 0.235, 0.25, 0.26, 0.275, 0.285, 0.29, 0.3, 0.31, 0.318,
  ];
  const sentiment = [
    0.02, 0.035, 0.05, 0.065, 0.08, 0.095, 0.11, 0.12, 0.135, 0.145, 0.155, 0.16, 0.17, 0.175, 0.18,
  ];
  const memory = [
    0.01, 0.02, 0.03, 0.042, 0.05, 0.06, 0.07, 0.08, 0.088, 0.095, 0.1, 0.105, 0.11, 0.115, 0.12,
  ];

  const chartW = 460;
  const chartH = 220;
  const padL = 34;
  const padR = 8;
  const padT = 10;
  const padB = 28;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;
  const yMax = 0.32;
  const xMax = days.length - 1;

  const toPath = (series: number[]) =>
    series
      .map((v, i) => {
        const x = padL + (i / xMax) * plotW;
        const y = padT + plotH - (v / yMax) * plotH;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  const yLabels = [0, 0.08, 0.16, 0.24, 0.32];

  return (
    <div className="mt-3">
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full">
        {yLabels.map((val) => {
          const yPos = padT + plotH - (val / yMax) * plotH;
          return (
            <g key={val}>
              <line
                x1={padL}
                x2={chartW - padR}
                y1={yPos}
                y2={yPos}
                stroke="#f0f0f3"
                strokeWidth="1"
              />
              <text x={padL - 6} y={yPos + 3} fontSize="10" fill="#9b9ba0" textAnchor="end">
                {val === 0 ? "0" : val.toFixed(2)}
              </text>
            </g>
          );
        })}

        <path d={toPath(awareness)} fill="none" stroke="#22c55e" strokeWidth="1.8" />
        <path d={toPath(sentiment)} fill="none" stroke="#2f7bff" strokeWidth="1.8" />
        <path d={toPath(memory)} fill="none" stroke="#7c3aed" strokeWidth="1.8" />

        {days
          .filter((d) => d % 2 === 0)
          .map((d) => {
            const x = padL + (d / xMax) * plotW;
            return (
              <text
                key={d}
                x={x}
                y={chartH - 8}
                fontSize="10"
                fill="#9b9ba0"
                textAnchor="middle"
              >
                Day {d}
              </text>
            );
          })}
      </svg>
    </div>
  );
}
