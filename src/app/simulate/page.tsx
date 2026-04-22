import Link from "next/link";

import { SiteShell } from "@/components/site-shell";
import { Card, Pill, SectionHeading, Surface } from "@/components/ui";
import { simulationNewPath, simulationSections } from "@/lib/site";

export const metadata = {
  title: "Simulations",
};

export default function SimulateIndexPage() {
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
              <Link
                href={simulationNewPath}
                className="flex items-center gap-3 rounded-[1.2rem] border border-line bg-panelSoft px-4 py-3 transition-colors hover:bg-white"
              >
                <span className="w-full bg-transparent text-sm text-muted px-2 text-left">Type your simulation prompt here…</span>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5">
                  Send
                </span>
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <p className="kicker">Chat history</p>
                <span className="text-xs uppercase tracking-[0.18em] text-muted">Most recent first</span>
              </div>

              {simulationSections.map((section, index) => (
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
              ))}
            </div>
          </div>
        </Surface>
      </div>
    </SiteShell>
  );
}
