import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#06070C",
          50: "#0B0D14",
          100: "#0F121B",
          200: "#151926",
        },
        aurora: {
          cyan: "#22D3EE",
          teal: "#5EEAD4",
          violet: "#A78BFA",
          magenta: "#E879F9",
          gold: "#F5C76B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "aurora-grad":
          "linear-gradient(120deg, #22D3EE 0%, #A78BFA 45%, #E879F9 100%)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(167,139,250,0.18), transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(167,139,250,0.5)",
        "glow-cyan": "0 0 90px -25px rgba(34,211,238,0.55)",
      },
      keyframes: {
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
