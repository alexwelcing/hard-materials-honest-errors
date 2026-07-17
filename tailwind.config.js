/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Design tokens ("The Reading Room") — RGB triplets, themed via data-theme on <html>.
        paper: "rgb(var(--paper) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--ink-soft) / <alpha-value>)",
        "ink-faint": "rgb(var(--ink-faint) / <alpha-value>)",
        hairline: "rgb(var(--hairline) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-deep": "rgb(var(--accent-deep) / <alpha-value>)",
        verdigris: "rgb(var(--verdigris) / <alpha-value>)",
        "ready-h": "rgb(var(--ready-h) / <alpha-value>)",
        "ready-m": "rgb(var(--ready-m) / <alpha-value>)",
        "ready-l": "rgb(var(--ready-l) / <alpha-value>)",
        "flag-verified": "rgb(var(--flag-verified-bg) / <alpha-value>)",
        "flag-verified-text": "rgb(var(--flag-verified-text) / <alpha-value>)",
        "flag-hedge": "rgb(var(--flag-hedge-bg) / <alpha-value>)",
        "flag-hedge-text": "rgb(var(--flag-hedge-text) / <alpha-value>)",
        // shadcn/ui semantic tokens mapped onto the same palette.
        border: "rgb(var(--hairline) / <alpha-value>)",
        input: "rgb(var(--hairline) / <alpha-value>)",
        ring: "rgb(var(--verdigris) / <alpha-value>)",
        background: "rgb(var(--paper) / <alpha-value>)",
        foreground: "rgb(var(--ink) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--paper) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--faint) / <alpha-value>)",
          foreground: "rgb(var(--ink) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--ready-l) / <alpha-value>)",
          foreground: "rgb(var(--paper) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--faint) / <alpha-value>)",
          foreground: "rgb(var(--ink-soft) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          foreground: "rgb(var(--ink) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          foreground: "rgb(var(--ink) / <alpha-value>)",
        },
        sidebar: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          foreground: "rgb(var(--ink) / <alpha-value>)",
          primary: "rgb(var(--accent) / <alpha-value>)",
          "primary-foreground": "rgb(var(--paper) / <alpha-value>)",
          accent: "rgb(var(--faint) / <alpha-value>)",
          "accent-foreground": "rgb(var(--ink) / <alpha-value>)",
          border: "rgb(var(--hairline) / <alpha-value>)",
          ring: "rgb(var(--verdigris) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        serif: ["Newsreader", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      maxWidth: {
        measure: "70ch",
        "measure-narrow": "60ch",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
