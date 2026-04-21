"use client";

import Link from "next/link";
import Image from "next/image";
import { BrainViewerLazy } from "@/components/brain/BrainViewerLazy";
import { SimulationPromptChat } from "@/components/simulations/simulation-prompt-chat";
import { Card, Pill, ProgressBar, SectionHeading, Surface } from "@/components/ui";



const vitals = [
  {
    label: "Engagement Probability",
    value: "78%",
    detail: "Predicted share of followers who will interact.",
    progress: 78,
  },
  {
    label: "Virality Score",
    value: "64",
    detail: "Potential for the post to be shared or saved.",
    progress: 64,
  },
  {
    label: "Visual Saliency",
    value: "91%",
    detail: "How fast the main product catches the eye.",
    progress: 91,
  },
  {
    label: "Sentiment Index",
    value: "Positive",
    detail: "Expected emotional response after first exposure.",
    progress: 72,
    tone: "positive",
  },
];

const psychographicMetrics = [
  { label: "Urgency", value: 76 },
  { label: "Curiosity", value: 82 },
  { label: "Aesthetic Appeal", value: 91 },
  { label: "Trustworthiness", value: 69 },
  { label: "Relatability", value: 63 },
];

const sentimentBreakdown = [
  { label: "Professional", value: 68 },
  { label: "Casual", value: 32 },
];

const benchmarkRows = [
  { metric: "Avg. Comments", current: "148", top10: "212", brandAverage: "96" },
  { metric: "Save-to-Reach Ratio", current: "7.8%", top10: "11.5%", brandAverage: "5.1%" },
  { metric: "Follower Growth Impact", current: "+2.4%", top10: "+3.9%", brandAverage: "+1.6%" },
];

const personas = [
  {
    name: "The Trendsetter",
    score: "85%",
    detail: "Most likely to share and amplify the aesthetic.",
    tags: ["High share intent", "Fast adopter"],
  },
  {
    name: "The Skeptic",
    score: "30%",
    detail: "Needs stronger proof before buying.",
    tags: ["Low purchase intent", "Evidence-driven"],
  },
  {
    name: "The Lurker",
    score: "High view time",
    detail: "Watches closely, but interacts less often.",
    tags: ["Passive viewer", "Low friction"],
  },
];

const emotionBubbles = [
  { label: "Excitement", intensity: 88, x: "16%", y: "18%", size: 118, tone: "from-cyan-400/60 to-blue-500/50" },
  { label: "Curiosity", intensity: 79, x: "54%", y: "10%", size: 102, tone: "from-sky-300/55 to-indigo-500/45" },
  { label: "Trust", intensity: 74, x: "30%", y: "52%", size: 96, tone: "from-emerald-300/55 to-teal-500/45" },
  { label: "Inspiration", intensity: 63, x: "68%", y: "48%", size: 84, tone: "from-violet-300/50 to-fuchsia-400/40" },
  { label: "Skepticism", intensity: 36, x: "8%", y: "66%", size: 72, tone: "from-slate-200/65 to-slate-400/45" },
  { label: "Urgency", intensity: 58, x: "58%", y: "68%", size: 82, tone: "from-amber-300/55 to-orange-500/45" },
];

const recommendations = [
  {
    label: "Caption",
    text: "Increase urgency by adding a limited-time offer keyword.",
  },
  {
    label: "Visual",
    text: "Brighten the shadows in the bottom-left corner to increase clarity.",
  },
  {
    label: "Timing",
    text: "Best time to post: Tuesday, 7:00 PM (GMT+7) for maximum reach.",
  },
];

const multiAgentResponses = [
  {
    name: "Flare",
    role: "Hook architect",
    perspective: "Optimizes first-impression speed and repost probability.",
    response:
      "Lead with the strongest product frame in the first slide and cut caption length by 20%. That should improve opening retention and save intent.",
    confidence: 89,
    stance: "Positive",
  },
  {
    name: "Quill",
    role: "Proof inspector",
    perspective: "Scans for credibility gaps in proof and claims.",
    response:
      "The concept is attractive, but conversion risk remains high without proof anchors. Add a concrete metric or customer quote near the CTA.",
    confidence: 52,
    stance: "Critical",
  },
  {
    name: "Tide",
    role: "Trend cartographer",
    perspective: "Reads platform-native behavior and audience trend fit.",
    response:
      "Visual language is trend-aligned for premium lifestyle feeds. A comment-bait question in line 2 can lift meaningful discussion.",
    confidence: 77,
    stance: "Mixed",
  },
  {
    name: "Crest",
    role: "Voice steward",
    perspective: "Protects long-term tone consistency and voice signature.",
    response:
      "Design language matches brand DNA, but the CTA reads generic. Replace with your brand phrase pattern to improve recall.",
    confidence: 82,
    stance: "Mixed",
  },
  {
    name: "Prism",
    role: "Emotion decoder",
    perspective: "Evaluates dominant emotional arc and friction points.",
    response:
      "Current tone lands on curiosity and aspiration. Add one certainty cue such as guarantee wording to reduce last-step hesitation.",
    confidence: 71,
    stance: "Mixed",
  },
  {
    name: "Bolt",
    role: "Conversion mechanic",
    perspective: "Balances awareness lift with downstream action quality.",
    response:
      "Top-funnel performance should be strong, but purchase intent is underpowered. Add a quantified benefit and deadline phrase to boost action.",
    confidence: 64,
    stance: "Mixed",
  },
  {
    name: "Sable",
    role: "Attention tracer",
    perspective: "Tracks eye-path flow and perceptual clarity.",
    response:
      "Primary attention lands correctly on the product, but corner clutter slows scan speed. Increase local contrast in the lower-left zone.",
    confidence: 86,
    stance: "Positive",
  },
  {
    name: "Mint",
    role: "Category comparator",
    perspective: "Compares expected outcomes with top-decile competitors.",
    response:
      "You likely beat category average reach, but save-to-reach may lag category leaders. Sharpen the core promise into one memorable line.",
    confidence: 68,
    stance: "Mixed",
  },
  {
    name: "Orbit",
    role: "Comment strategist",
    perspective: "Improves two-way conversation quality in comments.",
    response:
      "Audience will react, but discussion depth may stay shallow. Add a polarizing but safe question to increase comment quality.",
    confidence: 74,
    stance: "Positive",
  },
  {
    name: "Nudge",
    role: "Release arbitrator",
    perspective: "Turns mixed signals into publish-now decisions.",
    response:
      "Publishable for awareness campaigns today. If conversion is the priority, revise copy and proof blocks first, then launch tomorrow.",
    confidence: 79,
    stance: "Mixed",
  },
];

const radarPoints = [
  [50, 16],
  [88, 36],
  [76, 82],
  [34, 78],
  [22, 38],
];

function buildPolygon(points: number[][]) {
  return points.map(([x, y]) => `${x},${y}`).join(" ");
}

export function PostContentSimulatorSection() {
  const radarPolygon = buildPolygon(radarPoints);
  const simulatedPath = "M8 84 C16 80, 24 74, 32 66 C40 58, 50 51, 60 44 C70 37, 79 30, 92 22";
  const standardPath = "M8 88 C16 85, 24 80, 32 74 C41 68, 50 63, 60 57 C70 52, 80 48, 92 42";
  const simulatedAreaPath = `${simulatedPath} L92 92 L8 92 Z`;
  const keyIntervals = [
    { label: "0H", x: 8, y: 84 },
    { label: "6H", x: 36, y: 62 },
    { label: "12H", x: 62, y: 42 },
    { label: "24H", x: 92, y: 22 },
  ];
  const stanceToneClass: Record<string, string> = {
    Positive: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Mixed: "bg-amber-100 text-amber-700 border border-amber-200",
    Critical: "bg-rose-100 text-rose-700 border border-rose-200",
  };
  const stanceCardClass: Record<string, string> = {
    Positive: "border-emerald-300 bg-[linear-gradient(180deg,rgba(16,185,129,0.14),rgba(255,255,255,0.94))] shadow-[inset_0_0_0_1px_rgba(16,185,129,0.08)]",
    Mixed: "border-amber-300 bg-[linear-gradient(180deg,rgba(245,158,11,0.16),rgba(255,255,255,0.94))] shadow-[inset_0_0_0_1px_rgba(245,158,11,0.08)]",
    Critical: "border-rose-300 bg-[linear-gradient(180deg,rgba(244,63,94,0.14),rgba(255,255,255,0.94))] shadow-[inset_0_0_0_1px_rgba(244,63,94,0.08)]",
  };
  const stanceReplyClass: Record<string, string> = {
    Positive: "border-emerald-200/90 bg-white/88",
    Mixed: "border-amber-200/90 bg-white/88",
    Critical: "border-rose-200/90 bg-white/88",
  };
  const stanceBarClass: Record<string, string> = {
    Positive: "bg-emerald-500",
    Mixed: "bg-amber-500",
    Critical: "bg-rose-500",
  };

  return (
    <div className="space-y-8 pb-10">
      <SimulationPromptChat prompt="Analyze this post asset pack and predict engagement, sentiment, saliency, benchmark gap, and actionable pre-launch improvements." />

      <SectionHeading
        eyebrow="Glassmorphism analytics"
        title={<>Post Content Simulator</>}
        description="Upload your creative assets to simulate audience engagement and sentiment response before going live."
        action={
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
            Back to overview
          </Link>
        }
      />

      <Surface className="overflow-hidden p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="space-y-4">
            <h2 className="headline max-w-3xl text-4xl leading-[0.94] sm:text-5xl lg:text-6xl">
              Predictive analytics for post performance, saliency, and audience psychology.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              The report blends creative review, behavioral scoring, and market context into one decision surface so teams can tune the post before publishing.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white/70 p-5 soft-border backdrop-blur-xl space-y-4">
            <div>
              <p className="kicker">Primary input</p>
            </div>

            <div className="space-y-4">
              <div className="relative rounded-[2rem] bg-white/70 p-5 soft-border backdrop-blur-xl overflow-hidden">
                <Image
                  src="/pc.jpg"
                  alt="Creative evaluation"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-[1.4rem] object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-black rounded-full w-[67px] h-[67px] flex items-center justify-center">
                  <p className="text-white font-semibold text-2xl">+3</p>
                </div>
              </div>

              <div className="rounded-[1.6rem] bg-white/80 p-4 soft-border transition-transform hover:-translate-y-0.5 w-fit flex items-center gap-2">
                <p className="text-base font-semibold">caption-draft.txt</p>
              </div>
            </div>
          </div>
        </div>
      </Surface>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker">The vitals</p>
            <h3 className="headline mt-2 text-3xl sm:text-4xl">Predictive scores for the post</h3>
          </div>
          <Pill tone="accent">First row</Pill>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {vitals.map((metric) => {
            if (metric.label === "Sentiment Index") {
              return (
                <Card key={metric.label} className="p-5">
                    <div>
                      <p className="kicker">{metric.label}</p>
                      <h4 className="headline mt-2 text-3xl">{metric.value}</h4>
                    </div>
                  <p className="mt-2 text-sm text-muted">{metric.detail}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-line/70">
                      <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Positive</span>
                  </div>
                </Card>
              );
            }

            if (metric.label === "Virality Score") {
              return (
                <Card key={metric.label} className="p-5">
                    <div>
                      <p className="kicker">{metric.label}</p>
                      <h4 className="headline mt-2 text-3xl">{metric.value}</h4>
                    </div>
                  <p className="mt-2 text-sm text-muted">{metric.detail}</p>
                  <div className="mt-4 grid place-items-center">
                    <div className="relative h-28 w-28 rounded-full bg-[conic-gradient(from_180deg,#0f172a_0_64%,#d6d9df_64%_100%)] p-2">
                      <div className="grid h-full w-full place-items-center rounded-full bg-white text-center">
                        <div>
                          <p className="headline text-2xl">64</p>
                          <p className="kicker mt-1">/100</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            }

            if (metric.label === "Engagement Probability") {
              return (
                <Card key={metric.label} className="p-5">
                    <div>
                      <p className="kicker">{metric.label}</p>
                      <h4 className="headline mt-2 text-3xl">{metric.value}</h4>
                    </div>
                  <p className="mt-2 text-sm text-muted">{metric.detail}</p>
                  <div className="mt-4 grid place-items-center">
                    <div className="relative h-28 w-28 rounded-full bg-[conic-gradient(from_180deg,#7dd3fc_0_78%,#e5e7eb_78%_100%)] p-2">
                      <div className="grid h-full w-full place-items-center rounded-full bg-white text-center">
                        <div>
                          <p className="headline text-2xl">78%</p>
                          <p className="kicker mt-1">Probability</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            }

            return (
              <Card key={metric.label} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="kicker">{metric.label}</p>
                    <h4 className="headline mt-2 text-3xl">{metric.value}</h4>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted">{metric.detail}</p>
                <div className="mt-4">
                  <ProgressBar value={metric.progress} />
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="kicker">Neural activation map</p>
            <h3 className="headline mt-2 text-3xl sm:text-4xl">Where the brain responds first</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              fMRI-based neural simulation: activation peaks in visual cortex (V1/V2/V3) and lateral occipital regions show how your content drives real brain responses before publishing.
            </p>
          </div>
          <Pill tone="accent">Science layer</Pill>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-line/70 px-5 py-4">
              <div>
                <p className="kicker">3D neural activation</p>
                <p className="headline mt-1 text-xl">Predicted cortical response to content</p>
              </div>
            </div>
            <div className="h-[460px]">
              <BrainViewerLazy />
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="kicker">fMRI-based commentary</p>
                  <p className="headline mt-1 text-xl">Simulated preference signal</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  {
                    title: "Overall reaction: Likely to be liked",
                    note: "Visual cortex + lateral occipital activation suggests fast positive attention in the first seconds.",
                    score: 82,
                  },
                  {
                    title: "Why users may like it",
                    note: "Strong object clarity and composition support fluency, which often correlates with perceived quality.",
                    score: 87,
                  },
                  {
                    title: "What can still reduce preference",
                    note: "Moderate prefrontal engagement indicates decision friction; simplify CTA wording to improve instant trust.",
                    score: 41,
                  },
                  {
                    title: "Optimization opportunity",
                    note: "If headline-to-product contrast is increased, simulated saliency becomes more stable across mixed audiences.",
                    score: 74,
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.2rem] bg-panelSoft p-3">
                    <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-ink">{item.title}</span>
                      </div>
                      <span className="shrink-0 text-muted">{item.score}%</span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted">{item.note}</p>
                    <div className="h-2 rounded-full bg-line/70">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.score}%`,
                          background: `linear-gradient(to right, #a855f7, ${
                            item.score > 80 ? "#f472b6" : item.score > 60 ? "#ec4899" : "#c026d3"
                          })`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="kicker">Psychographic impact analysis</p>
            <h3 className="headline mt-2 text-3xl sm:text-4xl">The feeling section, rewritten as behavior science</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The charting here maps motivation, clarity, and CTA pressure so you can see how the creative behaves in the mind before it is published.
            </p>
          </div>
          <Pill tone="accent">Behavioral lens</Pill>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1.15fr]">
          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="kicker">Radar chart</p>
                <p className="headline mt-1 text-xl">Psychographic metrics</p>
              </div>
            </div>

            <div className="mt-6 grid place-items-center rounded-[2rem] bg-panelSoft p-5">
              <svg viewBox="0 0 100 100" className="h-72 w-72 overflow-visible">
                <polygon points="50,12 88,36 76,82 24,82 12,36" fill="rgba(125, 211, 252, 0.14)" stroke="rgba(15, 23, 42, 0.16)" strokeWidth="1" />
                <polygon points={radarPolygon} fill="rgba(15, 23, 42, 0.8)" stroke="rgba(15, 23, 42, 0.95)" strokeWidth="1.5" />
                <polygon points="50,28 74,40 68,70 34,68 24,42" fill="rgba(125, 211, 252, 0.22)" stroke="rgba(125, 211, 252, 0.8)" strokeWidth="1" />
                <line x1="50" y1="12" x2="50" y2="88" stroke="rgba(100,109,114,0.25)" />
                <line x1="12" y1="36" x2="88" y2="36" stroke="rgba(100,109,114,0.25)" />
                <line x1="24" y1="82" x2="76" y2="82" stroke="rgba(100,109,114,0.25)" />
                <line x1="12" y1="36" x2="50" y2="12" stroke="rgba(100,109,114,0.25)" />
                <line x1="88" y1="36" x2="50" y2="12" stroke="rgba(100,109,114,0.25)" />
                {[
                  [50, 8, "Urgency"],
                  [90, 36, "Curiosity"],
                  [76, 92, "Aesthetic"],
                  [22, 92, "Relatability"],
                  [6, 36, "Trust"],
                ].map(([x, y, label]) => (
                  <text key={label as string} x={x as number} y={y as number} textAnchor="middle" className="fill-muted text-[6px] uppercase tracking-[0.18em]">
                    {label as string}
                  </text>
                ))}
              </svg>
            </div>

            <div className="mt-5 grid gap-3">
              {psychographicMetrics.map((metric) => (
                <div key={metric.label} className="rounded-[1.2rem] bg-panelSoft p-3">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{metric.label}</span>
                    <span className="text-muted">{metric.value}%</span>
                  </div>
                  <ProgressBar value={metric.value} />
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="kicker">Caption sentiment breakdown</p>
                  <p className="headline mt-1 text-xl">Tone: professional vs. casual</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {sentimentBreakdown.map((item, index) => (
                  <div key={item.label} className="rounded-[1.2rem] bg-panelSoft p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-ink">{item.label}</span>
                      <span className="text-muted">{item.value}%</span>
                    </div>
                    <div className="mt-3 h-3 rounded-full bg-line/70 overflow-hidden">
                      <div className={`h-full rounded-full ${index === 0 ? "bg-ink" : "bg-accent"}`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-[1.2rem] bg-panelSoft p-4">
                  <p className="kicker">Readability</p>
                  <p className="headline mt-2 text-2xl">Medium</p>
                </div>
                <div className="rounded-[1.2rem] bg-panelSoft p-4">
                  <p className="kicker">Grade level</p>
                  <p className="headline mt-2 text-2xl">8.4</p>
                </div>
                <div className="rounded-[1.2rem] bg-panelSoft p-4">
                  <p className="kicker">CTA strength</p>
                  <p className="headline mt-2 text-2xl">4.8%</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="kicker">Niche benchmarking &amp; competitive gap</p>
            <h3 className="headline mt-2 text-3xl sm:text-4xl">Where this simulation sits in the market</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Use the market context to compare the post against top performers and the average brand baseline, then see how the first 24 hours may unfold.
            </p>
          </div>
          <Pill tone="accent">Market context</Pill>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1.05fr]">
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-line/70 px-5 py-4">
              <div>
                <p className="kicker">Comparison table</p>
                <p className="headline mt-1 text-xl">Top 10% vs brand average</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line/70 bg-panelSoft/80 text-xs uppercase tracking-[0.2em] text-muted">
                    <th className="p-4">Metric</th>
                    <th className="p-4 text-accent">Current Simulation</th>
                    <th className="p-4">Top 10% in Category</th>
                    <th className="p-4">Brand Average</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarkRows.map((row) => (
                    <tr key={row.metric} className="border-b border-line/60 last:border-b-0 hover:bg-panelSoft/60">
                      <td className="p-4 font-medium text-ink">{row.metric}</td>
                      <td className="p-4 text-accent">{row.current}</td>
                      <td className="p-4 text-muted">{row.top10}</td>
                      <td className="p-4 text-muted">{row.brandAverage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="kicker">Dual-axis trend</p>
                <p className="headline mt-1 text-xl">Simulated performance vs industry standard</p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] bg-panelSoft p-4">
              <svg viewBox="0 0 100 100" className="h-72 w-full">
                <defs>
                  <linearGradient id="simulatedLineGradient" x1="8%" y1="86%" x2="95%" y2="20%">
                    <stop offset="0%" stopColor="#00B8FF" />
                    <stop offset="52%" stopColor="#4D8BFF" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <linearGradient id="simulatedAreaGradient" x1="0%" y1="10%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                  <filter id="lineGlow" x="-25%" y="-25%" width="150%" height="150%">
                    <feGaussianBlur stdDeviation="1.6" result="softGlow" />
                    <feMerge>
                      <feMergeNode in="softGlow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="pointGlow" x="-120%" y="-120%" width="340%" height="340%">
                    <feGaussianBlur stdDeviation="1.2" result="pointSoftGlow" />
                    <feMerge>
                      <feMergeNode in="pointSoftGlow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect x="0" y="0" width="100" height="100" rx="12" fill="transparent" />
                {[20, 38, 56, 74, 92].map((y) => (
                  <line key={y} x1="8" y1={y} x2="92" y2={y} stroke="rgba(148,163,184,0.2)" strokeWidth="0.6" />
                ))}
                <path d={simulatedAreaPath} fill="url(#simulatedAreaGradient)" />
                <path
                  d={simulatedPath}
                  fill="none"
                  stroke="url(#simulatedLineGradient)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#lineGlow)"
                />
                <path
                  d={standardPath}
                  fill="none"
                  stroke="rgba(203,213,225,0.9)"
                  strokeWidth="1.6"
                  strokeDasharray="3.2 3"
                  strokeLinecap="round"
                />
                {keyIntervals.map((point) => (
                  <g key={point.label}>
                    <circle cx={point.x} cy={point.y} r="2.3" fill="rgba(77,139,255,0.26)" filter="url(#pointGlow)" />
                    <circle cx={point.x} cy={point.y} r="1.3" fill="#EEF4FF" />
                  </g>
                ))}
                {keyIntervals.map((point) => (
                  <text
                    key={`label-${point.label}`}
                    x={point.x}
                    y="97"
                    textAnchor={point.label === "0H" ? "start" : point.label === "24H" ? "end" : "middle"}
                    className="fill-muted text-[5px] uppercase tracking-[0.2em]"
                  >
                    {point.label}
                  </text>
                ))}
              </svg>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-muted">
              <span className="inline-flex items-center gap-2">
                <span className="h-[3px] w-6 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500" />
                Simulated Performance
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-[2px] w-6 rounded-full border-t border-dashed border-slate-300" />
                Industry Standard
              </span>
            </div>
          </Card>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="kicker">Persona conversion probability</p>
            <h3 className="headline mt-2 text-3xl sm:text-4xl">Who reacts the most?</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              This section identifies which audience archetype is most likely to share, buy, or simply watch longer, so you can target the strongest reaction profile.
            </p>
          </div>
          <Pill tone="accent">Persona map</Pill>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {personas.map((persona) => (
            <Card key={persona.name} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="kicker">User profile</p>
                  <h4 className="headline mt-2 text-xl">{persona.name}</h4>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">{persona.detail}</p>
              <p className="mt-5 headline text-3xl">{persona.score}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {persona.tags.map((tag) => (
                  <Pill key={tag} tone="soft">
                    {tag}
                  </Pill>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="kicker">Audience emotion flow</p>
                <p className="headline mt-1 text-xl">Emotion clusters from the simulated response</p>
              </div>
            </div>
            <div className="mt-4 rounded-[2rem] bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.26),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(99,102,241,0.2),transparent_35%),linear-gradient(145deg,#eef5ff,#f8fbff)] p-5">
              <div className="min-h-[280px] rounded-[1.5rem] border border-white/70 bg-white/60 p-4 backdrop-blur-md">
                <div className="relative h-[248px] overflow-hidden rounded-[1.2rem] border border-line/70 bg-white/65">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,102,241,0.14),transparent_35%),radial-gradient(circle_at_25%_75%,rgba(56,189,248,0.16),transparent_45%)]" />
                  {emotionBubbles.map((emotion) => (
                    <div
                      key={emotion.label}
                      className="absolute grid place-items-center rounded-full border border-white/70 text-center shadow-soft backdrop-blur-md"
                      style={{
                        left: emotion.x,
                        top: emotion.y,
                        width: `${emotion.size}px`,
                        height: `${emotion.size}px`,
                        background: "rgba(255,255,255,0.42)",
                        boxShadow: "0 0 22px rgba(79,70,229,0.16)",
                      }}
                    >
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${emotion.tone}`} />
                      <div className="relative z-10 px-2">
                        <p className="headline text-[11px] leading-tight text-ink sm:text-xs">{emotion.label}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ink/70">{emotion.intensity}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.14em] text-muted">
              {emotionBubbles
                .slice()
                .sort((a, b) => b.intensity - a.intensity)
                .slice(0, 3)
                .map((emotion) => (
                  <span key={`dominant-${emotion.label}`} className="rounded-full bg-panelSoft px-3 py-1.5">
                    {emotion.label}
                  </span>
                ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="kicker">Reaction intensity</p>
                <p className="headline mt-1 text-xl">Global audience pull</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Share", 85],
                ["Buy", 30],
                ["Watch", 88],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-[1.2rem] bg-panelSoft p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{label as string}</span>
                    <span className="text-muted">{value as number}%</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-line/70 overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${value as number}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="kicker">Multi-agent response simulation</p>
            <h3 className="headline mt-2 text-3xl sm:text-4xl">10 agents respond to the initial prompt</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Each agent simulates a distinct evaluation role for the same starting prompt, so you can compare aligned and conflicting viewpoints before deciding.
            </p>
          </div>
          <Pill tone="accent">Consensus check</Pill>
        </div>

        <div className="mt-8 space-y-4">
          {multiAgentResponses.map((agent) => (
            <Card key={agent.name} className={`soft-border border p-4 sm:p-5 ${stanceCardClass[agent.stance] ?? "border-slate-200 bg-slate-50/80"}`}>
              <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)_120px] lg:items-start">
                <div>
                  <p className="kicker">{agent.role}</p>
                  <h4 className="headline mt-1 text-xl">{agent.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{agent.perspective}</p>
                </div>

                <div className={`rounded-[0.9rem] border p-3 ${stanceReplyClass[agent.stance] ?? "border-slate-200 bg-white/90"}`}>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">Simulated reply</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/90">{agent.response}</p>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted">
                    <span>Confidence</span>
                    <span>{agent.confidence}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-line/70 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stanceBarClass[agent.stance] ?? "bg-slate-500"}`}
                      style={{ width: `${agent.confidence}%` }}
                    />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${stanceToneClass[agent.stance] ?? "bg-slate-100 text-slate-600 border border-slate-200"}`}>
                      {agent.stance}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="kicker">AI-powered optimization suggestions</p>
            <h3 className="headline mt-2 text-3xl sm:text-4xl">Conclusion and next action</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The final block resolves the analysis into a direct recommendation, so the simulation ends with an actionable decision rather than scattered notes.
            </p>
          </div>
          <Pill tone="accent">Final output</Pill>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.85fr]">
          <div className="grid gap-4 md:grid-cols-3">
            {recommendations.map((item) => {
              return (
                <Card key={item.label} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="kicker">{item.label}</p>
                      <h4 className="headline mt-2 text-xl">{item.text}</h4>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="rounded-[2rem] border border-line bg-[linear-gradient(145deg,#f8fbff,#eef7ff)] p-6 text-ink sm:p-7">
            <p className="kicker text-muted">Final verdict</p>
            <div className="mt-4 rounded-[1.6rem] border border-line bg-white p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Recommendation</p>
              <p className="headline mt-3 text-3xl text-ink">READY TO POST</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                Strong saliency, positive sentiment, and above-average benchmarking suggest the concept is launch-ready with only small copy and lighting refinements.
              </p>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-[1.3rem] border border-line bg-white p-4">
                <p className="kicker text-muted">Confidence</p>
                <p className="headline mt-2 text-2xl text-ink">87%</p>
              </div>
              <div className="rounded-[1.3rem] border border-line bg-white p-4">
                <p className="kicker text-muted">Risk</p>
                <p className="headline mt-2 text-2xl text-ink">Low</p>
              </div>
              <div className="rounded-[1.3rem] border border-line bg-white p-4">
                <p className="kicker text-muted">Decision</p>
                <p className="headline mt-2 text-2xl text-ink">Ship</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
