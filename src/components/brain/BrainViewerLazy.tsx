"use client";

import dynamic from "next/dynamic";

export const BrainViewerLazy = dynamic(
  () => import("./BrainViewer3D").then((m) => m.BrainViewer3D),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full w-full place-items-center bg-[#080808] text-xs uppercase tracking-[0.2em] text-white/40">
        Loading 3D viewer...
      </div>
    ),
  }
);
