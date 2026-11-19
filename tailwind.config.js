/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gallery-bg': '#FAF8F5',      // Marfil / Hueso galería
        'gallery-surface': '#F4F0EA', // Superficie de paspartú / piedra clara
        'gallery-card': '#FDFCFA',    // Blanco papel algodón
        'gallery-ink': '#141413',     // Carbón / Tinta principal
        'gallery-muted': '#6E6A63',   // Gris piedra cálido para textos secundarios
        'gallery-subtle': '#9C968E',  // Gris tenue para metadatos técnicos
        'gallery-border': '#E6E1DA',  // Línea divisoria arquitectónica fina
        'gallery-accent': '#8C4A32',  // Terracota oscuro sobrio (uso mínimo)
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['Space Mono', 'monospace'],
        hand: ['Caveat', 'cursive'],
      }
    },
  },
  plugins: [],
}
