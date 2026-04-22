import Link from "next/link";

import { appName, navItems, simulationNewPath } from "@/lib/site";

export const metadata = {
  title: "Landing Page",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1920px] flex-col overflow-hidden rounded-[2.5rem] border border-line/80 bg-white/60 shadow-soft backdrop-blur-xl">
        <header className="flex items-center justify-between px-6 py-5 sm:px-8">
          <Link href="/" className="headline text-2xl tracking-tight">
            {appName}
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-muted transition-colors hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth" className="rounded-full px-5 py-2 text-sm font-medium text-muted transition-colors hover:text-ink">
              Login
            </Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
              Get started
            </Link>
          </div>
        </header>

        <section className="relative flex flex-1 items-center px-6 pb-10 pt-6 sm:px-8 lg:px-12">
          <div className="absolute right-[-8%] top-[-12%] h-[42vw] w-[42vw] rounded-full bg-accentSoft blur-3xl animate-drift" />
          <div className="absolute left-[-10%] bottom-[-20%] h-[32vw] w-[32vw] rounded-full bg-accentWarm blur-3xl animate-floaty" />

          <div className="relative z-10 max-w-4xl space-y-8">
            <div className="space-y-6">
              <h1 className="headline max-w-5xl text-6xl leading-[0.88] tracking-[-0.05em] sm:text-7xl lg:text-[7.5rem]">
                Predict how the world will respond.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                A cohesive static experience built from the supplied HTML screens, reorganized into a real Next.js site with one shared visual system and soft route motion.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/dashboard" className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-0.5">
                Open Dashboard
              </Link>
              <Link href={simulationNewPath} className="inline-flex items-center justify-center gap-3 rounded-full border border-line bg-white/80 px-8 py-4 text-base font-semibold text-ink transition-colors hover:bg-panelSoft">
                Explore Simulation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}