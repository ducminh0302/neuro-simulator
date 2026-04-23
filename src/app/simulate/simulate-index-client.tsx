"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Card, Pill, SectionHeading, Surface } from "@/components/ui";
import { simulationSections } from "@/lib/site";

export function SimulateIndexClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = useMemo(() => {
    return simulationSections.filter((section) => 
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <SiteShell
      active="simulate"
      title="Simulations"
      subtitle="Chat-style simulation workspace with reusable sections"
      ctaLabel="Run Simulation"
    >
      <div className="space-y-8 pb-10">
        <SectionHeading
          eyebrow="Simulation workspace"
          title={<>Simulation Chats</>}
          description="Start a new simulation prompt, then continue from any previous section in your chat history."
          action={<Pill tone="accent">{simulationSections.length} Sections</Pill>}
        />

        <Surface className="p-5 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="rounded-[1.8rem] bg-white/90 p-4 sm:p-5 soft-border">
              <div className="relative flex items-center gap-3 rounded-[1.2rem] border border-line bg-panelSoft px-4 py-3 transition-all focus-within:bg-white focus-within:shadow-soft focus-within:border-accent/40">
                <Search className="h-5 w-5 text-muted ml-1" />
                <input
                  type="text"
                  placeholder="Search simulation history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-ink px-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <p className="kicker">Chat history</p>
                <span className="text-xs uppercase tracking-[0.18em] text-muted">
                  {filteredSections.length} found · Most recent first
                </span>
              </div>

              {filteredSections.length > 0 ? (
                filteredSections.map((section, index) => (
                  <Card key={section.slug} className="p-0">
                    <Link
                      href={`/simulate/${section.slug}`}
                      className="group flex items-start justify-between gap-4 rounded-[2rem] p-4 sm:p-5 transition-colors hover:bg-white/80"
                    >
                      <div className="min-w-0">
                        <h2 className="headline mt-3 text-2xl leading-tight text-ink">{section.title}</h2>
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{section.summary}</p>
                        <div className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted font-bold">
                          {index === 0 ? "Latest active simulation" : "Recent simulation thread"}
                        </div>
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-panel px-4 py-2 text-xs font-semibold text-ink soft-border transition-transform group-hover:-translate-y-0.5 uppercase tracking-widest">
                        Open
                      </span>
                    </Link>
                  </Card>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted">No simulations found matching your search.</p>
                </div>
              )}

              {filteredSections.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <button className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-ink soft-border shadow-sm transition-all hover:bg-panelSoft hover:shadow-soft active:scale-95">
                    <span>See more history</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </Surface>
      </div>
    </SiteShell>
  );
}
