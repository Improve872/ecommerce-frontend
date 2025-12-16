import React, { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth, authFetch } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ModalConfirm from "./ModalConfirm";
import PaymentModal from "./PaymentModal";

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

  const formatPrice = (price) => `S/ ${price.toFixed(2)}`;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const handleStartPayment = () => {
    if (items.length === 0) return;
    setPaymentOpen(true);
  };

  const handlePaid = ({ transactionId, method }) => {
    const createLocalOrder = (ownerId) => {
      const ordersKey = "demo_orders";
      const stored = localStorage.getItem(ordersKey);
      const list = stored ? JSON.parse(stored) : [];
      const id = `demo-${Date.now()}`;
      const order = {
        id,
        owner: ownerId || user?.id || "guest",
        items: items.map((it) => ({
          id: it.id,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
        })),
        total: totalPrice,
        fechaPedido: new Date().toISOString(),
        estado: `Pagado - ${
          method === "card"
            ? "Tarjeta"
            : method === "paypal"
            ? "PayPal"
            : "Transferencia"
        }`,
        transactionId,
      };
      list.push(order);
      localStorage.setItem(ordersKey, JSON.stringify(list));
      return order;
    };

    const order = createLocalOrder(user?.id || "guest");
    clearCart();
    setPaymentOpen(false);
    alert(`Pago completado. Pedido creado. ID: ${order.id}`);
  };

  const handleCheckout = async () => {
    const createLocalOrder = (ownerId) => {
      const ordersKey = "demo_orders";
      const stored = localStorage.getItem(ordersKey);
      const list = stored ? JSON.parse(stored) : [];
      const id = `demo-${Date.now()}`;
      const order = {
        id,
        owner: ownerId || user?.id || "guest",
        items: items.map((it) => ({
          id: it.id,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
        })),
        total: totalPrice,
        fechaPedido: new Date().toISOString(),
        estado: "Generado (demo)",
      };
      list.push(order);
      localStorage.setItem(ordersKey, JSON.stringify(list));
      return order;
    };

    try {
      if (!isAuthenticated || !user?.token) {
        // No auth — create a local/demo order so presentation can continue
        const order = createLocalOrder("guest");
        clearCart();
        alert(`Pedido demo creado localmente. ID: ${order.id}`);
        return;
      }

      const response = await authFetch(
        `http://localhost:8080/api/v1/pedidos/crear/${user.id}`,
        { method: "POST" }
      );

      if (!response.ok) {
        // backend returned error — fallback to local demo order
        console.warn(
          "Backend order creation failed, falling back to demo order"
        );
        const order = createLocalOrder(user.id);
        clearCart();
        alert(`Pedido creado en modo demo. ID: ${order.id}`);
        return;
      }

      const data = await response.json();
      alert(`Pedido generado con éxito. ID: ${data.idPedido}`);
      clearCart();
    } catch (error) {
      console.error("Checkout error, creating demo order:", error);
      const order = createLocalOrder(user?.id || "guest");
      clearCart();
      alert(`Pedido demo creado localmente. ID: ${order.id}`);
    }
  };

  // Payment modal removed: proceed triggers `handleCheckout` directly

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Artículos */}
        <div className="md:col-span-3">
          <h2 className="text-3xl font-bold text-stone-800 mb-6 border-b pb-2">
            Tu Carrito de Compras
          </h2>
          {items.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-10 text-center shadow-lg">
              <p className="text-xl font-semibold text-gray-500">
                🛒 Tu carrito está vacío.
              </p>
              <p className="text-gray-500 mt-2">
                ¡Añade productos para empezar!
              </p>
              <div className="mt-6">
                <Link
                  to="/products"
                  className="inline-block bg-amber-500 text-white px-5 py-2 rounded-full"
                >
                  Ir al Catálogo
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
              {items.map((item) => {
                const isRemoving = removingId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row justify-between items-center py-4 border-b last:border-b-0 transition-all duration-300 ${
                      isRemoving
                        ? "opacity-0 translate-x-6"
                        : "opacity-100 translate-x-0 animate-fade-in-up"
                    }`}
                  >
                    <div className="flex items-center w-full sm:w-1/2 mb-4 sm:mb-0">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md mr-4 border"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-md mr-4 bg-gray-200 flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <span className="font-semibold text-gray-900">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto">
                      <div className="flex items-center space-x-2 border rounded-lg p-1 mr-4">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 text-gray-600 hover:text-red-600 transition"
                          aria-label={`Disminuir cantidad de ${item.name}`}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 text-gray-600 hover:text-green-600 transition"
                          aria-label={`Aumentar cantidad de ${item.name}`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-bold text-stone-800 w-24 text-right">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => {
                          setModalAction({
                            type: "remove",
                            id: item.id,
                            name: item.name,
                          });
                          setModalOpen(true);
                        }}
                        className="ml-4 p-1 text-red-500 hover:text-red-700 transition"
                        aria-label={`Eliminar ${item.name} del carrito`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Resumen del pedido */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-2xl sticky top-28 flex flex-col">
            <h2 className="text-2xl font-bold text-stone-900 mb-4 border-b pb-2">
              Resumen del Pedido
            </h2>
            <div className="space-y-3 pb-4">
              <div className="flex justify-between">
                <span className="text-gray-700">
                  Subtotal ({totalItems} artículos):
                </span>
                <span className="font-semibold text-stone-800">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Envío Estimado:</span>
                <span className="font-semibold text-green-600">GRATIS</span>
              </div>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <span className="text-xl font-bold text-stone-900">Total:</span>
              <span className="text-3xl font-extrabold text-amber-500">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              onClick={handleStartPayment}
              className="mt-6 w-full flex items-center justify-center space-x-2 bg-amber-500 text-white py-3 rounded-lg text-lg font-extrabold hover:bg-amber-600 transition duration-300 shadow-xl disabled:bg-gray-400"
              disabled={items.length === 0}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Proceder al Pago</span>
            </button>
            <button
              onClick={() => {
                if (items.length === 0) return;
                setModalAction({ type: "clear" });
                setModalOpen(true);
              }}
              className="mt-3 w-full flex items-center justify-center space-x-2 border border-red-300 text-red-600 py-2 rounded-lg hover:bg-red-50 transition"
              disabled={items.length === 0}
            >
              <Trash2 className="w-4 h-4" />
              <span>Vaciar carrito</span>
            </button>
          </div>
        </div>
      </div>
      <ModalConfirm
        open={modalOpen}
        title={
          modalAction?.type === "clear"
            ? "Vaciar carrito"
            : `Eliminar ${modalAction?.name || "producto"}`
        }
        message={
          modalAction?.type === "clear"
            ? "¿Estás seguro que quieres vaciar todo el carrito? Esta acción no se puede deshacer."
            : `¿Eliminar ${modalAction?.name || "este producto"} del carrito?`
        }
        onConfirm={() => {
          if (modalAction?.type === "clear") {
            clearCart();
            setModalOpen(false);
            setModalAction(null);
            return;
          }

          if (modalAction?.type === "remove") {
            const id = modalAction.id;
            setRemovingId(id);
            setModalOpen(false);
            setTimeout(() => {
              removeFromCart(id);
              setRemovingId(null);
            }, 300);
            setModalAction(null);
          }
        }}
        onCancel={() => {
          setModalOpen(false);
          setModalAction(null);
        }}
      />
      <PaymentModal
        open={paymentOpen}
        amount={totalPrice}
        onClose={() => setPaymentOpen(false)}
        onPaid={handlePaid}
      />
    </div>
  );
};

export default CartView;
