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
        'background': '#f8f9fa',
        'foreground': '#212529',
        'primary': '#007bff',
        'card': '#ffffff',
        'muted': '#6c757d',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config