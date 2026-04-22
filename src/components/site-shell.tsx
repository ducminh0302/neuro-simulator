"use client";

import Link from "next/link";
import { type ReactNode, useState, useEffect } from "react";

import { Settings, HelpCircle, PanelLeftOpen, PanelLeftClose } from "lucide-react";

import { appName, navItems, simulationNewPath } from "@/lib/site";
import { cn } from "@/lib/utils";

export type ShellProps = {
  active: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  ctaLabel?: string;
  /** Primary CTA in sidebar + top bar (default: new simulation chat page). */
  ctaHref?: string;
};

export function SiteShell({
  active,
  title,
  subtitle,
  children,
  ctaLabel = "New Simulation",
  ctaHref = simulationNewPath,
}: ShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load persistence state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
    setMounted(true);
  }, []);

  // Wrapper for toggling that also persists the state
  const handleToggle = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  };

  return (
    <div className={cn("page-shell min-h-screen overflow-x-hidden", !mounted && "opacity-0 transition-none")}>
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.06]" />
      <div className="mx-auto flex min-h-screen max-w-[1920px]">
        {/* Toggle button when collapsed - only visible on desktop and when collapsed */}
        {mounted && isCollapsed && (
          <button
            onClick={() => handleToggle(false)}
            className="fixed left-6 top-6 z-50 hidden h-[66px] w-[66px] items-center justify-center rounded-full bg-white/80 text-ink shadow-soft soft-border backdrop-blur-md transition-all duration-300 hover:scale-110 lg:flex"
            aria-label="Expand sidebar"
          >
            <PanelLeftOpen className="h-6 w-6" />
          </button>
        )}

        <aside
          className={cn(
            "hidden lg:fixed lg:left-0 lg:top-0 lg:flex h-screen w-80 shrink-0 flex-col border-r border-line/80 bg-white/65 backdrop-blur-xl z-40 transition-transform duration-500 ease-in-out",
            isCollapsed && "lg:-translate-x-full",
          )}
        >
          <div className="flex h-full flex-col overflow-y-auto p-6">
            <div className="relative mb-8 space-y-4 rounded-[2rem] bg-panel p-6 shadow-soft soft-border">
              <button
                onClick={() => handleToggle(true)}
                className="absolute -right-5 -top-5 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white text-ink shadow-soft border border-line transition-transform duration-300 hover:scale-110 active:scale-95"
                title="Collapse sidebar"
              >
                <PanelLeftClose className="h-5 w-5" />
              </button>
              <div className="flex items-center justify-between">
                <div>
                  <p className="headline text-xl">{appName}</p>
                  <p className="kicker mt-1">Neural workspace</p>
                </div>
              </div>
              <Link
                href={ctaHref}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                {ctaLabel}
              </Link>
            </div>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const activeMatch =
                  item.href === "/dashboard"
                    ? active === "dashboard" || active === "landing"
                    : item.href === "/competitive"
                      ? active === "competitors"
                    : item.href === "/simulate"
                      ? active === "simulate"
                      : active === item.href.slice(1);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300",
                      activeMatch ? "bg-ink text-white shadow-soft" : "text-muted hover:bg-panelSoft hover:text-ink",
                    )}
                  >
                    <span className="uppercase tracking-wide">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-line pt-6 space-y-1">
              <button
                className="flex items-center gap-4 w-full rounded-full px-5 py-3 text-sm font-medium text-muted transition-all duration-300 hover:bg-panelSoft hover:text-ink group"
              >
                <Settings className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
                <span className="uppercase tracking-wide">Settings</span>
              </button>
              
              <button
                className="flex items-center gap-4 w-full rounded-full px-5 py-3 text-sm font-medium text-muted transition-all duration-300 hover:bg-panelSoft hover:text-ink"
              >
                <HelpCircle className="h-5 w-5" />
                <span className="uppercase tracking-wide">Help Center</span>
              </button>
              
              <div className="px-5 py-4 mt-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-tr from-accent to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    N
                  </div>
                  <div className="min-w-0">
                    <p className="headline text-sm truncate">Nexus Digital Agency</p>
                    <p className="text-[11px] text-muted truncate">hello@nexus-digital.agency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col transition-all duration-500 ease-in-out",
            isCollapsed ? "lg:pl-0" : "lg:pl-80",
          )}
        >
          <header className="sticky top-0 z-30 border-b border-line/70 bg-white/72 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
              <div className="flex items-center gap-3 lg:hidden">
                <button className="inline-flex h-11 px-4 items-center justify-center rounded-full bg-panel soft-border text-ink shadow-sm text-[10px] font-bold tracking-widest uppercase">
                  Menu
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
                <Link
                  href={simulationNewPath}
                  className="rounded-full bg-panel px-5 py-2.5 text-sm font-semibold text-ink soft-border transition-all hover:bg-panelSoft hover:-translate-y-0.5 active:scale-95"
                >
                  A/B Compare
                </Link>
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  {ctaLabel}
                </Link>
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