"use client";

import dynamic from "next/dynamic";

export type { BrainViewer3DProps } from "./BrainViewer3D";
export type { BrainThemeKey } from "./themes";

export const BrainViewerLazy = dynamic(
  () => import("./BrainViewer3D").then((m) => ({ default: m.BrainViewer3D })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center rounded-[1.6rem] bg-[#080808]">
        <div className="text-center space-y-3">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Loading neural mesh…</p>
        </div>
      </div>
    ),
  },
);
