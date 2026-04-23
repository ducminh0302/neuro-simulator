import type { Config } from "tailwindcss";

/**
 * Design tokens follow the Vercel dashboard design system — LIGHT MODE variant.
 * Existing token names (canvas, panel, panelSoft, ink, muted, line, accent,
 * accentSoft, success, danger) are kept so pages and components continue to
 * work, but their values now map to the Vercel light palette.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Backgrounds
        canvas: "#ffffff", // --bg-primary (page background)
        panel: "#fafafa", // --bg-secondary (sidebar, secondary panels)
        panelSoft: "#f5f5f5", // --bg-card (cards / nested)
        hover: "#f4f4f5", // --bg-hover
        active: "#e4e4e7", // --bg-active

        // Text
        ink: "#000000", // --text-primary
        muted: "#666666", // --text-secondary
        mutedSoft: "#999999", // --text-tertiary

        // Borders
        line: "#eaeaea", // --border-default — Vercel's canonical light border
        lineHover: "#d4d4d4", // --border-hover
        lineFocus: "#a1a1a1", // --border-focus

        // Accents — Vercel leans on neutral accents (black) for primary actions in light mode
        accent: "#000000",
        accentSoft: "#f4f4f5", // subtle accent chip background on light
        accentWarm: "#fef3c7",

        // Status
        success: "#0070f3",
        warning: "#f5a623",
        danger: "#e5484d",
        info: "#0070f3",
        purple: "#7928ca",
      },
      boxShadow: {
        // Vercel keeps shadows extremely subtle; mostly borders do the work.
        soft: "0 1px 2px 0 rgba(0, 0, 0, 0.04)",
        lift: "0 0 0 1px rgba(0, 0, 0, 0.06)",
        focus: "0 0 0 2px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        xl2: "0.5rem",
        xl3: "0.75rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.15s ease-out",
        shimmer: "shimmer 1.8s linear infinite",
      },
      fontFamily: {
        body: [
          "var(--font-geist-sans)",
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-geist-sans)",
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      fontSize: {
        // Vercel typography scale
        "2xs": ["11px", { lineHeight: "16px", letterSpacing: "-0.005em" }],
        xs: ["12px", { lineHeight: "16px", letterSpacing: "-0.005em" }],
        sm: ["13px", { lineHeight: "20px", letterSpacing: "-0.01em" }],
        base: ["14px", { lineHeight: "20px", letterSpacing: "-0.01em" }],
        md: ["15px", { lineHeight: "22px", letterSpacing: "-0.011em" }],
        lg: ["16px", { lineHeight: "24px", letterSpacing: "-0.011em" }],
        xl: ["18px", { lineHeight: "26px", letterSpacing: "-0.015em" }],
        "2xl": ["20px", { lineHeight: "28px", letterSpacing: "-0.02em" }],
        "3xl": ["24px", { lineHeight: "32px", letterSpacing: "-0.02em" }],
        "4xl": ["32px", { lineHeight: "40px", letterSpacing: "-0.025em" }],
        "5xl": ["40px", { lineHeight: "48px", letterSpacing: "-0.03em" }],
        "6xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.03em" }],
      },
      transitionTimingFunction: {
        vercel: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
