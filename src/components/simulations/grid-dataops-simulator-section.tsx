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
const VIDEO_SRC = "/grid-dataops.mp4";
const VIDEO_DURATION = 19; // seconds — 19 segments in test.predictions.npy

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

// ---------- sparklines ----------
const revenueSpark = "M0,32 L12,30 L24,28 L36,22 L50,18 L62,15 L74,18 L86,16 L100,14";
const conversionsSpark = "M0,32 L14,30 L28,28 L42,28 L56,27 L70,26 L84,25 L100,24";
const awarenessSpark = "M0,34 L14,30 L28,26 L42,20 L56,16 L70,13 L84,10 L100,8";
const sentimentSpark = "M0,38 L14,35 L28,30 L42,28 L56,26 L70,24 L84,22 L100,20";

// ---------- brain activation metrics: second-by-second keyframes ----------
// Derived from the test.predictions.npy (19 segments = 19 seconds)
// Values are calibrated from the actual prediction data range [-0.61, 1.25]
type BrainMetric = { label: string; value: number };

const brainMetricsTimeline: Record<number, BrainMetric[]> = {
  0: [
    { label: "Attention", value: 78 },
    { label: "Sustained", value: 42 },
    { label: "Arousal", value: 65 },
    { label: "Valence", value: 55 },
    { label: "Reward", value: 40 },
    { label: "Memory", value: 38 },
    { label: "Social", value: 30 },
    { label: "Curiosity", value: 60 },
  ],
  3: [
    { label: "Attention", value: 82 },
    { label: "Sustained", value: 48 },
    { label: "Arousal", value: 72 },
    { label: "Valence", value: 52 },
    { label: "Reward", value: 44 },
    { label: "Memory", value: 42 },
    { label: "Social", value: 28 },
    { label: "Curiosity", value: 64 },
  ],
  6: [
    { label: "Attention", value: 92 },
    { label: "Sustained", value: 55 },
    { label: "Arousal", value: 80 },
    { label: "Valence", value: 46 },
    { label: "Reward", value: 52 },
    { label: "Memory", value: 48 },
    { label: "Social", value: 26 },
    { label: "Curiosity", value: 70 },
  ],
  9: [
    { label: "Attention", value: 88 },
    { label: "Sustained", value: 52 },
    { label: "Arousal", value: 74 },
    { label: "Valence", value: 44 },
    { label: "Reward", value: 48 },
    { label: "Memory", value: 52 },
    { label: "Social", value: 24 },
    { label: "Curiosity", value: 62 },
  ],
  12: [
    { label: "Attention", value: 85 },
    { label: "Sustained", value: 58 },
    { label: "Arousal", value: 68 },
    { label: "Valence", value: 50 },
    { label: "Reward", value: 46 },
    { label: "Memory", value: 58 },
    { label: "Social", value: 27 },
    { label: "Curiosity", value: 58 },
  ],
  16: [
    { label: "Attention", value: 80 },
    { label: "Sustained", value: 50 },
    { label: "Arousal", value: 60 },
    { label: "Valence", value: 48 },
    { label: "Reward", value: 42 },
    { label: "Memory", value: 62 },
    { label: "Social", value: 25 },
    { label: "Curiosity", value: 54 },
  ],
  19: [
    { label: "Attention", value: 76 },
    { label: "Sustained", value: 45 },
    { label: "Arousal", value: 55 },
    { label: "Valence", value: 46 },
    { label: "Reward", value: 38 },
    { label: "Memory", value: 68 },
    { label: "Social", value: 24 },
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
    const jitter = ((second * 17 + i * 11) % 7) - 3;
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
    name: "Ananya",
    age: 21,
    gender: "female",
    outcome: "high intent",
    description:
      "Already owns an iPhone and does household chores. The cash reward for 15 minutes of work is immediately compelling — she's ready to sign up without hesitation.",
    exp: 15,
    confidence: "85.0%",
    keyTrigger: "Immediate monetary incentive with low barrier to entry",
    journey: [
      { day: 1, note: "Scrolling reels and this ad pops up. ₹10,000? That's my monthly coffee budget.", tags: ["intrigued"] },
      { day: 2, note: "I already have an iPhone and do chores daily. This is literally free money.", tags: ["high intent"] },
      { day: 3, note: "Clicked the link. The sign-up form was straightforward. Applied.", actions: ["clicked CTA", "applied"] },
    ],
  },
  {
    name: "Arjun",
    age: 27,
    gender: "male",
    outcome: "rejected",
    description:
      "The falling cash VFX reads as a scam to a developer's trained eye. Privacy concerns about filming his kitchen are too significant to justify the ₹10,000 offered.",
    exp: 12,
    confidence: "42.0%",
    keyTrigger: "Visual scam triggers + privacy friction",
    journey: [
      { day: 1, note: "The VFX looks AI-generated. Something about this ad screams MLM energy.", tags: ["skeptical"] },
      { day: 2, note: "Filming my private kitchen space for a startup I've never heard of? Hard no.", tags: ["privacy concern"] },
      { day: 3, note: "Even ₹10,000 doesn't justify handing over video of my home.", actions: ["dismissed"] },
    ],
  },
  {
    name: "Meera",
    age: 34,
    gender: "female",
    outcome: "considering",
    description:
      "Interested in the extra income but confused about the head-rig hardware. Unclear whether she needs to purchase it or if Grid sends it — this friction is blocking her from converting.",
    exp: 14,
    confidence: "68.0%",
    keyTrigger: "Hardware ambiguity blocking conversion",
    journey: [
      { day: 1, note: "I'd love ₹10,000 but what exactly is that thing on their head?" },
      { day: 2, note: "Does Grid send me the headgear or do I have to buy it? The ad doesn't say.", tags: ["confused"] },
      { day: 4, note: "Looked at their website. Still unclear about the EEG device logistics.", tags: ["researching"] },
      { day: 7, note: "Sent a DM to ask about the headset. Waiting for a response.", actions: ["reached out"] },
    ],
  },
  {
    name: "Rohan",
    age: 19,
    gender: "male",
    outcome: "high intent",
    description:
      "Sees this as an easy side hustle he can do while cleaning his gaming setup. The dog in the video made it feel authentic and relatable — he's convinced.",
    exp: 13,
    confidence: "91.0%",
    keyTrigger: "Low perceived effort + authenticity signal from dog",
    journey: [
      { day: 1, note: "I clean my setup every Sunday anyway. Getting paid ₹10,000 for it? Easy.", tags: ["excited"] },
      { day: 2, note: "The dog in the video made it look legit, not like a corporate ad.", tags: ["trust signal"] },
      { day: 3, note: "Signed up. Waiting for the headset to arrive.", actions: ["applied", "shared with friend"] },
    ],
  },
  {
    name: "Dr. Kapoor",
    age: 45,
    gender: "male",
    outcome: "rejected",
    description:
      "Views this as exploitative data harvesting. The complete absence of anonymization protocols, data retention policy, and IRB oversight in the ad constitutes a compliance failure.",
    exp: 10,
    confidence: "15.0%",
    keyTrigger: "Ethical and compliance red flags",
    journey: [
      { day: 1, note: "EEG data collection without an explicit IRB framework? This is ethically dubious." },
      { day: 2, note: "No mention of data anonymization, retention period, or third-party audits.", tags: ["compliance concern"] },
      { day: 3, note: "The ₹10K incentive suggests they know this data is extremely valuable — to whom and for what?", tags: ["critical", "distrust"] },
      { day: 5, note: "Filed a note with my university's ethics board about this type of ad.", actions: ["reported concern"] },
    ],
  },
];

// ---------- daily performance ----------
type DailyPoint = { day: number; impressions: number; unique: number };

const dailyPerformance: DailyPoint[] = [
  { day: 0, impressions: 18200, unique: 6400 },
  { day: 1, impressions: 22500, unique: 7100 },
  { day: 2, impressions: 26800, unique: 7800 },
  { day: 3, impressions: 24200, unique: 7600 },
  { day: 4, impressions: 19500, unique: 7200 },
  { day: 5, impressions: 21000, unique: 7400 },
  { day: 6, impressions: 28700, unique: 8200 },
  { day: 7, impressions: 32500, unique: 8600 },
  { day: 8, impressions: 35100, unique: 9200 },
  { day: 9, impressions: 31200, unique: 8900 },
  { day: 10, impressions: 24800, unique: 8400 },
  { day: 11, impressions: 20300, unique: 7900 },
  { day: 12, impressions: 22100, unique: 8100 },
  { day: 13, impressions: 29400, unique: 8700 },
  { day: 14, impressions: 38200, unique: 9600 },
];

// ---------- funnel ----------
type FunnelSegment = {
  label: string;
  count: number;
  percent: number;
  dot: string;
  bar: string;
};

const funnelSegments: FunnelSegment[] = [
  { label: "Aware", count: 4200, percent: 42.0, dot: "bg-[#2f7bff]", bar: "bg-[#2f7bff]" },
  { label: "Considering", count: 1400, percent: 14.0, dot: "bg-[#7c3aed]", bar: "bg-[#7c3aed]" },
  { label: "Intending", count: 450, percent: 4.5, dot: "bg-[#f59e0b]", bar: "bg-[#f59e0b]" },
  { label: "Applied", count: 710, percent: 7.1, dot: "bg-[#22c55e]", bar: "bg-[#22c55e]" },
  { label: "Unaware", count: 3240, percent: 32.4, dot: "bg-[#262626]", bar: "bg-[#262626]" },
];

// ---------- creative benchmarks ----------
type Benchmark = { label: string; score: number; percentile: string };

const benchmarks: Benchmark[] = [
  { label: "Attention Capture", score: 92, percentile: "P88" },
  { label: "Sustained Attention", score: 48, percentile: "P42" },
  { label: "Emotional Arousal", score: 75, percentile: "P71" },
  { label: "Emotional Valence", score: 46, percentile: "P38" },
  { label: "Reward", score: 40, percentile: "P22" },
  { label: "Memory Encoding", score: 52, percentile: "P45" },
  { label: "Social Resonance", score: 35, percentile: "P30" },
  { label: "Curiosity", score: 82, percentile: "P79" },
];

const performanceDrivers = ["Attention Capture", "Curiosity", "Emotional Arousal"];

const budgetRecommendations = [
  "Instagram Reels is 2.3x more effective than baseline — increase allocation by 30%.",
  "YouTube Pre-Roll is underperforming (0.4x baseline) — consider reallocating budget.",
  "Facebook Feed is below baseline (0.5x) — creative format mismatch for this audience.",
  "TikTok For You Page shows strong early signals (1.8x) — test incremental budget here.",
];

const creativeRecommendations = [
  "Remove falling cash VFX to increase the 'Trust' metric by ~20% among high-skepticism segments.",
  "Add a 'Data Privacy Shield' badge or explicit anonymization statement to reduce Skepticism conversion loss.",
  "Clarify head-rig onboarding: add a 3-second overlay showing 'We send the headset to you' to remove hardware friction.",
  "Low word-of-mouth potential (35/100). Add a referral mechanic ('Refer a friend, earn ₹500 bonus') to increase viral coefficient.",
  "Improve emotional valence: current score (46) is below median — showing positive real-life outcomes post-participation would help.",
  "Leverage the dog/pet element: authenticity signal is strong — keep UGC-style moments in future variants.",
];

// =============================================================================
// MAIN SECTION
// =============================================================================
export function GridDataopsSimulatorSection() {
  const [expandedAgentIdx, setExpandedAgentIdx] = useState<number>(-1);

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
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="headline text-3xl leading-tight text-ink md:text-[2.25rem]">
                Grid DataOps India - Humanoid Training
              </h1>
              <Chip>Deep Simulation</Chip>
            </div>
            <p className="text-sm text-inkMuted">
              single <span className="text-inkFaint">·</span> 10.0K agents{" "}
              <span className="text-inkFaint">·</span> 841.3s{" "}
              <span className="text-inkFaint">·</span> 5 archetypes{" "}
              <span className="text-inkFaint">·</span> 84.0% confidence
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-ink transition hover:bg-panelSoft"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* ---------- hero KPI cards ---------- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={<DollarSign className="h-4 w-4" />}
          label="AI Performance Score"
          value="84/100"
          sparkD={revenueSpark}
          sparkColor="#22c55e"
          sparkFill="rgba(34,197,94,0.12)"
        />
        <KpiCard
          icon={<Users className="h-4 w-4" />}
          label="Simulated Reach"
          value="12.5K"
          sparkD={conversionsSpark}
          sparkColor="#2f7bff"
          sparkFill="rgba(47,123,255,0.10)"
        />
        <KpiCard
          icon={<Eye className="h-4 w-4" />}
          label="Conversion (pCVR)"
          value="7.1%"
          sparkD={awarenessSpark}
          sparkColor="#14b8a6"
          sparkFill="rgba(20,184,166,0.10)"
        />
        <KpiCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="High Arousal Index"
          value="0.42"
          sparkD={sentimentSpark}
          sparkColor="#f59e0b"
          sparkFill="rgba(245,158,11,0.10)"
        />
      </div>

      {/* ---------- secondary KPIs ---------- */}
      <div className="grid gap-4 md:grid-cols-3">
        <MiniStat label="Attention Score" value="92%" />
        <MiniStat label="Trust Score" value="38%" />
        <MiniStat label="Desire Score" value="88%" />
      </div>

      {/* ---------- brain activation with video ---------- */}
      <BrainActivationBlock />

      {/* ---------- agent decision journeys ---------- */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Agent Decision Journeys</h2>
          <span className="text-xs text-inkMuted">5 archetypes simulated</span>
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
          Strong initial attention hook; trust and reward metrics below median for data-collection
          campaigns.
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

        <div className="mt-4">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-inkMuted">BUDGET</p>
          <div className="mt-2 space-y-2">
            {budgetRecommendations.map((rec) => (
              <RecommendationItem key={rec} text={rec} />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-inkMuted">CREATIVE</p>
          <div className="mt-2 space-y-2">
            {creativeRecommendations.map((rec) => (
              <RecommendationItem key={rec} text={rec} />
            ))}
          </div>
        </div>
      </Card>

      {/* ---------- awareness, sentiment & memory ---------- */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-ink">AIDA Funnel &amp; Sentiment Over Time</h2>
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
  const fillD = `${sparkD} L100,44 L0,44 Z`;
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-sm text-inkMuted">
        <span className="text-inkMuted">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-ink">{value}</div>
      <svg className="mt-3 h-10 w-full" viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden="true">
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
        <span className="text-xs text-inkMuted">Overall: 64/100</span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* LEFT: 3D Brain Viewer — uses the test.predictions data */}
        <div className="aspect-square rounded-2xl bg-black md:aspect-auto md:min-h-[420px] overflow-hidden border border-line/20">
          <BrainViewerLazy
            predictionKey="test.predictions"
            segmentIndex={Math.min(secondsFloor, 18)}
            autoRotateSpeed={0.125}
          />
        </div>

        {/* RIGHT: video + second-by-second metrics */}
        <div className="space-y-4">
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

            {VIDEO_SRC && (
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
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
              <div className="text-xs text-inkMuted">Simulated Reach</div>
              <div className="mt-0.5 text-lg font-semibold text-ink">12.5K</div>
            </div>
            <div>
              <div className="text-xs text-inkMuted">Peak Attention</div>
              <div className="mt-0.5 text-lg font-semibold text-ink">92%</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// =============================================================================
// Agent row
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
            className={cn("h-4 w-4 text-inkMuted transition-transform", expanded ? "rotate-180" : "")}
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
                    {exp.tags?.map((tag) => <Chip key={tag}>{tag}</Chip>)}
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
// Daily Performance line chart
// =============================================================================
function DailyPerformanceCard() {
  const [hoverDay, setHoverDay] = useState<number>(8);

  const chartW = 460;
  const chartH = 220;
  const padL = 34;
  const padR = 8;
  const padT = 10;
  const padB = 28;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  const xMax = dailyPerformance.length - 1;
  const yMax = 40000;

  const x = (day: number) => padL + (day / xMax) * plotW;
  const y = (val: number) => padT + plotH - (val / yMax) * plotH;

  const impressionsPath = dailyPerformance
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.day).toFixed(1)},${y(p.impressions).toFixed(1)}`)
    .join(" ");
  const uniquePath = dailyPerformance
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.day).toFixed(1)},${y(p.unique).toFixed(1)}`)
    .join(" ");

  const hoverPoint = dailyPerformance.find((p) => p.day === hoverDay) ?? dailyPerformance[8];
  const yLabels = [0, 10000, 20000, 30000, 40000];

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
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full" onMouseLeave={() => setHoverDay(8)}>
          {yLabels.map((val) => (
            <g key={val}>
              <line x1={padL} x2={chartW - padR} y1={y(val)} y2={y(val)} stroke="#f0f0f3" strokeWidth="1" />
              <text x={padL - 6} y={y(val) + 3} fontSize="10" fill="#9b9ba0" textAnchor="end">
                {val === 0 ? "0" : `${val / 1000}K`}
              </text>
            </g>
          ))}

          <path d={impressionsPath} fill="none" stroke="#7c3aed" strokeWidth="1.8" />
          <path d={uniquePath} fill="none" stroke="#14b8a6" strokeWidth="1.8" />

          <circle cx={x(hoverPoint.day)} cy={y(hoverPoint.impressions)} r="3.5" fill="#7c3aed" />

          {dailyPerformance
            .filter((_, i) => i % 2 === 0)
            .map((p) => (
              <text key={p.day} x={x(p.day)} y={chartH - 8} fontSize="10" fill="#9b9ba0" textAnchor="middle">
                Day {p.day}
              </text>
            ))}

          {dailyPerformance.map((p, i) => {
            const prevX = i === 0 ? padL : (x(p.day) + x(dailyPerformance[i - 1].day)) / 2;
            const nextX =
              i === dailyPerformance.length - 1 ? chartW - padR : (x(p.day) + x(dailyPerformance[i + 1].day)) / 2;
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

        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-xl border border-line bg-white px-3 py-2 text-xs shadow-[0_4px_14px_rgba(18,18,23,0.08)]"
          style={{
            left: `calc(${padL}px + ${(hoverPoint.day / xMax) * 100}% * (100% - ${padL + padR}px) / 100%)`,
            top: `calc(${(y(hoverPoint.impressions) / chartH) * 100}% - 8px)`,
          }}
        >
          <div className="font-semibold text-ink">Day {hoverPoint.day}</div>
          <div className="mt-0.5 text-inkMuted">
            Impressions : <span className="text-ink">{hoverPoint.impressions.toLocaleString()}</span>
          </div>
          <div className="text-inkMuted">
            Unique Reached : <span className="text-ink">{hoverPoint.unique.toLocaleString()}</span>
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
  let angle = -Math.PI / 2;
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
          {arcs.map((arc, i) => (arc ? <path key={i} d={arc.d} fill={arc.fill} /> : null))}
          <text x={cx} y={cy - 2} fontSize="18" fontWeight="600" fill="#1b1b1f" textAnchor="middle">
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
// Funnel bar
// =============================================================================
function FunnelBar({ segment }: { segment: FunnelSegment }) {
  const displayCount =
    segment.count >= 1000 ? `${(segment.count / 1000).toFixed(1)}K` : segment.count.toString();
  return (
    <div className="grid grid-cols-[120px_1fr_auto] items-center gap-4">
      <span className="text-sm text-ink">{segment.label}</span>
      <div className="h-2 rounded-full bg-[#f0f0f3]">
        <div className={cn("h-full rounded-full", segment.bar)} style={{ width: `${segment.percent}%` }} />
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
    <div className="rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink">{text}</div>
  );
}

// =============================================================================
// AIDA Funnel & Sentiment chart
// =============================================================================
function AwarenessSentimentMemoryChart() {
  // AIDA from test-result.md: Awareness 100%, Interest 72%, Desire 45%, Action 7.1%
  // Sentiment verticals: Excitement 75%, Confusion 40%, Distrust 55%, Curiosity 82%
  const days = Array.from({ length: 15 }, (_, i) => i);
  const awareness = [
    0.10, 0.13, 0.16, 0.20, 0.24, 0.28, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30,
  ];
  const interest = [
    0.05, 0.08, 0.12, 0.16, 0.19, 0.21, 0.22, 0.22, 0.22, 0.21, 0.20, 0.20, 0.20, 0.21, 0.22,
  ];
  const desire = [
    0.02, 0.04, 0.06, 0.08, 0.10, 0.11, 0.12, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13,
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
        const xPos = padL + (i / xMax) * plotW;
        const yPos = padT + plotH - (v / yMax) * plotH;
        return `${i === 0 ? "M" : "L"}${xPos.toFixed(1)},${yPos.toFixed(1)}`;
      })
      .join(" ");

  const yLabels = [0, 0.08, 0.16, 0.24, 0.32];

  return (
    <div className="mt-3">
      <div className="mb-3 flex flex-wrap gap-4 text-xs text-inkMuted">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-5 bg-[#22c55e]" /> Awareness
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-5 bg-[#2f7bff]" /> Interest
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-5 bg-[#f59e0b]" /> Desire
        </span>
      </div>
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full">
        {yLabels.map((val) => {
          const yPos = padT + plotH - (val / yMax) * plotH;
          return (
            <g key={val}>
              <line x1={padL} x2={chartW - padR} y1={yPos} y2={yPos} stroke="#f0f0f3" strokeWidth="1" />
              <text x={padL - 6} y={yPos + 3} fontSize="10" fill="#9b9ba0" textAnchor="end">
                {val === 0 ? "0" : val.toFixed(2)}
              </text>
            </g>
          );
        })}

        <path d={toPath(awareness)} fill="none" stroke="#22c55e" strokeWidth="1.8" />
        <path d={toPath(interest)} fill="none" stroke="#2f7bff" strokeWidth="1.8" />
        <path d={toPath(desire)} fill="none" stroke="#f59e0b" strokeWidth="1.8" />

        {days
          .filter((d) => d % 2 === 0)
          .map((d) => {
            const xPos = padL + (d / xMax) * plotW;
            return (
              <text key={d} x={xPos} y={chartH - 8} fontSize="10" fill="#9b9ba0" textAnchor="middle">
                Day {d}
              </text>
            );
          })}
      </svg>
    </div>
  );
}
