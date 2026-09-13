/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "rgb(var(--bg) / <alpha-value>)",
          card: "rgb(var(--bg-card) / <alpha-value>)",
          muted: "rgb(var(--bg-muted) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--bg) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
        },
        parchment: {
          DEFAULT: "rgb(var(--text) / <alpha-value>)",
          50: "rgb(var(--text-50) / <alpha-value>)",
          100: "rgb(var(--text-100) / <alpha-value>)",
          200: "rgb(var(--text-200) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--primary-400) / <alpha-value>)",
          50: "rgb(var(--primary-50) / <alpha-value>)",
          300: "rgb(var(--primary-300) / <alpha-value>)",
          400: "rgb(var(--primary-400) / <alpha-value>)",
          500: "rgb(var(--primary-500) / <alpha-value>)",
          600: "rgb(var(--primary-600) / <alpha-value>)",
          700: "rgb(var(--primary-700) / <alpha-value>)",
        },
        marigold: {
          DEFAULT: "rgb(var(--primary-400) / <alpha-value>)",
          50: "rgb(var(--primary-50) / <alpha-value>)",
          400: "rgb(var(--primary-300) / <alpha-value>)",
          500: "rgb(var(--primary-400) / <alpha-value>)",
          600: "rgb(var(--primary-500) / <alpha-value>)",
          700: "rgb(var(--primary-600) / <alpha-value>)",
        },
        teal: {
          DEFAULT: "rgb(var(--primary-600) / <alpha-value>)",
          400: "rgb(var(--primary-500) / <alpha-value>)",
          500: "rgb(var(--primary-600) / <alpha-value>)",
          600: "rgb(var(--primary-700) / <alpha-value>)",
        },
        muted: {
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        header: {
          bg: "rgb(var(--header-bg) / <alpha-value>)",
          text: "rgb(var(--header-text) / <alpha-value>)",
          muted: "rgb(var(--header-text-muted) / <alpha-value>)",
          border: "rgb(var(--header-border) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        black: ["Archivo Black", "Space Grotesk", "system-ui", "sans-serif"],
        body: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        fadeUpBlur: {
          "0%": { opacity: "0", transform: "translateY(20px)", filter: "blur(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(20px, -24px) scale(1.06)" },
        },
      },
      animation: {
        rise: "riseIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s linear infinite",
        "fade-up-blur": "fadeUpBlur 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float-slow": "floatSlow 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
