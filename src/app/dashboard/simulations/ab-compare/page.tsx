"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ChevronDown, ChevronUp, Play, Plus, X } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Card, SectionHeading, Surface } from "@/components/ui";
import { abCompareResultsPath, simulationIndexPath } from "@/lib/site";
import { cn } from "@/lib/utils";

type Creative = {
  id: string;
  label: string;
  score: number;
  gradient: string;
};

type Variant = {
  id: string;
  name: string;
  expanded: boolean;
  selected: string[];
};

const CREATIVES: Creative[] = [
  { id: "c-01", label: "Portrait A", score: 53, gradient: "linear-gradient(135deg,#d4d4d8,#a1a1aa)" },
  { id: "c-02", label: "Serum bottle", score: 52, gradient: "linear-gradient(135deg,#e6e0cf,#b8a37a)" },
  { id: "c-03", label: "Glasses smile", score: 59, gradient: "linear-gradient(135deg,#c2b39d,#7c6a54)" },
  { id: "c-04", label: "Glass skin", score: 51, gradient: "linear-gradient(135deg,#cfc9bd,#8d8575)" },
  { id: "c-05", label: "Gloss close-up", score: 52, gradient: "linear-gradient(135deg,#f2ccc1,#c98f7e)" },
  { id: "c-06", label: "Lip product", score: 54, gradient: "linear-gradient(135deg,#efe0d5,#b58972)" },
  { id: "c-07", label: "Profile shot", score: 53, gradient: "linear-gradient(135deg,#d8cfc2,#8f7c67)" },
  { id: "c-08", label: "Duo tone", score: 47, gradient: "linear-gradient(135deg,#cfb8a8,#7a5c48)" },
  { id: "c-09", label: "Tube stack", score: 31, gradient: "linear-gradient(135deg,#d3ddd4,#789084)" },
  { id: "c-10", label: "Gradient tube", score: 31, gradient: "linear-gradient(135deg,#cfe0d1,#6f8e79)" },
  { id: "c-11", label: "Minimal tube", score: 31, gradient: "linear-gradient(135deg,#d6e0d6,#8ca48f)" },
  { id: "c-12", label: "Foundation", score: 46, gradient: "linear-gradient(135deg,#e5d6c6,#a4866b)" },
  { id: "c-13", label: "Kit overhead", score: 46, gradient: "linear-gradient(135deg,#9aa6ae,#4d5a66)" },
  { id: "c-14", label: "Treatment", score: 47, gradient: "linear-gradient(135deg,#e6dbc9,#b59875)" },
  { id: "c-15", label: "Dashboard", score: 40, gradient: "linear-gradient(135deg,#c8cdd5,#5a6574)" },
  { id: "c-16", label: "Vertical tube", score: 32, gradient: "linear-gradient(135deg,#d4dfd4,#758f7b)" },
  { id: "c-17", label: "Sale banner", score: 54, gradient: "linear-gradient(135deg,#e85c4b,#7a1d12)" },
  { id: "c-18", label: "Flatlay kit", score: 36, gradient: "linear-gradient(135deg,#f4e5d1,#c89f74)" },
  { id: "c-19", label: "Beach sunset", score: 37, gradient: "linear-gradient(135deg,#ffd8a8,#ff6b6b)" },
];

const BUDGET_PRESETS = [
  { label: "10.0K", value: 10_000 },
  { label: "50.0K", value: 50_000 },
  { label: "100.0K", value: 100_000 },
];

const CHANNEL_OPTIONS = [
  "instagram reels",
  "instagram feed",
  "facebook feed",
  "tiktok",
  "youtube",
  "youtube shorts",
  "google search",
  "google display",
];

const VARIANT_LETTERS = ["A", "B", "C", "D", "E", "F"];

function freshVariant(index: number): Variant {
  return {
    id: `v-${Date.now()}-${index}`,
    name: `Variant ${VARIANT_LETTERS[index] ?? index + 1}`,
    expanded: false,
    selected: [],
  };
}

export default function AbComparePage() {
  const router = useRouter();

  const [variants, setVariants] = useState<Variant[]>([freshVariant(0), freshVariant(1)]);
  const [budget, setBudget] = useState<number>(30_000);
  const [channels, setChannels] = useState<string[]>(["instagram feed", "tiktok"]);

  const toggleChannel = (channel: string) => {
    setChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel],
    );
  };

  const toggleVariantExpanded = (id: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, expanded: !v.expanded } : v)),
    );
  };

  const toggleCreative = (variantId: string, creativeId: string) => {
    setVariants((prev) =>
      prev.map((v) => {
        if (v.id !== variantId) return v;
        const already = v.selected.includes(creativeId);
        return {
          ...v,
          selected: already
            ? v.selected.filter((c) => c !== creativeId)
            : [...v.selected, creativeId],
        };
      }),
    );
  };

  const renameVariant = (id: string, name: string) => {
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, name } : v)));
  };

  const addVariant = () => {
    if (variants.length >= VARIANT_LETTERS.length) return;
    setVariants((prev) => [...prev, freshVariant(prev.length)]);
  };

  const removeVariant = (id: string) => {
    setVariants((prev) => (prev.length <= 2 ? prev : prev.filter((v) => v.id !== id)));
  };

  const canRun = useMemo(
    () =>
      variants.every((v) => v.selected.length > 0) &&
      channels.length > 0 &&
      budget > 0,
    [variants, channels, budget],
  );

  const handleRun = () => {
    if (!canRun) return;
    const params = new URLSearchParams({
      budget: String(budget),
      channels: channels.join(","),
      variants: variants
        .map((v) => `${encodeURIComponent(v.name)}:${v.selected.join("|")}`)
        .join(","),
    });
    router.push(`${abCompareResultsPath}?${params.toString()}`);
  };

  return (
    <SiteShell
      active="simulate"
      title="A/B Comparison"
      subtitle="Head-to-head creative test"
      ctaLabel="Run comparison"
    >
      <div className="mx-auto max-w-5xl space-y-8 pb-10">
        <div className="space-y-3">
          <Link
            href={simulationIndexPath}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Simulations
          </Link>
          <SectionHeading
            eyebrow="A/B testing"
            title={<>A/B Comparison</>}
            description="Test creative variants head-to-head with the same audience and budget."
          />
        </div>

        <div className="space-y-4">
          {variants.map((variant) => (
            <VariantCard
              key={variant.id}
              variant={variant}
              canRemove={variants.length > 2}
              onToggleExpanded={() => toggleVariantExpanded(variant.id)}
              onToggleCreative={(cid) => toggleCreative(variant.id, cid)}
              onRename={(name) => renameVariant(variant.id, name)}
              onRemove={() => removeVariant(variant.id)}
            />
          ))}

          <button
            type="button"
            onClick={addVariant}
            disabled={variants.length >= VARIANT_LETTERS.length}
            className="flex w-full items-center justify-center gap-2 rounded-[2.5rem] border border-dashed border-line bg-panelSoft/40 py-4 text-sm font-medium text-muted transition-all hover:border-ink/30 hover:bg-panelSoft disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Add variant
          </button>
        </div>

        <Surface className="space-y-6 p-6 sm:p-8">
          <div className="space-y-3">
            <p className="kicker">Budget</p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-lg text-muted">$</span>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value) || 0)}
                  className="headline w-[12ch] bg-transparent text-3xl font-bold text-ink outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                {BUDGET_PRESETS.map((preset) => {
                  const active = budget === preset.value;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setBudget(preset.value)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                        active
                          ? "bg-ink text-white"
                          : "bg-panelSoft text-muted hover:text-ink",
                      )}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="kicker">Channels</p>
            <div className="flex flex-wrap gap-2">
              {CHANNEL_OPTIONS.map((channel) => {
                const active = channels.includes(channel);
                return (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => toggleChannel(channel)}
                    className={cn(
                      "rounded-full px-4 py-2 text-xs font-medium transition-all",
                      active
                        ? "bg-ink text-white"
                        : "bg-panelSoft text-muted hover:text-ink",
                    )}
                  >
                    {channel}
                  </button>
                );
              })}
            </div>
          </div>
        </Surface>

        <div className="flex flex-col-reverse items-stretch justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href={simulationIndexPath}
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleRun}
            disabled={!canRun}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all",
              canRun
                ? "bg-ink text-white hover:-translate-y-0.5"
                : "cursor-not-allowed bg-panelSoft text-muted",
            )}
          >
            <Play className="h-4 w-4" />
            Run comparison
          </button>
        </div>
      </div>
    </SiteShell>
  );
}

function VariantCard({
  variant,
  canRemove,
  onToggleExpanded,
  onToggleCreative,
  onRename,
  onRemove,
}: {
  variant: Variant;
  canRemove: boolean;
  onToggleExpanded: () => void;
  onToggleCreative: (creativeId: string) => void;
  onRename: (name: string) => void;
  onRemove: () => void;
}) {
  const selectedCount = variant.selected.length;

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <input
            value={variant.name}
            onChange={(e) => onRename(e.target.value)}
            className="w-full bg-transparent text-base font-semibold text-ink outline-none focus:outline-none"
          />
          <p className="mt-1 text-xs text-muted">
            {selectedCount === 0
              ? "0 creative selected"
              : `${selectedCount} creative${selectedCount === 1 ? "" : "s"} selected`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {canRemove ? (
            <button
              type="button"
              onClick={onRemove}
              className="rounded-full p-2 text-muted transition-colors hover:bg-panelSoft hover:text-ink"
              aria-label="Remove variant"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onToggleExpanded}
            className="rounded-full p-2 text-muted transition-colors hover:bg-panelSoft hover:text-ink"
            aria-label={variant.expanded ? "Collapse" : "Expand"}
          >
            {variant.expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {variant.expanded ? (
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {CREATIVES.map((creative) => {
            const selected = variant.selected.includes(creative.id);
            return (
              <button
                key={creative.id}
                type="button"
                onClick={() => onToggleCreative(creative.id)}
                className={cn(
                  "group relative aspect-[4/3] overflow-hidden rounded-xl border transition-all",
                  selected
                    ? "border-ink shadow-soft"
                    : "border-line opacity-60 hover:opacity-100",
                )}
                style={{ background: creative.gradient }}
                aria-pressed={selected}
                aria-label={creative.label}
              >
                <span className="absolute right-1.5 bottom-1.5 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {creative.score}
                </span>
                {selected ? (
                  <span className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white">
                    <Check className="h-3 w-3" />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </Card>
  );
}
