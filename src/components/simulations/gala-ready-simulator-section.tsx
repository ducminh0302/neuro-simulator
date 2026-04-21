import {
  BarChart3,
  BrainCircuit,
  Camera,
  CheckCircle2,
  Gem,
  Radar,
  Search,
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

type BenchmarkGaugeProps = {
  label: string;
  valueLabel: string;
  subLabel: string;
  description: string;
  percentage: number;
  highlighted?: boolean;
};

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
      className={`rounded-[1.8rem] border bg-white/90 p-5 text-center shadow-sm ${
        highlighted ? "border-accent/30 ring-1 ring-accent/10" : "border-line"
      }`}
    >
      <div
        className="mx-auto flex h-60 w-60 items-center justify-center rounded-full p-4 sm:h-64 sm:w-64 lg:h-72 lg:w-72"
        style={ringStyle}
      >
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/90 bg-[radial-gradient(circle_at_30%_25%,rgba(30,64,175,0.14),transparent_34%),radial-gradient(circle_at_70%_78%,rgba(15,23,42,0.04),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)] px-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.96)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</p>
          <p
            className={`mt-4 text-5xl font-semibold tracking-[0.08em] text-[#081225] sm:text-6xl ${
              highlighted ? "drop-shadow-[0_0_18px_rgba(30,64,175,0.35)]" : ""
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
                <div className="relative overflow-hidden rounded-[1.3rem] border border-line bg-[linear-gradient(145deg,#f8fafc,#eceff4)]">
                  <img
                    src="/outfit.png"
                    alt="Uploaded gala outfit"
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
            <p className="kicker">Visual & fabric analysis</p>
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Attire Composition & Texture Detection</h2>
          </div>
          <Gem size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card className="overflow-hidden p-0">
            <div className="relative min-h-[360px] bg-white p-4 sm:p-5">
              <img
                src="/Palette-Silhouette.png"
                alt="Palette and silhouette analysis board"
                className="h-full w-full rounded-[1.3rem] object-contain"
              />
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
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panelSoft text-muted shadow-sm">
                <Search size={15} />
              </span>
            </div>
          </div>
          <Radar size={20} className="text-accent" />
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_1.02fr]">
          <Card className="overflow-hidden p-0">
            <div className="min-h-[420px] bg-white p-4 sm:p-5">
              <img
                src="/radar.png"
                alt="Persona perception radar"
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
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-panelSoft text-muted shadow-sm">
                <span className="relative flex h-5.5 w-5.5 items-center justify-center">
                  <Users size={16} className="absolute inset-0 m-auto opacity-60" />
                  <Search size={9} className="absolute -right-0.5 -top-0.5" />
                </span>
              </span>
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
            <h2 className="headline mt-2 text-3xl sm:text-4xl">Style Performance Benchmarks</h2>
          </div>
          <Users size={20} className="text-accent" />
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
