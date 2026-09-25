/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#C85A32',          // Terracota / Naranjo quemado de película
        'brand-hover': '#B24B25',    // Naranjo terracota oscuro
        'brand-light': '#F6EAE1',    // Tono ligero de acento terracota
        'coffee-dark': '#2A1E17',     // Café oscuro / marrón profundo de archivo
        'coffee-deep': '#1F150F',     // Marrón café espresso súper oscuro
        'coffee-medium': '#6E4B37',   // Café medio cuero / madera
        'coffee-light': '#8C664C',    // Café suave
        'terracotta': '#C85A32',      // Naranjo quemado acento
        'terracotta-dark': '#A94824',
        'beige': '#DFCEB5',           // Beige de paspartú / marco
        'beige-light': '#EFE5D5',
        'cream': '#F6F1E7',           // Papel envejecido / fondo principal
        'cream-light': '#FAF6EE',     // Blanco papel fine art
        'warm-white': '#FDFBF7',      // Blanco roto para tarjetas
        'warm-black': '#181411',      // Negro cálido de texto / margen de negativo
        'warm-gray': '#736B63',       // Gris cálido para metadatos
        'warm-border': '#E4DCD0',     // Borde de papel impreso
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
