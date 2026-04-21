import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Camera,
  CircleHelp,
  Globe2,
  Gauge,
  Info,
  Lightbulb,
  LineChart,
  Palette,
  Sparkles,
  Target,
  TimerReset,
  TrendingUp,
  Upload,
  Users,
  Video,
} from "lucide-react";

import { SimulationPromptChat } from "@/components/simulations/simulation-prompt-chat";
import { Card, Pill, ProgressBar, SectionHeading, Surface } from "@/components/ui";

const assets = [
  { name: "hero-reel.mp4", type: "Reel", icon: Video },
  { name: "cover-frame.jpg", type: "Image", icon: Camera },
  { name: "caption-draft.txt", type: "Caption", icon: Sparkles },
];

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

const palette = [
  { name: "#0F172A", meaning: "Trust, depth", width: 86 },
  { name: "#7DD3FC", meaning: "Clarity, freshness", width: 74 },
  { name: "#F8FAFC", meaning: "Premium restraint", width: 60 },
  { name: "#F59E0B", meaning: "Warm urgency", width: 48 },
];

const objects = [
  ["Product", "98% confidence"],
  ["Lifestyle Background", "85% confidence"],
  ["Headline Text", "94% confidence"],
  ["CTA Button", "88% confidence"],
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

const regions = [
  ["Southeast Asia", "Trending now"],
  ["Western Europe", "High resonance"],
  ["North America", "Rising"],
  ["Middle East", "Experimental lift"],
];

const recommendations = [
  {
    icon: CircleHelp,
    label: "Caption",
    text: "Increase urgency by adding a limited-time offer keyword.",
  },
  {
    icon: Lightbulb,
    label: "Visual",
    text: "Brighten the shadows in the bottom-left corner to increase clarity.",
  },
  {
    icon: TimerReset,
    label: "Timing",
    text: "Best time to post: Tuesday, 7:00 PM (GMT+7) for maximum reach.",
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
  const simulatedPath = "M8 84 C18 80, 28 74, 36 69 C46 63, 56 53, 66 43 C75 34, 84 26, 92 18";
  const simulatedAreaPath = `${simulatedPath} L92 92 L8 92 Z`;
  const standardPath = "M8 88 C18 85, 28 80, 36 76 C46 71, 56 63, 66 55 C75 49, 84 42, 92 36";
  const keyDataPoints = [
    { label: "0h", x: 8, y: 84 },
    { label: "6h", x: 36, y: 69 },
    { label: "12h", x: 66, y: 43 },
    { label: "24h", x: 92, y: 18 },
  ];

  return (
    <div className="space-y-8 pb-10">
      <SimulationPromptChat prompt="Analyze this post asset pack and predict engagement, sentiment, saliency, benchmark gap, and actionable pre-launch improvements." />

      <SectionHeading
        eyebrow="Glassmorphism analytics"
        title={<>Post Content Simulator</>}
        description="Upload your creative assets to simulate audience engagement and sentiment response before going live."
        action={
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
            Back to overview <ArrowRight size={16} />
          </Link>
        }
      />

      <Surface className="overflow-hidden p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="headline max-w-3xl text-4xl leading-[0.94] sm:text-5xl lg:text-6xl">
                  Predictive analytics for post performance, saliency, and audience psychology.
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                The report blends creative review, behavioral scoring, and market context into one decision surface so teams can tune the post before publishing.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {assets.map((asset) => {
                const Icon = asset.icon;
                return (
                  <div key={asset.name} className="group rounded-[1.6rem] bg-white/80 p-4 soft-border transition-transform hover:-translate-y-0.5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="kicker">Asset</p>
                        <p className="headline mt-2 text-lg">{asset.name}</p>
                      </div>
                      <Icon size={18} className="text-accent transition-transform group-hover:scale-110" />
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">{asset.type}</p>
                  </div>
                );
              })}
            </div>
          </div>

            <div className="rounded-[2rem] bg-white/70 p-5 soft-border backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="kicker">Primary input</p>
                </div>
                <Upload className="text-accent" size={22} />
              </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-[1.4rem] bg-panelSoft p-4 soft-border">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Camera size={16} className="text-accent" />
                    <p className="text-sm font-semibold text-ink">Media Upload</p>
                  </div>
                  <span title="Supports image, video, and reel assets.">
                    <Info size={16} className="text-muted" />
                  </span>
                </div>
                <div className="mt-3 rounded-[1rem] border border-dashed border-line bg-white/80 p-4 text-sm text-muted">
                  Drag and drop Image / Video / Reel files here
                </div>
              </div>

              <div className="rounded-[1.4rem] bg-panelSoft p-4 soft-border">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-accent" />
                    <p className="text-sm font-semibold text-ink">Caption Preview</p>
                  </div>
                  <span title="NLP analysis of tone, keywords, and urgency.">
                    <Info size={16} className="text-muted" />
                  </span>
                </div>
                <div className="mt-3 rounded-[1rem] bg-white/90 p-4 text-sm leading-relaxed text-muted">
                  Analyze caption tone, keyword density, and CTA strength before launch.
                </div>
              </div>

              <div className="rounded-[1.4rem] bg-panelSoft p-4 soft-border">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-accent" />
                    <p className="text-sm font-semibold text-ink">Target Audience Segment</p>
                  </div>
                  <span title="Example segments: Gen Z, Tech Enthusiasts, Luxury Shoppers.">
                    <Info size={16} className="text-muted" />
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Gen Z", "Tech Enthusiasts", "Luxury Shoppers"].map((segment, index) => (
                    <Pill key={segment} tone={index === 0 ? "accent" : "soft"}>
                      {segment}
                    </Pill>
                  ))}
                </div>
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
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="kicker">{metric.label}</p>
                      <h4 className="headline mt-2 text-3xl">{metric.value}</h4>
                    </div>
                    <BrainCircuit size={20} className="text-accent" />
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
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="kicker">{metric.label}</p>
                      <h4 className="headline mt-2 text-3xl">{metric.value}</h4>
                    </div>
                    <Gauge size={20} className="text-accent" />
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
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="kicker">{metric.label}</p>
                      <h4 className="headline mt-2 text-3xl">{metric.value}</h4>
                    </div>
                    <TrendingUp size={20} className="text-accent" />
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
                  <Target size={20} className="text-accent" />
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
            <p className="kicker">Visual perception &amp; saliency map</p>
            <h3 className="headline mt-2 text-3xl sm:text-4xl">Where attention lands first</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              This is the science layer: focal points, color meaning, object detection, and composition scoring are combined into one visual readout.
            </p>
          </div>
          <Pill tone="accent">Science layer</Pill>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-line/70 px-5 py-4">
              <div>
                <p className="kicker">Simulated AI Heatmap</p>
                <p className="headline mt-1 text-xl">Focal points and first glance zones</p>
              </div>
              <Palette size={18} className="text-accent" />
            </div>
            <div className="relative min-h-[420px] overflow-hidden bg-[radial-gradient(circle_at_25%_20%,rgba(125,211,252,0.45),transparent_18%),radial-gradient(circle_at_70%_25%,rgba(15,23,42,0.28),transparent_20%),radial-gradient(circle_at_60%_70%,rgba(245,158,11,0.25),transparent_20%),linear-gradient(135deg,rgba(255,255,255,0.95),rgba(241,245,249,0.9))]">
              <div className="absolute left-[18%] top-[20%] h-28 w-28 rounded-full bg-cyan-300/35 blur-3xl" />
              <div className="absolute left-[48%] top-[28%] h-36 w-36 rounded-full bg-slate-900/20 blur-3xl" />
              <div className="absolute right-[18%] bottom-[18%] h-24 w-24 rounded-full bg-amber-400/30 blur-3xl" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative h-[320px] w-[320px] rounded-[2rem] border border-white/70 bg-white/25 shadow-soft backdrop-blur-md">
                  <div className="absolute left-[14%] top-[18%] h-24 w-24 rounded-full bg-accent/35 blur-2xl" />
                  <div className="absolute left-[52%] top-[20%] h-20 w-20 rounded-full bg-[#f59e0b]/35 blur-2xl" />
                  <div className="absolute left-[36%] top-[54%] h-28 w-28 rounded-full bg-slate-950/15 blur-3xl" />
                  <div className="absolute inset-0 rounded-[2rem] border border-white/60" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink soft-border backdrop-blur-md">
                    Focal point A
                  </div>
                  <div className="absolute bottom-4 right-4 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink soft-border backdrop-blur-md">
                    Focal point B
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="kicker">Color palette harmony</p>
                  <p className="headline mt-1 text-xl">Hex codes and psychological impact</p>
                </div>
                <span title="Hover labels for jargon explainers in prototype mode.">
                  <Info size={18} className="text-muted" />
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {palette.map((entry) => (
                  <div key={entry.name} className="rounded-[1.2rem] bg-panelSoft p-3">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <div className="flex items-center gap-3">
                        <span className="h-4 w-4 rounded-full border border-white/60" style={{ backgroundColor: entry.name }} />
                        <span className="font-semibold text-ink">{entry.name}</span>
                      </div>
                      <span className="text-muted">{entry.meaning}</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-line/70">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${entry.width}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="kicker">Object detection</p>
                  <p className="headline mt-1 text-xl">Identified elements in frame</p>
                </div>
                <BrainCircuit size={18} className="text-accent" />
              </div>
              <div className="mt-4 space-y-3">
                {objects.map(([name, score]) => (
                  <div key={name} className="flex items-center justify-between rounded-[1.2rem] bg-panelSoft px-4 py-3">
                    <span className="text-sm font-medium text-ink">{name}</span>
                    <span className="text-sm text-muted">{score}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-[1.2rem] bg-panelSoft p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-ink">Rule of Thirds Compliance</span>
                  <Pill tone="soft">Pass</Pill>
                </div>
                <div className="mt-3">
                  <ProgressBar value={84} />
                </div>
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
              <BarChart3 size={18} className="text-accent" />
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
                <Target size={18} className="text-accent" />
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
              <Globe2 size={18} className="text-accent" />
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
              <LineChart size={18} className="text-accent" />
            </div>

            <div className="mt-6 rounded-[2rem] bg-panelSoft p-4">
              <svg viewBox="0 0 100 100" className="h-72 w-full">
                <defs>
                  <linearGradient id="simulatedLine" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="simulatedArea" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                  <filter id="simulatedGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect x="0" y="0" width="100" height="100" rx="12" fill="transparent" />
                {[20, 40, 60, 80].map((y) => (
                  <line key={y} x1="8" y1={y} x2="94" y2={y} stroke="rgba(100,109,114,0.14)" />
                ))}
                <path d={simulatedAreaPath} fill="url(#simulatedArea)" />
                <path d={standardPath} fill="none" stroke="#cbd5e1" strokeWidth="1.35" strokeDasharray="3.2 3.2" strokeLinecap="round" />
                <path d={simulatedPath} fill="none" stroke="url(#simulatedLine)" strokeWidth="3.2" strokeLinecap="round" filter="url(#simulatedGlow)" />
                {keyDataPoints.map((point) => (
                  <g key={point.label}>
                    <circle cx={point.x} cy={point.y} r="2.2" fill="url(#simulatedLine)" opacity="0.35" />
                    <circle cx={point.x} cy={point.y} r="1.1" fill="#e0f2fe" />
                    <text x={point.x} y="96" textAnchor={point.label === "24h" ? "end" : "middle"} className="fill-muted text-[5px] uppercase tracking-[0.18em]">
                      {point.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-muted">
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-400" />Simulated Performance</span>
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-slate-300" />Industry Standard</span>
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
                <Users size={18} className="text-accent" />
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
                <p className="kicker">Global map</p>
                <p className="headline mt-1 text-xl">Aesthetic trend regions</p>
              </div>
              <Globe2 size={18} className="text-accent" />
            </div>
            <div className="mt-4 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(125,211,252,0.28),transparent_28%),linear-gradient(135deg,#eff6ff,#f8fafc)] p-5">
              <div className="grid min-h-[250px] place-items-center rounded-[1.5rem] border border-white/70 bg-white/55 backdrop-blur-sm">
                <div className="relative h-40 w-56 rounded-[2rem] border border-line/60 bg-white/80 p-4">
                  {regions.map(([region, status], index) => (
                    <div key={region} className={`absolute rounded-full border border-white/70 bg-white/85 px-3 py-2 text-xs shadow-soft ${index === 0 ? "left-3 top-6" : index === 1 ? "right-3 top-10" : index === 2 ? "left-14 bottom-8" : "right-14 bottom-6"}`}>
                      <div className="font-semibold text-ink">{region}</div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-muted">{status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="kicker">Reaction intensity</p>
                <p className="headline mt-1 text-xl">Global audience pull</p>
              </div>
              <Sparkles size={18} className="text-accent" />
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
              const Icon = item.icon;
              return (
                <Card key={item.label} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="kicker">{item.label}</p>
                      <h4 className="headline mt-2 text-xl">{item.text}</h4>
                    </div>
                    <Icon size={18} className="text-accent" />
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
