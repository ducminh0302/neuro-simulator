"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown, Activity, Zap, Target, TrendingUp, TrendingDown, BrainCircuit, Star, ArrowRight, Info, Brain } from "lucide-react";

import { BrainViewerLazy } from "@/components/brain/BrainViewerLazy";
import { SimulationPromptChat } from "@/components/simulations/simulation-prompt-chat";
import { Card, Pill, ProgressBar, SectionHeading, Surface } from "@/components/ui";

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
    color: "#0ea5e9",
    colorText: "text-sky-500",
    bgColor: "bg-sky-500",
  },
  {
    level: "L2",
    label: "SEMANTIC CONTEXT",
    title: "Environment: Minimalist Living Room",
    share: "22%",
    shareValue: 22,
    description: "Represents the 'Secondary Scanpath.' Once the primary subject is identified, the brain maps the surrounding geometry to establish a semantic story. High processing fluency reduces cognitive friction.",
    color: "#22d3ee",
    colorText: "text-cyan-500",
    bgColor: "bg-cyan-400",
  },
  {
    level: "L3",
    label: "PERIPHERAL BACKGROUND",
    title: "Decor: Indoor Plant & Furniture",
    share: "10%",
    shareValue: 10,
    description: "Represents elements processed by peripheral vision. These low-interest zones provide atmosphere but should not distract from the primary CTA.",
    color: "#94a3b8",
    colorText: "text-slate-500",
    bgColor: "bg-slate-400",
  },
];

function WaveformOscilloscope() {
  const smoothPath = "M 0 50 Q 50 20, 100 50 T 200 50 T 300 50 T 400 50";

  return (
    <div className="relative h-32 w-full rounded-xl bg-[#080d1a] overflow-hidden border border-slate-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-800" />

      <svg viewBox="0 0 400 100" className="absolute inset-0 w-full h-full preserve-3d" preserveAspectRatio="none">
        <defs>
          <filter id="wave-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <path
          d={smoothPath}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2.5"
          filter="url(#wave-glow)"
          strokeLinecap="round"
          className="animate-oscilloscope"
        />
      </svg>

      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#080d1a] to-transparent z-10" />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes oscilloscope {
          0% { stroke-dasharray: 0 1000; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 1000 0; stroke-dashoffset: 0; }
          100% { stroke-dasharray: 0 1000; stroke-dashoffset: -1000; }
        }
        .animate-oscilloscope {
          animation: oscilloscope 4s linear infinite;
        }
      `,
        }}
      />
    </div>
  );
}

function NeuroMathFormula() {
  return (
    <div className="inline-flex items-center bg-white/60 backdrop-blur-md px-7 py-6 rounded-[1.5rem] border border-line/40 shadow-md overflow-visible">
      <svg width="280" height="70" viewBox="0 0 280 70" className="overflow-visible">
        {/* Phi symbol */}
        <text x="0" y="42" className="fill-ink text-4xl font-serif italic">Φ</text>
        <text x="22" y="50" className="fill-muted text-[12px] font-sans">parsing</text>

        {/* Equality */}
        <text x="70" y="42" className="fill-ink text-3xl font-light">=</text>

        {/* Integral symbol */}
        <path d="M 110 60 Q 106 60 103 58 T 100 52 L 115 15 Q 118 10 120 10 T 125 14" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" />
        <text x="98" y="65" className="fill-muted text-[10px] font-bold">0</text>
        <text x="127" y="15" className="fill-muted text-[10px] font-bold">t</text>

        {/* Fraction */}
        <g transform="translate(140, 5)">
          <text x="50" y="20" textAnchor="middle" className="fill-ink text-sm font-bold tracking-tight">Saliency</text>
          <line x1="0" y1="28" x2="100" y2="28" stroke="currentColor" strokeWidth="1.5" className="text-line" />
          <text x="50" y="48" textAnchor="middle" className="fill-ink text-sm font-bold tracking-tight">Visual Complexity</text>
        </g>

        {/* dt */}
        <text x="255" y="42" className="fill-ink text-lg italic font-serif">dt</text>
      </svg>
    </div>
  );
}

const recommendations = [
  {
    title: "Contrast",
    text: "Increase contrast in the top-right quadrant to guide the gaze toward the gaze toward the logo.",
  },
  {
    title: "Color Saturation",
    text: "Reduce saturation of the background to lower cognitive fatigue.",
  },
  {
    title: "Typography",
    text: "Use a Sans-serif font for the sub-headline to speed up neural processing by 20%.",
  },
];

const multiAgentResponses = [
  {
    name: "Axial",
    role: "Saliency commander",
    perspective: "Prioritizes first-fixation capture and attention lock.",
    response:
      "Primary saliency is strong and should capture fixation in under 250ms. Keep the hero object isolated from competing high-contrast edges.",
    confidence: 90,
    stance: "Positive",
    deepAnalysis: {
      summary: "Fixation capture is efficient, but saliency distribution could be more focused.",
      metrics: [
        { label: "Fixation Speed", value: "240ms", trend: "up" },
        { label: "Attention Lock", value: "High", trend: "up" },
      ],
      neuralSignals: [
        { label: "V1/V2 Response", value: 88, color: "bg-emerald-500" },
        { label: "Saccadic Stability", value: 72, color: "bg-sky-500" },
      ],
      recommendation: "Maintain hero isolation; remove competing edges in the periphery.",
    },
  },
  {
    name: "Synap",
    role: "Friction scanner",
    perspective: "Detects cognitive overload and ambiguity risks.",
    response:
      "Peripheral zones introduce minor attentional competition. Simplify one background cluster to reduce cognitive friction.",
    confidence: 55,
    stance: "Critical",
    deepAnalysis: {
      summary: "High cognitive load detected in peripheral zones, causing attention leaks.",
      metrics: [
        { label: "Neural Load", value: "High", trend: "down" },
        { label: "Parsing Flow", value: "Strained", trend: "down" },
      ],
      neuralSignals: [
        { label: "DLPFC Load", value: 78, color: "bg-rose-500" },
        { label: "Semantic Conflict", value: 64, color: "bg-amber-500" },
      ],
      recommendation: "Mute background saturation; simplify geometric clusters in non-hero zones.",
    },
  },
  {
    name: "Cortex",
    role: "Arousal tracker",
    perspective: "Monitors predicted arousal stability over exposure time.",
    response:
      "Arousal should remain moderate-positive through the first scan. A clearer CTA anchor can convert attention into action.",
    confidence: 73,
    stance: "Mixed",
    deepAnalysis: {
      summary: "Arousal plateau detected after 800ms. Interaction momentum needs boosting.",
      metrics: [
        { label: "Dopamine Spike", value: "0.42", trend: "up" },
        { label: "Intent Drift", value: "Medium", trend: "down" },
      ],
      neuralSignals: [
        { label: "Nucleus Accumbens", value: 65, color: "bg-sky-500" },
        { label: "Arousal Baseline", value: 58, color: "bg-emerald-500" },
      ],
      recommendation: "Enhance CTA visual weight; add subtle motion cues to maintain interest.",
    },
  },
  {
    name: "Voxel",
    role: "Hierarchy mapper",
    perspective: "Maps visual hierarchy against neural processing order.",
    response:
      "Hierarchy is mostly coherent from object to context to CTA. Increase text-background separation to avoid delayed parsing.",
    confidence: 79,
    stance: "Positive",
    deepAnalysis: {
      summary: "Visual flow is logical but lacks sharp transitions between semantic layers.",
      metrics: [
        { label: "Scanpath Efficiency", value: "High", trend: "up" },
        { label: "Depth Perception", value: "Rich", trend: "up" },
      ],
      neuralSignals: [
        { label: "V4 Processing", value: 82, color: "bg-emerald-500" },
        { label: "Spatial Mapping", value: 75, color: "bg-sky-500" },
      ],
      recommendation: "Sharpen text-to-background contrast; use Z-pattern layout for text groups.",
    },
  },
  {
    name: "Lambda",
    role: "Valence modeler",
    perspective: "Predicts emotional polarity and confidence drift.",
    response:
      "Valence trends positive, but confidence softens in longer views. Add an explicit trust cue in-frame to stabilize intent.",
    confidence: 67,
    stance: "Mixed",
    deepAnalysis: {
      summary: "Initial emotional hit is positive, followed by slight cognitive skepticism.",
      metrics: [
        { label: "Valence Index", value: "+0.38", trend: "up" },
        { label: "Trust Reliability", value: "Neutral", trend: "down" },
      ],
      neuralSignals: [
        { label: "Amygdala Calm", value: 71, color: "bg-emerald-500" },
        { label: "Medial PFC", value: 52, color: "bg-amber-500" },
      ],
      recommendation: "Insert subtle trust indicators or social proof near the primary product.",
    },
  },
  {
    name: "Nerve",
    role: "Recall engineer",
    perspective: "Optimizes recall probability after brief exposure.",
    response:
      "Object shape and contrast support high recall potential. Repeating one distinct visual motif will improve delayed memory retrieval.",
    confidence: 88,
    stance: "Positive",
    deepAnalysis: {
      summary: "Strong structural memory potential; brand-color association is optimal.",
      metrics: [
        { label: "Memory Anchor", value: "Strong", trend: "up" },
        { label: "Color Recall", value: "92%", trend: "up" },
      ],
      neuralSignals: [
        { label: "Hippocampus Lead", value: 85, color: "bg-emerald-500" },
        { label: "Temporal Binding", value: 78, color: "bg-sky-500" },
      ],
      recommendation: "Establish a recurring pattern or silhouette to solidify long-term recall.",
    },
  },
  {
    name: "Kappa",
    role: "Saccade auditor",
    perspective: "Tracks saccade sequence and peripheral distractions.",
    response:
      "Saccade path is efficient but not equally stable across audience segments. Tone down one bright secondary element to reduce drift.",
    confidence: 62,
    stance: "Mixed",
    deepAnalysis: {
      summary: "Unnecessary saccadic jumps detected toward irrelevant decorative elements.",
      metrics: [
        { label: "Gaze Smoothness", value: "Med", trend: "down" },
        { label: "Fixation Count", value: "12/sec", trend: "up" },
      ],
      neuralSignals: [
        { label: "Superior Colliculus", value: 68, color: "bg-amber-500" },
        { label: "Frontal Eye Fields", value: 55, color: "bg-rose-500" },
      ],
      recommendation: "Reduce luminance of non-interactive corners to stabilize gaze path.",
    },
  },
  {
    name: "Theta",
    role: "Study comparator",
    perspective: "Benchmarks predicted neural response against reference studies.",
    response:
      "Compared with similar high-performing stimuli, saliency is above baseline. Improvement headroom remains in CTA dwell-time optimization.",
    confidence: 76,
    stance: "Positive",
    deepAnalysis: {
      summary: "Performance is in the top 15% of the benchmarked category database.",
      metrics: [
        { label: "Benchmark Rank", value: "Elite", trend: "up" },
        { label: "Category Match", value: "94%", trend: "up" },
      ],
      neuralSignals: [
        { label: "Comparative Parity", value: 89, color: "bg-emerald-500" },
        { label: "Signal Robustness", value: 74, color: "bg-sky-500" },
      ],
      recommendation: "Refine CTA micro-interactions to reach the top 5% performance bracket.",
    },
  },
  {
    name: "Delta",
    role: "Load forecaster",
    perspective: "Forecasts cognitive effort under repeated exposure.",
    response:
      "Processing load is acceptable at first exposure but rises with repetition. Reduce visual density near text for better resilience.",
    confidence: 49,
    stance: "Critical",
    deepAnalysis: {
      summary: "Information density is too high for rapid social-feed environments.",
      metrics: [
        { label: "Metabolic Cost", value: "High", trend: "down" },
        { label: "Abandonment Risk", value: "Significant", trend: "down" },
      ],
      neuralSignals: [
        { label: "Alpha Suppression", value: 76, color: "bg-rose-500" },
        { label: "Fatigue Threshold", value: 62, color: "bg-amber-500" },
      ],
      recommendation: "Increase whitespace; utilize progressive disclosure for detailed info.",
    },
  },
  {
    name: "Sigma",
    role: "Neural decision synth",
    perspective: "Combines neural indicators into go/no-go recommendation.",
    response:
      "The stimulus is deployable for awareness testing now. Run one quick variant with reduced background complexity for higher confidence.",
    confidence: 83,
    stance: "Mixed",
    deepAnalysis: {
      summary: "Synthesis indicates high potential, pending final aesthetic refinement.",
      metrics: [
        { label: "Overall Score", value: "83/100", trend: "up" },
        { label: "Risk Mitigation", value: "Ready", trend: "up" },
      ],
      neuralSignals: [
        { label: "Integrated Valence", value: 77, color: "bg-emerald-500" },
        { label: "Processing Flow", value: 81, color: "bg-sky-500" },
      ],
      recommendation: "Deploy A/B test with background simplification as the primary variable.",
    },
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
      className={`rounded-[1.8rem] border bg-white/90 p-5 text-center shadow-sm transition-all duration-300 hover:scale-[1.02] ${highlighted ? "border-accent/30 ring-1 ring-accent/10" : "border-line"
        }`}
    >
      <div
        className="mx-auto flex h-60 w-60 items-center justify-center rounded-full p-4 sm:h-64 sm:w-64 lg:h-72 lg:w-72 transition-all duration-700"
        style={ringStyle}
      >
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/90 bg-[radial-gradient(circle_at_30%_25%,rgba(${rgb},0.12),transparent_34%),radial-gradient(circle_at_70%_78%,rgba(15,23,42,0.03),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)] px-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.96)]">
          <div
            className={`mt-4 text-5xl font-black tracking-tight text-[#081225] sm:text-6xl ${highlighted ? "drop-shadow-[0_0_15px_rgba(" + rgb + ",0.3)]" : ""
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

      <style dangerouslySetInnerHTML={{
        __html: `
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
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

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
              </div>

              <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/80 shadow-soft backdrop-blur-sm">
                <Image
                  src="/robot-cleaner.jpg"
                  alt="Robot Cleaner Creative"
                  width={800}
                  height={450}
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
        </div>

        <div className="mt-7 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <Card className="overflow-hidden p-0">
            <div className="relative h-full min-h-[500px] bg-panelSoft p-6 flex items-center justify-center">
              <Image
                src="/eeg.png"
                alt="Neural Saliency EEG Map"
                width={800}
                height={600}
                className="max-h-[380px] max-w-full object-contain"
              />
            </div>
          </Card>

          <div className="flex flex-col lg:flex-row gap-5 items-center xl:items-start">
            {/* The Visual Pyramid Chart */}
            <div className="relative w-full max-w-[380px] flex-shrink-0 pt-4">
              <div className="relative h-[480px] w-full px-2">
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
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {benchmarkGauges.map((gauge) => (
            <BenchmarkGauge key={gauge.label} {...gauge} />
          ))}
        </div>
      </section>

      <section id="neural-parsing" className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">Neural Flow & Audience Response</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl text-ink">Cognitive Flow & Neural Parsing</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-7 xl:grid-cols-[1.45fr_0.55fr]">
          <Card className="flex flex-col p-6 overflow-hidden">
            <div className="flex items-center justify-between">
              <p className="kicker !text-accent">The Cognitive Flow Waveform (Neural Parsing)</p>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase">Live Buffer</span>
              </div>
            </div>

            <div className="mt-6 flex-grow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black tracking-[0.2em] text-[#0ea5e9] uppercase">COGNITIVE PROCESSING FLUENCY (CPF)</span>
                <span className="text-xs font-mono text-muted">98.4 MHz</span>
              </div>

              <WaveformOscilloscope />

              <div className="mt-8 flex flex-col lg:flex-row items-center gap-8 bg-panelSoft/50 p-6 rounded-[1.5rem] border border-line/30">
                <div className="flex-shrink-0">
                  <NeuroMathFormula />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-bold text-ink">Fast Neural Parsing: 420ms</p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    The brain decodes the spatial hierarchy effortlessly. Saliency alignment reduces neural metabolic cost, facilitating &quot;instant&quot; semantic comprehension.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex flex-col rounded-[2.5rem] bg-[#080d1a] p-7 text-emerald-400 font-mono shadow-2xl border border-slate-800/80 relative overflow-hidden group">
            {/* Terminal Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800/60 pb-4">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="h-[1px] flex-grow bg-slate-800/40" />
              <span className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold">TELEMETRY_SYNC_v4.2</span>
            </div>

            <div className="space-y-4 flex-grow">
              <p className="text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                <span className="h-1 w-4 bg-emerald-500/30" /> NEURAL TELEMETRY LOG
              </p>

              <div className="space-y-3">
                {[
                  { label: "STATUS", value: "Synchronized", color: "text-emerald-300" },
                  { label: "VALENCE", value: "Positive (0.78)", color: "text-sky-400" },
                  { label: "AROUSAL", value: "Moderate (0.42)", color: "text-amber-400" },
                ].map((log) => (
                  <div key={log.label} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/30">
                    <span className="text-slate-500 tracking-widest">{log.label}:</span>
                    <span className={`${log.color} font-bold`}>{log.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-5 rounded-[1.2rem] bg-slate-900/50 border border-slate-800/50 backdrop-blur-md relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/40 rounded-full" />
                <p className="text-[9px] text-slate-500 font-bold tracking-widest mb-2 uppercase">PREDICTION ENGINE</p>
                <p className="text-lg text-white font-bold tracking-tight leading-tight">
                  High Conversion Probability
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-grow h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[94%] animate-pulse" />
                  </div>
                  <span className="text-[10px] text-emerald-500 font-bold">94%</span>
                </div>
              </div>
            </div>

            {/* Scanning Effect */}
            <div className="absolute bottom-4 left-7 right-7 opacity-20 pointer-events-none">
              <div className="text-[8px] flex justify-between mb-1">
                <span>PARSING DATA...</span>
                <span>DONE</span>
              </div>
              <div className="h-[2px] w-full bg-slate-800">
                <div className="h-full w-full bg-emerald-500/50" />
              </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-500/5 blur-[100px] rounded-full" />
          </div>
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
            <p className="kicker">Neuro-Optimization Recommendations</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">AI Neuro-Design Optimization</h2>
          </div>
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4">
            {recommendations.map((item) => {
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
              Deployment Signal: Green
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
