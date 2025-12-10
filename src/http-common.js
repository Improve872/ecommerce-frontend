// 📁 src/http-common.js

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/";

// --- Función segura para obtener el user del localStorage ---
function getStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Error leyendo user desde localStorage:", err);
    return null;
  }
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// --- Interceptor para añadir token automáticamente ---
api.interceptors.request.use(
  (config) => {
    const user = getStoredUser();

    if (user?.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --- Interceptor para manejar errores de autenticación (opcional) ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // Expiración de token o token inválido
    if (status === 401) {
      console.warn("⚠️ Token expirado o inválido. Cerrando sesión…");

      localStorage.removeItem("user");

      // Opcional: recargar página o redirigir
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
