/**
 * BASE DE DATOS DE FOTOGRAFÍAS Y ARCHIVO - JavaOnFilm
 * ===================================================
 * Archivo fotográfico 35mm: Viajes y Caballos.
 * Capturado con Olympus mju I & Kodak Gold 200.
 */

export const FORMAT_OPTIONS = [
  { id: "print-20x30", type: "print", label: "Print 20×30 cm", priceCLP: 24000, priceUSD: 25, requiresFrame: false },
  { id: "print-30x45", type: "print", label: "Print 30×45 cm", priceCLP: 34000, priceUSD: 36, requiresFrame: false },
  { id: "frame-30x45", type: "frame", label: "Enmarcado 30×45 cm", priceCLP: 52000, priceUSD: 55, requiresFrame: true },
  { id: "frame-40x60", type: "frame", label: "Enmarcado 40×60 cm", priceCLP: 68000, priceUSD: 72, requiresFrame: true },
  { id: "frame-50x75", type: "frame", label: "Enmarcado 50×75 cm", priceCLP: 85000, priceUSD: 90, requiresFrame: true }
];

export const FRAME_OPTIONS = [
  { id: "black", name: "Negro", colorHex: "#141413" },
  { id: "natural-wood", name: "Madera", colorHex: "#7D5A3F" },
  { id: "white", name: "Blanco", colorHex: "#FFFFFF" }
];

export const SERIES_CATEGORIES = [
  { id: "all", label: "Todo" },
  { id: "viajes", label: "Viajes" },
  { id: "caballos", label: "Caballos" }
];

export const PRODUCTS = [
  {
    id: "arraialdocabo-02",
    archiveCode: "001",
    series: "viajes",
    seriesLabel: "Viajes",
    title: "Arraial do Cabo",
    place: "Arraial do Cabo",
    country: "Brasil",
    location: "Arraial do Cabo, Brasil",
    year: "2025",
    film: "Kodak Gold 200",
    camera: "Olympus mju I",
    orientation: "vertical",
    story: "Arraial do Cabo, Brasil. Capturada en 35mm con Kodak Gold 200.",
    image: "/images/ArraialDoCabo.jpeg",
    price: 24000,
    priceUSD: 25
  },
  {
    id: "pandeazucar-06",
    archiveCode: "002",
    series: "viajes",
    seriesLabel: "Viajes",
    title: "Pan de Azúcar",
    place: "Pan de Azúcar",
    city: "Río de Janeiro",
    country: "Brasil",
    location: "Río de Janeiro, Brasil",
    year: "2024",
    film: "Kodak Gold 200",
    camera: "Olympus mju I",
    orientation: "vertical",
    story: "Río de Janeiro, Brasil. Capturada en 35mm con Kodak Gold 200.",
    image: "/images/PandeAzucar.jpeg",
    price: 24000,
    priceUSD: 25
  },
  {
    id: "cisnes-04",
    archiveCode: "003",
    series: "viajes",
    seriesLabel: "Viajes",
    title: "Cisnes",
    place: "Jardín Botánico",
    country: "Chile",
    location: "Jardín Botánico, Chile",
    year: "2024",
    film: "Kodak Gold 200",
    camera: "Olympus mju I",
    orientation: "horizontal",
    story: "Jardín Botánico, Chile. Capturada en 35mm con Kodak Gold 200.",
    image: "/images/Cisnes.jpeg",
    price: 24000,
    priceUSD: 25
  }
];

export const STORE_CONFIG = {
  storeName: "JavaOnFilm",
  whatsAppNumber: "56968449779",
  instagramUrl: "https://instagram.com/javaonfilm",
  email: "javaonfilm@gmail.com"
};
