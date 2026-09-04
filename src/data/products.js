/**
 * BASE DE DATOS DE CUADROS Y FOTOGRAFÍAS ANÁLOGAS - JavaOnFilm
 * =============================================================
 * Todos los cuadros se gestionan desde este único archivo.
 * Puedes editar precios, historias, ubicaciones, películas y fotos.
 */

export const PRODUCTS = [
  {
    id: "rio-01",
    title: "Rio",
    location: "Rio de Janeiro, Brasil",
    year: "2025",
    film: "Kodak Gold 200",
    camera: "Olympus µ[mju:] I",
    orientation: "horizontal",
    category: "coastal",
    story: "Tomada durante una tarde dorada caminando hacia los acantilados de Uluwatu. El mar rompía abajo con fuerza y la luz filtrada por la mítica lente fija f/3.5 de la Olympus mju I le dio esa calidez analógica auténtica.",
    image: "/images/Rio.jpeg",
  

    sizes: [
      { id: "30x45", label: "30 x 45 cm", priceCLP: 45000, priceUSD: 48 },
      { id: "50x75", label: "50 x 75 cm", priceCLP: 65000, priceUSD: 70 },
      { id: "70x100", label: "70 x 100 cm", priceCLP: 89000, priceUSD: 95 }
    ],
    price: 45000,
    priceUSD: 48,
    purchaseUrl: "https://mpago.la/link-uluwatu"
  },
  {
    id: "arraialdocabo-02",
    title: "Playa",
    location: "Arraial Do Cabo, Brasil",
    year: "2025",
    film: "CineStill 800T",
    camera: "Olympus µ[mju:] I",
    orientation: "vertical",
    category: "street",
    story: "Capturada de noche bajo los neones de Shinjuku justo después de una lluvia ligera con mi Olympus mju I compacta. La emulsión de CineStill 800T creó ese halo cinematográfico inolvidable.",
    image: "images/ArraialDoCabo.jpeg",

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
    id: "ilhagrande-03",
    title: "Isla Grande",
    location: "Rio de Janeiro, Brasil",
    year: "2025",
    film: "Kodak Portra 400",
    camera: "Olympus µ[mju:] I",
    orientation: "vertical",
    category: "street",
    story: "Persiguiendo la luz de mediodía filtrándose por los muros amarillos del centro histórico de Oaxaca. La agilidad del diseño cápsula de la Olympus mju I permitió congelar el segundo exacto.",
    image: "/images/IlhaGrande.jpeg",

    sizes: [
      { id: "30x45", label: "30 x 45 cm", priceCLP: 48000, priceUSD: 51 },
      { id: "50x75", label: "50 x 75 cm", priceCLP: 68000, priceUSD: 73 },
      { id: "70x100", label: "70 x 100 cm", priceCLP: 92000, priceUSD: 99 }
    ],
    price: 48000,
    priceUSD: 51,
    purchaseUrl: "https://mpago.la/link-oaxaca"
  },
  {
    id: "huentelauquen-04",
    title: "Huentelauquen",
    location: "Coquimbo, Chile",
    year: "2024",
    film: "Fujifilm Pro 400H",
    camera: "Olympus µ[mju:] I",
    orientation: "horizontal",
    category: "city",
    story: "La luz suave de las 7:00 AM bañando los azulejos de Alfama. Grabado en mi Olympus mju I con película Fujifilm para conservar los tonos pastel tan distintivos de Portugal.",
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
    id: "lapeña-05",
    title: "La Peña",
    location: "Valparaíso, Chile",
    year: "2023",
    film: "Ilford HP5 Plus 400",
    camera: "Olympus µ[mju:] I",
    orientation: "vertical",
    category: "street",
    story: "Un café matutino bajo la lluvia en Saint-Germain-des-Prés. Blanco y negro analógico en estado puro capturado con la Olympus mju I en grano Ilford HP5.",
    image: "LaPeña.jpeg",

    sizes: [
      { id: "30x45", label: "30 x 45 cm", priceCLP: 46000, priceUSD: 49 },
      { id: "50x75", label: "50 x 75 cm", priceCLP: 66000, priceUSD: 71 },
      { id: "70x100", label: "70 x 100 cm", priceCLP: 90000, priceUSD: 96 }
    ],
    price: 46000,
    priceUSD: 49,
    purchaseUrl: "https://mpago.la/link-paris"
  },
  {
    id: "pandeazucar-06",
    title: "Pan De Azucar",
    location: "Pan de Azucar, Brasil",
    year: "2024",
    film: "Kodak Ektachrome E100",
    camera: "Olympus µ[mju:] I",
    orientation: "horizontal",
    category: "coastal",
    story: "Mirando hacia el Mar Tirreno tras recorrer el Sendero de los Dioses. La nitidez de la lente 35mm f/3.5 de Olympus resalta la inmensidad del horizonte mediterráneo.",
    image: "/images/PandeAzucar.jpeg",

    sizes: [
      { id: "30x45", label: "30 x 45 cm", priceCLP: 56000, priceUSD: 59 },
      { id: "50x75", label: "50 x 75 cm", priceCLP: 78000, priceUSD: 83 },
      { id: "70x100", label: "70 x 100 cm", priceCLP: 105000, priceUSD: 112 }
    ],
    price: 56000,
    priceUSD: 59,
    purchaseUrl: "https://mpago.la/link-positano"
  },
  {
    id: "atacama-07",
    title: "Dunas del Valle de la Luna",
    location: "Atacama, Chile",
    year: "2024",
    film: "Kodak Portra 160",
    camera: "Olympus µ[mju:] I",
    orientation: "horizontal",
    category: "nature",
    story: "El desierto de Atacama al atardecer. La textura fina de la arena y los degradados violeta sobre el volcán Licancabur capturados con la Olympus mju I en Kodak Portra 160.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",

    sizes: [
      { id: "30x45", label: "30 x 45 cm", priceCLP: 49000, priceUSD: 52 },
      { id: "50x75", label: "50 x 75 cm", priceCLP: 69000, priceUSD: 74 },
      { id: "70x100", label: "70 x 100 cm", priceCLP: 94000, priceUSD: 100 }
    ],
    price: 49000,
    priceUSD: 52,
    purchaseUrl: "https://mpago.la/link-atacama"
  },
  {
    id: "kyoto-08",
    title: "Arashiyama Bamboo",
    location: "Kioto, Japón",
    year: "2023",
    film: "Fujifilm Velvia 50",
    camera: "Olympus µ[mju:] I",
    orientation: "vertical",
    category: "nature",
    story: "Caminando al amanecer en el bosque de bambú de Arashiyama. La luz filtrada dio tonos esmeralda saturados gracias a la mítica película Fujifilm Velvia 50 y el lente sharp de la Olympus mju I.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop",

    sizes: [
      { id: "30x45", label: "30 x 45 cm", priceCLP: 51000, priceUSD: 54 },
      { id: "50x75", label: "50 x 75 cm", priceCLP: 71000, priceUSD: 76 },
      { id: "70x100", label: "70 x 100 cm", priceCLP: 96000, priceUSD: 103 }
    ],
    price: 51000,
    priceUSD: 54,
    purchaseUrl: "https://mpago.la/link-kyoto"
  }
];

export const FRAME_OPTIONS = [
  { id: "black", name: "Marco Negro Mate", colorHex: "#111827", borderCss: "border-[16px] border-slate-900 shadow-2xl", priceAddCLP: 15000, priceAddUSD: 16 },
  { id: "oak", name: "Madera Natural Roble", colorHex: "#8B5A2B", borderCss: "border-[16px] border-[#8B5A2B] shadow-2xl", priceAddCLP: 18000, priceAddUSD: 19 },
  { id: "walnut", name: "Nogal Oscuro", colorHex: "#3A2012", borderCss: "border-[16px] border-[#3A2012] shadow-2xl", priceAddCLP: 20000, priceAddUSD: 21 },
  { id: "white", name: "Blanco Galería", colorHex: "#F3F4F6", borderCss: "border-[16px] border-slate-100 shadow-2xl", priceAddCLP: 14000, priceAddUSD: 15 },
  { id: "none", name: "Lámina Solo (Sin Marco)", colorHex: "transparent", borderCss: "border-0 shadow-lg", priceAddCLP: 0, priceAddUSD: 0 }
];
