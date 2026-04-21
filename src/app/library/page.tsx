import { Filter, FolderOpen, Search } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Card, Pill, SectionHeading, Surface } from "@/components/ui";
import { libraryItems } from "@/lib/site";

export const metadata = { title: "Content Library" };

export default function LibraryPage() {
  return (
    <SiteShell active="library" title="Content Library" subtitle="Manage, filter, and inspect the assets that feed the rest of the product.">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Asset vault"
          title="Library"
          description="A realistic upload library for videos, images, text files, and folders in a clean full-width list view."
          action={
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-panel px-4 py-3 text-sm font-medium soft-border">
                <Filter size={16} />
                Filter
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white">
                <FolderOpen size={16} />
                New folder
              </button>
            </div>
          }
        />

        <Surface className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input
                type="text"
                placeholder="Search library"
                className="w-full rounded-full border border-line bg-white px-12 py-4 text-sm outline-none transition-shadow focus:shadow-soft"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                ["All files", true],
                ["Videos", false],
                ["Images", false],
                ["Text", false],
                ["Folders", false],
              ].map(([label, active]) => (
                <Pill key={label as string} tone={active ? "accent" : "neutral"}>
                  {label as string}
                </Pill>
              ))}
            </div>
          </div>
        </Surface>

        <div className="space-y-3">
          {libraryItems.map((item) => {
            return (
              <Card
                key={item.name}
                className="group w-full overflow-hidden p-0 transition-all duration-300 hover:shadow-lift"
              >
                <div className="flex min-h-[86px] w-full items-center justify-between gap-4 bg-[linear-gradient(135deg,#ffffff,#f4f7ff_50%,#efe7ff)] px-5 py-4">
                  <div className="min-w-0">
                    <p className="headline truncate text-lg sm:text-xl">{item.name}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </SiteShell>
  );
}