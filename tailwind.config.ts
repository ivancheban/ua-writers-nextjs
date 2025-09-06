import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Translated from your :root variables
        'background': '#FFFFFF',
        'content-bg': '#FFFFFF',
        'text-primary': '#1A202C',
        'text-secondary': '#718096',
        'border-color': '#E2E8F0',
        'accent': '#2D3748',
        'accent-orange': '#DE6209',
      },
      fontFamily: {
        // Ensure Inter font is used
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config