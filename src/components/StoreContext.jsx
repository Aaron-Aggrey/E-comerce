
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const StoreContext = createContext(null);

// Safely load saved data from localStorage.
function loadSavedData(key, fallback) {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() =>
    loadSavedData("my-store-cart", [])
  );

  const [wishlistIds, setWishlistIds] = useState(() =>
    loadSavedData("my-store-wishlist", [])
  );

  // Save cart whenever it changes.
  useEffect(() => {
    localStorage.setItem("my-store-cart", JSON.stringify(cart));
  }, [cart]);

  // Save wishlist whenever it changes.
  useEffect(() => {
    localStorage.setItem(
      "my-store-wishlist",
      JSON.stringify(wishlistIds)
    );
  }, [wishlistIds]);

  // Add a product, or increase its quantity if it is already in the cart.
  function addToCart(product) {
    if (product?.id == null) {
      console.error("Cannot add product: an id is required.");
      return;
    }

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: (Number(item.quantity) || 1) + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        { ...product, quantity: Number(product.quantity) || 1 },
      ];
    });
  }

  // Change the quantity of a cart item.
  function updateQuantity(productId, quantity) {
    const nextQuantity = Number(quantity);

    setCart((currentCart) => {
      if (!Number.isFinite(nextQuantity) || nextQuantity <= 0) {
        return currentCart.filter((item) => item.id !== productId);
      }

      return currentCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: nextQuantity }
          : item
      );
    });
  }

  // Remove one product from the cart.
  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }

  // Empty the entire cart.
  function clearCart() {
    setCart([]);
  }

  // Add or remove a product from the wishlist.
  function toggleWishlist(productId) {
    setWishlistIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId]
    );
  }

  const cartCount = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const value = {
    cart,
    wishlistIds,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

// A simple hook for accessing the store from any component.
export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider.");
  }

  return context;
}
