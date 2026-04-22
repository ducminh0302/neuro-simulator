"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, ArrowUp, Paperclip } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { simulationIndexPath, simulationNewPath } from "@/lib/site";

const HERO_TAGS = [
  "Backed by Afore Capital",
  "KPMG",
  "Leap Year",
  "AI-powered user research",
  "Feedback in 10 minutes",
  "Ship with confidence",
] as const;

const PROBLEM_CARDS = [
  {
    num: "01",
    title: "Research takes weeks you don't have.",
    text: "By the time discovery, interviews, and synthesis are done, the sprint is over.",
    bars: [
      { label: "Discovery", value: 90 },
      { label: "Research", value: 75 },
      { label: "Interviews", value: 85 },
      { label: "Synthesis", value: 50 },
    ],
  },
  {
    num: "02",
    title: "Feedback arrives after you've shipped.",
    text: "User data shows up in Week 3+. The feature is already live. The damage is done.",
    timeline: true,
  },
  {
    num: "03",
    title: "Assumptions get baked in, never tested.",
    text: "Do users want this? Is onboarding clear? Why do they churn? Questions pile up.",
    tags: [
      "Do users want this??",
      "Is onboarding clear??",
      "Why do they churn??",
      "Will they find the CTA??",
      "Is pricing right??",
    ],
  },
] as const;

type Props = {
  ctaLabel?: string;
};

export function SimulationNewLanding({ ctaLabel = "New Simulation" }: Props) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [tab, setTab] = useState<"browser" | "terminal" | "mcp">("browser");
  const [typed, setTyped] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const typedTarget = "Why are users dropping off at checkout?";

  const repeatedTicker = useMemo(() => [...HERO_TAGS, ...HERO_TAGS], []);

  const submit = () => {
    const q = value.trim();
    if (!q) return;
    router.push(`${simulationIndexPath}${q ? `?prompt=${encodeURIComponent(q)}` : ""}`);
  };

  const onComposerKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cursor = 0;
    let mounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const loop = () => {
      if (!mounted) return;
      if (cursor <= typedTarget.length) {
        setTyped(typedTarget.slice(0, cursor));
        cursor += 1;
        timeoutId = setTimeout(loop, 45 + Math.random() * 35);
        return;
      }
      timeoutId = setTimeout(() => {
        cursor = 0;
        loop();
      }, 1800);
    };
    loop();
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <SiteShell
      active="simulate"
      title="Simulate"
      subtitle="Describe a campaign. Attach creative. The planner will figure out the rest."
      ctaLabel={ctaLabel}
      ctaHref={simulationNewPath}
    >
      <div className="landing-shell pb-14">
        <nav className={`landing-nav ${scrolled ? "is-scrolled" : ""}`}>
          <div className="landing-nav-bg" />
          <div className="landing-nav-inner">
            <a href="#hero" className="landing-logo">
              <span className="landing-logo-dot" />
              NeuroPredict
            </a>
            <div className="landing-nav-links">
              <a href="#how">Features</a>
              <a href="#pricing">Pricing</a>
              <Link href={simulationIndexPath}>History</Link>
            </div>
            <div className="landing-nav-actions">
              <button type="button" className="nav-btn nav-btn-outline" onClick={() => router.push(simulationIndexPath)}>
                Simulation Log
              </button>
              <button type="button" className="nav-btn nav-btn-fill" onClick={() => router.push(simulationNewPath)}>
                New
              </button>
            </div>
          </div>
        </nav>

        <div className="landing-ticker">
          <div className="landing-ticker-track">
            {repeatedTicker.map((item, idx) => (
              <span key={`${item}-${idx}`}>{item}</span>
            ))}
          </div>
        </div>

        <section ref={heroRef} className="landing-hero" id="hero">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="hero-pill">Announcing major backing & product acceleration</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12 }}
          >
            Understand your users <em>before</em> you ship features
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
          >
            NeuroPredict deploys AI personas that navigate your product like real users, surfacing friction,
            drop-offs, and insights.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
          >
            <button type="button" className="hero-btn hero-btn-dark" onClick={() => router.push(simulationNewPath)}>
              Start simulation
            </button>
            <button type="button" className="hero-btn hero-btn-light" onClick={() => router.push(simulationIndexPath)}>
              View past runs
            </button>
          </motion.div>
        </section>

        <div className="landing-section">
          <RevealSection>
            <p className="section-label">The problem</p>
            <h2 className="section-title">Most features ship to users you&apos;ve never met</h2>
          </RevealSection>
          <div className="problem-grid">
            {PROBLEM_CARDS.map((card, idx) => (
              <RevealSection key={card.num} delay={idx * 0.1}>
                <article className="problem-card">
                  <span className="problem-num">{card.num} —</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  {"bars" in card && card.bars && (
                    <div className="mini-surface">
                      {card.bars.map((bar) => (
                        <div key={bar.label} className="bar-row">
                          <span>{bar.label}</span>
                          <div className="bar-track">
                            <motion.div
                              className="bar-fill"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true, amount: 0.6 }}
                              transition={{ duration: 0.85, ease: "easeOut" }}
                              style={{ width: `${bar.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {"timeline" in card && card.timeline && (
                    <div className="mini-surface timeline-card">
                      <div className="timeline-row"><span>You ship</span><strong>Week 1</strong></div>
                      <div className="timeline-line">
                        <span />
                        <span />
                      </div>
                      <div className="timeline-row"><span>User data</span><strong>Week 3+</strong></div>
                      <em>Too late...</em>
                    </div>
                  )}
                  {"tags" in card && card.tags && (
                    <div className="mini-surface tags-wrap">
                      {card.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </article>
              </RevealSection>
            ))}
          </div>
        </div>

        <div className="landing-section" id="how">
          <RevealSection>
            <p className="section-label">How it works</p>
            <h2 className="section-title center">Feedback in 10 minutes</h2>
          </RevealSection>
          <div className="steps-grid">
            <RevealSection>
              <article className="step-card">
                <span className="step-kicker">01 / Ask</span>
                <div className="step-demo">
                  <p>Research prompt</p>
                  <div className="type-demo">
                    <span>{typed}</span>
                    <i />
                  </div>
                </div>
                <h3>Ask a question</h3>
                <p>Type what you want to understand. Attach screenshot or URL context.</p>
              </article>
            </RevealSection>
            <RevealSection delay={0.1}>
              <article className="step-card">
                <span className="step-kicker">02 / Simulate</span>
                <div className="step-demo">
                  <p>Deploying swarm</p>
                  <div className="avatar-row">
                    <span>AM</span><span>SL</span><span>JK</span><span>PR</span>
                  </div>
                </div>
                <h3>Activate user movement</h3>
                <p>AI personas navigate your product independently and capture interactions.</p>
              </article>
            </RevealSection>
            <RevealSection delay={0.2}>
              <article className="step-card">
                <span className="step-kicker">03 / Decide</span>
                <div className="step-demo">
                  <p className="answer-box">Users drop due to form complexity and unclear CTA.</p>
                </div>
                <h3>Get clear answers</h3>
                <p>See exactly where users struggled and what to fix before shipping.</p>
              </article>
            </RevealSection>
          </div>
        </div>

        <div className="landing-section">
          <RevealSection>
            <div className="integration-head">
              <div>
                <p className="section-label">One tool, everywhere</p>
                <h2 className="section-title">Available where you work</h2>
              </div>
              <div className="tab-switch">
                <button className={tab === "browser" ? "active" : ""} onClick={() => setTab("browser")}>Browser</button>
                <button className={tab === "terminal" ? "active" : ""} onClick={() => setTab("terminal")}>Terminal</button>
                <button className={tab === "mcp" ? "active" : ""} onClick={() => setTab("mcp")}>MCP</button>
              </div>
            </div>
          </RevealSection>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="integration-panel"
            >
              {tab === "browser" && (
                <>
                  <div>
                    <h3>Use it in the browser</h3>
                    <p>Log in, paste a URL or screenshot, ask a question. Results in minutes.</p>
                    <button type="button" className="hero-btn hero-btn-dark" onClick={() => router.push(simulationNewPath)}>
                      Try for free
                    </button>
                  </div>
                  <div className="terminal-card light">
                    <p>What do you want to understand?</p>
                    <div className="chip-row">
                      <span>Test signup flow</span><span>Can users find search?</span>
                    </div>
                  </div>
                </>
              )}
              {tab === "terminal" && (
                <>
                  <div>
                    <h3>Run it from your terminal</h3>
                    <p>Two commands to your first test. Pipe results into CI quality gates.</p>
                    <button type="button" className="hero-btn hero-btn-dark">CLI docs</button>
                  </div>
                  <div className="terminal-card">
                    <pre>$ npm i -g @neuropredict/cli{"\n"}$ neuropredict run --url app.example.com{"\n"}→ 3 personas deployed{"\n"}✓ 2 issues found</pre>
                  </div>
                </>
              )}
              {tab === "mcp" && (
                <>
                  <div>
                    <h3>Wire it as MCP server</h3>
                    <p>Use inside Cursor/Codex with findings surfaced directly in your coding flow.</p>
                    <button type="button" className="hero-btn hero-btn-dark">Setup guide</button>
                  </div>
                  <div className="terminal-card">
                    <pre>swarm.run_test(url){"\n"}deploying 3 personas...{"\n"}swarm.get_findings(){"\n"}→ pushed to backlog</pre>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="landing-section" id="pricing">
          <RevealSection>
            <p className="section-label center">Pricing</p>
            <h2 className="section-title center">Scale with confidence</h2>
          </RevealSection>
          <div className="pricing-grid">
            {[
              { tier: "Free", price: "$0", features: ["5 runs", "5 agents/run", "Basic reporting"] },
              { tier: "Pro", price: "$50", features: ["50 runs/mo", "15 agents/run", "Auth testing"], featured: true },
              { tier: "Business", price: "$350", features: ["200 runs/mo", "20 agents/run", "Priority support"] },
              { tier: "Enterprise", price: "Custom", features: ["Unlimited", "SSO/SLA", "Dedicated manager"] },
            ].map((plan, idx) => (
              <RevealSection key={plan.tier} delay={idx * 0.08}>
                <article className={`price-card ${plan.featured ? "featured" : ""}`}>
                  {plan.featured && <span className="popular-badge">Most popular</span>}
                  <p className="tier">{plan.tier}</p>
                  <h3>{plan.price}</h3>
                  <ul>
                    {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                  <button type="button">{plan.featured ? "Start pro" : "Get started"}</button>
                </article>
              </RevealSection>
            ))}
          </div>
        </div>

        <section className="landing-cta">
          <h2>Ship with <em>confidence</em>, not guesswork.</h2>
          <div className="hero-actions">
            <button type="button" className="hero-btn hero-btn-dark" onClick={() => router.push(simulationNewPath)}>
              Start simulation
            </button>
            <button type="button" className="hero-btn hero-btn-light" onClick={() => router.push(simulationIndexPath)}>
              See simulations <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="landing-composer">
          <p className="section-label">Simulation composer</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <input ref={fileInputRef} type="file" className="sr-only" multiple aria-label="Attach files" />
            <div className="composer-card">
              <button type="button" className="attach-btn" onClick={() => fileInputRef.current?.click()} aria-label="Attach files">
                <Paperclip className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onComposerKeyDown}
                placeholder="Describe your campaign..."
                rows={2}
                autoComplete="off"
              />
              <button type="submit" className="send-btn" disabled={!value.trim()} aria-label="Run simulation">
                <ArrowUp className="h-5 w-5" strokeWidth={2.2} />
              </button>
            </div>
            <Link href={simulationIndexPath} className="composer-link">
              Past simulations
            </Link>
          </form>
        </section>
      </div>

      <style jsx>{`
        .landing-shell { color: #0a0a0a; }
        .landing-nav { position: sticky; top: 0; z-index: 40; height: 58px; display: flex; align-items: center; justify-content: center; }
        .landing-nav-bg { position: absolute; inset: 0; background: rgba(255,255,255,0.86); backdrop-filter: blur(14px); border-bottom: 1px solid #e7e7e7; opacity: 0; transition: opacity .3s ease; }
        .landing-nav.is-scrolled .landing-nav-bg { opacity: 1; }
        .landing-nav-inner { width: min(1200px, 95%); position: relative; z-index: 1; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
        .landing-logo { display: flex; gap: 8px; align-items: center; text-decoration: none; font-weight: 600; color: #111; font-size: 14px; }
        .landing-logo-dot { width: 9px; height: 9px; border-radius: 999px; background: #111; box-shadow: 12px 0 0 #111, 0 12px 0 #111, 12px 12px 0 #111; }
        .landing-nav-links { display: flex; align-items: center; gap: 20px; font-size: 13px; }
        .landing-nav-links a { color: #666; text-decoration: none; transition: color .2s ease; }
        .landing-nav-links a:hover { color: #111; }
        .landing-nav-actions { display: flex; gap: 8px; }
        .nav-btn { border-radius: 999px; padding: 6px 14px; font-size: 12px; font-weight: 500; }
        .nav-btn-outline { border: 1px solid #d4d4d4; background: transparent; }
        .nav-btn-fill { border: 1px solid #111; background: #111; color: white; }
        .landing-ticker { margin: 4px 0 0; background: #111; color: #fff; overflow: hidden; height: 36px; display: flex; align-items: center; }
        .landing-ticker-track { display: flex; align-items: center; white-space: nowrap; animation: ticker 20s linear infinite; }
        .landing-ticker-track span { font-size: 11px; opacity: .8; letter-spacing: .06em; text-transform: uppercase; padding: 0 26px; }
        .landing-ticker-track span::before { content: "◆ "; opacity: .45; }

        .landing-hero { min-height: 74vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 72px 20px 20px; }
        .hero-pill { display: inline-block; border: 1px solid #d6d6d6; border-radius: 999px; color: #666; padding: 6px 14px; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
        .hero-title { margin: 24px 0 14px; font-size: clamp(46px, 8vw, 96px); line-height: 1.02; letter-spacing: -.03em; max-width: 980px; font-family: "Times New Roman", serif; }
        .hero-title em { color: #9d9d9d; font-style: italic; }
        .hero-subtitle { max-width: 620px; color: #666; line-height: 1.75; font-size: 17px; }
        .hero-actions { margin-top: 32px; display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; align-items: center; }
        .hero-btn { border-radius: 999px; padding: 12px 22px; font-size: 14px; font-weight: 500; border: 1px solid transparent; display: inline-flex; align-items: center; gap: 8px; transition: transform .2s ease, box-shadow .2s ease, background .2s ease; }
        .hero-btn:hover { transform: translateY(-2px); }
        .hero-btn-dark { background: #111; color: #fff; border-color: #111; box-shadow: 0 8px 24px rgba(0,0,0,.12); }
        .hero-btn-light { background: #fff; color: #111; border-color: #d2d2d2; }

        .landing-section { width: min(1240px, 95%); margin: 0 auto; padding: 92px 0 0; }
        .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: .15em; color: #949494; font-weight: 700; margin-bottom: 14px; }
        .section-title { font-size: clamp(34px, 5vw, 68px); line-height: 1.06; letter-spacing: -.02em; font-family: "Times New Roman", serif; }
        .center { text-align: center; }

        .problem-grid { margin-top: 46px; display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 12px; }
        .problem-card { background: #fff; border: 1px solid #e7e7e7; border-radius: 16px; padding: 28px; min-height: 290px; }
        .problem-card h3 { font-size: 20px; line-height: 1.3; margin-bottom: 8px; }
        .problem-card p { color: #666; line-height: 1.7; font-size: 14px; margin-bottom: 14px; }
        .problem-num { font-size: 11px; color: #9d9d9d; letter-spacing: .08em; text-transform: uppercase; display: inline-block; margin-bottom: 12px; }
        .mini-surface { background: #f8f8f8; border: 1px solid #ebebeb; border-radius: 10px; padding: 10px; }
        .bar-row { display: grid; grid-template-columns: 68px 1fr; gap: 8px; align-items: center; margin-bottom: 8px; }
        .bar-row span { color: #888; font-size: 11px; font-family: monospace; }
        .bar-track { height: 5px; border-radius: 999px; background: #dbdbdb; overflow: hidden; }
        .bar-fill { transform-origin: left center; height: 100%; background: #111; border-radius: inherit; }
        .timeline-card { font-size: 12px; }
        .timeline-row { display: flex; align-items: center; justify-content: space-between; color: #666; margin-bottom: 6px; }
        .timeline-row strong { font-size: 11px; color: #9a9a9a; font-family: monospace; }
        .timeline-line { height: 2px; background: #d8d8d8; border-radius: 999px; position: relative; margin: 8px 0 10px; }
        .timeline-line span { position: absolute; width: 8px; height: 8px; border-radius: 999px; top: -3px; background: #111; }
        .timeline-line span:last-child { left: 85%; background: #bfbfbf; }
        .timeline-line span:first-child { left: 12%; }
        .timeline-card em { color: #d12f2f; font-size: 11px; font-weight: 600; font-style: normal; }
        .tags-wrap { display: flex; flex-wrap: wrap; gap: 6px; }
        .tags-wrap span { font-size: 11px; background: #fff; border: 1px solid #e2e2e2; color: #666; border-radius: 999px; padding: 4px 9px; }

        .steps-grid { margin-top: 44px; display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 16px; }
        .step-card { border: 1px solid #e7e7e7; border-radius: 16px; padding: 24px; background: #fff; min-height: 298px; }
        .step-kicker { display: inline-block; margin-bottom: 12px; font-size: 11px; color: #8f8f8f; letter-spacing: .08em; text-transform: uppercase; font-family: monospace; }
        .step-demo { border: 1px solid #ececec; background: #f7f7f7; border-radius: 10px; padding: 12px; margin-bottom: 14px; min-height: 95px; }
        .step-demo p { font-size: 12px; color: #6a6a6a; margin-bottom: 8px; }
        .type-demo { background: #fff; border: 1px solid #e6e6e6; border-radius: 9px; padding: 8px 10px; display: flex; align-items: center; gap: 4px; font-size: 12px; color: #444; }
        .type-demo i { width: 1px; height: 12px; background: #111; animation: blink 1.1s step-end infinite; }
        .avatar-row { display: flex; gap: 8px; }
        .avatar-row span { width: 33px; height: 33px; border-radius: 999px; display: grid; place-items: center; color: white; background: #111; font-size: 10px; font-weight: 700; animation: popIn .55s ease forwards; transform: scale(.7); opacity: 0; }
        .avatar-row span:nth-child(2) { animation-delay: .1s; background: #343434; }
        .avatar-row span:nth-child(3) { animation-delay: .2s; background: #555; }
        .avatar-row span:nth-child(4) { animation-delay: .3s; background: #777; }
        .answer-box { margin: 0; color: #454545; }
        .step-card h3 { font-size: 20px; margin-bottom: 8px; }
        .step-card > p { font-size: 14px; color: #676767; line-height: 1.7; }

        .integration-head { display: flex; align-items: end; justify-content: space-between; gap: 16px; }
        .tab-switch { border: 1px solid #e5e5e5; border-radius: 999px; padding: 3px; display: flex; gap: 3px; }
        .tab-switch button { border: none; border-radius: 999px; background: transparent; font-size: 13px; color: #666; padding: 8px 16px; }
        .tab-switch button.active { background: #111; color: #fff; }
        .integration-panel { margin-top: 26px; border: 1px solid #e8e8e8; border-radius: 18px; background: #fff; padding: 24px; display: grid; grid-template-columns: 1fr 1.2fr; gap: 24px; align-items: center; }
        .integration-panel h3 { font-size: 34px; line-height: 1.12; margin-bottom: 10px; font-family: "Times New Roman", serif; }
        .integration-panel p { color: #666; line-height: 1.75; margin-bottom: 18px; }
        .terminal-card { border-radius: 12px; background: #0d0d0d; color: #d3d3d3; padding: 18px; border: 1px solid #222; }
        .terminal-card pre { margin: 0; white-space: pre-wrap; font-family: ui-monospace, monospace; font-size: 12px; line-height: 1.85; }
        .terminal-card.light { background: #f8f8f8; color: #444; border-color: #e6e6e6; }
        .chip-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .chip-row span { background: #fff; border: 1px solid #e6e6e6; border-radius: 999px; font-size: 12px; padding: 5px 10px; }

        .pricing-grid { margin-top: 42px; display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 12px; }
        .price-card { position: relative; border: 1px solid #e3e3e3; border-radius: 18px; background: #fff; padding: 24px; transition: transform .2s ease, box-shadow .2s ease; }
        .price-card:hover { transform: translateY(-4px); box-shadow: 0 16px 34px rgba(0,0,0,.08); }
        .price-card.featured { background: #111; color: #fff; border-color: #111; }
        .popular-badge { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #fff; color: #111; border-radius: 999px; font-size: 10px; padding: 3px 10px; font-weight: 700; }
        .price-card .tier { font-size: 12px; letter-spacing: .09em; text-transform: uppercase; color: #8c8c8c; margin-bottom: 8px; }
        .price-card h3 { font-size: 38px; line-height: 1; margin-bottom: 14px; font-family: "Times New Roman", serif; }
        .price-card ul { list-style: none; margin: 0 0 18px; padding: 0; }
        .price-card li { border-bottom: 1px solid rgba(0,0,0,.06); padding: 7px 0; font-size: 13px; color: #626262; }
        .price-card.featured li { color: #cccccc; border-bottom-color: rgba(255,255,255,.1); }
        .price-card button { width: 100%; border-radius: 999px; border: 1px solid #d5d5d5; padding: 10px; font-size: 13px; background: transparent; }
        .price-card.featured button { background: #fff; color: #111; border-color: #fff; }

        .landing-cta { width: min(1200px, 95%); margin: 0 auto; padding: 100px 0 30px; text-align: center; }
        .landing-cta h2 { font-size: clamp(46px,7vw,92px); line-height: 1.04; letter-spacing: -.02em; font-family: "Times New Roman", serif; }
        .landing-cta em { font-style: italic; color: #9a9a9a; }

        .landing-composer { width: min(980px, 95%); margin: 18px auto 0; border: 1px solid #e8e8e8; background: rgba(255,255,255,.85); backdrop-filter: blur(10px); border-radius: 18px; padding: 18px; }
        .composer-card { display: flex; align-items: end; gap: 10px; border: 1px solid #e8e8e8; border-radius: 12px; padding: 8px; background: #fff; }
        .attach-btn,.send-btn { width: 42px; height: 42px; border-radius: 999px; display: grid; place-items: center; border: none; }
        .attach-btn { color: #707070; background: transparent; }
        .send-btn { color: #fff; background: #111; }
        .send-btn:disabled { opacity: .4; }
        .composer-card textarea { resize: none; min-height: 44px; max-height: 180px; border: none; outline: none; width: 100%; padding: 8px 4px; font-size: 14px; color: #202020; }
        .composer-link { display: inline-block; margin-top: 12px; text-decoration: none; color: #777; font-size: 13px; font-weight: 500; }
        .composer-link:hover { color: #111; }

        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes popIn { to { transform: scale(1); opacity: 1; } }

        @media (max-width: 1024px) {
          .problem-grid, .steps-grid { grid-template-columns: 1fr; }
          .integration-panel { grid-template-columns: 1fr; }
          .pricing-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 760px) {
          .landing-nav-links { display: none; }
          .pricing-grid { grid-template-columns: 1fr; }
          .integration-head { flex-direction: column; align-items: flex-start; }
          .hero-title { font-size: 48px; }
        }
      `}</style>
    </SiteShell>
  );
}

function RevealSection({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.72, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
