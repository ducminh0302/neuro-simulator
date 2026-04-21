"use client";

import React from "react";
import Image from "next/image";

import { BrainViewerLazy } from "@/components/brain/BrainViewerLazy";
import { SimulationPromptChat } from "@/components/simulations/simulation-prompt-chat";
import { Card, Pill, SectionHeading, Surface } from "@/components/ui";

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
  },
  {
    name: "Harbor",
    role: "Ergonomic sentinel",
    perspective: "Flags posture and strain risks first.",
    response:
      "Monitor height is still below neutral eye level, increasing neck compression risk. Correct this before extending to long coding sessions.",
    confidence: 61,
    stance: "Critical",
  },
  {
    name: "Tempo",
    role: "Rhythm planner",
    perspective: "Balances energy rhythm, breaks, and context switches.",
    response:
      "Cognitive rhythm is good in the first 2 hours, then unstable. Add a pre-planned low-complexity task block around noon.",
    confidence: 74,
    stance: "Mixed",
  },
  {
    name: "Axon",
    role: "Layout systems analyst",
    perspective: "Evaluates physical layout logic and friction points.",
    response:
      "Tool placement is mostly efficient, but cable routes still create micro-friction. Re-route power and IO lines to clear the leg zone.",
    confidence: 69,
    stance: "Critical",
  },
  {
    name: "Loom",
    role: "Mood stability analyst",
    perspective: "Tracks emotional stability during long focus windows.",
    response:
      "Ambient setup supports calm concentration and low anxiety. Introduce a short music protocol after lunch to prevent motivation drop.",
    confidence: 80,
    stance: "Mixed",
  },
  {
    name: "Pivot",
    role: "Output efficiency coach",
    perspective: "Optimizes output quality per hour.",
    response:
      "Your environment can support high-output sprints if interruptions are blocked. Use one full-screen mode window and mute all non-critical notifications.",
    confidence: 92,
    stance: "Positive",
  },
  {
    name: "Byte",
    role: "Visual hygiene auditor",
    perspective: "Assesses visual clutter and attention leaks.",
    response:
      "Decor elements are inspiring but begin to compete after prolonged focus. Reduce two peripheral objects during high-complexity tasks.",
    confidence: 66,
    stance: "Mixed",
  },
  {
    name: "Cedar",
    role: "Operations benchmarker",
    perspective: "Compares your station against elite engineering desk standards.",
    response:
      "You are above average in ergonomic readiness but below top-tier in lighting control. Add directional desk light for better late-morning consistency.",
    confidence: 72,
    stance: "Mixed",
  },
  {
    name: "Ember",
    role: "Fatigue forecaster",
    perspective: "Predicts strain and energy decay risks.",
    response:
      "Neck and eye fatigue risk will spike after 120 minutes without posture reset. Add standing intervals every second Pomodoro.",
    confidence: 59,
    stance: "Critical",
  },
  {
    name: "Helm",
    role: "Workspace decision lead",
    perspective: "Converts diagnostics into actionable setup decisions.",
    response:
      "Current setup is strong enough for productive work today. Apply monitor lift and cable cleanup first for durable long-session performance.",
    confidence: 84,
    stance: "Positive",
  },
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
