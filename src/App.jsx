
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import About from "./components/About.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import Cart from "./components/Cart.jsx";
import { useStore } from "./components/StoreContext.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    cart,
    wishlistIds,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity: setItemQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
  } = useStore();

  function handleAddToCart(product) {
    if (!product || product.id == null) return;

    const normalizedProduct = {
      ...product,
      name: product.name || product.title || "Product",
      title: product.title || product.name || "Product",
      price: Number(product.price) || 0,
      image: product.image || "",
    };

    addToCart(normalizedProduct);
  }

  function updateQuantity(id, change) {
    const currentItem = cart.find(
      (item) => String(item.id) === String(id)
    );

    if (!currentItem) return;

    const nextQuantity =
      (Number(currentItem.quantity) || 1) + change;

    setItemQuantity(id, nextQuantity);
  }

  const mainProps = {
    searchTerm,
    setSearchTerm,
    onAddToCart: handleAddToCart,
    wishlistIds,
    onToggleWishlist: toggleWishlist,
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <Header
          cartCount={cartCount}
          wishlistCount={wishlistIds.length}
        />

        <Routes>
          <Route path="/" element={<Main {...mainProps} />} />

          <Route path="/products" element={<Main {...mainProps} />} />

          <Route path="/about" element={<About />} />

          <Route
            path="/product/:id"
            element={
              <ProductDetails onAddToCart={handleAddToCart} />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                cartCount={cartCount}
                cartTotal={cartTotal}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            }
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
