"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUp, Paperclip } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Card, Pill, SectionHeading, Surface } from "@/components/ui";
import { simulationIndexPath, simulationNewPath } from "@/lib/site";

const SUGGESTIONS = [
  "Test this reel on Instagram Reels, $20K, 2 weeks",
  "TikTok campaign for Gen Z, $50K budget",
  "Run across all channels with $100K",
  "Compare Instagram Feed vs Reels for this image",
] as const;

type Props = {
  ctaLabel?: string;
};

export function SimulationNewLanding({ ctaLabel = "New Simulation" }: Props) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const q = value.trim();
    if (!q) return;
    router.push(`${simulationIndexPath}${q ? `?prompt=${encodeURIComponent(q)}` : ""}`);
  };

  const onComposerKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <SiteShell
      active="simulate"
      title="Simulate"
      subtitle="Describe a campaign. Attach creative. The planner will figure out the rest."
      ctaLabel={ctaLabel}
      ctaHref={simulationNewPath}
    >
      <div className="space-y-8 pb-10">
        <SectionHeading
          eyebrow="Simulation composer"
          title={<>What do you want to test?</>}
          description="Describe your campaign. Attach creative. The planner will figure out the rest."
        />

        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => setValue(s)} className="transition-transform active:scale-95">
                <Pill tone="neutral">{s}</Pill>
              </button>
            ))}
          </div>
        </div>

        <Surface className="mx-auto max-w-4xl p-5 shadow-soft sm:p-8">
          <p className="kicker">Prompt</p>
          <form
            className="mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <input ref={fileInputRef} type="file" className="sr-only" multiple aria-label="Attach files" />
            <Card className="p-0">
              <div className="flex items-end gap-2 p-2 pl-3 sm:gap-3 sm:p-3 sm:pl-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-panelSoft hover:text-ink"
                  aria-label="Attach files"
                >
                  <Paperclip className="h-5 w-5" strokeWidth={1.75} />
                </button>
                <textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onComposerKeyDown}
                  placeholder="Describe your campaign..."
                  rows={2}
                  className="max-h-48 min-h-[3rem] w-full flex-1 resize-y bg-transparent py-2 text-sm text-ink outline-none placeholder:text-muted sm:text-base"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-40"
                  aria-label="Run simulation"
                  disabled={!value.trim()}
                >
                  <ArrowUp className="h-5 w-5" strokeWidth={2.2} />
                </button>
              </div>
            </Card>
            <p className="mt-3 text-left">
              <Link
                href={simulationIndexPath}
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                Past simulations
              </Link>
            </p>
          </form>
        </Surface>
      </div>
    </SiteShell>
  );
}
