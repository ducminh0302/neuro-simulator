import { RefreshCw, Search, Upload, ChevronDown } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Card, Pill, SectionHeading, Surface } from "@/components/ui";

export const metadata = {
  title: "Competitive Intelligence",
  description: "Discover competitors, analyze their content, and find opportunities.",
};

const trackedCompetitors: Array<{
  name: string;
  relevance: string;
  website: { label: string; url: string };
  socials: Array<{ label: string; url: string }>;
}> = [
  {
    name: "We Are Social",
    relevance: "Top relevant",
    website: { label: "wearesocial.com", url: "https://wearesocial.com" },
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/wearesocial/" },
      { label: "TikTok", url: "https://www.tiktok.com/@wearesociallondon" },
      { label: "Facebook", url: "https://www.facebook.com/wearesocial/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/we-are-social" },
    ],
  },
  {
    name: "Viral Nation",
    relevance: "Top relevant",
    website: { label: "viralnation.com", url: "https://viralnation.com" },
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/viralnation/" },
      { label: "TikTok", url: "https://www.tiktok.com/@viralnationinc" },
      { label: "Facebook", url: "https://www.facebook.com/theviralnation/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/viralnationinc" },
      { label: "YouTube", url: "https://www.youtube.com/@viralnationinc" },
    ],
  },
  {
    name: "NoGood",
    relevance: "95% relevant",
    website: { label: "nogood.io", url: "https://nogood.io" },
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/nogood.io/" },
      { label: "TikTok", url: "https://www.tiktok.com/@nogood.io" },
      { label: "Facebook", url: "https://www.facebook.com/nogood.io/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/nogood" },
      { label: "YouTube", url: "https://www.youtube.com/@nogoodhq" },
    ],
  },
  {
    name: "The Social Shepherd",
    relevance: "95% relevant",
    website: { label: "thesocialshepherd.com", url: "https://thesocialshepherd.com" },
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/thesocialshepherd/" },
      { label: "TikTok", url: "https://www.tiktok.com/@thesocialshepherdagency" },
      { label: "Facebook", url: "https://www.facebook.com/thesocialshepherdagency/" },
    ],
  },
  {
    name: "Disruptive Advertising",
    relevance: "90% relevant",
    website: { label: "disruptiveadvertising.com", url: "https://disruptiveadvertising.com" },
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/disruptiveads/" },
      { label: "TikTok", url: "https://www.tiktok.com/@disruptiveads" },
      { label: "Facebook", url: "https://www.facebook.com/disruptiveads/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/disruptive-advertising" },
    ],
  },
  {
    name: "Sociallyin",
    relevance: "90% relevant",
    website: { label: "sociallyin.com", url: "https://sociallyin.com" },
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/sociallyin__/" },
      { label: "TikTok", url: "https://www.tiktok.com/@sociallyin" },
      { label: "Facebook", url: "https://www.facebook.com/sociallyin/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/sociallyin" },
      { label: "YouTube", url: "https://www.youtube.com/@sociallyintheagency" },
    ],
  },
  {
    name: "Moburst",
    relevance: "90% relevant",
    website: { label: "moburst.com", url: "https://moburst.com" },
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/moburst.agency/" },
      { label: "TikTok", url: "https://www.tiktok.com/@moburst" },
      { label: "Facebook", url: "https://www.facebook.com/moburstmobilemarketing/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/moburst" },
      { label: "YouTube", url: "https://www.youtube.com/channel/UC7U9_olLMlDdyHmrtXIQCcg" },
    ],
  },
  {
    name: "Power Digital Marketing",
    relevance: "90% relevant",
    website: { label: "powerdigitalmarketing.com", url: "https://powerdigitalmarketing.com" },
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/power_digital/" },
      { label: "TikTok", url: "https://www.tiktok.com/@powerdigital" },
      { label: "Facebook", url: "https://www.facebook.com/PowerDigitalMarketing/" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/powerdigitalmarketing" },
      { label: "YouTube", url: "https://www.youtube.com/@PowerDigitalMarketing" },
    ],
  },
];

const ordinaryPosts: Array<{
  likes: string;
  comments: string;
  views: string;
  score: string;
}> = [
  { likes: "724", comments: "62", views: "21672", score: "52.8" },
  { likes: "612", comments: "48", views: "19240", score: "48.5" },
  { likes: "540", comments: "39", views: "18102", score: "45.2" },
  { likes: "498", comments: "35", views: "16500", score: "44.1" },
  { likes: "420", comments: "28", views: "15200", score: "42.0" },
  { likes: "380", comments: "24", views: "14020", score: "41.5" },
  { likes: "360", comments: "22", views: "13200", score: "40.8" },
  { likes: "310", comments: "19", views: "12000", score: "39.2" },
  { likes: "290", comments: "17", views: "11200", score: "38.0" },
  { likes: "270", comments: "15", views: "10800", score: "37.5" },
];

const getSocialStyles = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram":
      return "bg-[#E4405F]/15 border-[#E4405F]/30 text-[#E4405F] hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F]";
    case "tiktok":
      return "bg-ink/10 border-ink/20 text-ink hover:bg-ink hover:text-white hover:border-ink";
    case "facebook":
      return "bg-[#1877F2]/15 border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]";
    case "linkedin":
      return "bg-[#0A66C2]/15 border-[#0A66C2]/30 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]";
    case "youtube":
      return "bg-[#FF0000]/15 border-[#FF0000]/30 text-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]";
    default:
      return "bg-panelSoft border-line text-muted hover:bg-panel hover:text-ink";
  }
};

function CompetitorCard({ name, relevance, website, socials }: (typeof trackedCompetitors)[number]) {
  return (
    <Card className="group/card overflow-hidden p-5 sm:p-6 transition-all hover:shadow-xl hover:shadow-accent/5 border-transparent hover:border-accent/10 bg-white/50 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <a
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group min-w-0 flex-1"
        >
          <h3 className="headline truncate text-xl sm:text-2xl font-bold text-accent group-hover:text-accent-hover transition-all group-hover:translate-x-1 decoration-accent/30 decoration-1 underline-offset-4 group-hover:underline">
            {name}
          </h3>
        </a>
        <Pill tone="accent" className="shrink-0 font-bold tracking-tight text-[10px]">
          {relevance.replace(" relevant", "")}
        </Pill>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center rounded-xl border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest transition-all hover:scale-105 hover:shadow-sm active:scale-95 ${getSocialStyles(
              s.label
            )}`}
          >
            {s.label}
          </a>
        ))}
      </div>
    </Card>
  );
}

export default function CompetitiveIntelligencePage() {
  return (
    <SiteShell active="competitors" subtitle="Discover competitors, analyze their content, and find opportunities.">
      <div className="space-y-8 pb-10">
        <SectionHeading
          eyebrow="Market intelligence"
          title={<>Competitive intelligence</>}
        />

        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
            <div>
              <p className="kicker">Watchlist</p>
              <h2 className="headline mt-2 text-2xl sm:text-3xl">Tracked competitors</h2>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-panel px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink soft-border transition-all hover:bg-panelSoft hover:shadow-sm active:scale-95"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden />
              Update
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {trackedCompetitors.map((c) => (
              <CompetitorCard key={c.name} {...c} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="group relative flex items-center gap-2 rounded-full border border-line bg-white/50 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] text-muted transition-all hover:border-accent/30 hover:bg-white hover:text-accent hover:shadow-lg hover:shadow-accent/5 active:scale-95"
            >
              See more competitors
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
              <div className="absolute inset-0 -z-10 rounded-full bg-accent/5 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
            </button>
          </div>
        </section>

        <Surface className="p-5 sm:p-6 shadow-soft">
          <p className="kicker">Ingestion</p>
          <h2 className="headline mt-2 text-xl sm:text-2xl">Competitor content</h2>
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="min-w-0 flex-1">
              <input
                type="search"
                placeholder="e.g. Scrape Viral Nation's last 20 Instagram posts, or just type an agency name..."
                className="h-12 w-full rounded-full border border-line bg-white px-6 text-sm text-ink outline-none transition-all placeholder:text-muted focus:border-accent/40 focus:shadow-soft"
                aria-label="Scrape or search competitor content"
              />
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-white px-6 text-sm font-medium text-ink soft-border transition-colors hover:bg-panelSoft"
              >
                <Search className="h-4 w-4" aria-hidden />
                Scrape
              </button>
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white shadow-lift transition-all hover:scale-105 active:scale-95"
              >
                <Upload className="h-4 w-4" aria-hidden />
                Upload
              </button>
            </div>
          </div>
        </Surface>

        <Card className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="kicker">Scraped feed</p>
              <h2 className="headline mt-2 text-2xl sm:text-3xl">We Are Social (10)</h2>
            </div>
            <button
              type="button"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
            >
              Delete all
            </button>
          </div>
          <ul className="mt-6 space-y-0 divide-y divide-line/70">
            {ordinaryPosts.map((row, i) => (
              <li key={i} className="flex items-center gap-4 py-5 first:pt-0 last:pb-0">
                <div
                  className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-accentSoft to-panelSoft soft-border"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="headline text-base text-ink">We Are Social</span>
                    <Pill tone="neutral">instagram</Pill>
                  </div>
                  <p className="mt-1.5 text-sm text-muted">
                    {row.likes} likes · {row.comments} comments · {row.views} views
                  </p>
                </div>
                <span className="shrink-0 text-lg font-semibold tabular-nums text-ink">{row.score}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </SiteShell>
  );
}
