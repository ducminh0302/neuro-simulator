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

/** Competitors (competitive intelligence) — top-level route, same tier as /dashboard. */
export const competitiveIntelligencePath = "/competitive";

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/library", label: "Library" },
  { href: competitiveIntelligencePath, label: "Competitors" },
  { href: "/simulate", label: "Simulations" },
  { href: "/auth", label: "Auth" },
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
];

export const libraryItems: LibraryItem[] = [
  { name: "campaign-brief.txt", kind: "file", type: "Text", meta: "2 KB · editable", accent: "bg-accentSoft text-accent" },
  { name: "launch-teaser.mp4", kind: "file", type: "Video", meta: "0 bytes · placeholder", accent: "bg-[#d8ecff] text-[#1661b9]" },
  { name: "moodboard_a.jpg", kind: "file", type: "Image", meta: "0 bytes · placeholder", accent: "bg-[#ffe9db] text-[#b45309]" },
  { name: "reference-stills", kind: "folder", type: "Folder", meta: "14 items", accent: "bg-[#edf7ea] text-[#15803d]" },
  { name: "persona-notes.txt", kind: "file", type: "Text", meta: "0 bytes · draft", accent: "bg-accentSoft text-accent" },
  { name: "raw-cuts", kind: "folder", type: "Folder", meta: "8 assets", accent: "bg-[#f0eaff] text-[#6d28d9]" },
  { name: "social-clips_01.mov", kind: "file", type: "Video", meta: "0 bytes · placeholder", accent: "bg-[#d8ecff] text-[#1661b9]" },
  { name: "interview-audio.wav", kind: "file", type: "Audio", meta: "0 bytes · placeholder", accent: "bg-[#fde7e9] text-[#be123c]" },
  { name: "transcript.md", kind: "file", type: "Text", meta: "6 KB · synced", accent: "bg-accentSoft text-accent" },
  { name: "brand-kit", kind: "folder", type: "Folder", meta: "6 assets", accent: "bg-[#edf7ea] text-[#15803d]" },
  { name: "sample-thumbs", kind: "folder", type: "Folder", meta: "22 items", accent: "bg-[#f8f0d7] text-[#a16207]" },
  { name: "shot-list.csv", kind: "file", type: "Spreadsheet", meta: "1 KB · import ready", accent: "bg-[#d8ecff] text-[#1661b9]" },
  { name: "social-caption.docx", kind: "file", type: "Text", meta: "0 bytes · placeholder", accent: "bg-accentSoft text-accent" },
  { name: "voiceover-script.txt", kind: "file", type: "Text", meta: "3 KB · editable", accent: "bg-accentSoft text-accent" },
  { name: "research-dump", kind: "folder", type: "Folder", meta: "31 notes", accent: "bg-[#f0eaff] text-[#6d28d9]" },
  { name: "ux-report.pdf", kind: "file", type: "Document", meta: "0 bytes · placeholder", accent: "bg-[#f1f5f9] text-[#334155]" },
  { name: "heatmap-export.png", kind: "file", type: "Image", meta: "0 bytes · placeholder", accent: "bg-[#ffe9db] text-[#b45309]" },
  { name: "session-archive", kind: "folder", type: "Folder", meta: "4 runs", accent: "bg-[#edf7ea] text-[#15803d]" },
  { name: "agent-notes.txt", kind: "file", type: "Text", meta: "0 bytes · placeholder", accent: "bg-accentSoft text-accent" },
  { name: "deliverables", kind: "folder", type: "Folder", meta: "9 items", accent: "bg-[#f0eaff] text-[#6d28d9]" },
  { name: "persona-a", kind: "file", type: "Profile", meta: "0 bytes · placeholder", accent: "bg-[#fef3c7] text-[#a16207]" },
  { name: "persona-b", kind: "file", type: "Profile", meta: "0 bytes · placeholder", accent: "bg-[#fef3c7] text-[#a16207]" },
  { name: "timeline", kind: "folder", type: "Folder", meta: "12 events", accent: "bg-[#edf7ea] text-[#15803d]" },
  { name: "final-report.md", kind: "file", type: "Document", meta: "8 KB · ready", accent: "bg-accentSoft text-accent" },
];

export function activeKey(pathname: string) {
  if (pathname === "/") return "landing";
  return pathname.slice(1).split("/")[0] || "landing";
}

export function getSimulationSection(slug: string) {
  return simulationSections.find((section) => section.slug === slug);
}