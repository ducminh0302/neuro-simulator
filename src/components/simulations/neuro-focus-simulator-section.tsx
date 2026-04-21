import {
  Activity,
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Eye,
  Gauge,
  Globe2,
  Lightbulb,
  Radar,
  ScanEye,
  Sparkles,
  Target,
  Waves,
  Zap,
} from "lucide-react";

import { SimulationPromptChat } from "@/components/simulations/simulation-prompt-chat";
import { Card, Pill, ProgressBar, SectionHeading, Surface } from "@/components/ui";

const creativeInputs = [
  { label: "Stimulus Type", value: "Static Graphic / Motion UI / Short-form Video" },
  { label: "Observation Duration", value: "3.0 Seconds (First Impression)" },
  { label: "Cognitive Load Target", value: "Minimalist / Information-Rich" },
];

const brainMetrics = [
  {
    name: "Attention Retention",
    value: "2.6s",
    detail: "Ability to hold the viewer's focus for more than 2 seconds.",
    kind: "wave" as const,
  },
  {
    name: "Emotional Valence",
    value: "+0.42",
    detail: "Range from Positive/Excitement to Negative/Fear.",
    kind: "valence" as const,
  },
  {
    name: "Cognitive Friction",
    value: "31",
    detail: "Difficulty in processing the information presented. Lower is better.",
    kind: "gauge" as const,
  },
  {
    name: "Visual Recall Prob.",
    value: "84%",
    detail: "Probability of remembering the brand/message after the first scan.",
    kind: "trend" as const,
  },
];

const eyeTrackingData = [
  {
    label: "Focal Point Entry Time",
    value: "150ms",
    note: "Ultra-fast acquisition by foveal vision.",
  },
  {
    label: "Gaze Path Simulation",
    value: "1 -> 2 -> 3",
    note: "Primary eye movement path from hero subject to CTA.",
  },
  {
    label: "Optical Flow Balance",
    value: "78/100",
    note: "Geometry and directionality are mostly balanced.",
  },
];

const triggerAxes = [
  { label: "Urgency", value: 74 },
  { label: "Authority", value: 69 },
  { label: "Trust", value: 82 },
  { label: "Aspiration", value: 77 },
  { label: "FOMO", value: 63 },
];

const benchmarkRows = [
  {
    metric: "Aesthetic Pleasure Index",
    current: "88",
    goldStandard: "Apple: 92 / Nike: 89 / Coca-Cola: 86",
    assessment: "Competitive",
  },
  {
    metric: "Brand Identity Integrity (0.5s)",
    current: "79%",
    goldStandard: "Apple: 91% / Nike: 87% / Coca-Cola: 90%",
    assessment: "Needs stronger logo anchoring",
  },
];

const agentReactions = [
  {
    persona: "The Fast-Paced Professional",
    reaction: "Too much text, skipped in 0.5s.",
    signal: "Low dwell time",
  },
  {
    persona: "The Detail-Oriented Scholar",
    reaction: "Interested in the data points, spent 5s.",
    signal: "High analytical engagement",
  },
  {
    persona: "The Impulse Buyer",
    reaction: "The 'Buy Now' button isn't prominent enough.",
    signal: "CTA friction",
  },
];

const recommendations = [
  {
    title: "Contrast",
    text: "Increase contrast in the top-right quadrant to guide the gaze toward the logo.",
    icon: Target,
  },
  {
    title: "Color Saturation",
    text: "Reduce saturation of the background to lower cognitive fatigue.",
    icon: Sparkles,
  },
  {
    title: "Typography",
    text: "Use a Sans-serif font for the sub-headline to speed up neural processing by 20%.",
    icon: Lightbulb,
  },
];

const radarSkeleton = [
  [50, 14],
  [86, 36],
  [74, 82],
  [26, 82],
  [14, 36],
];

function buildRadarPolygon(values: number[]) {
  return radarSkeleton
    .map(([x, y], index) => {
      const intensity = values[index] / 100;
      const px = 50 + (x - 50) * intensity;
      const py = 50 + (y - 50) * intensity;
      return `${px},${py}`;
    })
    .join(" ");
}

export function NeuroFocusSimulatorSection() {
  const triggerPolygon = buildRadarPolygon(triggerAxes.map((item) => item.value));

  return (
    <div className="space-y-8 pb-10">
      <SimulationPromptChat prompt="Simulate EEG-style attention and emotional response for this visual, then return eye-tracking saliency, trigger analysis, and optimization actions." />

      <SectionHeading
        eyebrow="Neuro-Focus"
        title={<>Neuro-Creative Evaluator</>}
        description="Predictive neural analytics to decode how the human brain processes your visual stimuli. Upload a visual asset to simulate EEG-based emotional valence and visual saliency."
        action={<Pill tone="accent">Cognitive Response Simulator</Pill>}
      />

      <Surface className="p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
          <Card className="overflow-hidden p-0">
            <div className="min-h-[335px] bg-[radial-gradient(circle_at_20%_18%,rgba(14,165,233,0.28),transparent_28%),radial-gradient(circle_at_80%_22%,rgba(244,63,94,0.22),transparent_28%),linear-gradient(145deg,#f8fafc,#eef2ff)] p-6">
              <div className="flex items-center justify-between">
                <Pill tone="soft">Header & Creative Input</Pill>
                <Brain size={18} className="text-accent" />
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-white/80 bg-white/80 p-5 backdrop-blur-sm">
                <p className="kicker">Visual stimulus upload</p>
                <div className="relative mt-3 min-h-[190px] rounded-[1.2rem] border border-line bg-[linear-gradient(155deg,#f8fafc,#e8ecfa)]">
                  <div className="absolute left-[18%] top-[26%] h-12 w-16 rounded-lg border border-line bg-white/80" />
                  <div className="absolute left-[43%] top-[18%] h-20 w-24 rounded-xl border border-line bg-white/80" />
                  <div className="absolute right-[14%] bottom-[18%] h-14 w-20 rounded-lg border border-line bg-white/80" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink soft-border">
                    <ScanEye size={12} />
                    EEG Preview Active
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <p className="kicker">Input Parameters</p>
            <div className="mt-4 space-y-3">
              {creativeInputs.map((item) => (
                <div key={item.label} className="rounded-[1.2rem] bg-panelSoft p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">{item.label}</p>
                  <p className="mt-2 text-sm font-medium text-ink sm:text-base">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Surface>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">The Brain Metrics</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">EEG-inspired cognitive KPI row</h2>
          </div>
          <Activity size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {brainMetrics.map((metric) => {
            if (metric.kind === "wave") {
              return (
                <Card key={metric.name} className="p-5">
                  <p className="kicker">{metric.name}</p>
                  <p className="headline mt-2 text-3xl">{metric.value}</p>
                  <p className="mt-2 text-sm text-muted">{metric.detail}</p>
                  <div className="mt-5 h-16 rounded-[1rem] bg-panelSoft px-3 py-2">
                    <svg viewBox="0 0 100 30" className="h-full w-full">
                      <path d="M0 16 C8 10, 16 22, 24 14 C32 8, 40 20, 48 15 C56 10, 64 22, 72 14 C80 8, 88 20, 100 13" fill="none" stroke="#0f172a" strokeWidth="2" />
                    </svg>
                  </div>
                </Card>
              );
            }

            if (metric.kind === "valence") {
              return (
                <Card key={metric.name} className="p-5">
                  <p className="kicker">{metric.name}</p>
                  <p className="headline mt-2 text-3xl">{metric.value}</p>
                  <p className="mt-2 text-sm text-muted">{metric.detail}</p>
                  <div className="mt-5 space-y-2">
                    <div className="h-2 rounded-full bg-[linear-gradient(90deg,#fb7185_0%,#f59e0b_45%,#22c55e_100%)]" />
                    <div className="relative h-4">
                      <span className="absolute left-[71%] top-0 inline-flex h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-ink" />
                    </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.16em] text-muted">
                      <span>-1 Fear</span>
                      <span>+1 Excitement</span>
                    </div>
                  </div>
                </Card>
              );
            }

            if (metric.kind === "gauge") {
              return (
                <Card key={metric.name} className="p-5">
                  <p className="kicker">{metric.name}</p>
                  <p className="headline mt-2 text-3xl">{metric.value}</p>
                  <p className="mt-2 text-sm text-muted">{metric.detail}</p>
                  <div className="mt-5 grid place-items-center">
                    <div className="relative h-20 w-40 overflow-hidden rounded-t-full bg-[linear-gradient(90deg,#22c55e_0%,#f59e0b_52%,#ef4444_100%)]">
                      <div className="absolute bottom-0 left-1/2 h-1 w-[30%] -translate-x-1/2 rounded-full bg-white" />
                    </div>
                    <span className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">Lower is better</span>
                  </div>
                </Card>
              );
            }

            return (
              <Card key={metric.name} className="p-5">
                <p className="kicker">{metric.name}</p>
                <div className="mt-2 flex items-center gap-2">
                  <p className="headline text-3xl">{metric.value}</p>
                  <ArrowUpRight size={18} className="text-emerald-500" />
                </div>
                <p className="mt-2 text-sm text-muted">{metric.detail}</p>
                <div className="mt-5">
                  <ProgressBar value={84} />
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">Neural Saliency & Eye-Tracking</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Predictive Eye-Tracking & Foveal Focus</h2>
          </div>
          <Eye size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <Card className="overflow-hidden p-0">
            <div className="relative min-h-[360px] bg-[linear-gradient(145deg,#f8fafc,#eef2ff)]">
              <div className="absolute left-[24%] top-[24%] h-28 w-28 rounded-full bg-red-500/35 blur-2xl" />
              <div className="absolute left-[50%] top-[42%] h-24 w-24 rounded-full bg-amber-400/30 blur-2xl" />
              <div className="absolute right-[18%] bottom-[20%] h-20 w-20 rounded-full bg-sky-400/35 blur-2xl" />
              <div className="absolute left-[28%] top-[30%] inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-ink soft-border">
                1
              </div>
              <div className="absolute left-[53%] top-[46%] inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-ink soft-border">
                2
              </div>
              <div className="absolute right-[22%] bottom-[26%] inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-ink soft-border">
                3
              </div>
              <div className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-600 soft-border">
                Neural compulsive gaze point
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {eyeTrackingData.map((item, index) => (
              <Card key={item.label} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="kicker">{item.label}</p>
                    <p className="headline mt-2 text-2xl">{item.value}</p>
                    <p className="mt-2 text-sm text-muted">{item.note}</p>
                  </div>
                  {index === 0 ? (
                    <Zap size={18} className="text-amber-500" />
                  ) : index === 1 ? (
                    <Waves size={18} className="text-accent" />
                  ) : (
                    <Gauge size={18} className="text-sky-600" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">Subconscious Triggers</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Subliminal & Behavioral Triggers</h2>
          </div>
          <Radar size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="p-6">
            <div className="grid place-items-center rounded-[1.6rem] bg-panelSoft p-5">
              <svg viewBox="0 0 100 100" className="h-72 w-72 overflow-visible">
                <polygon points="50,14 86,36 74,82 26,82 14,36" fill="rgba(56,189,248,0.12)" stroke="rgba(15,23,42,0.2)" />
                <polygon points={triggerPolygon} fill="rgba(15,23,42,0.72)" stroke="rgba(15,23,42,0.95)" strokeWidth="1.4" />
                {triggerAxes.map((axis, idx) => {
                  const labels: [number, number][] = [
                    [50, 9],
                    [92, 35],
                    [76, 92],
                    [24, 92],
                    [8, 35],
                  ];

                  return (
                    <text
                      key={axis.label}
                      x={labels[idx][0]}
                      y={labels[idx][1]}
                      textAnchor="middle"
                      className="fill-muted text-[5px] uppercase tracking-[0.16em]"
                    >
                      {axis.label}
                    </text>
                  );
                })}
              </svg>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <p className="kicker">Neural Tone Analysis</p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Primary Trigger: Dopamine Release driven by reward-oriented color accents and high-salience visual cues.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                Secondary Trigger: Cortisol Spike risk due to dense clusters of warning-style text near the upper fold.
              </p>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="kicker">Readability Index</p>
                  <p className="headline mt-2 text-2xl">Fast neural parsing</p>
                </div>
                <Brain size={18} className="text-accent" />
              </div>
              <div className="mt-4">
                <ProgressBar value={86} />
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">Estimated message decode time: 420ms</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">Historical Neuro-Data</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Neuro-Market Benchmarking</h2>
          </div>
          <Target size={20} className="text-accent" />
        </div>

        <Card className="mt-7 overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line/70 bg-panelSoft/80 text-xs uppercase tracking-[0.18em] text-muted">
                  <th className="p-4">Metric</th>
                  <th className="p-4 text-accent">Current Design</th>
                  <th className="p-4">Golden Standards</th>
                  <th className="p-4">Assessment</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkRows.map((row) => (
                  <tr key={row.metric} className="border-b border-line/60 last:border-b-0">
                    <td className="p-4 font-medium text-ink">{row.metric}</td>
                    <td className="p-4 text-accent">{row.current}</td>
                    <td className="p-4 text-muted">{row.goldStandard}</td>
                    <td className="p-4 text-muted">{row.assessment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">Real-time Audience Response</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Multi-Agent Persona Reaction</h2>
          </div>
          <Globe2 size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            {agentReactions.map((agent) => (
              <Card key={agent.persona} className="p-5">
                <p className="kicker">Agent Persona</p>
                <p className="headline mt-2 text-2xl">{agent.persona}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">{agent.reaction}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted">{agent.signal}</p>
              </Card>
            ))}
          </div>

          <Card className="overflow-hidden p-0">
            <div className="p-5">
              <p className="headline text-xl">Global Sentiment Map</p>
              <p className="mt-2 text-sm text-muted">Predicted cross-cultural response to symbols, color, and urgency tone.</p>
            </div>
            <div className="relative min-h-[300px] bg-[linear-gradient(155deg,#f8fafc,#eaf2ff)]">
              <div className="absolute left-[24%] top-[28%] h-20 w-20 rounded-full bg-emerald-300/35 blur-3xl" />
              <div className="absolute left-[52%] top-[22%] h-24 w-24 rounded-full bg-amber-300/32 blur-3xl" />
              <div className="absolute right-[20%] bottom-[20%] h-20 w-20 rounded-full bg-rose-300/32 blur-3xl" />
            </div>
          </Card>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">Neuro-Optimization Recommendations</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">AI Neuro-Design Optimization</h2>
          </div>
          <Sparkles size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4">
            {recommendations.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-5">
                  <div className="flex items-start gap-3">
                    <Icon size={18} className="mt-0.5 text-accent" />
                    <div>
                      <p className="kicker">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink sm:text-base">{item.text}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="rounded-[2rem] border border-line bg-[linear-gradient(145deg,#ecfeff,#f0f9ff)] p-6">
            <p className="kicker">Final Verdict</p>
            <div className="mt-4 rounded-[1.3rem] border border-line bg-white p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Status</p>
              <p className="mt-3 text-3xl font-semibold text-[#0f172a]">NEURO-OPTIMIZED</p>
              <p className="mt-2 text-sm text-muted">READY FOR DEPLOYMENT</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/85">
                Visual hierarchy is neurologically legible and attention flow is mostly efficient. Fine-tuning contrast and CTA salience will further improve conversion memory.
              </p>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#e8f7ef] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#15803d]">
              <CheckCircle2 size={14} />
              Deployment Signal: Green
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
