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
          green: '#00ff41',
          dim: '#00aa2a',
          cyan: '#00d4ff',
          amber: '#ffb000',
          red: '#ff3333',
          bg: '#0a0a0a',
          'bg-light': '#111111',
          border: '#00ff4130',
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
