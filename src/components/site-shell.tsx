"use client";

import Link from "next/link";
import { type ReactNode, useState, useEffect } from "react";

import {
  PanelLeftOpen,
  PanelLeftClose,
  LayoutDashboard,
  Swords,
  FlaskConical,
  Plus,
  type LucideIcon,
} from "lucide-react";

import {
  appName,
  navItems,
  simulationNewPath,
  abCompareNewPath,
} from "@/lib/site";
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

/** Icon map for nav items, keyed by href. */
const navIcons: Record<string, LucideIcon> = {
  "/dashboard": LayoutDashboard,
  "/competitive": Swords,
  "/simulate": FlaskConical,
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

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
    setMounted(true);
  }, []);

  const handleToggle = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  };

  return (
    <div
      className={cn(
        "page-shell min-h-screen overflow-x-hidden bg-canvas text-ink",
        !mounted && "opacity-0 transition-none",
      )}
    >
      <div className="mx-auto flex min-h-screen">
        {/* Floating expand button when sidebar is collapsed */}
        {mounted && isCollapsed && (
          <button
            onClick={() => handleToggle(false)}
            className="fixed left-3 top-3 z-50 hidden h-8 w-8 items-center justify-center rounded-md border border-line bg-panel text-muted transition-colors duration-fast hover:border-lineHover hover:text-ink lg:flex"
            aria-label="Expand sidebar"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </button>
        )}

        {/* Sidebar — Vercel style: 240px, subtle secondary bg, 1px right border */}
        <aside
          className={cn(
            "hidden lg:fixed lg:left-0 lg:top-0 lg:flex h-screen w-60 shrink-0 flex-col border-r border-line bg-panel z-40 transition-transform duration-base ease-vercel",
            isCollapsed && "lg:-translate-x-full",
          )}
        >
          {/* Brand + collapse */}
          <div className="flex h-14 items-center justify-between gap-2 border-b border-line px-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-ink">
                <span className="h-2.5 w-2.5 rounded-[1px] bg-canvas" />
              </span>
              <span className="text-sm font-semibold tracking-tight text-ink">
                {appName}
              </span>
            </Link>
            <button
              onClick={() => handleToggle(true)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors duration-fast hover:bg-hover hover:text-ink"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>

          {/* CTA button */}
          <div className="px-3 pt-3">
            <Link
              href={ctaHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-canvas transition-colors duration-fast hover:bg-ink/90"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
              {ctaLabel}
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-2 pb-4 pt-4">
            <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wider text-mutedSoft">
              Workspace
            </p>
            <ul className="space-y-0.5">
              {navItems.map((item) => {
                const activeMatch =
                  item.href === "/dashboard"
                    ? active === "dashboard" || active === "landing"
                    : item.href === "/competitive"
                      ? active === "competitors"
                      : item.href === "/simulate"
                        ? active === "simulate"
                        : active === item.href.slice(1);
                const Icon = navIcons[item.href];
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors duration-fast",
                        activeMatch
                          ? "bg-hover text-ink"
                          : "text-muted hover:bg-hover hover:text-ink",
                      )}
                    >
                      {Icon ? (
                        <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                      ) : null}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer utilities */}
          <div className="border-t border-line px-2 py-3">
            {/* Workspace account card */}
            <div className="mt-3 flex items-center gap-2.5 rounded-md border border-line bg-canvas px-2 py-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-ink text-xs font-semibold text-canvas">
                V
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-ink">
                  Vedant
                </p>
                <p className="truncate text-[11px] text-muted">
                  vedant@simulacrum.world
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col transition-all duration-base ease-vercel",
            isCollapsed ? "lg:pl-0" : "lg:pl-60",
          )}
        >
          {/* Top bar — 56px, 1px border, no shadow */}
          <header className="sticky top-0 z-30 border-b border-line bg-canvas/80 backdrop-blur">
            <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
              {/* Mobile brand */}
              <div className="flex items-center gap-3 lg:hidden">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-ink">
                    <span className="h-2.5 w-2.5 rounded-[1px] bg-canvas" />
                  </span>
                  <span className="text-sm font-semibold tracking-tight text-ink">
                    {appName}
                  </span>
                </Link>
              </div>

              {/* Breadcrumb / title */}
              <div className="hidden min-w-0 flex-1 lg:block">
                {title ? (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted">/</span>
                    <span className="font-medium text-ink">{title}</span>
                    {subtitle ? (
                      <>
                        <span className="text-muted">·</span>
                        <span className="text-muted">{subtitle}</span>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={abCompareNewPath}
                  className="hidden rounded-md border border-line bg-panel px-3 py-1.5 text-sm font-medium text-ink transition-colors duration-fast hover:border-lineHover hover:bg-hover sm:inline-flex"
                >
                  A/B Compare
                </Link>
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-canvas transition-colors duration-fast hover:bg-ink/90"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  <span className="hidden sm:inline">{ctaLabel}</span>
                  <span className="sm:hidden">New</span>
                </Link>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-[1400px]">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
