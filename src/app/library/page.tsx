"use client";

import { useState, useMemo } from "react";

import { SiteShell } from "@/components/site-shell";
import { Card, Pill, SectionHeading, Surface } from "@/components/ui";
import { libraryItems } from "@/lib/site";

const FILTERS = [
  { label: "All files", value: "all" },
  { label: "Videos", value: "Video" },
  { label: "Images", value: "Image" },
  { label: "Text", value: "Text" },
  { label: "Folders", value: "Folder" },
];

export default function LibraryPage() {
  const [items, setItems] = useState(libraryItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newItems = Array.from(files).map((file) => ({
      name: file.name,
      kind: "file" as const,
      type: file.type.includes("image") ? "Image" : file.type.includes("video") ? "Video" : "Text",
      meta: `${(file.size / 1024).toFixed(1)} KB · uploaded just now`,
      accent: "bg-accentSoft text-accent",
    }));

    setItems((prev) => [...newItems, ...prev]);
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "Folder"
          ? item.kind === "folder"
          : item.type === activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [items, searchQuery, activeFilter]);

  return (
    <SiteShell
      active="library"
      title="Content Library"
      subtitle="Manage, filter, and inspect the assets that feed the rest of the product."
    >
      <div className="space-y-8 pb-20">
        <SectionHeading
          eyebrow="Asset vault"
          title="Library"
          description="Manage your social media assets. Drag and drop new creative content or upload performance data directly to the vault."
          action={
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-panel px-6 py-3 text-sm font-medium soft-border hover:bg-panelSoft transition-colors">
                Filter
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lift hover:scale-105 active:scale-95 transition-all">
                New folder
              </button>
            </div>
          }
        />

        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFileUpload(e.dataTransfer.files);
          }}
          className={`group relative flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed p-16 text-center transition-all duration-500 ${
            isDragging 
              ? "border-accent bg-accent/5 scale-[1.01] shadow-soft" 
              : "border-accent/20 bg-gradient-to-b from-white to-accentSoft/20 hover:border-accent/40 hover:bg-accentSoft/30"
          }`}
        >
          <input 
            type="file" 
            multiple 
            className="absolute inset-0 cursor-pointer opacity-0" 
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-soft group-hover:scale-110 transition-transform duration-500">
            <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="headline mt-6 text-2xl text-ink">Drop more content here</p>
          <p className="mt-2 text-base text-muted max-w-sm">
            Or click to browse your agency creatives and campaign data
          </p>
          <div className="mt-8 flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-bold text-white shadow-lift transition-all group-hover:px-10">
            <span>Upload files</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <Surface className="p-5 sm:p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xl">
              <input
                type="text"
                placeholder="Search library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-line bg-white px-6 py-4 text-sm outline-none transition-all focus:border-accent/40 focus:shadow-soft"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-ink transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className="transition-transform active:scale-95"
                >
                  <Pill tone={activeFilter === f.value ? "accent" : "neutral"}>
                    {f.label}
                  </Pill>
                </button>
              ))}
            </div>
          </div>
        </Surface>

        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              return (
                <Card
                  key={item.name}
                  className="group w-full overflow-hidden p-0 border-2 border-transparent transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/20 hover:shadow-lift"
                >
                  <div className="flex min-h-[86px] w-full items-center justify-between gap-4 bg-[linear-gradient(135deg,#ffffff,#f4f7ff_50%,#efe7ff)] px-6 py-4 transition-colors group-hover:bg-[#fbfbff]">
                    <div className="flex min-w-0 items-center gap-5">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.accent} shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:shadow-md text-[10px] font-bold uppercase tracking-tighter text-center leading-none`}
                      >
                        {item.type.slice(0, 3)}
                      </div>
                      <div className="min-w-0">
                        <p className="headline truncate text-lg sm:text-2xl">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-accent px-2 py-0.5 bg-accent/10 rounded">
                            {item.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden shrink-0 items-center gap-3 sm:flex">
                      <button className="rounded-full px-5 py-2.5 text-xs font-bold text-muted transition-all hover:bg-black/5 hover:text-ink uppercase tracking-widest">
                        View
                      </button>
                      <button className="rounded-full bg-accent/10 px-5 py-2.5 text-xs font-bold text-accent transition-all hover:bg-accent hover:text-white hover:shadow-lift uppercase tracking-widest">
                        Inspect
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="headline text-2xl mb-2">No assets found</h3>
              <p className="text-muted max-w-xs mx-auto">
                We couldn&apos;t find any items matching &quot;{searchQuery}&quot; in this
                category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                }}
                className="mt-6 text-accent font-semibold hover:underline uppercase tracking-widest text-xs"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </SiteShell>
  );
}
