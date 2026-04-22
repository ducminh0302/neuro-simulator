"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown, Activity, Zap, Target, TrendingUp, TrendingDown, BrainCircuit, Star, ArrowRight, Info, Brain } from "lucide-react";

import { BrainViewerLazy } from "@/components/brain/BrainViewerLazy";
import { SimulationPromptChat } from "@/components/simulations/simulation-prompt-chat";
import { Card, Pill, SectionHeading, Surface } from "@/components/ui";

function AgentDeepAnalysis({ agent }: { agent: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const analysis = agent.deepAnalysis;
  if (!analysis) return <div className="p-8 text-center text-muted italic">Deep analysis data is currently being synthesized for this agent...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-6 border-t border-line/40 pt-8 space-y-6"
    >
      {/* Agent Profile & Summary */}
      <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 border border-line/40">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-line">
          <Brain className="h-6 w-6 text-ink" />
        </div>
        <div className="flex-1">
          <p className="kicker flex items-center gap-2">
            <Info className="h-3 w-3" />
            {agent.role}
          </p>
          <h5 className="headline mt-1 text-xl text-ink leading-tight">{agent.name}</h5>
          <p className="text-sm text-muted leading-relaxed mt-2">{analysis.summary}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {analysis.metrics.map((metric: any, idx: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-xl bg-white/60 p-4 border border-line/40"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted mb-2">{metric.label}</p>
                <p className="headline text-lg text-ink">{metric.value}</p>
              </div>
              <div className="text-[11px] font-bold text-accent uppercase">
                {metric.trend === 'up' ? '↑' : '↓'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Neural Signals with Bars */}
      <div className="rounded-2xl bg-white/60 border border-line/40 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-accent/10">
            <Brain className="h-4 w-4 text-accent" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink">Neural Signals</p>
        </div>
        <div className="space-y-4">
          {analysis.neuralSignals.map((signal: any, idx: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
            <div key={signal.label}>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-muted">{signal.label}</span>
                <span className="font-bold text-ink">{signal.value}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-line/30 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${signal.value}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                  className={`h-full rounded-full ${signal.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="rounded-2xl bg-panelSoft/60 border border-line/30 p-5">
        <div className="flex gap-3">
          <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-accent/20 flex items-center justify-center">
            <Target className="h-3 w-3 text-accent" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/60 mb-2">Recommendation</p>
            <p className="text-sm text-ink/80 leading-relaxed font-medium">{analysis.recommendation}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const setupInputs = [
  { label: "Space Persona", value: "Creative Tech-Enthusiast / Deep Work" },
  { label: "Ambient Context", value: "10:00 AM" },
  {
    label: "Detected Elements",
    value:
      "MacBook on Stand, External Monitor (Screenbar active), Mechanical Keyboard, Wrist Rest, Personal Collectibles (Goku/Arsenal), Hydration (Iced Coffee)",
  },
  { label: "Vibe Analysis", value: "High Inspiration (Decor-rich) / Potential Visual Clutter Risk" },
  { label: "Focus Objective", value: "LLM Research & Multi-agent System Dev" },
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
  { label: "Visual Noise", value: "25% (Minimalist)", note: "Distraction-free zone." },
  { label: "Wiring Hygiene", value: "Alert (5+ exposed)", note: "Tangled wires detected near base." },
  { label: "Sonic Profile", value: "Moderate Echo", note: "Add soft textures to dampen sound." },
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
  },
  {
    title: "Lighting",
    text: "Install a monitor light bar to reduce screen glare and eye strain at midday.",
  },
  {
    title: "Furniture",
    text: "Raise monitor by 5cm to align top bezel with eye level for neutral neck posture.",
  },
];

const multiAgentResponses = [
  {
    name: "Grid",
    role: "Focus architect",
    perspective: "Optimizes deep-work continuity over 4-hour blocks.",
    response:
      "Your setup supports strong initial focus. Add a strict 90-minute cycle with 10-minute reset windows to avoid the 12:30 dip.",
    confidence: 86,
    stance: "Positive",
    deepAnalysis: {
      summary: "High durability focus profile with minor energy decay risks at the 2.5-hour mark.",
      metrics: [
        { label: "Flow Continuity", value: "92%", trend: "up" },
        { label: "Energy Decay", value: "14%", trend: "down" }
      ],
      neuralSignals: [
        { label: "Beta Rhythms", value: 84, color: "bg-emerald-500" },
        { label: "Theta Waves", value: 45, color: "bg-amber-500" }
      ],
      recommendation: "Implement a 90-minute focus sprint followed by a 15-minute complete cognitive reset."
    }
  },
  {
    name: "Harbor",
    role: "Ergonomic sentinel",
    perspective: "Flags posture and strain risks first.",
    response:
      "Monitor height is still below neutral eye level, increasing neck compression risk. Correct this before extending to long coding sessions.",
    confidence: 61,
    stance: "Critical",
    deepAnalysis: {
      summary: "Posture alignment is currently suboptimal, creating long-term strain vulnerability.",
      metrics: [
        { label: "Cervical Strain", value: "High", trend: "up" },
        { label: "Joint Alignment", value: "62/100", trend: "down" }
      ],
      neuralSignals: [
        { label: "Proprioception", value: 72, color: "bg-rose-500" },
        { label: "Pain Threshold", value: 38, color: "bg-amber-500" }
      ],
      recommendation: "Raise monitor by 4 inches immediately to bring eye level to the top third of the screen."
    }
  },
  {
    name: "Tempo",
    role: "Rhythm planner",
    perspective: "Balances energy rhythm, breaks, and context switches.",
    response:
      "Cognitive rhythm is good in the first 2 hours, then unstable. Add a pre-planned low-complexity task block around noon.",
    confidence: 74,
    stance: "Mixed",
    deepAnalysis: {
      summary: "Circadian rhythm alignment is strong, but metabolic dips are predicted post-11:30 AM.",
      metrics: [
        { label: "Alertness Peak", value: "10:15 AM", trend: "up" },
        { label: "Cognitive Lag", value: "Moderate", trend: "up" }
      ],
      neuralSignals: [
        { label: "Dopamine Cycle", value: 68, color: "bg-amber-500" },
        { label: "Cortisol Level", value: 52, color: "bg-emerald-500" }
      ],
      recommendation: "Schedule your most demanding architectural tasks before 11:30 AM."
    }
  },
  {
    name: "Axon",
    role: "Layout systems analyst",
    perspective: "Evaluates physical layout logic and friction points.",
    response:
      "Tool placement is mostly efficient, but cable routes still create micro-friction. Re-route power and IO lines to clear the leg zone.",
    confidence: 69,
    stance: "Critical",
    deepAnalysis: {
      summary: "Spatial friction is localized in the under-desk zone, causing unconscious distraction.",
      metrics: [
        { label: "Reach Radius", value: "Optimal", trend: "up" },
        { label: "Cable Chaos", value: "78%", trend: "up" }
      ],
      neuralSignals: [
        { label: "Spatial Awareness", value: 81, color: "bg-rose-500" },
        { label: "Executive Function", value: 59, color: "bg-amber-500" }
      ],
      recommendation: "Use adhesive cable clips to route all power lines along the back of the desk frame."
    }
  },
  {
    name: "Loom",
    role: "Mood stability analyst",
    perspective: "Tracks emotional stability during long focus windows.",
    response:
      "Ambient setup supports calm concentration and low anxiety. Introduce a short music protocol after lunch to prevent motivation drop.",
    confidence: 80,
    stance: "Mixed",
    deepAnalysis: {
      summary: "Visual aesthetics contribute positively to serotonin levels, maintaining steady morale.",
      metrics: [
        { label: "Aesthetic Load", value: "High", trend: "up" },
        { label: "Stress Resilience", value: "88%", trend: "up" }
      ],
      neuralSignals: [
        { label: "Serotonin Sync", value: 85, color: "bg-emerald-500" },
        { label: "Alpha State", value: 72, color: "bg-emerald-500" }
      ],
      recommendation: "Introduce a lo-fi audio layer at 45dB to anchor the spatial vibe during research phases."
    }
  },
  {
    name: "Pivot",
    role: "Output efficiency coach",
    perspective: "Optimizes output quality per hour.",
    response:
      "Your environment can support high-output sprints if interruptions are blocked. Use one full-screen mode window and mute all non-critical notifications.",
    confidence: 92,
    stance: "Positive",
    deepAnalysis: {
      summary: "Output potential is peaked; only software-level interruptions threaten focus durability.",
      metrics: [
        { label: "Throughput Est.", value: "Max", trend: "up" },
        { label: "Context Swapping", value: "Low", trend: "down" }
      ],
      neuralSignals: [
        { label: "Task Concentration", value: 94, color: "bg-emerald-500" },
        { label: "Inhibition Control", value: 82, color: "bg-emerald-500" }
      ],
      recommendation: "Activate 'Do Not Disturb' on all devices and use a single-task browser window."
    }
  },
  {
    name: "Byte",
    role: "Visual hygiene auditor",
    perspective: "Assesses visual clutter and attention leaks.",
    response:
      "Decor elements are inspiring but begin to compete after prolonged focus. Reduce two peripheral objects during high-complexity tasks.",
    confidence: 66,
    stance: "Mixed",
    deepAnalysis: {
      summary: "Visual complexity is near the saturation threshold for heavy cognitive processing.",
      metrics: [
        { label: "Clutter Index", value: "42/100", trend: "up" },
        { label: "Attention Anchor", value: "Good", trend: "down" }
      ],
      neuralSignals: [
        { label: "Visual Processing", value: 89, color: "bg-amber-500" },
        { label: "Selective Attention", value: 64, color: "bg-amber-500" }
      ],
      recommendation: "Clear a 12-inch radius around your mouse pad to minimize peripheral movement."
    }
  },
  {
    name: "Cedar",
    role: "Operations benchmarker",
    perspective: "Compares your station against elite engineering desk standards.",
    response:
      "You are above average in ergonomic readiness but below top-tier in lighting control. Add directional desk light for better late-morning consistency.",
    confidence: 72,
    stance: "Mixed",
    deepAnalysis: {
      summary: "Station ranks in the 82nd percentile of professional engineering setups.",
      metrics: [
        { label: "Standard Match", value: "82%", trend: "up" },
        { label: "Lux Disparity", value: "15%", trend: "up" }
      ],
      neuralSignals: [
        { label: "Cognitive Load", value: 48, color: "bg-emerald-500" },
        { label: "Sustained Effort", value: 76, color: "bg-amber-500" }
      ],
      recommendation: "Add a monitor light bar to balance the contrast between the screen and surrounding walls."
    }
  },
  {
    name: "Ember",
    role: "Fatigue forecaster",
    perspective: "Predicts strain and energy decay risks.",
    response:
      "Neck and eye fatigue risk will spike after 120 minutes without posture reset. Add standing intervals every second Pomodoro.",
    confidence: 59,
    stance: "Critical",
    deepAnalysis: {
      summary: "Static posture load is high; physical fatigue is the primary focus inhibitor here.",
      metrics: [
        { label: "Muscle Tension", value: "Moderate", trend: "up" },
        { label: "Ocular Strain", value: "High", trend: "up" }
      ],
      neuralSignals: [
        { label: "Fatigue Response", value: 83, color: "bg-rose-500" },
        { label: "Alertness Decay", value: 71, color: "bg-rose-500" }
      ],
      recommendation: "Use a standing desk converter or take a 2-minute active stretching break every 45 minutes."
    }
  },
  {
    name: "Helm",
    role: "Workspace decision lead",
    perspective: "Converts diagnostics into actionable setup decisions.",
    response:
      "Current setup is strong enough for productive work today. Apply monitor lift and cable cleanup first for durable long-session performance.",
    confidence: 84,
    stance: "Positive",
    deepAnalysis: {
      summary: "Aggregated results indicate a highly productive environment with actionable physical fixes.",
      metrics: [
        { label: "Success Prob.", value: "89%", trend: "up" },
        { label: "Fix Complexity", value: "Low", trend: "down" }
      ],
      neuralSignals: [
        { label: "Decision Clarity", value: 91, color: "bg-emerald-500" },
        { label: "System Synergy", value: 88, color: "bg-emerald-500" }
      ],
      recommendation: "Prioritize ergonomic adjustments (monitor height) over aesthetic upgrades (lighting/clutter)."
    }
  }
];

export function WorkspaceProductivitySimulatorSection() {
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

  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  return (
    <div className="space-y-8 pb-10">
      <SimulationPromptChat prompt="I’ve got a heavy coding session ahead. Based on my current setup, how’s my focus endurance looking, and what small tweaks can I make to keep the vibe high for the next 4 hours?" />

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
              </div>

              <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-line bg-panelSoft shadow-soft">
                <Image
                  src="/work-space.jpg"
                  alt="Workspace"
                  width={1200}
                  height={675}
                  className="aspect-video w-full object-contain"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <p className="kicker">Input Data</p>
            <div className="mt-5 space-y-4">
              {setupInputs.map((item) => {
                return (
                  <div
                    key={item.label}
                    className="group relative flex items-start gap-4 rounded-[1.2rem] border border-line/50 bg-white/50 p-4 transition-all duration-300 hover:border-accent/40 hover:bg-white hover:shadow-soft"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-muted transition-colors group-hover:text-accent">
                        {item.label}
                      </p>
                      <p className="mt-1 line-clamp-3 text-sm font-semibold leading-relaxed text-ink sm:text-[0.95rem]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
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
                  <span className="h-px w-10 bg-line" />
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
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Cortical focus & cognitive load profile</h2>
          </div>
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
            <p className="kicker">Spatial & Sensory Analysis</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Spatial Mapping & Heatmap Analysis</h2>
          </div>
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <Card className="overflow-hidden p-0 h-[420px] bg-panelSoft">
            <Image
              src="/blueprint.png"
              alt="Blueprint Mapping"
              width={1200}
              height={800}
              className="h-full w-full object-contain"
            />
          </Card>

          <div className="space-y-4">
            {spatialStats.map((item) => (
              <Card key={item.label} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="kicker">{item.label}</p>
                    <p className="headline mt-2 text-2xl">{item.value}</p>
                    <p className="mt-2 text-sm text-muted">{item.note}</p>
                  </div>
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
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Focus Sustainability & Cognitive Alignment</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          {/* Left: The 4-Hour Focus Timeline */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Pill tone="soft">4-Hour Focus Sustainability Projection</Pill>
            </div>

            <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50 p-6">
              <div className="relative h-[300px] w-full">
                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-0 flex h-full flex-col justify-between py-1 text-xs uppercase tracking-wider text-muted/60">
                  <span>Peak</span>
                  <span>High</span>
                  <span>Mid</span>
                  <span>Low</span>
                </div>

                {/* SVG Graph */}
                <svg viewBox="0 0 400 200" className="ml-10 h-full w-[calc(100%-40px)] overflow-visible" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  {[0, 50, 100, 150, 200].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                  ))}

                  {/* Gradient for Line */}
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--accent)" />
                      <stop offset="50%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                  </defs>

                  {/* The Line */}
                  <path
                    d="M 0,20 L 133,50 L 266,120 L 400,90"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="drop-shadow-sm"
                  />

                  {/* Data Points */}
                  <circle cx="0" cy="20" r="4.5" className="fill-accent outline outline-4 outline-white" />
                  <circle cx="133" cy="50" r="4.5" className="fill-amber-400 outline outline-4 outline-white" />
                  <circle cx="266" cy="120" r="4.5" className="fill-rose-400 outline outline-4 outline-white" />
                  <circle cx="400" cy="90" r="4.5" className="fill-sky-400 outline outline-4 outline-white" />

                  {/* Annotations */}
                  <g className="text-[9px] font-bold uppercase tracking-tighter">
                    <text x="5" y="15" className="fill-ink">Peak Focus (90%)</text>
                    <text x="138" y="45" className="fill-muted">Minor Glare (-10%)</text>
                    <text x="271" y="115" className="fill-rose-600">Circadian Dip (65%)</text>
                    <text x="360" y="85" className="fill-sky-600">Recovery</text>
                  </g>
                </svg>

                {/* X-Axis Labels */}
                <div className="ml-10 mt-4 flex justify-between text-[11px] font-bold text-muted/70">
                  <span>10:00 AM</span>
                  <span>11:30 AM</span>
                  <span>12:30 PM</span>
                  <span>1:30 PM</span>
                  <span>2:00 PM</span>
                </div>
              </div>

              {/* Annotation Sidebars (Responsive) */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-panelSoft p-4 text-[13px] leading-relaxed">
                  <span className="font-bold text-accent">10:00 AM:</span> Optimal Natural Light & Initial Alertness.
                </div>
                <div className="rounded-xl bg-panelSoft p-4 text-[13px] leading-relaxed">
                  <span className="font-bold text-amber-500">11:30 AM:</span> Minor Glare Detected (Screenbar recommended).
                </div>
                <div className="rounded-xl bg-rose-50 p-4 text-[13px] leading-relaxed text-rose-900/80">
                  <span className="font-bold text-rose-500">12:30 PM:</span> Natural energy low; high risk of distraction.
                </div>
                <div className="rounded-xl bg-sky-50 p-4 text-[13px] leading-relaxed text-sky-900/80">
                  <span className="font-bold text-sky-500">1:30 PM:</span> Post-rest recovery, moderate focus sustain.
                </div>
              </div>
            </Card>
          </div>

          {/* Right: The Cognitive Load Match */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Pill tone="soft">Cognitive Load & Environment Alignment</Pill>
            </div>

            <Card className="relative flex flex-col items-center justify-center bg-gradient-to-tr from-white to-[#f0f9ff] p-8">
              <div className="relative h-[340px] w-full max-w-[480px]">
                {/* Mental Task Circle */}
                <div className="absolute left-0 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full border border-slate-200 bg-slate-100/30 shadow-[inset_0_0_40px_rgba(0,0,0,0.02)] backdrop-blur-sm transition-transform hover:scale-105">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-center">
                    <p className="text-[12px] font-bold uppercase tracking-widest text-muted">Mental Task</p>
                    <p className="text-base font-black text-ink">CODING</p>
                  </div>
                  <div className="flex h-full w-full flex-col items-start justify-center px-10 py-8 text-[12px] leading-relaxed text-muted/80">
                    <p>• High Complexity</p>
                    <p>• Deep Focus</p>
                    <p>• Logic Gates</p>
                  </div>
                </div>

                {/* Environment Support Circle */}
                <div className="absolute right-0 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full border border-emerald-100 bg-emerald-50/20 shadow-[inset_0_0_40px_rgba(16,185,129,0.05)] backdrop-blur-sm transition-transform hover:scale-105">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-center">
                    <p className="text-[12px] font-bold uppercase tracking-widest text-muted">Environment</p>
                    <p className="text-base font-black text-emerald-600">SUPPORT</p>
                  </div>
                  <div className="flex h-full w-full flex-col items-end justify-center px-10 py-8 text-[12px] leading-relaxed text-emerald-700/60">
                    <p>Low Clutter (+)</p>
                    <p>Ergonomics (+)</p>
                    <p>Hard Surface (-)</p>
                  </div>
                </div>

                {/* Overlap Center */}
                <div className="absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white shadow-xl shadow-slate-200/50 outline outline-4 outline-white">
                  <p className="text-[11px] font-bold uppercase tracking-tighter text-muted">Flow Score</p>
                  <p className="text-4xl font-black text-emerald-500">78%</p>
                  <div className="mt-1 flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-2 w-3.5 rounded-full ${i <= 4 ? "bg-emerald-400" : "bg-slate-100"}`} />
                    ))}
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
                </div>
              </Card>
            ))}
          </div>

          <Card className="overflow-hidden p-0">
            <div className="p-5">
              <p className="headline text-xl">Body Load Pressure Map</p>
            </div>
            <div className="relative h-[400px] bg-panelSoft overflow-hidden rounded-[1.5rem]">
              <Image
                src="/heatmap.png"
                alt="Body Load Pressure Map"
                width={800}
                height={600}
                className="h-full w-full object-contain"
              />
            </div>
          </Card>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="kicker">Multi-agent response simulation</p>
            <h3 className="headline mt-2 text-3xl sm:text-4xl">10 agents respond to the initial prompt</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Each agent simulates a distinct evaluation role for the same starting prompt, so you can compare aligned and conflicting viewpoints before deciding.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <Pill tone="accent">Consensus check</Pill>
            <button className="flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95">
              Export Simulation Report
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {multiAgentResponses.map((agent) => (
            <Card 
              key={agent.name} 
              className={`soft-border border transition-all duration-300 cursor-pointer hover:shadow-md ${stanceCardClass[agent.stance] ?? "border-slate-200 bg-slate-50/80"} ${expandedAgent === agent.name ? 'ring-2 ring-ink/5' : ''}`}
            >
              <div 
                className="p-4 sm:p-6"
                onClick={() => setExpandedAgent(expandedAgent === agent.name ? null : agent.name)}
              >
                <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)_120px] lg:items-start">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <p className="kicker flex items-center gap-2">
                        <Info className="h-3 w-3" />
                        {agent.role}
                      </p>
                      <h4 className="headline mt-1 text-2xl">{agent.name}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{agent.perspective}</p>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-ink/60 group">
                      {expandedAgent === agent.name ? (
                        <>Collapse analysis <ChevronDown className="h-4 w-4 rotate-180" /></>
                      ) : (
                        <>View deep analysis <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" /></>
                      )}
                    </div>
                  </div>

                  <div className={`rounded-2xl border p-4 shadow-sm h-full flex flex-col justify-center ${stanceReplyClass[agent.stance] ?? "border-slate-200 bg-white/90"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-bold">Simulated response</p>
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    </div>
                    <p className="text-[15px] leading-relaxed text-ink/90 italic font-medium">&quot;{agent.response}&quot;</p>
                  </div>

                  <div className="flex flex-col justify-center lg:pt-2">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted font-bold">
                      <span>Confidence</span>
                      <span>{agent.confidence}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-line/70 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${agent.confidence}%` }}
                        className={`h-full rounded-full ${stanceBarClass[agent.stance] ?? "bg-slate-500"}`}
                      />
                    </div>
                    <div className="mt-4 flex justify-end">
                      <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] shadow-sm ${stanceToneClass[agent.stance] ?? "bg-slate-100 text-slate-600 border border-slate-200"}`}>
                        {agent.stance}
                      </span>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedAgent === agent.name && (
                    <AgentDeepAnalysis 
                      agent={agent} 
                      stanceColor={stanceBarClass[agent.stance] || "bg-slate-500"} 
                    />
                  )}
                </AnimatePresence>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">Smart Optimization</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">AI-Recommended Workspace Upgrades</h2>
          </div>
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4">
            {upgrades.map((item) => {
              return (
                <Card key={item.title} className="p-5">
                  <div className="flex items-start gap-3">
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
              Upgrade Path Ready
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
