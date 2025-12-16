import { createContext, useContext, useState, useMemo, useEffect } from "react";

const CartContext = createContext();
const CART_STORAGE_KEY = "urban_style_cart";

export const CartProvider = ({ children }) => {
  // Estado que almacena los ítems del carrito con su cantidad
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error loading cart from localStorage:", e);
      return [];
    }
  });

  // Persistir carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Callback para notificaciones (toast)
  const [onItemAdded, setOnItemAdded] = useState(null);
  const notifyItemAdded = (product) => {
    if (onItemAdded) onItemAdded(product);
  };

  // Lógica para añadir un producto (agrupa si ya existe)
  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      // Añade el producto como un nuevo ítem con cantidad 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    notifyItemAdded(product);
  };

  // Lógica para eliminar completamente un producto
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Vaciar el carrito
  const clearCart = () => setCart([]);

  // Lógica para actualizar la cantidad de un producto
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(newCart);
  };

  // calculos derivados

  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  // Lo que se expone a los componentes que usan el hook useCart()
  const contextValue = {
    items: cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    setOnItemAdded,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
