import { Filter, FolderOpen } from "lucide-react";

import { LibraryBrowser } from "@/components/library/library-browser";
import { SiteShell } from "@/components/site-shell";
import { SectionHeading } from "@/components/ui";
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

        <LibraryBrowser items={libraryItems} />
      </div>
    </SiteShell>
  );
}