"use client";

import {
  AudioLines,
  File,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Folder,
  ImageIcon,
  Search,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Card, Surface } from "@/components/ui";
import type { LibraryItem } from "@/lib/site";

type LibraryFilter = "all" | "videos" | "images" | "text" | "folders";

const FILTERS: Array<{ key: LibraryFilter; label: string }> = [
  { key: "all", label: "All files" },
  { key: "videos", label: "Videos" },
  { key: "images", label: "Images" },
  { key: "text", label: "Text" },
  { key: "folders", label: "Folders" },
];

function getLibraryItemIcon(kind: "file" | "folder", type: string): LucideIcon {
  if (kind === "folder") return Folder;

  const normalizedType = type.toLowerCase();

  if (normalizedType === "text" || normalizedType === "document") return FileText;
  if (normalizedType === "video") return FileVideo;
  if (normalizedType === "image") return ImageIcon;
  if (normalizedType === "audio") return AudioLines;
  if (normalizedType === "spreadsheet") return FileSpreadsheet;
  if (normalizedType === "profile") return UserRound;

  return File;
}

function matchesFilter(item: LibraryItem, filter: LibraryFilter): boolean {
  const normalizedType = item.type.toLowerCase();

  if (filter === "all") return true;
  if (filter === "videos") return normalizedType === "video";
  if (filter === "images") return normalizedType === "image";
  if (filter === "folders") return item.kind === "folder";

  return item.kind === "file" && ["text", "document", "spreadsheet", "profile"].includes(normalizedType);
}

export function LibraryBrowser({ items }: { items: LibraryItem[] }) {
  const [activeFilter, setActiveFilter] = useState<LibraryFilter>("all");
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const byFilter = matchesFilter(item, activeFilter);
      if (!byFilter) return false;

      if (!normalizedQuery) return true;

      return `${item.name} ${item.type}`.toLowerCase().includes(normalizedQuery);
    });
  }, [items, activeFilter, query]);

  return (
    <>
      <Surface className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search library"
              className="w-full rounded-full border border-line bg-white px-12 py-4 text-sm outline-none transition-shadow focus:shadow-soft"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-200 ${
                    isActive
                      ? "bg-accent text-white shadow-[0_8px_18px_-8px_rgba(79,70,229,0.9)]"
                      : "bg-panelSoft text-ink hover:bg-white hover:shadow-soft"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </Surface>

      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="headline text-2xl">No matching assets found</p>
            <p className="mt-2 text-sm text-muted">Try another keyword or switch to a different filter.</p>
          </Card>
        ) : (
          filteredItems.map((item) => {
            const ItemIcon = getLibraryItemIcon(item.kind, item.type);

            return (
              <Card
                key={item.name}
                className="group w-full overflow-hidden border border-transparent p-0 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_18px_38px_-18px_rgba(15,23,42,0.55)]"
              >
                <div className="flex min-h-[86px] w-full items-center justify-between gap-4 bg-[linear-gradient(135deg,#ffffff,#f4f7ff_50%,#efe7ff)] px-5 py-4 transition-all duration-300 group-hover:bg-[linear-gradient(135deg,#ffffff,#edf5ff_48%,#e4dcff)]">
                  <div className="flex min-w-0 items-center gap-4">
                    <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.accent} transition-transform duration-300 group-hover:scale-110`}>
                      <ItemIcon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="headline truncate text-lg sm:text-xl">{item.name}</p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${item.accent} transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm`}>
                      {item.type}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </>
  );
}
