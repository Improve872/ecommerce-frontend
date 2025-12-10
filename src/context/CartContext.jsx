import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Estado que almacena los ítems del carrito con su cantidad
  const [cart, setCart] = useState([]);

  // Lógica para añadir un producto (agrupa si ya existe)
  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      // Añade el producto como un nuevo ítem con cantidad 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Lógica para eliminar completamente un producto
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Lógica para actualizar la cantidad de un producto
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
        removeFromCart(id);
        return;
    }

    const newCart = cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(newCart);
  };


  // CÁLCULOS DERIVADOS (Estos son esenciales para la vista del carrito y el header)
  
  const totalItems = useMemo(() => 
    cart.reduce((total, item) => total + item.quantity, 0)
  , [cart]);

  const totalPrice = useMemo(() => 
    cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  , [cart]);


  // Lo que se expone a los componentes que usan el hook useCart()
  const contextValue = {
    items: cart, // Renombrado a 'items' para la vista
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);