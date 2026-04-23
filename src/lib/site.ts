export type NavItem = {
  href: string;
  label: string;
};

export type LibraryItem = {
  name: string;
  kind: "file" | "folder";
  type: string;
  meta: string;
  accent: string;
};

export type SimulationSection = {
  slug: string;
  title: string;
  summary: string;
  status: "Live" | "Draft";
};

export const appName = "Simulacrum";

/** Chat-style entry: new simulation prompt (LLM-style composer). */
export const simulationNewPath = "/dashboard/simulations/new";

/** Simulations list / history index. */
export const simulationIndexPath = "/simulate";

/** A/B comparison input page (creative variants head-to-head). */
export const abCompareNewPath = "/dashboard/simulations/ab-compare";

/** A/B comparison results / report page. */
export const abCompareResultsPath = "/dashboard/simulations/ab-compare/results";

/** Competitors (competitive intelligence) — top-level route, same tier as /dashboard. */
export const competitiveIntelligencePath = "/competitive";

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/library", label: "Library" },
  { href: competitiveIntelligencePath, label: "Competitors" },
  { href: "/simulate", label: "Simulations" },
];

export const footerLinks = [
  { label: "Support", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Status", href: "#" },
  { label: "Docs", href: "#" },
];

export const simulationSections: SimulationSection[] = [
  {
    slug: "ab-variant-compare",
    title: "A/B Variant Compare",
    summary: "Run two creative variants head-to-head and surface the winning treatment with revenue, conversions, and sentiment lift.",
    status: "Live",
  },
  {
    slug: "hailey-bieber-instagram-feed",
    title: "Hailey Bieber Instagram Feed Campaign",
    summary: "Deep simulation of a clean beauty Instagram Feed drop — brain activation, agent journeys, funnel, cascade, and creative benchmarks.",
    status: "Live",
  },
  {
    slug: "niacinamide-launch-acne-solutions",
    title: "Niacinamide Launch - Acne Solutions",
    summary: "Video-driven deep simulation with second-by-second brain activation, agent journeys, funnel, and creative benchmarks.",
    status: "Live",
  },
  {
    slug: "grid-dataops-india-humanoid-training",
    title: "Grid DataOps India - Humanoid Training",
    summary: "Video-driven deep simulation of a UGC data-acquisition ad — 84/100 AI performance, live brain activation from EEG predictions, 5 archetype journeys, AIDA funnel, and creative benchmarks.",
    status: "Live",
  },
  {
    slug: "post-content-simulator",
    title: "Post Content Simulator",
    summary: "Predict launch performance from media, caption, and audience input.",
    status: "Live",
  },
  {
    slug: "deep-analysis-lab",
    title: "Gala-Ready AI Simulator",
    summary: "Analyze formal attire against elite event standards and presence impact.",
    status: "Live",
  },
  {
    slug: "workspace-productivity",
    title: "OptiSpace AI: Workspace Productivity & Ergonomic Simulator",
    summary: "Analyze your environment to maximize focus, health, and creative output.",
    status: "Live",
  },
  {
    slug: "simulacrum-focus-attention-heatmap",
    title: "Simulacrum-Focus: Cognitive Response & Attention Heatmap Simulator",
    summary: "Predictive neural analytics to decode how the human brain processes your visual stimuli.",
    status: "Live",
  },
];

export const libraryItems: LibraryItem[] = [
  { name: "client-contracts", kind: "folder", type: "Folder", meta: "18 agreements", accent: "bg-panelSoft text-muted" },
  { name: "meta-ads-brief.pdf", kind: "file", type: "Document", meta: "4 MB · client approved", accent: "bg-panelSoft text-muted" },
  { name: "q2-ad-spend-report.xlsx", kind: "file", type: "Spreadsheet", meta: "12 KB · finalized", accent: "bg-panelSoft text-muted" },
  { name: "tiktok-hooks-v2.txt", kind: "file", type: "Text", meta: "2 KB · editable", accent: "bg-panelSoft text-muted" },
  { name: "competitor-audit.md", kind: "file", type: "Document", meta: "15 KB · synced", accent: "bg-panelSoft text-muted" },
  { name: "brand-kit-assets", kind: "folder", type: "Folder", meta: "24 assets", accent: "bg-panelSoft text-muted" },
  { name: "influencer-list.csv", kind: "file", type: "Spreadsheet", meta: "4 KB · import ready", accent: "bg-panelSoft text-muted" },
  { name: "raw-video-footage", kind: "folder", type: "Folder", meta: "142 GB · cloud storage", accent: "bg-panelSoft text-muted" },
  { name: "storyboard-drafts", kind: "folder", type: "Folder", meta: "12 items", accent: "bg-panelSoft text-muted" },
  { name: "campaign-deliverables", kind: "folder", type: "Folder", meta: "9 final sets", accent: "bg-panelSoft text-muted" },
  { name: "social-caption-bank.docx", kind: "file", type: "Text", meta: "0 bytes · placeholder", accent: "bg-panelSoft text-muted" },
  { name: "audience-insights.md", kind: "file", type: "Document", meta: "8 KB · updated", accent: "bg-panelSoft text-muted" },
  { name: "moodboard-creative.jpg", kind: "file", type: "Image", meta: "0 bytes · placeholder", accent: "bg-panelSoft text-muted" },
  { name: "research-dump", kind: "folder", type: "Folder", meta: "31 notes", accent: "bg-panelSoft text-muted" },
  { name: "pixel-tracking-setup.txt", kind: "file", type: "Text", meta: "1 KB · draft", accent: "bg-panelSoft text-muted" },
  { name: "final-report-q1.pdf", kind: "file", type: "Document", meta: "2 MB · archived", accent: "bg-panelSoft text-muted" },
  { name: "creative-heatmap-v1.png", kind: "file", type: "Image", meta: "0 bytes · placeholder", accent: "bg-panelSoft text-muted" },
  { name: "media-buying-schedule.csv", kind: "file", type: "Spreadsheet", meta: "5 KB · active", accent: "bg-panelSoft text-muted" },
  { name: "client-feedback.txt", kind: "file", type: "Text", meta: "0 bytes · unread", accent: "bg-panelSoft text-muted" },
  { name: "archive-2025", kind: "folder", type: "Folder", meta: "204 items", accent: "bg-panelSoft text-muted" },
];

export function activeKey(pathname: string) {
  if (pathname === "/") return "landing";
  return pathname.slice(1).split("/")[0] || "landing";
}

export function getSimulationSection(slug: string) {
  return simulationSections.find((section) => section.slug === slug);
}