"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, User, Target, Brain, Info, Download, Star, ArrowRight } from "lucide-react";
import { BrainViewerLazy } from "@/components/brain/BrainViewerLazy";
import { SimulationPromptChat } from "@/components/simulations/simulation-prompt-chat";
import { Card, Pill, ProgressBar, SectionHeading, Surface } from "@/components/ui";

const kpis = [
  {
    label: "Elegance Quotient (EQ)",
    value: "92",
    detail: "Overall score of grace and sophistication.",
  },
  {
    label: "Venue Match Rate",
    value: "96%",
    detail: "How well the outfit fits the 5-star ballroom vibe.",
    status: "Perfect Match",
  },
  {
    label: "Silhouette Sharpness",
    value: "89",
    detail: "Analysis of tailoring, fit, and posture.",
    progress: 89,
  },
];

const colorAuthority = [88, 70, 93, 78, 85, 76, 91];

const benchmarkRows = [
  {
    metric: "Uniqueness Score",
    yours: "88",
    average: "62",
    bestDressed: "94",
  },
  {
    metric: "Dress Code Compliance",
    yours: "100%",
    average: "83%",
    bestDressed: "100%",
  },
  {
    metric: "Trend Alignment (2026)",
    yours: "91%",
    average: "68%",
    bestDressed: "93%",
  },
];

const recommendations = [
  {
    label: "Accessories",
    text: "Consider a bolder lipstick shade (Deep Ruby) to contrast the dark fabric.",
  },
  {
    label: "Footwear",
    text: "Strappy silver heels would enhance the silhouette elongation.",
  },
  {
    label: "Posing Tip",
    text: "Turn 45 degrees to the left to capture the fabric's drape under ballroom lighting.",
  },
];

const multiAgentResponses = [
  {
    name: "Vesper",
    role: "Runway editor",
    perspective: "Prioritizes camera impact in first-look moments.",
    response:
      "Silhouette reads powerfully under flash and distance. A cleaner clutch line will sharpen full-body symmetry in press photos.",
    confidence: 91,
    stance: "Positive",
    deepAnalysis: {
      user: { name: "Vesper", age: 34, status: "Vogue Contributor", summary: "Vesper focuses on the visual drama of a walk. She analyzes how fabric reacts to motion and flash photography." },
      metrics: { cameraImpact: "94%", movementGrace: "88%", flashResponse: "High", symmetryScore: "91%" },
      cognitiveLoad: [92, 85, 32],
      journey: [
        { day: 1, status: "Arrival gate", emotion: "Excited", text: "The first exit from the vehicle. The Midnight Blue creates a dramatic contrast against the red carpet.", action: "First flash captured" },
        { day: 1, status: "Step-and-repeat", emotion: "Focused", text: "Material shimmer is perfectly balanced. It catches the overhead light without washing out the silhouette.", action: "Pose validated" },
        { day: 1, status: "Grand entrance", emotion: "Proud", text: "The drape of the tulle creates a majestic trail. Perception of status is at a peak.", action: "Saliency peak" },
        { day: 2, status: "Press review", emotion: "Satisfied", text: "Photos are circulating. The 'commanding presence' is being cited as a highlight of the evening.", action: "Media approval" }
      ]
    }
  },
  {
    name: "Elan",
    role: "Etiquette examiner",
    perspective: "Flags formal-wear risks against strict event norms.",
    response:
      "Neckline and shimmer balance are strong, but jewelry hierarchy is slightly noisy for black-tie purists. Simplify one accessory layer.",
    confidence: 57,
    stance: "Critical",
    deepAnalysis: {
      user: { name: "Elan", age: 48, status: "Protocol Expert", summary: "Elan is the guardian of traditional elegance. He views dress codes as a language of respect and heritage." },
      metrics: { protocolMatch: "98%", noiseRatio: "High", heritageFit: "92%", eleganceindex: "84%" },
      cognitiveLoad: [64, 58, 89],
      journey: [
        { day: 1, status: "Dress check", emotion: "Analytical", text: "Scanning the neckline for appropriate depth. It's safe but pushes the limit of 'avant-garde'.", action: "Compliance check" },
        { day: 1, status: "Accessory audit", emotion: "Uncertain", text: "The silver clutch vs gold chain creates a minor conflict in the 'Metals Hierarchy' of black tie.", action: "Noted conflict" },
        { day: 1, status: "Ballroom seating", emotion: "Critical", text: "The shimmer is a bit too loud for intimate social settings. Better suited for the stage than the table.", action: "Social friction" },
        { day: 3, status: "Legacy impact", emotion: "Neutral", text: "While daring, the look will be remembered for its color choice, not necessarily its traditionalism.", action: "Verdict filed" }
      ]
    }
  },
  {
    name: "Marlowe",
    role: "Fashion signal watcher",
    perspective: "Tracks trend fit with luxury audience expectations.",
    response:
      "This styling is aligned with current couture signals and should score high in fashion communities. Keep hair volume controlled to preserve neckline authority.",
    confidence: 83,
    stance: "Positive",
    deepAnalysis: {
      user: { name: "Marlowe", age: 29, status: "Trend Analyst", summary: "Marlowe maps the look against the current 2026 luxury landscape. She looks for 'Future Classic' signals." },
      metrics: { trendSync: "91%", signalStrength: "High", luxuryReach: "87%", longevityScore: "76%" },
      cognitiveLoad: [88, 92, 45],
      journey: [
        { day: 1, status: "Scan 01", emotion: "Intrigued", text: "Midnight Blue is the emerging 'Power Neutral' for 2026. This is a very safe but high-alpha choice.", action: "Trend identified" },
        { day: 1, status: "Detail zoom", emotion: "Satisfied", text: "The sequin density matches the 'Digital Glamour' micro-trend we've been tracking in Paris.", action: "Texture match" },
        { day: 2, status: "Digital echo", emotion: "Excited", text: "The look is trending on fashion forums. The sheer sleeves are the specific catalyst for engagement.", action: "Viral check" },
        { day: 5, status: "Synthesis", emotion: "Confident", text: "This look successfully transitions from 'Event Wear' to 'Style Inspiration'. A definite win.", action: "Signal confirmed" }
      ]
    }
  },
  {
    name: "Opal",
    role: "Heritage stylist",
    perspective: "Ensures outfit language matches timeless luxury codes.",
    response:
      "Material choice and tailoring signal premium consistency. Replace silver heel option with a subtler metallic to keep the palette disciplined.",
    confidence: 69,
    stance: "Mixed",
    deepAnalysis: {
      user: { name: "Opal", age: 52, status: "Archive Curator", summary: "Opal believes true luxury is quiet. She looks for the invisible threads of quality that separate couture from fast-fashion." },
      metrics: { materialQuality: "96%", tailoringPrecision: "91%", paletteDiscipline: "74%", prestigeRecall: "82%" },
      cognitiveLoad: [72, 81, 62],
      journey: [
        { day: 1, status: "Tactile check", emotion: "Interested", text: "The silk lining indicates a commitment to comfort as much as appearance. This is a hallmark of luxury.", action: "Quality audit" },
        { day: 1, status: "Silhouette scan", emotion: "Neutral", text: "The waist chain is a modern addition that slightly interrupts the classical flow of the tulle.", action: "Noted interruption" },
        { day: 2, status: "Reflection", emotion: "Mixed", text: "The outfit is undeniably beautiful, but the mix of metals (Gold/Silver) suggests a slight lack of discipline.", action: "Design critique" },
        { day: 4, status: "Final review", emotion: "Satisfied", text: "Overall, a very high-quality ensemble that respects the heritage of the house while nodding to today.", action: "Heritage pass" }
      ]
    }
  },
  {
    name: "Celine",
    role: "Perception analyst",
    perspective: "Models audience perception of confidence and warmth.",
    response:
      "The look communicates authority first, then elegance. Add a softer facial expression in portrait shots to improve approachability.",
    confidence: 78,
    stance: "Mixed",
    deepAnalysis: {
      user: { name: "Celine", age: 31, status: "Psychology Lead", summary: "Celine analyzes the 'Social Gravity' of the look. She predicts how observers will infer personality from attire." },
      metrics: { authorityProjection: "95%", warmthRating: "58%", approachability: "62%", poiseScore: "92%" },
      cognitiveLoad: [85, 94, 68],
      journey: [
        { day: 1, status: "First contact", emotion: "Focused", text: "Observers will feel a sense of 'Distance'—this is a look that demands respect and implies power.", action: "Authority check" },
        { day: 1, status: "Interaction", emotion: "Neutral", text: "The stiffness of the bodice might make you seem unapproachable in small talk scenarios.", action: "Social friction" },
        { day: 1, status: "Peak impact", emotion: "Excited", text: "In high-stakes moments (walking the carpet), the lack of 'warmth' is actually a strategic advantage.", action: "Status locked" },
        { day: 3, status: "Recall test", emotion: "Confident", text: "People will remember you as 'Elegant and Commanding'. A very successful persona projection.", action: "Persona map" }
      ]
    }
  },
  {
    name: "Drape",
    role: "Pose engineer",
    perspective: "Optimizes posture and angle for lens outcomes.",
    response:
      "The gown has strong drape behavior in motion. A 30-45 degree stance with one shoulder forward will maximize line length.",
    confidence: 87,
    stance: "Positive",
    deepAnalysis: {
      user: { name: "Drape", age: 27, status: "Motion Specialist", summary: "Drape understands geometry. He treats the body and the fabric as a single interactive sculpture." },
      metrics: { lensAlignment: "92%", lineLength: "High", fabricDynamic: "89%", poseDiversity: "78%" },
      cognitiveLoad: [94, 38, 22],
      journey: [
        { day: 1, status: "Static check", emotion: "Analytical", text: "Standing straight on hides the intricate layering of the tulle. You lose 40% of the dress's value.", action: "Pose adjustment" },
        { day: 1, status: "The 45-degree", emotion: "Satisfied", text: "There it is. The light now travels across the sequins in a way that creates a 'Galaxy' effect.", action: "Angle approved" },
        { day: 1, status: "Walking test", emotion: "Excited", text: "The silk lining allows for a natural stride without the fabric catching between the legs.", action: "Motion validated" },
        { day: 2, status: "Frame review", emotion: "Proud", text: "The 'Golden Triangle' pose worked perfectly. You look 5 inches taller in the published photos.", action: "Result confirmed" }
      ]
    }
  },
  {
    name: "Noir",
    role: "Fabric diagnostician",
    perspective: "Examines fabric response under mixed lighting.",
    response:
      "Sequin density performs well in strobe bursts, but sleeve transparency can flatten in side light. Raise key light by one stop.",
    confidence: 62,
    stance: "Mixed",
    deepAnalysis: {
      user: { name: "Noir", age: 41, status: "Cinematographer", summary: "Noir sees in photons. He analyzes the refractive index of your sequins and the opacity of your tulle." },
      metrics: { strobeResponse: "96%", depthMapping: "82%", refractiveIndex: "High", lightingVersatility: "68%" },
      cognitiveLoad: [98, 45, 52],
      journey: [
        { day: 1, status: "Ambient check", emotion: "Neutral", text: "In the dim ballroom, the dress looks like a solid dark mass. We're losing the sequin detail.", action: "Light search" },
        { day: 1, status: "Strobe impact", emotion: "Shocked", text: "The flash hit. The sequins are behaving like mirrors—this could cause white clipping in some cameras.", action: "Exposure check" },
        { day: 1, status: "Side-light test", emotion: "Uncertain", text: "The sheer sleeves are almost invisible under side-lighting, making the torso look strangely floating.", action: "Noted anomaly" },
        { day: 2, status: "Grade review", emotion: "Satisfied", text: "With the right color grading, the Midnight Blue has incredible depth. It looks like the deep ocean.", action: "Diagnostic closed" }
      ]
    }
  },
  {
    name: "Poise",
    role: "Gala benchmark juror",
    perspective: "Compares the outfit against top gala references.",
    response:
      "This look ranks near best-dressed tier on silhouette and compliance. It trails slightly on distinctiveness due to conservative accessory choices.",
    confidence: 73,
    stance: "Mixed",
    deepAnalysis: {
      user: { name: "Poise", age: 39, status: "Award Judge", summary: "Poise looks at the 'Average' and the 'Elite'. She wants to see if you're just 'Gala Ready' or 'Gala Leading'." },
      metrics: { benchmarkRank: "Top 8%", uniqueness: "62%", compliance: "100%", prestigeImpact: "89%" },
      cognitiveLoad: [76, 82, 45],
      journey: [
        { day: 1, status: "Filter 01", emotion: "Neutral", text: "Scanning against the last 5 years of IFF carpet photos. You are clearly in the upper quartile.", action: "Ranking initial" },
        { day: 1, status: "Elite check", emotion: "Critical", text: "Compared to the 'Avant-Garde' category, you are a bit too safe. There is no 'Conversation Piece' here.", action: "Uniqueness check" },
        { day: 1, status: "Crowd response", emotion: "Satisfied", text: "You are comfortably 'Best Dressed' for 90% of the room. You blend in with the VIPs perfectly.", action: "Social match" },
        { day: 5, status: "Legacy check", emotion: "Neutral", text: "A solid, professional performance. Not a legendary 'Look', but a high-scoring one for any portfolio.", action: "Final score" }
      ]
    }
  },
  {
    name: "Lattice",
    role: "Warmth calibrator",
    perspective: "Evaluates relatability without losing prestige.",
    response:
      "Visual excellence is clear, but emotional warmth is moderate. A softer color accent can increase perceived openness in social coverage.",
    confidence: 54,
    stance: "Critical",
    deepAnalysis: {
      user: { name: "Lattice", age: 33, status: "Social Strategist", summary: "Lattice focuses on the 'Likability' factor. She wants to ensure you don't look 'too perfect' to the point of being cold." },
      metrics: { likability: "52%", emotionalOpenness: "Low", prestigeBalance: "High", viralEmpathy: "44%" },
      cognitiveLoad: [68, 91, 74],
      journey: [
        { day: 1, status: "Visual barrier", emotion: "Anxious", text: "The sheer volume of tulle and the dark color create a 'High Status' barrier. People might hesitate to talk to you.", action: "Empathy check" },
        { day: 1, status: "Smiling test", emotion: "Neutral", text: "Even with a smile, the attire pulls you back into a 'Queenly' persona. It's very formal, very guarded.", action: "Noted friction" },
        { day: 2, status: "Fan feedback", emotion: "Critical", text: "Comments on social media are using words like 'Stunning' and 'Ice Queen'. Admired, but not loved.", action: "Sentiment audit" },
        { day: 4, status: "Pivot", emotion: "Determined", text: "Adding a softer, warm-toned lipstick in the later evening improved perceived warmth by 15%.", action: "Edit approved" }
      ]
    }
  },
  {
    name: "Regent",
    role: "Verdict curator",
    perspective: "Converts style diagnostics into decision confidence.",
    response:
      "Event-ready with high formal compliance and strong visual authority. Apply minor accessory edits and proceed with confidence.",
    confidence: 95,
    stance: "Positive",
    deepAnalysis: {
      user: { name: "Regent", age: 46, status: "Chief of Staff", summary: "Regent is the voice of reason. He synthesizes all the fashion 'noise' into a simple, actionable decision for the principal." },
      metrics: { decisionConfidence: "95%", riskLevel: "Low", launchReadiness: "High", impactProjection: "91%" },
      cognitiveLoad: [52, 64, 82],
      journey: [
        { day: 1, status: "Synthesis", emotion: "Decisive", text: "The critics are split on the metals, but the fMRI data shows a massive aesthetic reward in the observers.", action: "Verdict: GO" },
        { day: 1, status: "Action plan", emotion: "Confident", text: "We will proceed with the Gold chain. It provides the necessary 'Alpha' signal for this specific event.", action: "Authorized" },
        { day: 2, status: "Post-event", emotion: "Satisfied", text: "The Presence Impact Score of 91 was accurate. We dominated the 'Elegance' category in the morning papers.", action: "Case closed" },
        { day: 7, status: "Optimization", emotion: "Neutral", text: "Lessons learned: Midnight Blue is our winning color. We will double down on this palette for the winter season.", action: "Database updated" }
      ]
    }
  },
];

type BenchmarkGaugeProps = {
  label: string;
  valueLabel: string;
  subLabel: string;
  description: string;
  percentage: number;
  highlighted?: boolean;
};

function AgentDeepAnalysis({ agent, stanceColor }: { agent: any; stanceColor: string }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const analysis = agent.deepAnalysis;
  if (!analysis) return <div className="p-8 text-center text-muted italic">Deep analysis data is currently being synthesized for this agent...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-6 border-t border-line/40 pt-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        {/* Left Column: User Profile & Metrics */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/40 border border-white/60">
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-line`}>
              <User className="h-8 w-8 text-ink" />
            </div>
            <div>
              <div className="flex flex-col">
                <p className="kicker flex items-center gap-2">
                  <Info className="h-3 w-3" />
                  {agent.role}
                </p>
                <h5 className="headline mt-1 text-2xl text-ink leading-tight">{agent.name}</h5>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted/60">{analysis.user.age} YRS</span>
                <span className="h-1 w-1 rounded-full bg-muted/30" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{analysis.user.status}</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-panelSoft/50 border border-line/30">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/40 mb-2">Operational Perspective</p>
            <p className="text-sm text-ink/80 leading-relaxed font-medium mb-4">{agent.perspective}</p>
            <div className="h-px w-full bg-line/20 mb-4" />
            <p className="text-[11px] text-muted leading-relaxed font-medium italic">&quot;{analysis.user.summary}&quot;</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(analysis.metrics).map(([key, value]) => (
              <div key={key} className="rounded-2xl bg-white/60 p-4 border border-line/40 shadow-sm transition-colors hover:bg-white/80">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted mb-2">{key.replace(/([A-Z])/g, ' $1')}</p>
                <p className="headline text-2xl text-ink">{value as string}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] bg-white/80 p-6 border border-line/50 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-1.5 rounded-lg bg-accent/10">
                <Brain className="h-4 w-4 text-accent" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink">Cognitive Load Analysis</p>
            </div>
            <div className="space-y-5">
              {["Visual Processing", "Emotional Resonance", "Decision Friction"].map((label, i) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-medium text-muted">{label}</span>
                    <span className="font-bold text-ink">{(analysis.cognitiveLoad ? analysis.cognitiveLoad[i] : [85, 92, 45][i])}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-line/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(analysis.cognitiveLoad ? analysis.cognitiveLoad[i] : [85, 92, 45][i])}%` }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                      className={`h-full rounded-full ${i === 2 ? 'bg-rose-400' : 'bg-accent'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Timeline Journey */}
        <div className="relative pl-8 sm:pl-12 py-2">
          {/* Vertical Line */}
          <div className="absolute left-[11px] sm:left-[15px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-line via-line/60 to-transparent" />

          <div className="space-y-12">
            {analysis.journey.map((step: any, idx: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
              <div key={idx} className="relative group/step">
                {/* Dot */}
                <div className={`absolute -left-[30px] sm:-left-[34px] top-1.5 h-6 w-6 rounded-full border-[5px] border-white ${stanceColor} shadow-sm z-10 transition-transform group-hover/step:scale-110 ${idx === analysis.journey.length - 1 ? 'animate-pulse ring-4 ring-ink/10' : ''}`} />

                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm font-black text-ink uppercase tracking-wider">Day {step.day}</span>
                    <span className="h-1 w-1 rounded-full bg-muted/40" />
                    <span className="text-[13px] font-bold text-ink/80">{step.status}</span>
                    <span className="text-[11px] font-bold text-muted/50 uppercase tracking-widest italic">{step.emotion}</span>
                  </div>

                  <p className="text-[14px] text-muted leading-relaxed max-w-2xl font-medium">
                    {step.text}
                  </p>

                  <div className="mt-2">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink border border-line/60 shadow-sm transition-colors hover:bg-white">
                      <Target className="h-3.5 w-3.5 text-accent" />
                      {step.action}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BenchmarkGauge({
  label,
  valueLabel,
  subLabel,
  description,
  percentage,
  highlighted = false,
}: BenchmarkGaugeProps) {
  const ringStyle = {
    background: `conic-gradient(from 220deg, rgba(15, 23, 42, 0.95) 0deg, rgba(30, 64, 175, 0.95) ${percentage * 3.6}deg, rgba(191, 219, 254, 0.18) ${percentage * 3.6}deg, rgba(191, 219, 254, 0.18) 360deg)`,
    boxShadow: highlighted
      ? "0 0 0 1px rgba(30, 64, 175, 0.24), 0 0 42px rgba(30, 64, 175, 0.28), 0 0 70px rgba(15, 23, 42, 0.08)"
      : "0 0 0 1px rgba(15, 23, 42, 0.08), 0 0 28px rgba(15, 23, 42, 0.1)",
  };

  return (
    <div
      className={`rounded-[1.8rem] border bg-white/90 p-5 text-center shadow-sm ${highlighted ? "border-accent/30 ring-1 ring-accent/10" : "border-line"
        }`}
    >
      <div
        className="mx-auto flex h-60 w-60 items-center justify-center rounded-full p-4 sm:h-64 sm:w-64 lg:h-72 lg:w-72"
        style={ringStyle}
      >
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/90 bg-[radial-gradient(circle_at_30%_25%,rgba(30,64,175,0.14),transparent_34%),radial-gradient(circle_at_70%_78%,rgba(15,23,42,0.04),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)] px-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.96)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</p>
          <p
            className={`mt-4 text-5xl font-semibold tracking-[0.08em] text-[#081225] sm:text-6xl ${highlighted ? "drop-shadow-[0_0_18px_rgba(30,64,175,0.35)]" : ""
              }`}
            style={{ fontFamily: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace' }}
          >
            {valueLabel}
          </p>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1d4ed8]">{subLabel}</p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{label}</p>
        <p className="text-sm leading-relaxed text-ink/85">{description}</p>
      </div>
    </div>
  );
}

export function GalaReadySimulatorSection() {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

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
      <SimulationPromptChat prompt="Evaluate my gala outfit photo for elegance, dress-code fit, social perception, red-carpet benchmark, and finishing recommendations." />

      <SectionHeading
        eyebrow="General dashboard concept"
        title={<>Formal Style Evaluator</>}
        description="Upload your gala outfit and describe your destination to simulate your Presence Impact Score."
        action={<Pill tone="accent">Gala-Ready AI</Pill>}
      />

      <Surface className="p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden p-0">
            <div className="min-h-[330px] bg-[radial-gradient(circle_at_20%_15%,rgba(249,168,37,0.22),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.2),transparent_28%),linear-gradient(160deg,#f8fafc,#f3f4f6)] p-6">
              <div className="flex items-center justify-between">
                <Pill tone="soft">Input image</Pill>
              </div>
              <div className="mt-4 rounded-[1.6rem] border border-white/80 bg-white/70 p-5 backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-[1.3rem] border border-line bg-[linear-gradient(145deg,#f8fafc,#eceff4)]">
                  <Image
                    src="/outfit.png"
                    alt="Uploaded gala outfit"
                    width={500}
                    height={700}
                    className="mx-auto h-auto max-h-[460px] w-auto max-w-full"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Context prompt</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Event Prompt</p>
                <p className="mt-2 text-lg leading-relaxed text-ink">Attending a Red Carpet Premiere at the International Film Festival. The environment requires high-fashion visibility, elegance, and a commanding presence for press photography.</p>
              </div>
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Dress Code Detected</p>
                <p className="mt-2 text-lg font-semibold text-ink">Black Tie / Red Carpet Gala</p>
                <p className="mt-1 text-base text-muted">Formal Evening Wear / Avant-Garde Elegance</p>
              </div>
              <div className="rounded-[1.2rem] border border-accent/25 bg-accentSoft/60 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Tagline</p>
                <p className="mt-2 text-base leading-relaxed text-ink">Analyzing silhouette precision, texture harmony, and visual impact against elite fashion benchmarks.</p>
              </div>
            </div>
          </Card>
        </div>
      </Surface>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="kicker">The Presence Score</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">High-level gala KPIs</h2>
          </div>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-4">
          <Card className="p-5">
            <p className="kicker">{kpis[0].label}</p>
            <p className="headline mt-2 text-3xl">{kpis[0].value}</p>
            <p className="mt-2 text-sm text-muted">{kpis[0].detail}</p>
            <div className="mt-5 grid place-items-center">
              <div className="relative h-28 w-28 rounded-full bg-[conic-gradient(from_180deg,#f59e0b_0_92%,#e5e7eb_92%_100%)] p-2">
                <div className="grid h-full w-full place-items-center rounded-full bg-white">
                  <span className="headline text-2xl text-ink">92</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <p className="kicker">{kpis[1].label}</p>
            <p className="headline mt-2 text-3xl">{kpis[1].value}</p>
            <p className="mt-2 text-sm text-muted">{kpis[1].detail}</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#e8f7ef] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#15803d]">
              Perfect Match
            </div>
          </Card>

          <Card className="p-5">
            <p className="kicker">{kpis[2].label}</p>
            <p className="headline mt-2 text-3xl">{kpis[2].value}</p>
            <p className="mt-2 text-sm text-muted">{kpis[2].detail}</p>
            <div className="mt-5">
              <ProgressBar value={89} />
            </div>
          </Card>

          <Card className="p-5">
            <p className="kicker">Color Authority</p>
            <p className="headline mt-2 text-3xl">Midnight Blue</p>
            <p className="mt-2 text-sm text-muted">Psychological impact: Trust + Prestige</p>
            <div className="mt-5 flex h-12 items-end gap-1">
              {colorAuthority.map((value, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${value}%`,
                    background: index % 2 === 0 ? "#1e3a8a" : "#7dd3fc",
                  }}
                />
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="kicker">Neural Activation Map</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Cortical aesthetic & status response</h2>
          </div>
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="overflow-hidden p-0">
            <div className="h-[460px]">
              <BrainViewerLazy predictionKey="stim2.predictions" />
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <p className="kicker">fMRI-based commentary</p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                Peaks in the <span className="font-semibold">medial orbitofrontal cortex (mOFC)</span> and
                <span className="font-semibold"> ventral striatum</span> reflect a strong aesthetic reward response - the
                silhouette and Midnight Blue palette are being processed as high-status, high-pleasure signals.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                Co-activation of the <span className="font-semibold">fusiform face area</span> and
                <span className="font-semibold"> posterior superior temporal sulcus</span> indicates that observers will
                instinctively read poise and social confidence, supporting the 91% Presence Impact projection.
              </p>
            </Card>

            <Card className="p-5">
              <p className="kicker">Key cortical hotspots</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-3 rounded-[1rem] bg-panelSoft p-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <div>
                    <p className="font-semibold text-ink">Medial OFC / ventral striatum</p>
                    <p className="text-muted">Luxury reward coding - fabric sheen and color prestige.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[1rem] bg-panelSoft p-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <div>
                    <p className="font-semibold text-ink">Fusiform / lateral occipital</p>
                    <p className="text-muted">Silhouette and body-shape recognition, tailoring legibility.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[1rem] bg-panelSoft p-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <div>
                    <p className="font-semibold text-ink">pSTS / temporoparietal junction</p>
                    <p className="text-muted">Social inference - confidence and poise cues from posture.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="kicker">Visual & fabric analysis</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Attire Composition & Texture Detection</h2>
          </div>
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card className="overflow-hidden p-0">
            <div className="relative min-h-[360px] bg-white p-4 sm:p-5">
              <Image
                src="/Palette-Silhouette.png"
                alt="Palette and silhouette analysis board"
                width={800}
                height={600}
                className="h-full w-full rounded-[1.3rem] object-contain"
              />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="headline text-2xl">Material Intelligence Table</p>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <p className="font-semibold text-ink">Fabric Texture</p>
                <div className="mt-3 space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
                  <div>
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span>Midnight Tulle</span>
                      <span className="font-semibold text-ink">50%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/70">
                      <div className="h-2 w-1/2 rounded-full bg-accent" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span>Sequin Embroidery</span>
                      <span className="font-semibold text-ink">30%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/70">
                      <div className="h-2 w-[30%] rounded-full bg-[#6366f1]" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span>Silk Lining</span>
                      <span className="font-semibold text-ink">20%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/70">
                      <div className="h-2 w-1/5 rounded-full bg-[#f59e0b]" />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-ink">Analysis: High-density shimmering particles detected. Stellar effect under 3200K studio lighting.</p>
              </div>
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <p className="font-semibold text-ink">Accessory Synergy</p>
                <p className="mt-1 text-muted">Detected: Metallic Gold Waist Chain &amp; Silver-toned Box Clutch detected.</p>
                <p className="mt-2 text-ink">Match: 94% (High Harmony)</p>
                <p className="mt-2 text-ink">Critique: The gold accent provides a structural anchor to the flowing tulle. Recommendation: Match earrings with the waist chain material for 100% synergy.</p>
              </div>
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <p className="font-semibold text-ink">Lighting Reflection</p>
                <p className="mt-1 text-muted">Environment: Simulated Red Carpet (Outdoor Night with Flash)</p>
                <p className="mt-2 text-ink">Behavior: The fabric is designed to absorb ambient shadows while reflecting direct strobe light, enhancing the Glow factor by 1.5x.</p>
              </div>
            </div>
            <p className="mt-4 text-xs italic leading-relaxed text-muted">
              AI Stylist Note: The contrast between the sheer sleeves and the opaque bodice creates a sophisticated Depth Map that performs exceptionally well on high-resolution broadcast cameras.
            </p>
          </Card>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="kicker">Psychological & social impact</p>
            <div className="mt-2 flex items-center gap-3">
              <h2 className="headline text-3xl sm:text-4xl">Persona Perception Radar</h2>
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_1.02fr]">
          <Card className="overflow-hidden p-0">
            <div className="min-h-[420px] bg-white p-4 sm:p-5">
              <Image
                src="/radar.png"
                alt="Persona perception radar"
                width={600}
                height={600}
                className="h-full w-full object-contain"
              />
            </div>
          </Card>

          <Card className="p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-muted">Social cognition summary</p>
                <p className="mt-2 headline text-2xl">Social Perception Breakdown</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-ink">Social Gravity Score</span>
                  <Pill tone="soft">DOMINANT &amp; ETHEREAL</Pill>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink">
                  Insight: &quot;The Midnight Blue palette triggers subconscious associations with authority and trust, while the shimmer adds a layer of mystery.&quot;
                </p>
              </div>

              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">Confidence Projection</span>
                  <span className="text-lg font-semibold tracking-wide text-accent drop-shadow-[0_0_10px_rgba(99,102,241,0.45)]">92%</span>
                </div>
                <ProgressBar value={92} />
                <p className="mt-3 text-sm leading-relaxed text-ink">
                  Description: &quot;The structure of the bodice reinforces upright posture and poise, conveying intrinsic self-assurance.&quot;
                </p>
              </div>

              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-ink">Media Resonance</span>
                  <Pill tone="soft">HIGH / RED CARPET READY</Pill>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink">
                  Description: &quot;Material reflectivity and silhouette clarity are optimized for high-contrast red carpet flash photography.&quot;
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>


      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="kicker">The Red Carpet Factor</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Gala Standard Benchmarking</h2>
          </div>
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line/70 bg-panelSoft/80 text-xs uppercase tracking-[0.18em] text-muted">
                    <th className="p-4">Metric</th>
                    <th className="p-4 text-accent">Your Look</th>
                    <th className="p-4">Average Attendee</th>
                    <th className="p-4">Best Dressed Standard</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarkRows.map((row) => (
                    <tr key={row.metric} className="border-b border-line/60 last:border-b-0">
                      <td className="p-4 font-medium text-ink">{row.metric}</td>
                      <td className="p-4 text-accent">{row.yours}</td>
                      <td className="p-4 text-muted">{row.average}</td>
                      <td className="p-4 text-muted">{row.bestDressed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-5">
            <p className="headline text-xl">Comparison Snapshot</p>
            <div className="mt-5 space-y-4">
              {["Uniqueness", "Compliance", "Trend Alignment"].map((metric, index) => (
                <div key={metric}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{metric}</span>
                    <span className="text-muted">{[88, 100, 91][index]}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-line/70">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${[88, 100, 91][index]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="kicker">Audience reaction simulation</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Style Performance Benchmarks</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <BenchmarkGauge
            label="Protocol Compliance"
            valueLabel="98%"
            subLabel="Dress Code Alignment"
            description="Quantitative match against global Black-Tie standards and event-specific constraints."
            percentage={98}
          />

          <BenchmarkGauge
            label="Global Style Index"
            valueLabel="94%"
            subLabel="Red Carpet Benchmark"
            description="Positioning of the current ensemble within the top 1% of historically successful gala aesthetics."
            percentage={94}
            highlighted
          />

          <BenchmarkGauge
            label="Aesthetic Harmony"
            valueLabel="87%"
            subLabel="Minimalism vs. Glamour"
            description="Balanced ratio analysis between structural simplicity and decorative elements (Sequins/Embroidery)."
            percentage={87}
          />
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="kicker">Multi-agent response simulation</p>
            <h3 className="headline mt-2 text-3xl sm:text-4xl">10 agents respond to the initial prompt</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Each agent simulates a distinct fashion persona for the same starting prompt, so you can compare aligned and conflicting viewpoints on your ensemble.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <Pill tone="accent">Formal Style Consensus</Pill>
            <button className="flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95">
              Export Presence Report
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
                        <>Collapse analysis <ChevronUp className="h-4 w-4" /></>
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
        <div className="flex items-center justify-between">
          <div>
            <p className="kicker">AI Styling Recommendations</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Optimization & Finishing Touches</h2>
          </div>
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4">
            {recommendations.map((item) => (
              <Card key={item.label} className="p-5">
                <p className="kicker">{item.label}</p>
                <p className="mt-2 text-base leading-relaxed text-ink">{item.text}</p>
              </Card>
            ))}
          </div>

          <div className="rounded-[2rem] border border-line bg-[linear-gradient(145deg,#fff7ed,#fff1f2)] p-6">
            <p className="kicker text-muted">Final Verdict</p>
            <div className="mt-4 rounded-[1.4rem] border border-line bg-white p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Status</p>
              <p
                className="mt-3 text-4xl text-[#111827]"
                style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}
              >
                GALA READY
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                Your ensemble demonstrates strong formal compliance, high elegance projection, and notable red-carpet resonance for a black-tie ballroom environment.
              </p>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-accentSoft px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Presence Impact Score: 91
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
