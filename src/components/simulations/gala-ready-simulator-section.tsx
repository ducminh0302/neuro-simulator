import {
  BarChart3,
  BrainCircuit,
  Camera,
  CheckCircle2,
  Gem,
  Radar,
  Sparkles,
  Star,
  Table2,
  Users,
  WandSparkles,
} from "lucide-react";

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

const radarValues = [86, 72, 78, 91, 67];
const radarLabels = [
  [50, 10, "Sophistication"],
  [91, 35, "Approachability"],
  [76, 92, "Boldness"],
  [24, 92, "Timelessness"],
  [8, 35, "Trendiness"],
] as const;

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

const personas = [
  {
    name: "The Fashion Critic",
    reaction: "Impressed by the tailoring.",
    note: "High Approval",
  },
  {
    name: "The Socialite",
    reaction: "Likely to ask for your designer's name.",
    note: "Strong Curiosity",
  },
  {
    name: "The Photographer",
    reaction: "Ideal for high-contrast flash photography.",
    note: "Camera Favorite",
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

function buildRadarPolygon(values: number[]) {
  const points = [
    [50, 18],
    [82, 40],
    [70, 78],
    [30, 78],
    [18, 40],
  ];

  return points
    .map(([x, y], index) => {
      const strength = values[index] / 100;
      const px = 50 + (x - 50) * strength;
      const py = 50 + (y - 50) * strength;
      return `${px},${py}`;
    })
    .join(" ");
}

export function GalaReadySimulatorSection() {
  const radarPolygon = buildRadarPolygon(radarValues);

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
                <Camera size={18} className="text-accent" />
              </div>
              <div className="mt-4 rounded-[1.6rem] border border-white/80 bg-white/70 p-5 backdrop-blur-sm">
                <p className="kicker">User&apos;s Evening Wear Photo</p>
                <div className="relative mt-4 min-h-[180px] rounded-[1.3rem] border border-line bg-[linear-gradient(145deg,#f8fafc,#eceff4)]">
                  <span className="absolute left-[18%] top-[18%] inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-white">A</span>
                  <span className="absolute left-[52%] top-[35%] inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-white">B</span>
                  <span className="absolute right-[16%] top-[62%] inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#d97706] text-[11px] font-semibold text-white">C</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <p className="kicker">Context prompt</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Event Prompt</p>
                <p className="mt-2 text-base text-ink">A Black-Tie Charity Gala at the Grand Peninsula Ballroom.</p>
              </div>
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Dress Code Detected</p>
                <p className="mt-2 text-base font-semibold text-ink">Black Tie / Formal</p>
              </div>
              <div className="rounded-[1.2rem] border border-accent/25 bg-accentSoft/60 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">Tagline</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">Analyze your look against the world&apos;s most prestigious event standards.</p>
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
          <BarChart3 size={20} className="text-accent" />
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
              <CheckCircle2 size={14} />
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
        <div className="flex items-center justify-between">
          <div>
            <p className="kicker">Visual & fabric analysis</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Attire Composition & Texture Detection</h2>
          </div>
          <Gem size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card className="p-0 overflow-hidden">
            <div className="relative min-h-[340px] bg-[linear-gradient(160deg,#f8fafc,#eceff5)] p-6">
              <div className="absolute left-[20%] top-[20%] h-3 w-3 rounded-full bg-accent" />
              <div className="absolute left-[58%] top-[36%] h-3 w-3 rounded-full bg-accent" />
              <div className="absolute left-[44%] bottom-[20%] h-3 w-3 rounded-full bg-accent" />
              <div className="absolute left-[21%] top-[21%] h-[1px] w-[130px] bg-accent/60" />
              <div className="absolute left-[59%] top-[37%] h-[1px] w-[95px] bg-accent/60" />
              <div className="absolute left-[45%] bottom-[21%] h-[1px] w-[120px] bg-accent/60" />
              <div className="absolute right-5 top-5 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-ink soft-border">Anchor points active</div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="headline text-2xl">Material Intelligence Table</p>
              <Table2 size={18} className="text-accent" />
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <p className="font-semibold text-ink">Fabric Texture</p>
                <p className="mt-1 text-muted">Silk (40%), Velvet (30%), Satin (30%)</p>
                <p className="mt-2 text-ink">Analysis: High Sheen, Luxurious.</p>
              </div>
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <p className="font-semibold text-ink">Accessory Synergy</p>
                <p className="mt-1 text-muted">Silver Clutch & Diamond Earrings detected.</p>
                <p className="mt-2 text-ink">Match: 98%.</p>
              </div>
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <p className="font-semibold text-ink">Lighting Reflection</p>
                <p className="mt-1 text-ink">Predicted glow under warm ballroom chandeliers.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="kicker">Psychological & social impact</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Persona Perception Radar</h2>
          </div>
          <Radar size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="p-6">
            <div className="grid place-items-center rounded-[1.8rem] bg-panelSoft p-5">
              <svg viewBox="0 0 100 100" className="h-72 w-72 overflow-visible">
                <polygon points="50,14 86,38 74,82 26,82 14,38" fill="rgba(125,211,252,0.15)" stroke="rgba(15,23,42,0.2)" />
                <polygon points={radarPolygon} fill="rgba(15,23,42,0.72)" stroke="rgba(15,23,42,0.95)" strokeWidth="1.5" />
                <line x1="50" y1="14" x2="50" y2="86" stroke="rgba(100,109,114,0.22)" />
                <line x1="14" y1="38" x2="86" y2="38" stroke="rgba(100,109,114,0.22)" />
                <line x1="26" y1="82" x2="74" y2="82" stroke="rgba(100,109,114,0.22)" />
                {radarLabels.map(([x, y, label]) => (
                  <text key={label} x={x} y={y} textAnchor="middle" className="fill-muted text-[5px] uppercase tracking-[0.16em]">
                    {label}
                  </text>
                ))}
              </svg>
            </div>
          </Card>

          <Card className="p-6">
            <p className="headline text-2xl">Impact Analysis</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-ink">First Impression Score</span>
                  <Pill tone="soft">Commanding & Graceful</Pill>
                </div>
              </div>
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">Confidence Projection</span>
                  <span className="text-muted">88%</span>
                </div>
                <ProgressBar value={88} />
              </div>
              <div className="rounded-[1.2rem] bg-panelSoft p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">Aesthetic Longevity</span>
                  <span className="text-muted">Classic</span>
                </div>
                <ProgressBar value={92} />
              </div>
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
          <BrainCircuit size={20} className="text-accent" />
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
            <p className="kicker">The Red Carpet Factor</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Gala Standard Benchmarking</h2>
          </div>
          <Star size={20} className="text-accent" />
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
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Guest List Resonance</h2>
          </div>
          <Users size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
            {personas.map((persona) => (
              <Card key={persona.name} className="p-5">
                <p className="kicker">Persona</p>
                <h3 className="headline mt-2 text-xl">{persona.name}</h3>
                <p className="mt-2 text-sm text-ink">{persona.reaction}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted">{persona.note}</p>
              </Card>
            ))}
          </div>

          <Card className="overflow-hidden p-0">
            <div className="p-5">
              <p className="headline text-xl">Attention Heatmap</p>
              <p className="mt-2 text-sm text-muted">High-attention zones detected around neckline shimmer and gown silhouette line.</p>
            </div>
            <div className="relative min-h-[300px] bg-[linear-gradient(145deg,#f8fafc,#eef2ff)]">
              <div className="absolute left-[45%] top-[22%] h-24 w-24 rounded-full bg-rose-300/35 blur-3xl" />
              <div className="absolute left-[28%] top-[52%] h-20 w-20 rounded-full bg-amber-300/30 blur-3xl" />
              <div className="absolute right-[22%] bottom-[20%] h-24 w-24 rounded-full bg-sky-300/35 blur-3xl" />
            </div>
          </Card>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white/70 p-6 sm:p-8 soft-border shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="kicker">AI Styling Recommendations</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Optimization & Finishing Touches</h2>
          </div>
          <WandSparkles size={20} className="text-accent" />
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
              <Sparkles size={14} />
              Presence Impact Score: 91
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
