import {
  Activity,
  ArrowUpRight,
  Brain,
  BrainCircuit,
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

import { BrainViewerLazy } from "@/components/brain/BrainViewerLazy";
import { SimulationPromptChat } from "@/components/simulations/simulation-prompt-chat";
import { Card, Pill, ProgressBar, SectionHeading, Surface } from "@/components/ui";

const creativeInputs = [
  { label: "NEURAL COHORT", value: "Modern Homeowners / Tech Enthusiasts" },
  { label: "ATTENTION KPI", value: "Product Hero Saliency" },
  { label: "EMOTIONAL TONE", value: "Minimalist Luxury / Calm" },
  { label: "VIEWING CONTEXT", value: "Mobile Social Feed (Instagram/FB)" },
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

// Data for the Visual Saliency Hierarchy
const visualProcessingLayers = [
  {
    level: "L1",
    label: "DOMINANT SALIENCY",
    title: "Subject: Smart Vacuum Robot",
    share: "68%",
    shareValue: 68,
    description: "Represents the 'First Fixation.' This is the element that breaks the visual threshold within the first 150-200ms. It commands the highest neural metabolic cost and is the anchor for brand recall.",
    color: "#0ea5e9", // Sky 500
    colorText: "text-sky-500",
    bgColor: "bg-sky-500",
  },
  {
    level: "L2",
    label: "SEMANTIC CONTEXT",
    title: "Environment: Minimalist Living Room",
    share: "22%",
    shareValue: 22,
    description: "Represents the 'Secondary Scanpath.' Once the primary subject is identified, the brain maps the surrounding geometry to establish a semantic 'story.' High processing fluency reduces cognitive friction.",
    color: "#22d3ee", // Cyan 400
    colorText: "text-cyan-500",
    bgColor: "bg-cyan-400",
  },
  {
    level: "L3",
    label: "PERIPHERAL BACKGROUND",
    title: "Decor: Indoor Plant & Furniture",
    share: "10%",
    shareValue: 10,
    description: "Represents elements processed by peripheral vision. These are 'low-interest' zones that provide atmospheric value but do not distract the user from the primary CTA.",
    color: "#94a3b8", // Slate 400
    colorText: "text-slate-500",
    bgColor: "bg-slate-400",
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

type BenchmarkGaugeProps = {
  label: string;
  valueLabel: string;
  subLabel: string;
  description: string;
  percentage: number;
  color?: string;
  highlighted?: boolean;
};

function BenchmarkGauge({
  label,
  valueLabel,
  subLabel,
  description,
  percentage,
  color = "#0ea5e9",
  highlighted = false,
}: BenchmarkGaugeProps) {
  // Convert hex to rgb for the gradient
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const rgb = hexToRgb(color);

  const ringStyle = {
    background: `conic-gradient(from 180deg, rgba(${rgb}, 1) 0deg, rgba(${rgb}, 1) ${percentage * 3.6}deg, rgba(${rgb}, 0.1) ${percentage * 3.6}deg, rgba(${rgb}, 0.1) 360deg)`,
    boxShadow: highlighted
      ? `0 0 0 1px rgba(${rgb}, 0.24), 0 0 42px rgba(${rgb}, 0.28), 0 0 70px rgba(15, 23, 42, 0.08)`
      : `0 0 0 1px rgba(${rgb}, 0.1), 0 0 28px rgba(${rgb}, 0.05)`,
    animation: highlighted ? "pulse-subtle 4s ease-in-out infinite" : "none",
  };

  return (
    <div
      className={`rounded-[1.8rem] border bg-white/90 p-5 text-center shadow-sm transition-all duration-300 hover:scale-[1.02] ${
        highlighted ? "border-accent/30 ring-1 ring-accent/10" : "border-line"
      }`}
    >
      <div
        className="mx-auto flex h-60 w-60 items-center justify-center rounded-full p-4 sm:h-64 sm:w-64 lg:h-72 lg:w-72 transition-all duration-700"
        style={ringStyle}
      >
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/90 bg-[radial-gradient(circle_at_30%_25%,rgba(${rgb},0.12),transparent_34%),radial-gradient(circle_at_70%_78%,rgba(15,23,42,0.03),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)] px-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.96)]">
          <div
            className={`mt-4 text-5xl font-black tracking-tight text-[#081225] sm:text-6xl ${
              highlighted ? "drop-shadow-[0_0_15px_rgba(" + rgb + ",0.3)]" : ""
            }`}
            style={{ fontFamily: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace' }}
          >
            {valueLabel}
          </div>
          <div className="mt-4 flex items-center justify-center gap-1 rounded-md bg-panelSoft px-3 py-1 border border-ink/5 shadow-inner">
            <span className="math-symbol font-serif text-base font-bold italic" style={{ color: color }}>
              {(() => {
                const parts = subLabel.split("_");
                if (parts.length < 2) return subLabel;
                const [base, suffix] = parts;
                const [sub, labelText] = suffix.split(" ");
                return (
                  <>
                    {base}
                    <sub className="text-[12px] ml-0.5 align-baseline relative top-[2px]">{sub}</sub>
                    {labelText && <small className="ml-2 font-sans not-italic text-[11px] opacity-70 uppercase tracking-tighter">{labelText}</small>}
                  </>
                );
              })()}
            </span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); opacity: 1; filter: saturate(1); }
          50% { transform: scale(1.015); opacity: 0.98; filter: saturate(1.1); }
        }
        .math-symbol sub { 
          font-size: 0.65em; 
          line-height: 0; 
          vertical-align: sub;
          margin-left: 1px;
          opacity: 0.9;
        }
      `}} />

      <div className="mt-5 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{label}</p>
        <p className="text-sm leading-relaxed text-ink/85">{description}</p>
      </div>
    </div>
  );
}

export function NeuroFocusSimulatorSection() {
  const benchmarkGauges = [
    {
      label: "Dopamine Level",
      valueLabel: "82%",
      subLabel: "D_\u0394 (Reward)",
      description: "Measures the 'wanting' system. Triggered by high-contrast product shots, luxury textures, or 'Dopamine-bright' colors.",
      percentage: 82,
      color: "#f59e0b", // Amber/Gold
    },
    {
      label: "Oxytocin Sync",
      valueLabel: "65%",
      subLabel: "O_syn (Trust)",
      description: "Measures the sense of safety and 'liking.' Triggered by organic shapes, warm lighting, and minimalist layouts.",
      percentage: 65,
      color: "#14b8a6", // Teal
      highlighted: true,
    },
    {
      label: "Cortisol Tension",
      valueLabel: "12%",
      subLabel: "C_str (Stress)",
      description: "Measures visual anxiety. Low levels indicate a cluttered UI or 'aggressive' sales tactics. (12% = Optimal)",
      percentage: 12,
      color: "#f43f5e", // Rose/Ruby
    },
  ];

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

              <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/80 shadow-soft backdrop-blur-sm">
                <img
                  src="/robot-cleaner.jpg"
                  alt="Robot Cleaner Creative"
                  className="h-full w-full object-cover"
                />
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
            <p className="kicker">Neural Activation Map</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Cortical response to visual stimulus</h2>
          </div>
          <BrainCircuit size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="overflow-hidden p-0">
            <div className="h-[460px]">
              <BrainViewerLazy predictionKey="stim.predictions" />
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <p className="kicker">fMRI-based commentary</p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                Strong bilateral activation across the <span className="font-semibold">primary visual cortex (V1)</span> and
                <span className="font-semibold"> ventral stream (V4, fusiform)</span> indicates efficient low-level feature
                extraction and shape binding within the first 300 ms of exposure.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                Secondary clusters in the <span className="font-semibold">parietal attention network</span> and
                <span className="font-semibold"> frontal eye fields</span> confirm sustained foveal locking on the CTA anchor,
                consistent with the predicted 2.6 s attention retention window.
              </p>
            </Card>

            <Card className="p-5">
              <p className="kicker">Key cortical hotspots</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-3 rounded-[1rem] bg-panelSoft p-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <div>
                    <p className="font-semibold text-ink">Occipital pole (V1 / V2)</p>
                    <p className="text-muted">Peak excitation during contrast and edge detection.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[1rem] bg-panelSoft p-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <div>
                    <p className="font-semibold text-ink">Superior parietal lobule</p>
                    <p className="text-muted">Top-down attention allocation to high-salience regions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[1rem] bg-panelSoft p-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <div>
                    <p className="font-semibold text-ink">Anterior insula / ACC</p>
                    <p className="text-muted">Emotional salience tagging - valence trending positive (+0.42).</p>
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
            <p className="kicker">Neural Saliency & Eye-Tracking</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Predictive Eye-Tracking & Foveal Focus</h2>
          </div>
          <Eye size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
          <Card className="overflow-hidden p-0">
            <div className="relative h-full min-h-[500px] bg-panelSoft p-6 flex items-center justify-center">
              <img
                src="/eeg.png"
                alt="Neural Saliency EEG Map"
                className="max-h-[380px] max-w-full object-contain"
              />
            </div>
          </Card>

          <div className="flex flex-col lg:flex-row gap-8 items-center xl:items-start">
            {/* The Visual Pyramid Chart */}
            <div className="relative w-full max-w-[380px] flex-shrink-0 pt-4">
              <div className="relative h-[480px] w-full px-8">
                <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-2xl overflow-visible" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="grad-l1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0ea5e9" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                    <linearGradient id="grad-l2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                    <linearGradient id="grad-l3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                    <filter id="glow-l1" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* L3 - Base (10% height) - bottom: 200 to 180 */}
                  <g className="transition-all duration-300 hover:opacity-80 cursor-default">
                    <rect x="45" y="195" width="110" height="24" rx="2" fill="url(#grad-l3)" />
                    <text x="100" y="210" textAnchor="middle" className="fill-white font-bold text-[8px] tracking-tighter">L3 | PERIPHERAL</text>
                  </g>

                  {/* L2 - Middle (22% height) - bottom: 175 to 130 */}
                  <g className="transition-all duration-300 hover:translate-y-[-2px] cursor-default">
                    <rect x="30" y="140" width="140" height="50" rx="3" fill="url(#grad-l2)" />
                    <text x="100" y="168" textAnchor="middle" className="fill-white font-bold text-[10px]">L2 | SEMANTIC CONTEXT</text>
                    <text x="100" y="180" textAnchor="middle" className="fill-white/80 font-medium text-[8px]">22% SHARE</text>
                  </g>

                  {/* L1 - Primary (68% height) - top: 135 to 10 */}
                  <g className="transition-all duration-300 hover:translate-y-[-4px] cursor-default" filter="url(#glow-l1)">
                    <rect x="15" y="10" width="170" height="125" rx="5" fill="url(#grad-l1)" />
                    <text x="100" y="55" textAnchor="middle" className="fill-white font-black text-2xl tracking-tighter">68%</text>
                    <text x="100" y="80" textAnchor="middle" className="fill-white font-bold text-[12px] tracking-tight">PRIMARY FOCAL POINT</text>
                    <text x="100" y="98" textAnchor="middle" className="fill-white/90 text-[9px] uppercase tracking-[0.2em]">L1 Dominant Saliency</text>
                  </g>

                  {/* Flow lines and technical markings */}
                  <path d="M100,135 L100,140" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2,2" />
                  <path d="M100,190 L100,195" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" />
                </svg>
              </div>
            </div>

            {/* Layer Details List */}
            <div className="flex flex-col gap-4 flex-grow">
              {visualProcessingLayers.map((layer) => (
                <Card key={layer.level} className="relative overflow-hidden p-4 group hover:border-accent/40 transition-colors">
                  <div className="relative flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`flex h-5 w-8 items-center justify-center rounded text-[9px] font-bold text-white ${layer.bgColor}`}>
                          {layer.level}
                        </span>
                        <p className={`kicker !text-[10px] ${layer.colorText}`}>{layer.label}</p>
                      </div>
                      <p className="text-xl font-bold text-ink">{layer.share}</p>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-ink group-hover:text-accent transition-colors">{layer.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted line-clamp-3">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">The Neurotransmitter Gauge System</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl text-ink">NEURAL BIO-SIGNAL CONSOLE</h2>
          </div>
          <Activity size={20} className="text-accent animate-pulse" />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {benchmarkGauges.map((gauge) => (
            <BenchmarkGauge key={gauge.label} {...gauge} />
          ))}
        </div>
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
