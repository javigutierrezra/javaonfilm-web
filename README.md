# JavaOnFilm — Fine Art 35mm Analog Travel Prints

![JavaOnFilm Logo](https://raw.githubusercontent.com/lucide-react/main/icons/film.svg)

Proyecto web completo y responsive desarrollado para **JavaOnFilm**, marca de cuadros fine art y fotografía análoga en película de 35mm tomada en viajes alrededor del mundo.

---

## 🎨 Identidad de Marca y Estética
- **Nombre de Marca**: JavaOnFilm
- **Color Principal**: `#4967D7` (Azul Eléctrico / Azul Película)
- **Fondo Base**: `#FAF8F5` (Blanco Cálido / Papel Fine Art)
- **Texto Principal**: `#0F172A` (Negro Pizarra)
- **Concepto**: Fotografía de viajes en 35mm, grano analógico, espíritu editorial, galería fine art accesible.

---

## 🚀 Cómo Abrir y Ejecutar el Proyecto en Visual Studio Code

### 1. Abrir en VS Code
1. Abre **Visual Studio Code**.
2. Ve a `Archivo -> Abrir carpeta...` (o `File -> Open Folder...`).
3. Selecciona la carpeta del proyecto:
   `C:\Users\j.gutierrez\.gemini\antigravity\scratch\javaonfilm-web\`

### 2. Instalar Dependencias
Abre la terminal en VS Code (`Ctrl + ~` o `Terminal -> Nueva Terminal`) y ejecuta:

```bash
npm install
```

### 3. Ejecutar en Modo Desarrollo
En la misma terminal, ejecuta:

```bash
npm run dev
```

Abre tu navegador en la URL indicada (por defecto `http://localhost:5173`).

---

## 🖼️ Funcionalidades Principales

1. **Selector Visual Interactivo (EL CUADRO / EN TU ESPACIO)**:
   - **El Cuadro**: Muestra la lámina fotográfica con marco personalizable.
   - **En Tu Espacio**: Monta la fotografía a escala en muros reales de Living, Comedor, Dormitorio y Muro Minimalista.

2. **Personalización en Tiempo Real**:
   - **Marcos Disponibles**: Negro Mate, Madera Natural Roble, Nogal Oscuro, Blanco Galería y Lámina Sola.
   - **Borde Paspartú**: Opción de activar/desactivar el passe-partout blanco de galería.
   - **Medidas**: 30x45 cm, 50x75 cm, 70x100 cm.
   - **Precios en CLP y USD**: Cálculo dinámico en Pesos Chilenos (CLP) y Dólares (USD).

3. **Gestión Centralizada de Cuadros (`src/data/products.js`)**:
   - Agregar o editar fotos, ubicaciones, carretes (Kodak Gold, Portra, CineStill, Fujifilm, Ilford), precios e historias de viajes.

4. **Carro de Compras y Checkout Integrado (`purchaseUrl`)**:
   - Link listo para checkout directo en **Mercado Pago**, **Shopify** o mensaje automático formateado para **WhatsApp**.

---

## 📁 Estructura del Código

```
javaonfilm-web/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles/
│   │   └── index.css
│   ├── data/
│   │   └── products.js         # Base de datos de cuadros y precios
│   ├── components/
│   │   ├── Header.jsx          # Navegación y logo JavaOnFilm
│   │   ├── Footer.jsx          # Pie de página e Instagram
│   │   ├── ProductCard.jsx     # Tarjeta de cuadro para catálogos
│   │   ├── CartDrawer.jsx      # Carrito de compras deslizante
│   │   └── FullPhotoModal.jsx  # Visor HD pantalla completa
│   └── pages/
│       ├── Home.jsx            # Inicio editorial
│       ├── Prints.jsx          # Catálogo con filtros y buscador
│       ├── ProductDetail.jsx   # Visualizador interactivo de cuadros
│       ├── About.jsx           # Historia de JavaOnFilm y cámaras 35mm
│       └── Contact.jsx         # Formulario e Instagram @javaonfilm
```

---

*Desarrollado para JavaOnFilm · 35mm Analog Travel Photography*
