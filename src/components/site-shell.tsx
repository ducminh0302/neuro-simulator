import Link from "next/link";
import { Menu, Plus } from "lucide-react";
import type { ReactNode } from "react";

import { appName, footerLinks, navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export type ShellProps = {
  active: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  ctaLabel?: string;
};

export function SiteShell({ active, title, subtitle, children, ctaLabel = "New Simulation" }: ShellProps) {
  return (
    <div className="page-shell min-h-screen">
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.06]" />
      <div className="mx-auto flex min-h-screen max-w-[1920px]">
        <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex h-screen w-80 shrink-0 flex-col border-r border-line/80 bg-white/65 backdrop-blur-xl z-40">
          <div className="flex h-full flex-col overflow-y-auto p-6">
            <div className="mb-8 space-y-4 rounded-[2rem] bg-panel p-6 shadow-soft soft-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="headline text-xl">{appName}</p>
                  <p className="kicker mt-1">Neural workspace</p>
                </div>
                <span className="rounded-full bg-accentSoft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Live
                </span>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5">
                <Plus size={16} />
                {ctaLabel}
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const activeMatch = item.href === "/dashboard" ? active === "dashboard" || active === "landing" : active === item.href.slice(1);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300",
                      activeMatch ? "bg-ink text-white shadow-soft" : "text-muted hover:bg-panelSoft hover:text-ink",
                    )}
                  >
                    <Icon size={18} strokeWidth={1.9} />
                    <span className="uppercase tracking-wide">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 space-y-3 border-t border-line pt-6">
              {footerLinks.map((link) => (
                <Link key={link.label} href={link.href} className="block rounded-full px-5 py-2 text-sm text-muted transition-colors hover:text-ink">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col lg:pl-80">
          <header className="sticky top-0 z-30 border-b border-line/70 bg-white/72 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
              <div className="flex items-center gap-3 lg:hidden">
                <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-panel soft-border text-ink shadow-sm">
                  <Menu size={18} />
                </button>
                <div>
                  <p className="headline text-xl">{appName}</p>
                  {title ? <p className="kicker">{title}</p> : null}
                </div>
              </div>
              <div className="hidden lg:block">
                {title ? <p className="kicker">{title}</p> : null}
                {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-full bg-panel px-4 py-2 text-sm font-medium text-ink soft-border transition-transform hover:-translate-y-0.5">Preview</button>
                <button className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                  <Plus size={16} />
                  {ctaLabel}
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            <div className="mx-auto max-w-[1600px]">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}