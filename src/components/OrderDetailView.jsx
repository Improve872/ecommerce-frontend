import React, { useEffect, useState } from "react";
import ordersService from "../services/orders.service.js";
import { useParams, useNavigate } from "react-router-dom"; // Importados juntos
import { Package } from "lucide-react";

const OrderDetailView = () => {
  // --- 1. HOOKS (Siempre al nivel superior) ---
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    ordersService
      .getOrderDetail(id)
      .then((response) => {
        setOrder(response.data);
      })
      .catch(() => {
        // Fallback: Buscar en localStorage si falla la API
        const demo = localStorage.getItem("demo_orders");
        const list = demo ? JSON.parse(demo) : [];
        const found = list.find((o) => String(o.id) === String(id));
        if (found) setOrder(found);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // --- 2. FUNCIONES DE MANEJO ---
  const handleDelete = async () => {
    const ok = window.confirm("¿Eliminar este pedido?");
    if (!ok) return;

    try {
      await ordersService.deleteOrder(order.id);
      navigate("/orders");
    } catch (e) {
      // Fallback: Eliminar de localStorage si la API falla
      const demoKey = "demo_orders";
      const demo = localStorage.getItem(demoKey);
      const list = demo ? JSON.parse(demo) : [];
      const newList = list.filter((o) => String(o.id) !== String(order.id));
      localStorage.setItem(demoKey, JSON.stringify(newList));
      navigate("/orders");
    }
  };

  // --- 3. RENDERS CONDICIONALES ---
  if (loading) {
    return (
      <div className="pt-24 text-center text-gray-600">
        <div className="animate-pulse">Cargando pedido...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-24 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Pedido no encontrado
        </h2>
        <p className="mt-2 text-gray-600">
          No se encontró información del pedido.
        </p>
        <button
          onClick={() => navigate("/orders")}
          className="mt-4 text-amber-600 hover:underline"
        >
          Volver a mis pedidos
        </button>
      </div>
    );
  }

  // --- 4. RENDER PRINCIPAL ---
  return (
    <div className="container mx-auto p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-8 h-8 text-amber-600" />
          <h1 className="text-2xl font-bold">Pedido #{order.id}</h1>
        </div>

        <p className="text-gray-700 mb-2">
          Estado:{" "}
          <span className="font-semibold">{order.estado || "Procesando"}</span>
        </p>
        <p className="text-gray-700 mb-2">
          Fecha:{" "}
          <span className="font-semibold">
            {order.fecha || "No disponible"}
          </span>
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Productos</h2>

        <ul className="space-y-2">
          {(order.items || []).map((item) => {
            const name =
              item.nombre ||
              item.name ||
              item.nombreProducto ||
              item.producto ||
              "Producto";
            const qty = item.cantidad || item.quantity || item.qty || 1;
            const price = item.precio || item.price || item.total || 0;

            return (
              <li
                key={item.id || `${name}-${Math.random()}`}
                className="flex justify-between border-b pb-2"
              >
                <div>
                  <div className="font-medium">{name}</div>
                  {price > 0 && (
                    <div className="text-sm text-gray-500">
                      S/ {Number(price).toFixed(2)}
                    </div>
                  )}
                </div>
                <div className="font-semibold">x{qty}</div>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <div className="text-lg font-bold">
            Total: S/ {Number(order.total || 0).toFixed(2)}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
            >
              Eliminar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailView;
