// 📁 src/components/OrdersView.jsx
import React, { useEffect, useState } from "react";
import ordersService from "../services/orders.service";
import { Link } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";

const OrdersView = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    ordersService.getMyOrders().then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <div className="container mx-auto pt-24 p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
        <Package className="w-8 h-8 text-amber-500" />
        Mis Pedidos
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">
          Aún no tienes pedidos realizados.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md p-5 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Pedido #{order.id}
                </p>
                <p className="text-gray-500 text-sm">
                  Total: S/ {order.total} — {order.estado}
                </p>
                <p className="text-gray-500 text-sm">
                  Fecha: {order.fechaPedido}
                </p>
              </div>

              <Link
                to={`/orders/${order.id}`}
                className="flex items-center gap-2 text-amber-600 hover:text-amber-700"
              >
                Ver Detalle
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersView;
