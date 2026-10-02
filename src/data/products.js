/**
 * BASE DE DATOS DE CUADROS Y FOTOGRAFÍAS ANÁLOGAS - JavaOnFilm
 * =============================================================
 * Todos los cuadros se gestionan desde este único archivo.
 * Puedes editar precios, historias, ubicaciones, películas y fotos.
 */

export const PRODUCTS = [
  {
    id: "arraialdocabo-02",
    archiveCode: "PHOTO 001",
    title: "Playa",
    location: "Arraial Do Cabo, Brasil",
    year: "2025",
    film: "Kodak Gold 200",
    camera: "Olympus mju",
    orientation: "vertical",
    category: "street",
    story: "Capturada bajo la luz natural con mi cámara Olympus mju compacta y película Kodak Gold 200 de 35mm. La emulsión de Kodak Gold 200 entregó tonos cálidos e inolvidables.",
    image: "/images/ArraialDoCabo.jpeg",

    sizes: [
      { id: "30x45", label: "30 x 45 cm", priceCLP: 52000, priceUSD: 55 },
      { id: "50x75", label: "50 x 75 cm", priceCLP: 72000, priceUSD: 78 },
      { id: "70x100", label: "70 x 100 cm", priceCLP: 98000, priceUSD: 105 }
    ],
    price: 52000,
    priceUSD: 55,
    purchaseUrl: "https://mpago.la/link-shinjuku"
  },
  {
    id: "huentelauquen-04",
    archiveCode: "PHOTO 003",
    title: "Huentelauquen",
    location: "Coquimbo, Chile",
    year: "2024",
    film: "Kodak Gold 200",
    camera: "Olympus mju",
    orientation: "horizontal",
    category: "city",
    story: "La luz suave de las 7:00 AM bañando la costa de Coquimbo. Grabado en mi cámara Olympus mju con película Kodak Gold 200 para conservar tonos cálidos y orgánicos.",
    image: "/images/Huentelauquen.jpeg",

    sizes: [
      { id: "30x45", label: "30 x 45 cm", priceCLP: 42000, priceUSD: 45 },
      { id: "50x75", label: "50 x 75 cm", priceCLP: 62000, priceUSD: 66 },
      { id: "70x100", label: "70 x 100 cm", priceCLP: 85000, priceUSD: 91 }
    ],
    price: 42000,
    priceUSD: 45,
    purchaseUrl: "https://mpago.la/link-lisbon"
  },

  {
    id: "pandeazucar-06",
    archiveCode: "PHOTO 004",
    title: "Pan De Azucar",
    location: "Pan de Azucar, Brasil",
    year: "2024",
    film: "Kodak Gold 200",
    camera: "Olympus mju",
    orientation: "horizontal",
    category: "coastal",
    story: "Mirando hacia el horizonte tras recorrer los miradores. La nitidez de la óptica 35mm f/3.5 de la Olympus mju combinada con Kodak Gold 200 resalta los matices del paisaje.",
    image: "/images/PandeAzucar.jpeg",

    sizes: [
      { id: "30x45", label: "30 x 45 cm", priceCLP: 56000, priceUSD: 59 },
      { id: "50x75", label: "50 x 75 cm", priceCLP: 78000, priceUSD: 83 },
      { id: "70x100", label: "70 x 100 cm", priceCLP: 105000, priceUSD: 112 }
    ],
    price: 56000,
    priceUSD: 59,
    purchaseUrl: "https://mpago.la/link-positano"
  }
];

/**
 * CONFIGURACIÓN DE LA TIENDA & WHATSAPP
 */
export const STORE_CONFIG = {
  storeName: "JavaOnFilm",
  whatsAppNumber: "56968449779", // Número oficial de WhatsApp de JavaOnFilm (+56 9 6844 9779)
  instagramUrl: "https://instagram.com/javaonfilm",
  email: "javaonfilm@gmail.com"
};

export const FRAME_OPTIONS = [
  { id: "black", name: "Marco Negro Mate", colorHex: "#111827", borderCss: "border-[16px] border-slate-900 shadow-2xl", priceAddCLP: 15000, priceAddUSD: 16 },
  { id: "oak", name: "Madera Natural Roble", colorHex: "#8B5A2B", borderCss: "border-[16px] border-[#8B5A2B] shadow-2xl", priceAddCLP: 18000, priceAddUSD: 19 },
  { id: "walnut", name: "Nogal Oscuro", colorHex: "#3A2012", borderCss: "border-[16px] border-[#3A2012] shadow-2xl", priceAddCLP: 20000, priceAddUSD: 21 },
  { id: "white", name: "Blanco Galería", colorHex: "#F3F4F6", borderCss: "border-[16px] border-slate-100 shadow-2xl", priceAddCLP: 14000, priceAddUSD: 15 },
  { id: "none", name: "Lámina Solo (Sin Marco)", colorHex: "transparent", borderCss: "border-0 shadow-lg", priceAddCLP: 0, priceAddUSD: 0 }
];
