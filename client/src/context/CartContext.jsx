import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems"); // Retrieve cart items from localStorage

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Function to clear the cart

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Save cart items to localStorage whenever they change
  }, [cartItems]);

  const addToCart = (product, size, quantity = 1) => {
    const existingItem = cartItems.find(
      (item) => item.product._id === product._id && item.size === size,
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product._id === product._id && item.size === size
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        ),
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          product,
          size,
          quantity,
        },
      ]);
    }
  };

  const removeFromCart = (productId, size) => {
    setCartItems(
      cartItems.filter(
        (item) => !(item.product._id === productId && item.size === size),
      ),
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.product._id === productId && item.size === size
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
