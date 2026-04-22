import { RefreshCw, Search, Upload, Scan } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Card, Pill, SectionHeading, Surface } from "@/components/ui";

export const metadata = {
  title: "Competitive Intelligence",
  description: "Discover competitors, analyze their content, and find opportunities.",
};

const trackedCompetitors: Array<{
  name: string;
  relevance: string;
  socials: string;
}> = [
  { name: "Glossier", relevance: "95% relevant", socials: "glossier.com · TikTok · Twitter · Facebook · @glossier" },
  { name: "The Ordinary", relevance: "95% relevant", socials: "deciem.com · Instagram · Facebook · @theordinary" },
  { name: "Drunk Elephant", relevance: "90% relevant", socials: "drunkelephant.com · Instagram · @drunkelephant" },
  { name: "CeraVe", relevance: "90% relevant", socials: "cerave.com · Instagram · Facebook · @cerave" },
  { name: "Glow Recipe", relevance: "90% relevant", socials: "glowrecipe.com · TikTok · Instagram · @glowrecipe" },
  { name: "Youth to the People", relevance: "90% relevant", socials: "youthtothepeople.com · Instagram · @yttp" },
  { name: "Curology", relevance: "90% relevant", socials: "curology.com · Instagram · TikTok · @curology" },
  { name: "Versed", relevance: "90% relevant", socials: "versedskin.com · Instagram · @versed" },
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

function CompetitorCard({ name, relevance, socials }: (typeof trackedCompetitors)[number]) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-2">
        <h3 className="headline text-lg text-ink">{name}</h3>
        <Pill tone="soft">{relevance.replace(" relevant", "")}</Pill>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{socials}</p>
    </Card>
  );
}

export default function CompetitiveIntelligencePage() {
  return (
    <SiteShell active="competitors" title="Competitive Intelligence" subtitle="Discover competitors, analyze their content, and find opportunities.">
      <div className="space-y-8 pb-10">
        <SectionHeading
          eyebrow="Market intelligence"
          title={<>Competitive intelligence</>}
          description="Discover competitors, analyze their content, and find opportunities."
          action={
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-panel px-6 py-3 text-sm font-medium soft-border transition-colors hover:bg-panelSoft"
              >
                <RefreshCw className="h-4 w-4" aria-hidden />
                Update
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <Scan className="h-4 w-4" aria-hidden />
                Full Analysis
              </button>
            </div>
          }
        />

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="kicker">Watchlist</p>
              <h2 className="headline mt-2 text-2xl sm:text-3xl">Tracked competitors (8)</h2>
            </div>
            <Pill tone="accent">8 brands</Pill>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {trackedCompetitors.map((c) => (
              <CompetitorCard key={c.name} {...c} />
            ))}
          </div>
        </section>

        <Surface className="p-5 sm:p-6 shadow-soft">
          <p className="kicker">Ingestion</p>
          <h2 className="headline mt-2 text-xl sm:text-2xl">Competitor content</h2>
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="min-w-0 flex-1">
              <input
                type="search"
                placeholder="e.g. Scrape Glossier's last 20 Instagram posts, or just type a brand name..."
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
              <h2 className="headline mt-2 text-2xl sm:text-3xl">The Ordinary (10)</h2>
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
                    <span className="headline text-base text-ink">The Ordinary</span>
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
