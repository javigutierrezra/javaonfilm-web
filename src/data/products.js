/**
 * BASE DE DATOS DE FOTOGRAFÍAS Y ARCHIVO - JavaOnFilm
 * ===================================================
 * Archivo fotográfico 35mm: Viajes & Mundo Ecuestre.
 * Capturado con Olympus mju I & Kodak Gold 200.
 */

export const FORMAT_OPTIONS = [
  { id: "print-20x30", type: "print", label: "Print Fine Art 20×30", priceCLP: 24000, priceUSD: 25, requiresFrame: false },
  { id: "print-30x45", type: "print", label: "Print Fine Art 30×45", priceCLP: 34000, priceUSD: 36, requiresFrame: false },
  { id: "frame-30x45", type: "frame", label: "Enmarcado 30×45", priceCLP: 52000, priceUSD: 55, requiresFrame: true },
  { id: "frame-40x60", type: "frame", label: "Enmarcado 40×60", priceCLP: 68000, priceUSD: 72, requiresFrame: true },
  { id: "frame-50x75", type: "frame", label: "Enmarcado 50×75", priceCLP: 85000, priceUSD: 90, requiresFrame: true }
];

export const FRAME_OPTIONS = [
  { id: "black", name: "Negro", colorHex: "#141413" },
  { id: "natural-wood", name: "Madera natural", colorHex: "#7D5A3F" },
  { id: "white", name: "Blanco", colorHex: "#FFFFFF" }
];

export const SERIES_CATEGORIES = [
  { id: "all", label: "Todo el Archivo" },
  { id: "viajes", label: "Viajes" },
  { id: "ecuestre", label: "Ecuestre & Caballos" }
];

export const PRODUCTS = [
  {
    id: "arraialdocabo-02",
    archiveCode: "35MM · 001",
    frameNumber: "14A",
    series: "viajes",
    seriesLabel: "Serie Viajes",
    title: "Arraial do Cabo",
    place: "Arraial do Cabo",
    country: "Brasil",
    location: "Arraial do Cabo, Brasil",
    year: "2025",
    film: "Kodak Gold 200",
    camera: "Olympus mju I",
    orientation: "vertical",
    caption: "Luz matinal y quietud sobre la costa atlántica.",
    story: "Capturada bajo luz natural en las playas de Arraial do Cabo con película Kodak Gold 200. La serenidad del agua y los tonos cálidos de la mañana quedaron registrados en un único disparo de 35mm.",
    image: "/images/ArraialDoCabo.jpeg",
    price: 24000,
    priceUSD: 25
  },
  {
    id: "pandeazucar-06",
    archiveCode: "35MM · 002",
    frameNumber: "21A",
    series: "viajes",
    seriesLabel: "Serie Viajes",
    title: "Pan de Azúcar",
    place: "Pan de Azúcar",
    city: "Río de Janeiro",
    country: "Brasil",
    location: "Río de Janeiro, Brasil",
    year: "2024",
    film: "Kodak Gold 200",
    camera: "Olympus mju I",
    orientation: "horizontal",
    caption: "Silueta de los morros frente a la bahía al caer la tarde.",
    story: "Perspectiva abierta hacia los morros y el mar en Río de Janeiro. Fotografía analógica de 35mm seleccionada del archivo para llevar la profundidad y calidez del grano químico a muros y espacios.",
    image: "/images/PandeAzucar.jpeg",
    price: 24000,
    priceUSD: 25
  },
  {
    id: "cisnes-04",
    archiveCode: "35MM · 003",
    frameNumber: "33A",
    series: "viajes",
    seriesLabel: "Serie Naturaleza & Viajes",
    title: "Cisnes",
    place: "Jardín Botánico",
    country: "Chile",
    location: "Jardín Botánico, Chile",
    year: "2024",
    film: "Kodak Gold 200",
    camera: "Olympus mju I",
    orientation: "horizontal",
    caption: "Movimiento silencioso sobre el espejo de agua.",
    story: "Cisnes navegando en aguas calmas bajo la sombra de los árboles. Una composición de ritmo pausado en 35mm pensada para aportar equilibrio y sobriedad a cualquier ambiente.",
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
