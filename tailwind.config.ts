import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: "#f4f4f1",
        panel: "#ffffff",
        panelSoft: "#eceee9",
        ink: "#202427",
        muted: "#646d72",
        line: "#d5dad7",
        accent: "#4f46e5",
        accentSoft: "#e6e4ff",
        accentWarm: "#e5d9d0",
        success: "#0f766e",
        danger: "#b4232a",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(32, 36, 39, 0.08)",
        lift: "0 28px 80px rgba(32, 36, 39, 0.14)",
      },
      borderRadius: {
        xl2: "1.75rem",
        xl3: "2.5rem",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(16px, -10px, 0) scale(1.04)" },
        },
      },
      animation: {
        floaty: "floaty 8s ease-in-out infinite",
        drift: "drift 12s ease-in-out infinite",
      },
      fontFamily: {
        body: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;