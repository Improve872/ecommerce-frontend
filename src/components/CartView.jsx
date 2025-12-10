// 📁 src/components/CartView.jsx (CÓDIGO FINAL Y CORREGIDO)
import React from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const CartView = () => {
  const {
    items,
    totalPrice,
    totalItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { user, isAuthenticated } = useAuth();

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  const handleCheckout = async () => {
    try {
      if (!isAuthenticated || !user?.id) {
        alert("Debes iniciar sesión para generar un pedido.");
        return;
      }

      const userId = user.id;

      const response = await fetch(
        `http://localhost:8080/api/v1/pedidos/crear/${userId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Error al generar el pedido");
      }

      const data = await response.json();

      alert(`Pedido generado con éxito. ID: ${data.idPedido}`);

      clearCart();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al procesar el pedido.");
    }
  };

  return (
    // Contenedor Externo: Controla el ancho y el padding superior (pt-28)
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-28">
                                   {" "}
      {/* Contenedor Interno: Aplica la cuadrícula 2/3 y 1/3 */}     {" "}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
               {" "}
        {/* ARTÍCULOS (Ocupa 2/3) -> ESTE BLOQUE FUE RECUPERADO Y LIMPIADO */} 
             {" "}
        <div className="sm:col-span-2">
                   {" "}
          <h2 className="text-3xl font-bold text-stone-800 mb-6 border-b pb-2">
                        Tu Carrito de Compras          {" "}
          </h2>
                   {" "}
          {items.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
                           {" "}
              <p className="text-xl font-semibold text-gray-500">
                                🛒 Tu carrito está vacío.              {" "}
              </p>
                           {" "}
              <p className="text-gray-500 mt-2">
                                ¡Añade productos para empezar!              {" "}
              </p>
                         {" "}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                           {" "}
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between items-center py-4 border-b last:border-b-0"
                >
                                   {" "}
                  <div className="flex items-center w-full sm:w-1/2 mb-4 sm:mb-0">
                                       {" "}
                    <img
                      src={item.imageUrl || "placeholder.jpg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md mr-4 border"
                    />
                                       {" "}
                    <span className="font-semibold text-gray-900">
                                              {item.name}                   {" "}
                    </span>
                                     {" "}
                  </div>
                                   {" "}
                  <div className="flex items-center justify-between w-full sm:w-auto">
                                       {" "}
                    <div className="flex items-center space-x-2 border rounded-lg p-1 mr-4">
                                           {" "}
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 text-gray-600 hover:text-red-600 transition"
                      >
                                                <Minus className="w-4 h-4" />   
                                         {" "}
                      </button>
                                           {" "}
                      <span className="font-medium w-6 text-center">
                                                  {item.quantity}               
                             {" "}
                      </span>
                                           {" "}
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 text-gray-600 hover:text-green-600 transition"
                      >
                                                <Plus className="w-4 h-4" />   
                                         {" "}
                      </button>
                                         {" "}
                    </div>
                                        {/* PRECIO */}                   {" "}
                    <span className="font-bold text-stone-800 w-24 text-right">
                                           {" "}
                      {formatPrice(item.price * item.quantity)}                 
                       {" "}
                    </span>
                                        {/* BOTÓN ELIMINAR */}                 
                     {" "}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 p-1 text-red-500 hover:text-red-700 transition"
                    >
                                              <Trash2 className="w-5 h-5" />   
                                     {" "}
                    </button>
                                     {" "}
                  </div>
                                 {" "}
                </div>
              ))}
                         {" "}
            </div>
          )}
                 {" "}
        </div>
               {" "}
        {/* RESUMEN (Ocupa 1/3) -> CON DISEÑO FLEXBOX PARA EMPUJAR EL BOTÓN */} 
             {" "}
        <div className="sm:col-span-1">
                   {" "}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md sticky top-24 flex flex-col h-full">
                       {" "}
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Resumen</h2> 
                     {" "}
            <div className="space-y-2 border-b pb-4">
                           {" "}
              <div className="flex justify-between">
                               {" "}
                <span className="text-gray-700">
                  {" "}
                  Subtotal ({totalItems} artículos):{" "}
                </span>
                               {" "}
                <span className="font-semibold text-stone-800">
                  {" "}
                  {formatPrice(totalPrice)}{" "}
                </span>
                             {" "}
              </div>
                           {" "}
              <div className="flex justify-between">
                               {" "}
                <span className="text-gray-700">Envío Estimado:</span>         
                     {" "}
                <span className="font-semibold text-stone-800">GRATIS</span>   
                         {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <div className="flex justify-between pt-4 flex-grow">
                           {" "}
              <span className="text-xl font-bold text-stone-800">Total:</span> 
                         {" "}
              <span className="text-2xl font-bold text-amber-600">
                                {formatPrice(totalPrice)}             {" "}
              </span>
                         {" "}
            </div>
                                   {" "}
            {/* BOTÓN GENERAR PEDIDO (Con margen superior reducido) */}         
             {" "}
            <button
              onClick={handleCheckout}
              className="mt-4 w-full flex items-center justify-center space-x-2 bg-amber-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-amber-600 transition duration-300 shadow-lg"
              disabled={items.length === 0}
            >
                            <ShoppingCart className="h-5 w-5" />             {" "}
              <span>Proceder al Pago</span>           {" "}
            </button>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default CartView;
