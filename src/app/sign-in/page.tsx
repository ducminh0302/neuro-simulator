import Link from "next/link";
import { redirect } from "next/navigation";

import { Pill } from "@/components/ui";

export const metadata = { title: "Sign in" };

export default function SignInPage() {
  async function mockSignIn() {
    "use server";
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto min-h-[calc(100vh-3rem)] max-w-[1920px] overflow-hidden rounded-[2.5rem] border border-line/80 bg-white/65 shadow-soft backdrop-blur-xl">
        <div className="grid min-h-[calc(100vh-3rem)] lg:grid-cols-2">
          <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
            <div className="w-full max-w-lg space-y-10">
              <div className="space-y-4">
                <Pill tone="soft">Welcome back</Pill>
                <h1 className="headline text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">Sign in</h1>
                <p className="text-lg text-muted">Access your neural workspace with the same clean authentication flow.</p>
              </div>

              <form className="space-y-6" action={mockSignIn}>
                {[
                  ["Email address", "john@example.com", "email"],
                  ["Password", "••••••••", "password"],
                ].map(([label, placeholder, type]) => (
                  <label key={label as string} className="block space-y-3">
                    <span className="kicker">{label as string}</span>
                    <div className="flex items-center gap-3 rounded-[1.5rem] border border-line bg-white px-6 py-4 shadow-[0_10px_30px_rgba(32,36,39,0.04)]">
                      <input
                        type={type as string}
                        placeholder={placeholder as string}
                        className="w-full bg-transparent text-base outline-none placeholder:text-muted/70"
                      />
                    </div>
                  </label>
                ))}

                <button
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
                  type="submit"
                >
                  Sign in
                </button>
              </form>

              <p className="text-center text-sm text-muted">
                Do not have an account yet?{" "}
                <Link href="/auth" className="font-semibold text-accent hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </section>

          <section className="hidden items-center justify-center bg-[radial-gradient(circle_at_30%_30%,rgba(79,70,229,0.22),transparent_28%),radial-gradient(circle_at_70%_60%,rgba(229,217,208,0.8),transparent_26%),linear-gradient(135deg,#f5f1ea,#e6e4ff)] p-10 lg:flex">
            <div className="relative flex h-[80%] w-[80%] items-center justify-center rounded-[3rem] border border-white/50 bg-white/15 shadow-lift backdrop-blur-xl">
              <div className="absolute left-8 top-8 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink">Authentication</div>
              <div className="absolute bottom-8 right-8 max-w-sm rounded-[1.5rem] bg-white/80 p-6">
                <div className="flex items-center gap-3">
                  <p className="headline text-lg">Fast and familiar</p>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">A focused sign-in surface that matches your current sign-up page and visual language.</p>
                <div className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent">
                  Secure access
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
