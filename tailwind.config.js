/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#4967D7',
        'brand-hover': '#3955C4',
        'brand-light': '#EEF2FC',
        'cream': '#FAF8F5',
        'dark': '#0F172A',
        'dark-muted': '#475569'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['Space Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
