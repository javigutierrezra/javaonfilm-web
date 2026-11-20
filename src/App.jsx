import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search]);

  return null;
}

// Layout & Global Components
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FullPhotoModal from './components/FullPhotoModal';

// Pages
import Home from './pages/Home';
import Prints from './pages/Prints';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  // Global Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Full HD Zoom Lightbox State
  const [zoomedProduct, setZoomedProduct] = useState(null);

  // Cart Operations
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(i => i.cartItemId === item.cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prevCart, item];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index, delta) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const totalCartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#FAF8F5] text-[#141413] flex flex-col font-sans selection:bg-[#141413] selection:text-[#FAF8F5]">
        
        {/* Header */}
        <Header
          cartCount={totalCartItemsCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Dynamic Main Route Views */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<Home onOpenZoom={(product) => setZoomedProduct(product)} />}
            />
            <Route
              path="/prints"
              element={<Prints onOpenZoom={(product) => setZoomedProduct(product)} />}
            />
            <Route
              path="/prints/:id"
              element={
                <ProductDetail
                  onAddToCart={handleAddToCart}
                  onOpenZoom={(product) => setZoomedProduct(product)}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Sliding Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />

        {/* Fullscreen High-Res Photo Lightbox Modal */}
        <FullPhotoModal
          product={zoomedProduct}
          onClose={() => setZoomedProduct(null)}
        />

      </div>
    </Router>
  );
}
