import type { Config } from "tailwindcss"
import { terminalColors } from "./src/lib/tokens"

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
        terminal: terminalColors,
      },
      boxShadow: {
        glow: '0 0 8px var(--t-glow)',
        marker: 'inset 2px 0 0 var(--t-green)',
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
