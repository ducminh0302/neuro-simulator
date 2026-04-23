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

export const appName = "NEURO";

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
    slug: "neuro-focus-attention-heatmap",
    title: "Neuro-Focus: Cognitive Response & Attention Heatmap Simulator",
    summary: "Predictive neural analytics to decode how the human brain processes your visual stimuli.",
    status: "Live",
  },
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
];

export const libraryItems: LibraryItem[] = [
  { name: "client-contracts", kind: "folder", type: "Folder", meta: "18 agreements", accent: "bg-[#edf7ea] text-[#15803d]" },
  { name: "meta-ads-brief.pdf", kind: "file", type: "Document", meta: "4 MB · client approved", accent: "bg-[#f1f5f9] text-[#334155]" },
  { name: "q2-ad-spend-report.xlsx", kind: "file", type: "Spreadsheet", meta: "12 KB · finalized", accent: "bg-[#d8ecff] text-[#1661b9]" },
  { name: "tiktok-hooks-v2.txt", kind: "file", type: "Text", meta: "2 KB · editable", accent: "bg-accentSoft text-accent" },
  { name: "competitor-audit.md", kind: "file", type: "Document", meta: "15 KB · synced", accent: "bg-accentSoft text-accent" },
  { name: "brand-kit-assets", kind: "folder", type: "Folder", meta: "24 assets", accent: "bg-[#edf7ea] text-[#15803d]" },
  { name: "influencer-list.csv", kind: "file", type: "Spreadsheet", meta: "4 KB · import ready", accent: "bg-[#d8ecff] text-[#1661b9]" },
  { name: "raw-video-footage", kind: "folder", type: "Folder", meta: "142 GB · cloud storage", accent: "bg-[#f0eaff] text-[#6d28d9]" },
  { name: "storyboard-drafts", kind: "folder", type: "Folder", meta: "12 items", accent: "bg-[#f8f0d7] text-[#a16207]" },
  { name: "campaign-deliverables", kind: "folder", type: "Folder", meta: "9 final sets", accent: "bg-[#f0eaff] text-[#6d28d9]" },
  { name: "social-caption-bank.docx", kind: "file", type: "Text", meta: "0 bytes · placeholder", accent: "bg-accentSoft text-accent" },
  { name: "audience-insights.md", kind: "file", type: "Document", meta: "8 KB · updated", accent: "bg-accentSoft text-accent" },
  { name: "moodboard-creative.jpg", kind: "file", type: "Image", meta: "0 bytes · placeholder", accent: "bg-[#ffe9db] text-[#b45309]" },
  { name: "research-dump", kind: "folder", type: "Folder", meta: "31 notes", accent: "bg-[#f0eaff] text-[#6d28d9]" },
  { name: "pixel-tracking-setup.txt", kind: "file", type: "Text", meta: "1 KB · draft", accent: "bg-accentSoft text-accent" },
  { name: "final-report-q1.pdf", kind: "file", type: "Document", meta: "2 MB · archived", accent: "bg-[#f1f5f9] text-[#334155]" },
  { name: "creative-heatmap-v1.png", kind: "file", type: "Image", meta: "0 bytes · placeholder", accent: "bg-[#ffe9db] text-[#b45309]" },
  { name: "media-buying-schedule.csv", kind: "file", type: "Spreadsheet", meta: "5 KB · active", accent: "bg-[#d8ecff] text-[#1661b9]" },
  { name: "client-feedback.txt", kind: "file", type: "Text", meta: "0 bytes · unread", accent: "bg-accentSoft text-accent" },
  { name: "archive-2025", kind: "folder", type: "Folder", meta: "204 items", accent: "bg-[#f1f5f9] text-[#334155]" },
];

export function activeKey(pathname: string) {
  if (pathname === "/") return "landing";
  return pathname.slice(1).split("/")[0] || "landing";
}

export function getSimulationSection(slug: string) {
  return simulationSections.find((section) => section.slug === slug);
}