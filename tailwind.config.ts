import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      colors: {
        terminal: {
          green: 'var(--t-green)',
          dim: 'var(--t-dim)',
          cyan: 'var(--t-cyan)',
          amber: 'var(--t-amber)',
          red: 'var(--t-red)',
          bg: 'var(--t-bg)',
          'bg-light': 'var(--t-bg-light)',
          border: 'var(--t-border)',
        },
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
