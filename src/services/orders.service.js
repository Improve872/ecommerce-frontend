import api from "../http-common";

// Función para crear un pedido desde el carrito
const createOrder = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  return api.post(
    "/pedidos/crear",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Función para obtener los pedidos del usuario autenticado
const getMyOrders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  return api.get("/pedidos/mis-pedidos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Función para obtener el detalle de un pedido específico
const getOrderDetail = (pedidoId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  return api.get(`/pedidos/${pedidoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteOrder = (pedidoId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  return api.delete(`/pedidos/${pedidoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createOrder,
  getMyOrders,
  getOrderDetail,
  deleteOrder,
};
