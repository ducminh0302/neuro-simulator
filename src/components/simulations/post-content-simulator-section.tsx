"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, User, Target, Brain, ArrowRight, Star, Info } from "lucide-react";
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
    deepAnalysis: {
      user: { name: "Flare", age: 28, status: "Active Lead", summary: "Flare represents the trend-focused segment. Speed and high-contrast visual cues drove immediate engagement." },
      metrics: { repeatExposure: 2, daysToEngage: 4, conversionProb: "85%", retentionRate: "92%" },
      cognitiveLoad: [88, 94, 38],
      journey: [
        { day: 1, status: "Reminded of brand", emotion: "Curious", text: "Saw the high-contrast product shot while scrolling. It felt premium and instantly recognizable.", action: "Liked post" },
        { day: 2, status: "Subconscious recall", emotion: "Neutral", text: "Noticed the same aesthetic in a story. Didn't click but the brand memory is strengthening.", action: "No action" },
        { day: 4, status: "Growing interest", emotion: "Interested", text: "Third exposure. The minimalist hook finally landed. Clicked through to check the profile.", action: "Visited profile" },
        { day: 5, status: "High intent", emotion: "Excited", text: "The benefit statement in the caption resonates with my current needs. Saving for later.", action: "Saved post" }
      ]
    }
  },
  {
    name: "Quill",
    role: "Proof inspector",
    perspective: "Scans for credibility gaps in proof and claims.",
    response:
      "The concept is attractive, but conversion risk remains high without proof anchors. Add a concrete metric or customer quote near the CTA.",
    confidence: 52,
    stance: "Critical",
    deepAnalysis: {
      user: { name: "Quill", age: 35, status: "Skeptic", summary: "Quill represents the analytical, proof-seeking segment. The visual is appreciated but the lack of social proof caused friction." },
      metrics: { skepticism: 78, dwellTime: "12s", bounceRisk: "High", trustPotential: "44%" },
      cognitiveLoad: [62, 45, 89],
      journey: [
        { day: 1, status: "Initial exposure", emotion: "Interested", text: "The visual is clean, but the claims feel a bit too good to be true without seeing real results.", action: "Read comments" },
        { day: 3, status: "Proof seeking", emotion: "Analytical", text: "Looked for customer reviews in the comments. Finding mostly generic praise, which isn't convincing.", action: "Scrolled past" },
        { day: 5, status: "Comparative check", emotion: "Neutral", text: "Comparing this offer with a competitor. Their data looks more robust, though their design is weaker.", action: "Opened external tab" },
        { day: 7, status: "Hesitation", emotion: "Uncertain", text: "Saw the ad again. I want to trust it, but I need one solid case study or data point to tip me over.", action: "No action" }
      ]
    }
  },
  {
    name: "Tide",
    role: "Trend cartographer",
    perspective: "Reads platform-native behavior and audience trend fit.",
    response:
      "Visual language is trend-aligned for premium lifestyle feeds. A comment-bait question in line 2 can lift meaningful discussion.",
    confidence: 77,
    stance: "Mixed",
    deepAnalysis: {
      user: { name: "Tide", age: 24, status: "Platform Native", summary: "Tide evaluates based on current TikTok/Instagram aesthetic standards. The content fits the 'clean girl' or 'minimalist' aesthetic perfectly." },
      metrics: { trendAlignment: "94%", viralityPotential: "Medium", aestheticFit: "High", shareability: "81%" },
      cognitiveLoad: [92, 88, 30],
      journey: [
        { day: 1, status: "First view", emotion: "Inspired", text: "The color palette matches my feed perfectly. Saved it for aesthetic inspiration.", action: "Saved to collection" },
        { day: 2, status: "Re-engagement", emotion: "Excited", text: "Shared it to my story because the layout is so clean. My followers usually like this stuff.", action: "Shared to Story" },
        { day: 4, status: "Community buzz", emotion: "Neutral", text: "Noticed a few friends commented on it. The brand is starting to feel 'everywhere' in my niche.", action: "Liked comments" },
        { day: 6, status: "Trend peak", emotion: "Satisfied", text: "The aesthetic has fully permeated my explore page. This asset is the clear leader in visual quality.", action: "Followed account" }
      ]
    }
  },
  {
    name: "Crest",
    role: "Voice steward",
    perspective: "Protects long-term tone consistency and voice signature.",
    response:
      "Design language matches brand DNA, but the CTA reads generic. Replace with your brand phrase pattern to improve recall.",
    confidence: 82,
    stance: "Mixed",
    deepAnalysis: {
      user: { name: "Crest", age: 42, status: "Brand Guardian", summary: "Crest prioritizes long-term brand equity over short-term engagement spikes. He checks if the 'vibe' matches the established DNA." },
      metrics: { brandConsistency: "88%", toneAlignment: "High", recallProbability: "72%", equityLift: "15%" },
      cognitiveLoad: [75, 82, 55],
      journey: [
        { day: 1, status: "System check", emotion: "Analytical", text: "Comparing the font usage and color palette against the 2024 style guide. It's 90% there, but the CTA font is slightly off-weight.", action: "Flagged style" },
        { day: 3, status: "Review", emotion: "Satisfied", text: "The core visual signature is strong. Users will definitely recognize this as our brand even without the logo visible.", action: "Approved" },
        { day: 5, status: "Tone test", emotion: "Neutral", text: "Tested the caption tone against past high-performers. It feels a bit too formal; needs more 'human' texture.", action: "Edited caption" },
        { day: 8, status: "Final audit", emotion: "Confident", text: "The final version perfectly bridges our heritage with a modern digital-first approach.", action: "Locked asset" }
      ]
    }
  },
  {
    name: "Prism",
    role: "Emotion decoder",
    perspective: "Evaluates dominant emotional arc and friction points.",
    response:
      "Current tone lands on curiosity and aspiration. Add one certainty cue such as guarantee wording to reduce last-step hesitation.",
    confidence: 71,
    stance: "Mixed",
    deepAnalysis: {
      user: { name: "Prism", age: 31, status: "Psychology Expert", summary: "Prism maps the emotional response curve. She notices that curiosity peaks early but trust dips slightly at the point of action." },
      metrics: { emotionalDepth: "74%", frictionScore: "Medium", trustIndex: "68%", empathyRatio: "62%" },
      cognitiveLoad: [81, 95, 68],
      journey: [
        { day: 1, status: "Initial Spark", emotion: "Curious", text: "The hook works. It triggers a dopamine response related to novelty and lifestyle aspiration.", action: "Extended dwell time" },
        { day: 3, status: "Friction Point", emotion: "Anxious", text: "The lack of price transparency in the first slide is causing a minor anxiety spike. Users fear 'too expensive'.", action: "Check pricing" },
        { day: 5, status: "Cognitive Load", emotion: "Uncertain", text: "The user is thinking too hard about the 'how'. We need to simplify the transition from inspiration to purchase.", action: "Bounced" },
        { day: 7, status: "Resolution", emotion: "Relieved", text: "Seeing the '30-day money back' badge finally lowered the cortisol levels. Intent is now stable.", action: "Added to cart" }
      ]
    }
  },
  {
    name: "Bolt",
    role: "Conversion mechanic",
    perspective: "Balances awareness lift with downstream action quality.",
    response:
      "Top-funnel performance should be strong, but purchase intent is underpowered. Add a quantified benefit and deadline phrase to boost action.",
    confidence: 64,
    stance: "Mixed",
    deepAnalysis: {
      user: { name: "Bolt", age: 29, status: "Performance Marketer", summary: "Bolt is only interested in ROI. He sees high 'vanity' potential but worries about the conversion 'leak' in the middle of the funnel." },
      metrics: { conversionLift: "12%", roiEstimate: "2.4x", clickThrough: "3.8%", ltvProjection: "$420" },
      cognitiveLoad: [45, 55, 92],
      journey: [
        { day: 1, status: "Traffic surge", emotion: "Neutral", text: "CPC looks good, but the landing page bounce rate is projected to be high because the post is too broad.", action: "Adjusted bidding" },
        { day: 3, status: "Funnel leak", emotion: "Frustrated", text: "Users are clicking but not completing the form. There's a mismatch between the 'premium' post and the 'functional' landing page.", action: "Redesigned LP" },
        { day: 5, status: "A/B Testing", emotion: "Excited", text: "The new variation with 'Free Shipping' prominently displayed is outperforming the control by 18%.", action: "Scaled spend" },
        { day: 7, status: "Optimization", emotion: "Determined", text: "Adding a 'Save 15%' overlay in the second frame increased simulated conversion intent by 22%.", action: "Updated Creative" }
      ]
    }
  },
  {
    name: "Sable",
    role: "Attention tracer",
    perspective: "Tracks eye-path flow and perceptual clarity.",
    response:
      "Primary attention lands correctly on the product, but corner clutter slows scan speed. Increase local contrast in the lower-left zone.",
    confidence: 86,
    stance: "Positive",
    deepAnalysis: {
      user: { name: "Sable", age: 33, status: "UX Researcher", summary: "Sable analyzes the visual hierarchy and perceptual load. She ensures that the user's eye is directed to the value proposition without distraction." },
      metrics: { attentionScore: "92%", clarityIndex: "High", visualFriction: "Low", scanability: "89%" },
      cognitiveLoad: [96, 42, 28],
      journey: [
        { day: 1, status: "First Glance", emotion: "Focused", text: "The foveal vision lands perfectly on the product. The secondary scan picks up the headline within 400ms.", action: "Verified saliency" },
        { day: 2, status: "Perceptual Check", emotion: "Satisfied", text: "Even with low screen brightness, the core message remains legible. The contrast ratio is well-balanced.", action: "Approved layout" },
        { day: 3, status: "Flow analysis", emotion: "Neutral", text: "The user's eye gets 'stuck' on the logo for too long. Shifting it 20px right improved flow to the CTA.", action: "Repositioned logo" },
        { day: 5, status: "Final heat-map", emotion: "Confident", text: "The gaze path is now a perfect 'Z' pattern. Minimum effort required for maximum information absorption.", action: "Exported heatmap" }
      ]
    }
  },
  {
    name: "Mint",
    role: "Category comparator",
    perspective: "Compares expected outcomes with top-decile competitors.",
    response:
      "You likely beat category average reach, but save-to-reach may lag category leaders. Sharpen the core promise into one memorable line.",
    confidence: 68,
    stance: "Mixed",
    deepAnalysis: {
      user: { name: "Mint", age: 38, status: "Market Analyst", summary: "Mint looks at the competitive landscape. She benchmarks this simulation against the top 5% of digital agencies in the lifestyle sector." },
      metrics: { categoryRank: "Top 12%", benchmarkGap: "-4%", growthPotential: "High", competitiveEdge: "Design" },
      cognitiveLoad: [68, 74, 62],
      journey: [
        { day: 1, status: "Benchmarking", emotion: "Analytical", text: "Current performance is 15% better than the brand average, but we are still trailing behind the industry leader by a small margin.", action: "Identified gap" },
        { day: 3, status: "Strategy Pivot", emotion: "Neutral", text: "Competitor X just launched a similar campaign. We need to emphasize our 'Eco-friendly' angle more to differentiate.", action: "Revised hook" },
        { day: 4, status: "Validation", emotion: "Confident", text: "The creative approach is unique enough to break the 'scroll-blindness' that usually plagues this category.", action: "Strategic approval" },
        { day: 6, status: "Market fit", emotion: "Excited", text: "Simulated market response indicates a high probability of capturing 3% additional market share from the current leader.", action: "Confirmed launch" }
      ]
    }
  },
  {
    name: "Orbit",
    role: "Comment strategist",
    perspective: "Improves two-way conversation quality in comments.",
    response:
      "Audience will react, but discussion depth may stay shallow. Add a polarizing but safe question to increase comment quality.",
    confidence: 74,
    stance: "Positive",
    deepAnalysis: {
      user: { name: "Orbit", age: 26, status: "Community Manager", summary: "Orbit focuses on the social aspect. He wants to turn passive viewers into active commenters who drive the algorithm." },
      metrics: { discussionDepth: "Medium", sentimentBalance: "82/18", replyVelocity: "High", communityLoyalty: "74%" },
      cognitiveLoad: [72, 89, 45],
      journey: [
        { day: 1, status: "Seeding", emotion: "Curious", text: "The post is getting likes, but the comment section is just emojis. We need a specific prompt to trigger actual sentences.", action: "Drafted question" },
        { day: 2, status: "Micro-interact", emotion: "Neutral", text: "Replying to the first 5 comments within 10 minutes increased follow-up comments by 400%.", action: "Replied to users" },
        { day: 3, status: "Explosion", emotion: "Excited", text: "A user started a debate about the product's finish. This thread alone is driving 30% of the engagement.", action: "Moderated thread" },
        { day: 5, status: "Loyalty loop", emotion: "Proud", text: "The high-quality discussion is attracting 'super-fans' who are now doing the selling for us in the threads.", action: "Pinned top comment" }
      ]
    }
  },
  {
    name: "Nudge",
    role: "Release arbitrator",
    perspective: "Turns mixed signals into publish-now decisions.",
    response:
      "Publishable for awareness campaigns today. If conversion is the priority, revise copy and proof blocks first, then launch tomorrow.",
    confidence: 79,
    stance: "Mixed",
    deepAnalysis: {
      user: { name: "Nudge", age: 45, status: "Operations Director", summary: "Nudge is the final gatekeeper. He synthesizes all agent feedback into a binary 'Go/No-Go' decision based on risk vs. reward." },
      metrics: { readiness: "95%", riskMitigation: "High", launchTiming: "Optimal", finalVerdict: "GO" },
      cognitiveLoad: [55, 62, 78],
      journey: [
        { day: 1, status: "Final Review", emotion: "Decisive", text: "All systems are green for awareness. The minor copy risks are outweighed by the current trend window.", action: "Authorized publish" },
        { day: 2, status: "Post-launch", emotion: "Proud", text: "The 24-hour performance data confirms our simulation. The ROI is tracking exactly as predicted.", action: "Archived case" },
        { day: 4, status: "Performance review", emotion: "Satisfied", text: "No major blowback or negative sentiment detected. The 'Mixed' agents were right about the proof blocks, but the trend carried us.", action: "Generated report" },
        { day: 7, status: "Next cycle", emotion: "Neutral", text: "Lessons learned from this launch have been fed back into the training data for the next simulation.", action: "Updated database" }
      ]
    }
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

export function PostContentSimulatorSection() {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

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
