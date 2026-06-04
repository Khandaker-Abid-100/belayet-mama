import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans:    ['Inter', 'sans-serif'],
      },
      colors: {
        gold:  { DEFAULT: '#7C5C10', light: '#A87D28', bg: '#FAF5EB' },
        brand: { text: '#18181A', muted: '#6A6A66', soft: '#ADADAB', border: '#E5E2D9', off: '#F9F8F5' },
      },
    },
  },
  plugins: [],
}
export default config
