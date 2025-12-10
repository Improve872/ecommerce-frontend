// 📁 src/services/auth.service.js (o hooks/useAuth.js si prefieres)

import axios from "axios";

// 🛑 IMPORTANTE: Define la URL base de tu Backend

const API_URL = "http://localhost:8080/api/v1/auth/";

// Función para manejar el Login

const login = async (correo, contrasena) => {
  try {
    const response = await axios.post(API_URL + "login", {
      correo,

      contrasena,
    });

    // 🛑 Si el login es exitoso, la respuesta contiene el Token

    if (response.data.token) {
      // 1. Guardar el objeto completo del usuario (incluyendo el token) en localStorage

      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    // Manejo de errores (ej. 401 UNAUTHORIZED)

    console.error("Error en login:", error.response || error);

    throw error; // Propagar el error para que el componente lo maneje
  }
};

// Función para manejar el Registro

const register = async (nombre, correo, contrasena) => {
  return axios.post(API_URL + "register", {
    nombre,

    correo,

    contrasena,
  });
};

// Función para cerrar sesión (Logout)

const logout = () => {
  localStorage.removeItem("user");
};

// Función para obtener el usuario actual (del localStorage)

const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

// Exportar las funciones para su uso

const AuthService = {
  register,

  login,

  logout,

  getCurrentUser,
};

export default AuthService;
