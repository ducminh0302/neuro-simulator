import {
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Eye,
  LampDesk,
  Leaf,
  MoonStar,
  Monitor,
  MoveUp,
  Radar,
  Sparkles,
  Sun,
  Volume2,
  Waves,
  Wind,
  Zap,
} from "lucide-react";

import { BrainViewerLazy } from "@/components/brain/BrainViewerLazy";
import { SimulationPromptChat } from "@/components/simulations/simulation-prompt-chat";
import { Card, Pill, ProgressBar, SectionHeading, Surface } from "@/components/ui";

const setupInputs = [
  { label: "Space Purpose", value: "Coding Sprint / Deep Work" },
  { label: "Current Time of Day", value: "10:00 AM (Morning Focus)" },
  { label: "Detected Devices", value: "Dual Monitors, Mechanical Keyboard, Ergonomic Chair" },
  { label: "Goal Prompt", value: '"Deep Work session for LLM Research"' },
];

const focusVitals = [
  {
    name: "Focus Sustainability",
    value: "74%",
    detail: "How long you can maintain deep work without distraction.",
    kind: "ring" as const,
  },
  {
    name: "Ergonomic Alignment",
    value: "81/100",
    detail: "Monitor height, seat posture, and wrist angle alignment.",
    kind: "gauge" as const,
  },
  {
    name: "Cognitive Load Score",
    value: "34",
    detail: "Lower is better. Visual clutter is currently low-moderate.",
    kind: "inverse" as const,
  },
  {
    name: "Circadian Harmony",
    value: "Balanced",
    detail: "Natural and artificial blue-light distribution for focus.",
    kind: "sunmoon" as const,
  },
];

const spatialStats = [
  { label: "Clutter Density", value: "25%", note: "Minimalist" },
  { label: "Cable Management", value: "Needs improvement", note: "Detected 5+ exposed wires" },
  { label: "Audio Acoustics", value: "Moderate echo", note: "Potential Zoom reflection around bare wall" },
];

const resonanceAxes = [
  { label: "Calmness", value: 82 },
  { label: "Creativity", value: 61 },
  { label: "Energy", value: 69 },
  { label: "Privacy", value: 72 },
  { label: "Technology", value: 90 },
];

const standardsRows = [
  {
    metric: "Lumen Output",
    current: "460 lux",
    standard: "500-750 lux",
    assessment: "Slightly dim",
  },
  {
    metric: "Air Quality Index (Predicted)",
    current: "58",
    standard: "< 50",
    assessment: "Acceptable with ventilation",
  },
  {
    metric: "Ergonomic Grade",
    current: "B+",
    standard: "A benchmark",
    assessment: "Good chair, monitor too low",
  },
];

const fatigueCards = [
  {
    title: "Neck/Back Strain",
    risk: "High risk after 120 mins",
    note: "Primary cause: downward screen tilt and shoulder compression.",
    tone: "warning" as const,
  },
  {
    title: "Eye Fatigue",
    risk: "Medium risk",
    note: "Apply 20-20-20 rule and reduce direct glare points.",
    tone: "medium" as const,
  },
  {
    title: "Focus Drop-off",
    risk: "Predicted around 3:00 PM",
    note: "Likely triggered by declining natural light and rising cognitive load.",
    tone: "neutral" as const,
  },
];

const upgrades = [
  {
    title: "Biophilic Add-on",
    text: "Add a snake plant to the left corner to improve CO2 filtration and stress response.",
    icon: Leaf,
  },
  {
    title: "Lighting",
    text: "Install a monitor light bar to reduce screen glare and eye strain at midday.",
    icon: LampDesk,
  },
  {
    title: "Furniture",
    text: "Raise monitor by 5cm to align top bezel with eye level for neutral neck posture.",
    icon: MoveUp,
  },
];

const radarPoints = [
  [50, 14],
  [86, 36],
  [74, 82],
  [26, 82],
  [14, 36],
];

function buildRadarPolygon(values: number[]) {
  return radarPoints
    .map(([x, y], index) => {
      const intensity = values[index] / 100;
      const px = 50 + (x - 50) * intensity;
      const py = 50 + (y - 50) * intensity;
      return `${px},${py}`;
    })
    .join(" ");
}

export function WorkspaceProductivitySimulatorSection() {
  const radarPolygon = buildRadarPolygon(resonanceAxes.map((item) => item.value));

  return (
    <div className="space-y-8 pb-10">
      <SimulationPromptChat prompt="Analyze my workspace setup image for focus sustainability, ergonomic risks, mood impact, 4-hour fatigue projection, and priority upgrades." />

      <SectionHeading
        eyebrow="OptiSpace AI"
        title={<>Environmental Flow Simulator</>}
        description="Analyze your environment to maximize focus, health, and creative output. Upload your setup image and define your work objective for adaptive workspace scoring."
        action={<Pill tone="accent">Workspace Productivity</Pill>}
      />

      <Surface className="p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <Card className="overflow-hidden p-0">
            <div className="min-h-[340px] bg-[radial-gradient(circle_at_18%_20%,rgba(251,191,36,0.26),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(56,189,248,0.22),transparent_28%),linear-gradient(145deg,#f8fafc,#eef3f7)] p-6">
              <div className="flex items-center justify-between">
                <Pill tone="soft">Header & Environment Input</Pill>
                <Monitor size={18} className="text-accent" />
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-white/80 bg-white/75 p-5 backdrop-blur-sm">
                <p className="kicker">Upload workspace photo</p>
                <div className="relative mt-3 min-h-[190px] rounded-[1.2rem] border border-line bg-[linear-gradient(160deg,#f8fafc,#e8eef5)]">
                  <div className="absolute left-[18%] top-[22%] h-24 w-20 rounded-xl border border-line bg-white/80" />
                  <div className="absolute left-[42%] top-[24%] h-24 w-20 rounded-xl border border-line bg-white/80" />
                  <div className="absolute right-[16%] bottom-[18%] h-16 w-24 rounded-xl border border-line bg-white/80" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink soft-border">
                    <Clock3 size={12} />
                    Morning Focus Read
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <p className="kicker">Input Data</p>
            <div className="mt-4 space-y-3">
              {setupInputs.map((item) => (
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
            <p className="kicker">The Focus Vitals</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Flow-state performance indicators</h2>
          </div>
          <Zap size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {focusVitals.map((metric) => {
            if (metric.kind === "ring") {
              return (
                <Card key={metric.name} className="p-5">
                  <p className="kicker">{metric.name}</p>
                  <p className="headline mt-2 text-3xl">{metric.value}</p>
                  <p className="mt-2 text-sm text-muted">{metric.detail}</p>
                  <div className="mt-5 grid place-items-center">
                    <div className="relative h-28 w-28 rounded-full bg-[conic-gradient(from_180deg,#38bdf8_0_74%,#22c55e_74%,#e5e7eb_74%_100%)] p-2">
                      <div className="grid h-full w-full place-items-center rounded-full bg-white">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Sustain</span>
                      </div>
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
                    <div className="relative h-20 w-40 overflow-hidden rounded-t-full bg-[linear-gradient(90deg,#fb7185_0%,#f59e0b_45%,#22c55e_100%)]">
                      <div className="absolute bottom-0 left-1/2 h-1 w-[68%] -translate-x-1/2 rounded-full bg-white" />
                    </div>
                  </div>
                </Card>
              );
            }

            if (metric.kind === "inverse") {
              return (
                <Card key={metric.name} className="p-5">
                  <p className="kicker">{metric.name}</p>
                  <p className="headline mt-2 text-3xl">{metric.value}</p>
                  <p className="mt-2 text-sm text-muted">{metric.detail}</p>
                  <div className="mt-5 space-y-2">
                    <div className="h-2 overflow-hidden rounded-full bg-line/70">
                      <div className="h-full w-[34%] rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">Inverted scale: lower is better</p>
                  </div>
                </Card>
              );
            }

            return (
              <Card key={metric.name} className="p-5">
                <p className="kicker">{metric.name}</p>
                <p className="headline mt-2 text-3xl">{metric.value}</p>
                <p className="mt-2 text-sm text-muted">{metric.detail}</p>
                <div className="mt-5 flex items-center justify-center gap-4 rounded-[1rem] bg-panelSoft p-3">
                  <Sun size={20} className="text-amber-500" />
                  <span className="h-px w-10 bg-line" />
                  <MoonStar size={20} className="text-sky-600" />
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">Spatial & Sensory Analysis</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Spatial Mapping & Heatmap Analysis</h2>
          </div>
          <Eye size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <Card className="overflow-hidden p-0">
            <div className="relative min-h-[360px] bg-[linear-gradient(145deg,#f8fafc,#eef2f7)]">
              <div className="absolute left-[12%] top-[16%] h-24 w-24 rounded-full bg-red-400/30 blur-2xl" />
              <div className="absolute left-[44%] top-[32%] h-28 w-28 rounded-full bg-emerald-400/30 blur-2xl" />
              <div className="absolute right-[16%] bottom-[14%] h-24 w-24 rounded-full bg-red-300/35 blur-2xl" />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-600 soft-border">
                Red Zones: clutter / glare
              </div>
              <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600 soft-border">
                Green Zones: ideal hand-eye placement
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {spatialStats.map((item, index) => (
              <Card key={item.label} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="kicker">{item.label}</p>
                    <p className="headline mt-2 text-2xl">{item.value}</p>
                    <p className="mt-2 text-sm text-muted">{item.note}</p>
                  </div>
                  {index === 0 ? (
                    <Waves size={18} className="text-accent" />
                  ) : index === 1 ? (
                    <AlertTriangle size={18} className="text-amber-500" />
                  ) : (
                    <Volume2 size={18} className="text-sky-600" />
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
            <p className="kicker">Psychological Impact & Mood</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Biophilic & Psychological Resonance</h2>
          </div>
          <Radar size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="p-6">
            <div className="grid place-items-center rounded-[1.6rem] bg-panelSoft p-5">
              <svg viewBox="0 0 100 100" className="h-72 w-72 overflow-visible">
                <polygon points="50,14 86,36 74,82 26,82 14,36" fill="rgba(56,189,248,0.12)" stroke="rgba(15,23,42,0.2)" />
                <polygon points={radarPolygon} fill="rgba(15,23,42,0.72)" stroke="rgba(15,23,42,0.95)" strokeWidth="1.4" />
                {resonanceAxes.map((axis, idx) => {
                  const labels: [number, number][] = [
                    [50, 9],
                    [93, 35],
                    [76, 92],
                    [24, 92],
                    [7, 35],
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
              <p className="kicker">Color Psychology Breakdown</p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Dominant Tone (Grey/White): promotes neutrality and low distraction, but may cap ideation intensity in long creative sessions.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                Accent Tone (Green - Plants): increases oxygen support and may reduce stress load by 15% in extended concentration blocks.
              </p>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="kicker">Mood Prediction</p>
                  <p className="headline mt-2 text-2xl">High focus, moderate creativity</p>
                </div>
                <Sparkles size={18} className="text-accent" />
              </div>
              <div className="mt-4 space-y-3">
                {resonanceAxes.map((axis) => (
                  <div key={axis.label}>
                    <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-muted">
                      <span>{axis.label}</span>
                      <span>{axis.value}%</span>
                    </div>
                    <ProgressBar value={axis.value} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">Neural Activation Map</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Cortical focus & cognitive load profile</h2>
          </div>
          <BrainCircuit size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="overflow-hidden p-0">
            <div className="h-[460px]">
              <BrainViewerLazy predictionKey="text.predictions" segmentIndex={12} />
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <p className="kicker">fMRI-based commentary</p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                Sustained engagement of the <span className="font-semibold">dorsolateral prefrontal cortex (dlPFC)</span> and
                <span className="font-semibold"> posterior parietal cortex</span> signals deep focus and working-memory load -
                the workspace supports multi-window executive tasks without overtaxing attentional control.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                Moderate activity across the <span className="font-semibold">default mode network</span> during micro-breaks,
                combined with calm <span className="font-semibold">anterior cingulate</span> readings, confirms biophilic and
                acoustic tuning are preventing cognitive fatigue over the 90-minute block.
              </p>
            </Card>

            <Card className="p-5">
              <p className="kicker">Key cortical hotspots</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-3 rounded-[1rem] bg-panelSoft p-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <div>
                    <p className="font-semibold text-ink">Dorsolateral prefrontal cortex</p>
                    <p className="text-muted">Executive control and sustained task focus peaks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[1rem] bg-panelSoft p-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <div>
                    <p className="font-semibold text-ink">Posterior parietal cortex</p>
                    <p className="text-muted">Spatial attention across monitor arrays and documents.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[1rem] bg-panelSoft p-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <div>
                    <p className="font-semibold text-ink">Anterior cingulate cortex</p>
                    <p className="text-muted">Low conflict load - environment is not fighting the task.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">Benchmarking</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Executive Office Standards vs. Current</h2>
          </div>
          <Wind size={20} className="text-accent" />
        </div>

        <Card className="mt-7 overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line/70 bg-panelSoft/80 text-xs uppercase tracking-[0.18em] text-muted">
                  <th className="p-4">Metric</th>
                  <th className="p-4 text-accent">Current Setup</th>
                  <th className="p-4">Google/Apple HQ Reference</th>
                  <th className="p-4">Assessment</th>
                </tr>
              </thead>
              <tbody>
                {standardsRows.map((row) => (
                  <tr key={row.metric} className="border-b border-line/60 last:border-b-0">
                    <td className="p-4 font-medium text-ink">{row.metric}</td>
                    <td className="p-4 text-accent">{row.current}</td>
                    <td className="p-4 text-muted">{row.standard}</td>
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
            <p className="kicker">Behavior Simulation</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">4-Hour Fatigue Simulation</h2>
          </div>
          <Clock3 size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-5 xl:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            {fatigueCards.map((item) => (
              <Card key={item.title} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="kicker">{item.title}</p>
                    <p className="headline mt-2 text-2xl">{item.risk}</p>
                    <p className="mt-2 text-sm text-muted">{item.note}</p>
                  </div>
                  {item.tone === "warning" ? (
                    <AlertTriangle size={18} className="text-rose-500" />
                  ) : item.tone === "medium" ? (
                    <Eye size={18} className="text-amber-500" />
                  ) : (
                    <Clock3 size={18} className="text-sky-600" />
                  )}
                </div>
              </Card>
            ))}
          </div>

          <Card className="overflow-hidden p-0">
            <div className="p-5">
              <p className="headline text-xl">Body Load Pressure Map</p>
              <p className="mt-2 text-sm text-muted">Predicted stress concentration after prolonged seated posture.</p>
            </div>
            <div className="relative min-h-[290px] bg-[linear-gradient(155deg,#f8fafc,#eef2ff)]">
              <div className="absolute left-[46%] top-[12%] h-14 w-14 -translate-x-1/2 rounded-full bg-rose-400/35 blur-2xl" />
              <div className="absolute left-[46%] top-[34%] h-20 w-20 -translate-x-1/2 rounded-full bg-amber-400/35 blur-2xl" />
              <div className="absolute left-[32%] top-[62%] h-16 w-16 rounded-full bg-rose-300/30 blur-2xl" />
              <div className="absolute right-[32%] top-[62%] h-16 w-16 rounded-full bg-rose-300/30 blur-2xl" />
            </div>
          </Card>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">Smart Optimization</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">AI-Recommended Workspace Upgrades</h2>
          </div>
          <Leaf size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4">
            {upgrades.map((item) => {
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

          <div className="rounded-[2rem] border border-line bg-[linear-gradient(145deg,#ecfeff,#eff6ff)] p-6">
            <p className="kicker">Final Verdict</p>
            <div className="mt-4 rounded-[1.3rem] border border-line bg-white p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Status</p>
              <p className="mt-3 text-3xl font-semibold text-[#0f172a]">HIGHLY PRODUCTIVE</p>
              <p className="mt-2 text-sm text-muted">Needs Minor Adjustments</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/85">
                Your setup supports sustained deep work with healthy baseline ergonomics. Focus resilience improves further with monitor elevation and cable decluttering.
              </p>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#e8f7ef] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#15803d]">
              <CheckCircle2 size={14} />
              Upgrade Path Ready
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
