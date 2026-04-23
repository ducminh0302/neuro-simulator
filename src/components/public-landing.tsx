"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { appName, simulationNewPath } from "@/lib/site";

/* ─────────────────────────────────────────────────────────── */
/* Constants                                                   */
/* ─────────────────────────────────────────────────────────── */
const TICKER_ITEMS = [
  "Neuro-Focus Attention Mapping", "◆ Real-time Persona Simulation", "◆ Gala-Ready Event Prep", "◆ Content Optimization",
  "◆ Rapid AI Feedback", "◆ Effortless A/B Comparison", "◆ Instant Behavior Prediction", "◆ Seamless Workflow",
  "◆ Fast & Accurate Decisions", "◆ Convenient Simulation Suite",
  "Neuro-Focus Attention Mapping", "◆ Real-time Persona Simulation", "◆ Gala-Ready Event Prep", "◆ Content Optimization",
  "◆ Rapid AI Feedback", "◆ Effortless A/B Comparison", "◆ Instant Behavior Prediction", "◆ Seamless Workflow",
  "◆ Fast & Accurate Decisions", "◆ Convenient Simulation Suite",
];

const ease = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────── */
/* Shared animation variants                                   */
/* ─────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, ease, delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/* ─────────────────────────────────────────────────────────── */
/* Sub-components                                              */
/* ─────────────────────────────────────────────────────────── */

/** Dot-grid halftone divider (pure CSS, edge-faded) */
function HalftoneDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="pointer-events-none h-[140px] w-full overflow-hidden"
      style={{
        background: "radial-gradient(circle 3.5px at center, rgba(10,10,10,0.22) 100%, transparent 100%)",
        backgroundSize: "13px 13px",
        maskImage: flip
          ? "linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%), linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)"
          : "linear-gradient(to right, black 0%, transparent 30%, transparent 70%, black 100%), linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  );
}

/** Reveal wrapper — fades + slides up when entering viewport */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container */
function StaggerReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Ticker ── */
function Ticker() {
  return (
    <div className="relative h-9 overflow-hidden bg-black text-white">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent" />
      <div
        className="flex min-w-max items-center h-full whitespace-nowrap"
        style={{ animation: "ticker-move 24s linear infinite" }}
      >
        {TICKER_ITEMS.map((item, i) => (
          <span
            key={i}
            className="px-7 text-[10.5px] font-medium uppercase tracking-[0.07em] text-white/65"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Hero title with word-by-word reveal ── */
function HeroTitle({ inView }: { inView: boolean }) {
  const line1 = "Predict how minds".split(" ");
  const line2 = "to content".split(" ");

  const wordVariant = {
    hidden: { y: "110%", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.75, ease, delay: 0.05 + i * 0.07 },
    }),
  };

  return (
    <h1 className="mx-auto max-w-[1200px] text-[clamp(40px,9vw,152px)] leading-[0.96] tracking-[-0.04em]">
      {/* Line 1 */}
      <span className="block">
        {line1.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
            <motion.span
              className="inline-block"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              variants={wordVariant}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
      {/* Line 2 — "respond" italic */}
      <span className="block">
        {[...["respond"], ...line2].map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
            <motion.span
              className={`inline-block ${i === 0 ? "font-serif italic text-[#9a9a9a] pr-[0.15em]" : ""}`}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={line1.length + i}
              variants={wordVariant}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </h1>
  );
}

/* ── Typing effect mock ── */
function TypingMock() {
  const [typed, setTyped] = useState("");
  const text = "Why are users dropping off at checkout?";

  useEffect(() => {
    let i = 0, alive = true;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      if (!alive) return;
      if (i <= text.length) { setTyped(text.slice(0, i)); i++; t = setTimeout(loop, 55 + Math.random() * 40); }
      else { t = setTimeout(() => { i = 0; loop(); }, 2400); }
    };
    loop();
    return () => { alive = false; clearTimeout(t); };
  }, []);

  return (
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2.5 text-[12px] text-[#555] flex items-center gap-1">
      <span>{typed}</span>
      <span className="inline-block h-[13px] w-[1.5px] animate-[blink_1.1s_step-end_infinite] bg-black align-middle" />
    </div>
  );
}

/* ── Problem section progress-bar mock ── */
function ResearchTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const bars = [
    { label: "Discovery", w: "90%" },
    { label: "Research",  w: "75%" },
    { label: "Interviews", w: "85%" },
    { label: "Synthesis",  w: "52%" },
  ];
  return (
    <div ref={ref} className="mt-5 rounded-xl border border-black/10 bg-white p-4 space-y-2.5">
      {bars.map((b, i) => (
        <div key={b.label} className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-[#a3a3a3] w-[58px] shrink-0">{b.label}</span>
          <div className="flex-1 h-[5px] bg-[#e8e8e8] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-black rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: b.w } : { width: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 + i * 0.1 }}
            />
          </div>
        </div>
      ))}
      <div className="text-right font-mono text-[10px] text-[#a3a3a3] pt-1">sprint over</div>
    </div>
  );
}

/* ── Code marquee rows ── */
const ROW1 = [
  `import { Swarm } from "@swarmhq/sdk"`,
  `const swarm = new Swarm({ agents: 5 })`,
  `await swarm.run({ url: "https://app.example.com" })`,
  `const issues = await agent.detectFriction()`,
  `// → 12 issues found`,
  `await push.toLinear(issues)`,
  `const session = await swarm.startLive()`,
  `agent.on("anomaly", (e) => console.log(e))`,
];
const ROW2 = [
  `const report = await swarm.generateReport()`,
  `// → severity: critical, component: checkout`,
  `await agent.replaySession(session.id)`,
  `const diff = await swarm.compareSessions(a, b)`,
  `// → regression detected in /onboarding flow`,
  `await swarm.pushToBacklog(diff.regressions)`,
  `const score = await agent.scoreUX(session)`,
  `// → ux_score: 74, prev: 81`,
];

function CodeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
      <div
        className="flex min-w-max gap-3 mb-3 whitespace-nowrap"
        style={{ animation: `${reverse ? "code-scroll-rev" : "code-scroll"} 32s linear infinite` }}
      >
        {doubled.map((s, i) => (
          <span
            key={i}
            className="rounded-lg border border-black/10 bg-[#f6f6f6] px-4 py-2.5 font-mono text-[12px] text-[#555]"
          >
            {s.startsWith("//") ? <span className="text-[#a3a3a3] italic">{s}</span> : s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* NEW Feature mock components                                 */
/* ─────────────────────────────────────────────────────────── */

/* ── Feature 1: Brain Activation heat-map ── */
function BrainHeatmapMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const metrics = [
    { label: "Excitement", val: 88, w: "88%" },
    { label: "Surprised",  val: 72, w: "72%" },
    { label: "Engaged",    val: 64, w: "64%" },
    { label: "Attracted",  val: 57, w: "57%" },
    { label: "Relaxed",    val: 47, w: "47%" },
  ];

  return (
    <div ref={ref} className="mb-6 rounded-xl border border-black/10 overflow-hidden">
      {/* Simulated brain heat-map */}
      <div className="relative bg-[#0a0a0a] h-[130px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[180px] h-[90px] rounded-full opacity-40"
            style={{ background: "radial-gradient(ellipse at 35% 50%, #ff2200 0%, #ff6600 30%, #0055ff 65%, transparent 100%)" }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[120px] h-[70px] rounded-full opacity-30"
            style={{ background: "radial-gradient(ellipse at 70% 45%, #ff4400 0%, #ff9900 25%, transparent 70%)" }}
          />
        </div>
        {/* scale bar */}
        <div className="absolute bottom-2 right-3 flex items-center gap-1">
          <div
            className="h-1.5 w-16 rounded-full"
            style={{ background: "linear-gradient(to right, #0033ff, #00aaff, #00ff88, #ffcc00, #ff4400)" }}
          />
          <span className="text-[8px] text-white/50 font-mono">HIGH</span>
        </div>
        <div className="absolute top-2 left-3 text-[9px] font-mono text-white/40 uppercase tracking-[0.08em]">Brain Activation</div>
      </div>
      {/* Emotion bars */}
      <div className="bg-white px-4 py-3 space-y-2">
        {metrics.map((m, i) => (
          <div key={m.label} className="flex items-center gap-2">
            <span className="w-[64px] shrink-0 text-[10px] text-[#a3a3a3] font-mono">{m.label}</span>
            <div className="flex-1 h-[4px] bg-[#e8e8e8] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-black"
                initial={{ width: 0 }}
                animate={inView ? { width: m.w } : { width: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.15 + i * 0.08 }}
              />
            </div>
            <span className="w-[22px] text-right text-[10px] font-mono text-[#555]">{m.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Feature 2: Agent Decision Journey ── */
function AgentJourneyMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  const steps = [
    { day: "Day 1", label: "awareness",   status: "aware",     text: "Saw the ad on feed — stopped scrolling briefly." },
    { day: "Day 3", label: "interest",    status: "intrigued",  text: "Visited profile. Compared with current routine." },
    { day: "Day 7", label: "purchase",    status: "converted",  text: "Applied promo code. Completed checkout." },
  ];

  const statusColor: Record<string, string> = {
    aware:     "bg-[#f0f0f0] text-[#555]",
    intrigued: "bg-amber-50 text-amber-700 border border-amber-200",
    converted: "bg-green-50 text-green-700 border border-green-200",
  };

  return (
    <div ref={ref} className="mb-6 space-y-3">
      {/* Personas row */}
      <div className="flex items-center gap-2 mb-1">
        {[["A", "#111"], ["J", "#444"], ["S", "#777"]].map(([av, bg], i) => (
          <motion.span
            key={av}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
            style={{ background: bg }}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.1 }}
          >
            {av}
          </motion.span>
        ))}
        <span className="ml-1 text-[10px] text-[#a3a3a3]">12 simulated personas</span>
      </div>

      {/* Journey steps */}
      {steps.map((s, i) => (
        <motion.div
          key={s.day}
          className="flex gap-2.5"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease, delay: 0.25 + i * 0.15 }}
        >
          <div className="flex flex-col items-center">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-[8px] font-bold text-white">
              {i + 1}
            </span>
            {i < steps.length - 1 && <div className="w-[1px] flex-1 bg-black/10 mt-1" />}
          </div>
          <div className="pb-3">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono text-[#a3a3a3]">{s.day}</span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${statusColor[s.status]}`}>
                {s.label}
              </span>
            </div>
            <p className="text-[11.5px] text-[#555] leading-[1.5]">{s.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Feature 3: Funnel Breakdown ── */
function FunnelMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const stages = [
    { label: "Aware",       w: "100%", note: "100%" },
    { label: "Paid",        w: "72%",  note: "51.6%" },
    { label: "Unaware",     w: "52%",  note: "28.4%" },
    { label: "Browsing",    w: "36%",  note: "13.0%" },
    { label: "Purchased",   w: "20%",  note: "2.4%" },
    { label: "Considering", w: "12%",  note: "1.1%" },
  ];

  return (
    <div ref={ref} className="mb-6 rounded-xl border border-black/10 bg-white overflow-hidden">
      <div className="px-4 py-2.5 border-b border-black/8 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#a3a3a3]">Funnel Breakdown</span>
        <span className="text-[11px] font-semibold">50.0K total</span>
      </div>
      <div className="px-4 py-3 space-y-2.5">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-[70px] shrink-0 text-[10px] text-[#6b6b6b]">{s.label}</span>
            <div className="flex-1 h-[6px] bg-[#e8e8e8] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-black rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: s.w } : { width: 0 }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 + i * 0.08 }}
              />
            </div>
            <span className="w-[32px] text-right text-[10px] font-mono text-[#a3a3a3]">{s.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Feature 4: Creative Benchmarks + Recommendations ── */
function BenchmarkMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const benchmarks = [
    { label: "Attention Capture",   score: 45, industry: 60, good: false },
    { label: "Emotional Arousal",   score: 68, industry: 55, good: true  },
    { label: "Memory Encoding",     score: 38, industry: 52, good: false },
    { label: "Emotional Intensity", score: 80, industry: 58, good: true  },
    { label: "Social Resonance",    score: 32, industry: 40, good: false },
  ];

  const recs = [
    { type: "BUDGET",   text: "Instagram feed is 2.1× more effective than baseline — consider increasing allocation here." },
    { type: "CREATIVE", text: "Low social recall potential. Consider adding social proof, UGC elements, or shareable moments." },
  ];

  return (
    <div ref={ref} className="mb-6 space-y-3">
      {/* Benchmark bars */}
      <div className="rounded-xl border border-black/10 bg-white overflow-hidden">
        <div className="px-4 py-2.5 border-b border-black/8 text-[10px] font-bold uppercase tracking-[0.1em] text-[#a3a3a3]">
          Creative Benchmarks
        </div>
        <div className="px-4 py-3 space-y-2.5">
          {benchmarks.map((b, i) => (
            <div key={b.label}>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-[#6b6b6b]">{b.label}</span>
                <span className={`font-semibold ${b.good ? "text-green-600" : "text-[#dc2626]"}`}>{b.score}/100</span>
              </div>
              <div className="relative h-[5px] bg-[#e8e8e8] rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${b.good ? "bg-black" : "bg-[#dc2626]"}`}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${b.score}%` } : { width: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.15 + i * 0.1 }}
                />
                {/* industry avg tick */}
                <div
                  className="absolute top-0 h-full w-[2px] bg-[#a3a3a3]/60"
                  style={{ left: `${b.industry}%` }}
                />
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 pt-1">
            <div className="h-[2px] w-4 bg-[#a3a3a3]/60" />
            <span className="text-[9.5px] text-[#a3a3a3]">Industry average</span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-xl border border-black/10 bg-[#f6f6f6] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-black/8 text-[10px] font-bold uppercase tracking-[0.1em] text-[#a3a3a3]">
          Recommendations
        </div>
        <div className="divide-y divide-black/6">
          {recs.map((r, i) => (
            <motion.div
              key={r.type}
              className="px-4 py-3 flex gap-2.5"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.45, delay: 0.5 + i * 0.15 }}
            >
              <span className="shrink-0 rounded px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.06em] bg-black text-white h-fit mt-0.5">
                {r.type}
              </span>
              <p className="text-[11.5px] text-[#555] leading-[1.55]">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Main component                                              */
/* ─────────────────────────────────────────────────────────── */
export function PublicLanding() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.25 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#0a0a0a]">

      {/* ── NAV ── */}
      <nav className="fixed inset-x-0 top-0 z-50 h-[58px]">
        <div className={`absolute inset-0 bg-white/88 backdrop-blur-xl border-b border-black/10 transition-opacity duration-400 ${scrolled ? "opacity-100" : "opacity-0"}`} />
        <div className="relative mx-auto flex h-full max-w-[1240px] items-center justify-between px-6 sm:px-10">
          <Link href="/" className="text-[13.5px] font-semibold tracking-[0.01em]">{appName}</Link>
          <ul className="hidden items-center gap-7 md:flex">
            {["Features", "Pricing", "Library", "Book Demo"].map((label) => (
              <li key={label}>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="cursor-not-allowed text-[13px] text-[#6b6b6b]/45"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link href="/auth" className="rounded-full border border-black/20 px-[18px] py-[7px] text-[12.5px] font-medium transition-all hover:bg-[#f4f4f4]">Sign up</Link>
            <Link href="/sign-in" className="rounded-full bg-black border border-black px-[18px] py-[7px] text-[12.5px] font-medium text-white transition-all hover:bg-[#2a2a2a]">Log in</Link>
          </div>
        </div>
      </nav>

      {/* ── TICKER ── */}
      <div className="mt-[58px]"><Ticker /></div>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[calc(100vh-94px)] flex-col items-center justify-center overflow-hidden px-6 pb-12 pt-24 text-center sm:px-10"
      >
        {/* radial glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(17,17,17,0.06)_0%,rgba(255,255,255,0)_70%)]" />

        {/* title — word by word */}
        <HeroTitle inView={heroInView} />

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.75, ease, delay: 0.65 }}
          className="mt-10 max-w-[750px] text-[clamp(14.5px,1.15vw,19px)] leading-[1.7] text-[#6b6b6b]"
        >
          Brain-powered simulation that scores your creative,<br className="hidden sm:block" />
          predicts campaign outcomes, and gets smarter with every post.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.75, ease, delay: 0.78 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/dashboard"
            className="rounded-full border border-black bg-black px-7 py-3 text-[14px] font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#222] hover:shadow-md"
          >
            Book a Demo
          </Link>
          <Link
            href={simulationNewPath}
            className="inline-flex items-center gap-2 rounded-full border border-black/22 px-7 py-3 text-[14px] font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-black"
          >
            Try for Free <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* ── HALFTONE ── */}
      <HalftoneDivider />

      {/* ── PROBLEM ── */}
      <section className="mx-auto max-w-[1240px] px-6 py-20 sm:px-10">
        <Reveal className="text-center">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#a3a3a3]">The Problem</p>
          <h2 className="mt-4 mx-auto max-w-[640px] text-[clamp(34px,4.8vw,64px)] leading-[1.06] tracking-[-0.025em]">
            Most features ship to users you have never met
          </h2>
        </Reveal>

        <StaggerReveal className="mt-14 grid gap-px bg-black/8 border border-black/8 rounded-[18px] overflow-hidden md:grid-cols-3">
          {/* Card 1 */}
          <motion.div variants={staggerItem} className="bg-white p-9">
            <p className="font-mono text-[11px] text-[#a3a3a3] mb-4">01 —</p>
            <h3 className="text-[17px] font-semibold leading-[1.3] mb-2">Research takes weeks you do not have.</h3>
            <p className="text-[13.5px] leading-[1.65] text-[#6b6b6b] mb-0">By the time discovery, interviews, and synthesis are done — the sprint is over.</p>
            <ResearchTimeline />
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={staggerItem} className="bg-white p-9">
            <p className="font-mono text-[11px] text-[#a3a3a3] mb-4">02 —</p>
            <h3 className="text-[17px] font-semibold leading-[1.3] mb-2">Feedback arrives after you ship.</h3>
            <p className="text-[13.5px] leading-[1.65] text-[#6b6b6b] mb-0">User data shows up in Week 3+. The feature is already live.</p>
            <div className="mt-5 rounded-xl border border-black/10 bg-white p-4 font-mono text-[11.5px]">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-[12px]">You ship</span>
                <span className="text-[#a3a3a3]">Week 1</span>
              </div>
              <div className="h-[2px] bg-[#e8e8e8] rounded-full relative mb-3">
                <span className="absolute left-[12%] top-[-3px] h-2 w-2 rounded-full bg-black" />
                <span className="absolute right-0 top-[-3px] h-2 w-2 rounded-full bg-[#d1d1d1]" />
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#a3a3a3] text-[12px]">User data</span>
                <span className="text-[#a3a3a3]">Week 3+</span>
              </div>
              <span className="text-[#dc2626] font-semibold text-[11px]">too late...</span>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={staggerItem} className="bg-white p-9">
            <p className="font-mono text-[11px] text-[#a3a3a3] mb-4">03 —</p>
            <h3 className="text-[17px] font-semibold leading-[1.3] mb-2">Assumptions get baked in and are never tested.</h3>
            <p className="text-[13.5px] leading-[1.65] text-[#6b6b6b] mb-0">Do users want this? Is onboarding clear? Why do they churn?</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Do users want this??", "Is onboarding clear??", "Why do they churn??", "Will they find the CTA??", "Is pricing right??", "Does this make sense??"].map(q => (
                <span key={q} className="rounded-full border border-black/10 bg-[#f6f6f6] px-3 py-1.5 text-[11px] text-[#555]">{q}</span>
              ))}
            </div>
          </motion.div>
        </StaggerReveal>
      </section>

      {/* ── HALFTONE ── */}
      <HalftoneDivider flip />

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="mx-auto max-w-[1240px] px-6 py-20 sm:px-10">
        <Reveal>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#a3a3a3]">How it works</p>
          <h2 className="mt-4 text-center text-[clamp(36px,5vw,68px)] leading-[1.06] tracking-[-0.022em]">
            Feedback in 10 minutes.
          </h2>
        </Reveal>

        <StaggerReveal className="mt-14 grid gap-5 md:grid-cols-3">
          {/* Step 1 */}
          <motion.article variants={staggerItem} className="rounded-2xl border border-black/10 bg-[#f6f6f6] p-6">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#a3a3a3] mb-4">01 / Ask a question</p>
            <TypingMock />
            <h3 className="mt-5 text-[17px] font-semibold">Ask a question</h3>
            <p className="mt-2 text-[13px] leading-[1.65] text-[#6b6b6b]">Type what you want to understand. Attach a screenshot or URL for context.</p>
          </motion.article>

          {/* Step 2 */}
          <motion.article variants={staggerItem} className="rounded-2xl border border-black/10 bg-[#f6f6f6] p-6">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#a3a3a3] mb-4">02 / Activate user movement</p>
            <div className="flex gap-2 mb-3">
              {[["AM", "#111"], ["SL", "#333"], ["JK", "#555"], ["PR", "#888"]].map(([n, bg], i) => (
                <motion.span
                  key={n}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[10.5px] font-bold text-white"
                  style={{ background: bg }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 + i * 0.12 }}
                >
                  {n}
                </motion.span>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-[11.5px] font-mono text-[#6b6b6b]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-[pulse-dot_1.5s_ease-in-out_infinite]" />
              4 agents navigating your product...
            </div>
            <h3 className="mt-5 text-[17px] font-semibold">Activate user movement</h3>
            <p className="mt-2 text-[13px] leading-[1.65] text-[#6b6b6b]">AI personas navigate your product independently and capture every interaction.</p>
          </motion.article>

          {/* Step 3 */}
          <motion.article variants={staggerItem} className="rounded-2xl border border-black/10 bg-[#f6f6f6] p-6">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#a3a3a3] mb-4">03 / Get clear answers</p>
            <div className="rounded-lg border border-black/10 bg-white px-3 py-2.5 text-[12px] text-[#555] mb-3">
              Users drop off due to form complexity and unclear CTA copy.
            </div>
            {[
              { id: "UX-01", title: "Reduce form to 3 fields", badge: "TO DO", cls: "bg-[#f0f0f0] text-[#6b6b6b]" },
              { id: "UX-02", title: 'Rename CTA: "Complete Purchase"', badge: "IN PROGRESS", cls: "bg-amber-50 text-amber-800 border border-amber-200" },
              { id: "UX-03", title: "Add progress indicator", badge: "TO DO", cls: "bg-[#f0f0f0] text-[#6b6b6b]" },
            ].map(r => (
              <div key={r.id} className="flex items-center gap-2 border-b border-black/6 py-2 last:border-0 text-[11.5px]">
                <span className="font-mono text-[10px] text-[#a3a3a3] w-[40px]">{r.id}</span>
                <span className="flex-1 text-[#555]">{r.title}</span>
                <span className={`rounded-full px-2 py-0.5 text-[9.5px] font-semibold ${r.cls}`}>{r.badge}</span>
              </div>
            ))}
            <h3 className="mt-4 text-[17px] font-semibold">Get clear answers</h3>
            <p className="mt-2 text-[13px] leading-[1.65] text-[#6b6b6b]">See exactly where users struggled and what to fix before you ship.</p>
          </motion.article>
        </StaggerReveal>

        <StaggerReveal className="mt-5 grid gap-5 md:grid-cols-2">
          <motion.article variants={staggerItem} className="rounded-2xl border border-black/10 bg-[#f6f6f6] p-6">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#a3a3a3] mb-4">04 / Compare & validate</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { label: "A · Control", val: "3.2%", winner: false },
                { label: "B · Variant", val: "5.8%", winner: true },
              ].map(v => (
                <div key={v.label} className={`rounded-xl border p-3 ${v.winner ? "border-black" : "border-black/10"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase text-[#a3a3a3]">{v.label}</span>
                    {v.winner && <span className="rounded-full bg-black px-1.5 py-0.5 text-[8px] font-bold text-white">Winner</span>}
                  </div>
                  <span className="text-[18px] font-semibold">{v.val}</span>
                  <p className="text-[10px] text-[#a3a3a3] mt-0.5">conv. rate</p>
                </div>
              ))}
            </div>
            <h3 className="text-[17px] font-semibold">Compare variants instantly.</h3>
            <p className="mt-2 text-[13px] leading-[1.65] text-[#6b6b6b]">A/B test creative, copy, or flows with simulated audiences before a single pixel goes live.</p>
          </motion.article>

          <motion.article variants={staggerItem} className="rounded-2xl border border-black/10 bg-[#f6f6f6] p-6">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#a3a3a3] mb-4">05 / Export & share</p>
            <div className="space-y-2 mb-4">
              {[
                { icon: "↗", label: "Full simulation report", sub: "PDF · 24 pages" },
                { icon: "↗", label: "Agent decision journeys", sub: "CSV · 12 personas" },
                { icon: "↗", label: "Creative benchmark scores", sub: "JSON · API ready" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 rounded-lg border border-black/8 bg-white px-3 py-2.5">
                  <span className="text-[14px]">{item.icon}</span>
                  <div>
                    <p className="text-[12px] font-medium text-[#333]">{item.label}</p>
                    <p className="text-[10px] text-[#a3a3a3]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-[17px] font-semibold">Share results in one click.</h3>
            <p className="mt-2 text-[13px] leading-[1.65] text-[#6b6b6b]">Export reports, raw data, or API-ready scores. Built for teams that move fast.</p>
          </motion.article>
        </StaggerReveal>
      </section>

      {/* ── HALFTONE ── */}
      <HalftoneDivider />

      {/* ── INTELLIGENT FEATURES ── */}
      <section id="features">
        <Reveal className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 text-center">
          <h2 className="mx-auto text-[clamp(34px,4.6vw,64px)] leading-[1.1] tracking-[-0.022em]">
            Intelligent features that<br />make decisions easier
          </h2>
        </Reveal>

        <div className="grid gap-px bg-black/10 border-y border-black/10 md:grid-cols-2">

          {/* Feature 1 — Brain Activation */}
          <Reveal className="bg-white px-12 py-14">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#a3a3a3] mb-9">01 — Feature</p>
            <BrainHeatmapMock />
            <h3 className="text-[20px] font-semibold tracking-[-0.01em] mb-2">See where attention lands.</h3>
            <p className="max-w-[420px] text-[13.5px] leading-[1.7] text-[#6b6b6b]">
              Neuro-mapped heat overlays reveal which parts of your creative capture focus, trigger emotion, and drive memory encoding — before a single dollar is spent.
            </p>
          </Reveal>

          {/* Feature 2 — Agent Decision Journeys */}
          <Reveal className="bg-white px-12 py-14" delay={0.1}>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#a3a3a3] mb-9">02 — Feature</p>
            <AgentJourneyMock />
            <h3 className="text-[20px] font-semibold tracking-[-0.01em] mb-2">Simulate real buyer journeys.</h3>
            <p className="max-w-[420px] text-[13.5px] leading-[1.7] text-[#6b6b6b]">
              AI personas move through awareness, consideration, and purchase — exactly as real audiences would. Watch 12 different archetypes respond to your content.
            </p>
          </Reveal>

          {/* Feature 3 — Funnel Breakdown */}
          <Reveal className="bg-white px-12 py-14">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#a3a3a3] mb-9">03 — Feature</p>
            <FunnelMock />
            <h3 className="text-[20px] font-semibold tracking-[-0.01em] mb-2">Predict your funnel before launch.</h3>
            <p className="max-w-[420px] text-[13.5px] leading-[1.7] text-[#6b6b6b]">
              From 50K impressions to conversion — see exactly where audiences drop off and how many will make it through each stage of your funnel.
            </p>
          </Reveal>

          {/* Feature 4 — Creative Benchmarks */}
          <Reveal className="bg-white px-12 py-14" delay={0.1}>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#a3a3a3] mb-9">04 — Feature</p>
            <BenchmarkMock />
            <h3 className="text-[20px] font-semibold tracking-[-0.01em] mb-2">Benchmark against your industry.</h3>
            <p className="max-w-[420px] text-[13.5px] leading-[1.7] text-[#6b6b6b]">
              Score your creative on attention, emotion, memory, and social resonance — then get AI recommendations that tell you exactly what to fix.
            </p>
          </Reveal>

        </div>
      </section>

      {/* ── CODE MARQUEE — Iterate fast ── */}
      <section className="overflow-hidden border-b border-black/10 py-16">
        <Reveal>
          <h2 className="mb-12 text-center text-[clamp(36px,5vw,64px)] leading-[1.1] tracking-[-0.022em]">Iterate fast</h2>
        </Reveal>
        <CodeRow items={ROW1} />
        <CodeRow items={ROW2} reverse />
      </section>

      {/* ── HALFTONE ── */}
      <HalftoneDivider flip />

      {/* ── PRICING ── */}
      <section id="pricing" className="mx-auto max-w-[1240px] px-6 py-24 sm:px-10">
        <Reveal className="text-center mb-16">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#a3a3a3] mb-4">Pricing</p>
          <h2 className="text-[clamp(36px,5vw,64px)] leading-[1.06] tracking-[-0.022em]">with pricing that keeps up</h2>
        </Reveal>

        <StaggerReveal className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              tier: "Free", price: "$0", period: "/month",
              features: ["5 test runs (lifetime)", "5 agents per run", "1 team member", "Basic reporting", "Export options"],
              cta: "Get Started Free", featured: false,
            },
            {
              tier: "Pro", price: "$50", period: "/month",
              features: ["50 screenshot + 20 live runs/mo", "15 screenshot agents per run", "5 live agents per run", "Up to 3 team members", "Authenticated testing"],
              cta: "Start Pro Plan", featured: true,
            },
            {
              tier: "Business", price: "$350", period: "/month",
              features: ["150 screenshot + 50 live runs/mo", "20 screenshot agents per run", "10 live agents per run", "Up to 10 team members", "Priority support"],
              cta: "Start Business Plan", featured: false,
            },
            {
              tier: "Enterprise", price: "Custom", period: "",
              features: ["Unlimited runs & agents", "Unlimited team members", "Custom integrations", "Dedicated success manager", "SLA, SSO & SOC 2"],
              cta: "Contact Us", featured: false,
            },
          ].map((plan) => (
            <motion.article
              key={plan.tier}
              variants={staggerItem}
              className={`relative rounded-[20px] border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${
                plan.featured
                  ? "border-black bg-black text-white"
                  : "border-black/12 bg-white text-black"
              }`}
            >
              {plan.featured && (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.07em] text-black shadow-sm">
                  Most popular
                </span>
              )}
              <p className={`text-[11px] font-semibold uppercase tracking-[0.08em] mb-3 ${plan.featured ? "text-white/55" : "text-[#a3a3a3]"}`}>{plan.tier}</p>
              <div className="mb-1">
                <span className="text-[44px] leading-none tracking-tight">{plan.price}</span>
                {plan.period && <span className={`ml-1 text-[13px] ${plan.featured ? "text-white/50" : "text-[#a3a3a3]"}`}>{plan.period}</span>}
              </div>
              <div className={`my-5 h-px ${plan.featured ? "bg-white/10" : "bg-black/8"}`} />
              <ul className="mb-7 space-y-0">
                {plan.features.map(f => (
                  <li key={f} className={`flex gap-2 border-b py-2 text-[12.5px] last:border-0 ${plan.featured ? "border-white/8 text-white/75" : "border-black/8 text-[#6b6b6b]"}`}>
                    <span className={plan.featured ? "text-white/30" : "text-[#c8c8c8]"}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`w-full rounded-full border py-2.5 text-[13px] font-medium transition-all ${
                  plan.featured
                    ? "border-white bg-white text-black hover:bg-white/90"
                    : "border-black/20 text-black hover:bg-[#f6f6f6] hover:border-black/40"
                }`}
              >
                {plan.cta}
              </button>
            </motion.article>
          ))}
        </StaggerReveal>
      </section>

      {/* ── CTA ── */}
      <Reveal>
        <section className="px-6 pb-28 pt-12 text-center sm:px-10">
          <h2 className="text-[clamp(48px,7vw,96px)] leading-[1.05] tracking-[-0.025em]">
            Ship with <span className="font-serif italic text-[#9a9a9a]">confidence,</span>
            <br />not guesswork.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/dashboard" className="rounded-full border border-black bg-black px-7 py-3 text-[14px] font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#222] hover:shadow-md">
              Open Dashboard
            </Link>
            <Link href={simulationNewPath} className="rounded-full border border-black/22 px-7 py-3 text-[14px] font-medium transition-all hover:-translate-y-0.5 hover:border-black">
              Explore Simulation
            </Link>
          </div>
        </section>
      </Reveal>

      {/* ── FOOTER ── */}
      <footer className="border-t border-black/10 px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6">
          <span className="text-[13.5px] font-semibold">{appName}</span>
          <nav className="flex flex-wrap gap-6">
            {[["#features", "Features"], ["#pricing", "Pricing"], ["/library", "Library"], ["/privacy", "Privacy"], ["/terms", "Terms"]].map(([href, label]) => (
              <Link key={label} href={href} className="text-[12.5px] text-[#a3a3a3] transition-colors hover:text-black">{label}</Link>
            ))}
          </nav>
          <span className="text-[12px] text-[#a3a3a3]">© {new Date().getFullYear()} {appName}. All rights reserved.</span>
        </div>
      </footer>

      {/* ── GLOBAL STYLES ── */}
      <style jsx global>{`
        @keyframes ticker-move   { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-move  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes code-scroll   { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes code-scroll-rev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @keyframes blink         { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse-dot     { 0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.45); } 50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); } }
        html { scroll-behavior: smooth; }
      `}</style>
    </main>
  );
}
