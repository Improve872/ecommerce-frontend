// 📁 src/components/OrderDetailView.jsx

import React, { useEffect, useState } from "react";
import ordersService from "../services/orders.service.js";
import { useParams } from "react-router-dom";
import { Package } from "lucide-react";

const OrderDetailView = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    ordersService
      .getOrderDetail(id)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!order) {
    return (
      <div className="pt-24 text-center text-gray-600">Cargando pedido...</div>
    );
  }

  return (
    <div className="container mx-auto p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-8 h-8 text-amber-600" />
          <h1 className="text-2xl font-bold">Pedido #{order.id}</h1>
        </div>

        <p className="text-gray-700 mb-2">
          Estado: <span className="font-semibold">{order.estado}</span>
        </p>
        <p className="text-gray-700 mb-2">
          Fecha: <span className="font-semibold">{order.fecha}</span>
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Productos</h2>

        <ul className="space-y-2">
          {order.items?.map((item) => (
            <li key={item.id} className="flex justify-between border-b pb-2">
              <span>{item.nombre}</span>
              <span className="font-semibold">x{item.cantidad}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetailView;
