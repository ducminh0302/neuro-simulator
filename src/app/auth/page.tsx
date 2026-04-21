import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, Shield, Sparkles } from "lucide-react";

import { Pill } from "@/components/ui";

export const metadata = { title: "Authentication" };

export default function AuthPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto min-h-[calc(100vh-3rem)] max-w-[1920px] overflow-hidden rounded-[2.5rem] border border-line/80 bg-white/65 shadow-soft backdrop-blur-xl">
        <div className="grid min-h-[calc(100vh-3rem)] lg:grid-cols-2">
          <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
            <div className="w-full max-w-lg space-y-10">
              <div className="space-y-4">
                <Pill tone="soft">Secure workspace</Pill>
                <h1 className="headline text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">Create an account</h1>
                <p className="text-lg text-muted">Initialize the neural workspace with a simple, static sign-up screen.</p>
              </div>

              <form className="space-y-6">
                {[
                  ["Full name", "John Doe", Mail],
                  ["Email address", "john@example.com", Mail],
                  ["Password", "••••••••", Shield],
                ].map(([label, placeholder, Icon]) => (
                  <label key={label as string} className="block space-y-3">
                    <span className="kicker">{label as string}</span>
                    <div className="flex items-center gap-3 rounded-[1.5rem] border border-line bg-white px-4 py-4 shadow-[0_10px_30px_rgba(32,36,39,0.04)]">
                      <Icon size={18} className="text-muted" />
                      <input type="text" placeholder={placeholder as string} className="w-full bg-transparent text-base outline-none placeholder:text-muted/70" />
                    </div>
                  </label>
                ))}

                <button className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-0.5" type="button">
                  Initialize account <ArrowRight size={18} />
                </button>
              </form>

              <p className="text-center text-sm text-muted">
                Already have an account? <Link href="/dashboard" className="font-semibold text-accent hover:underline">Open dashboard</Link>
              </p>
            </div>
          </section>

          <section className="hidden items-center justify-center bg-[radial-gradient(circle_at_30%_30%,rgba(79,70,229,0.22),transparent_28%),radial-gradient(circle_at_70%_60%,rgba(229,217,208,0.8),transparent_26%),linear-gradient(135deg,#f5f1ea,#e6e4ff)] p-10 lg:flex">
            <div className="relative flex h-[80%] w-[80%] items-center justify-center rounded-[3rem] border border-white/50 bg-white/15 shadow-lift backdrop-blur-xl">
              <div className="absolute left-8 top-8 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink">Authentication</div>
              <div className="absolute bottom-8 right-8 max-w-sm rounded-[1.5rem] bg-white/80 p-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-accent" size={18} />
                  <p className="headline text-lg">Clean and focused</p>
                </div>
                <p className="mt-3 text-sm text-muted">A simple sign-in surface that matches the rest of the site without introducing visual conflict.</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-ink">
                  <CheckCircle2 size={16} className="text-accent" /> Secure by design
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}