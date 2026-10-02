/**
 * BASE DE DATOS DE FOTOGRAFÍAS Y ARCHIVO - JavaOnFilm
 * ===================================================
 * Fotografía analógica 35mm personal capturada con Olympus mju I & Kodak Gold 200.
 */

export const FORMAT_OPTIONS = [
  { id: "print-20x30", type: "print", label: "Print Fine Art 20×30", priceCLP: 24000, priceUSD: 25, requiresFrame: false },
  { id: "print-30x45", type: "print", label: "Print Fine Art 30×45", priceCLP: 34000, priceUSD: 36, requiresFrame: false },
  { id: "frame-30x45", type: "frame", label: "Enmarcado 30×45", priceCLP: 52000, priceUSD: 55, requiresFrame: true },
  { id: "frame-40x60", type: "frame", label: "Enmarcado 40×60", priceCLP: 68000, priceUSD: 72, requiresFrame: true },
  { id: "frame-50x75", type: "frame", label: "Enmarcado 50×75", priceCLP: 85000, priceUSD: 90, requiresFrame: true }
];

export const FRAME_OPTIONS = [
  { id: "black", name: "Negro", colorHex: "#111827" },
  { id: "natural-wood", name: "Madera natural", colorHex: "#8B5A2B" },
  { id: "white", name: "Blanco", colorHex: "#FFFFFF" }
];

export const PRODUCTS = [
  {
    id: "arraialdocabo-02",
    archiveCode: "PHOTO 001",
    title: "Arraial do Cabo",
    place: "Arraial do Cabo",
    country: "Brasil",
    location: "Arraial do Cabo, Brasil",
    year: "2025",
    film: "Kodak Gold 200",
    camera: "Olympus mju I",
    orientation: "vertical",
    story: "Capturada bajo la luz natural en las playas de Arraial do Cabo con película Kodak Gold 200. La calma del agua y la calidez del día quedaron registradas exactamente como las viví.",
    image: "/images/ArraialDoCabo.jpeg",
    price: 24000,
    priceUSD: 25
  },
  {
    id: "huentelauquen-04",
    archiveCode: "PHOTO 002",
    title: "Huentelauquen",
    place: "Huentelauquen",
    city: "Coquimbo",
    country: "Chile",
    location: "Coquimbo, Chile",
    year: "2024",
    film: "Kodak Gold 200",
    camera: "Olympus mju I",
    orientation: "horizontal",
    story: "La luz matinal bañando la costa de Coquimbo. Fotografía tomada en ruta durante un viaje por el norte de Chile con película Kodak Gold 200.",
    image: "/images/Huentelauquen.jpeg",
    price: 24000,
    priceUSD: 25
  },
  {
    id: "pandeazucar-06",
    archiveCode: "PHOTO 003",
    title: "Pan de Azúcar",
    place: "Pan de Azúcar",
    city: "Río de Janeiro",
    country: "Brasil",
    location: "Río de Janeiro, Brasil",
    year: "2024",
    film: "Kodak Gold 200",
    camera: "Olympus mju I",
    orientation: "horizontal",
    story: "Vista panorámica hacia los morros y el mar. Fotografía analógica de 35mm seleccionada del archivo personal para llevar a muros y espacios.",
    image: "/images/PandeAzucar.jpeg",
    price: 24000,
    priceUSD: 25
  }
];

export const STORE_CONFIG = {
  storeName: "JavaOnFilm",
  whatsAppNumber: "56968449779", // WhatsApp (+56 9 6844 9779)
  instagramUrl: "https://instagram.com/javaonfilm",
  email: "javaonfilm@gmail.com"
};
