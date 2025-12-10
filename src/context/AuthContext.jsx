import React, { useState, useEffect, useContext, createContext } from "react";
import AuthService from "../services/auth.service";

// Función segura para leer el usuario de localStorage
const getInitialUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    // Leemos síncrona y directamente al inicializar el estado
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error("Error al leer el usuario de localStorage:", e);
    localStorage.removeItem("user"); // Limpiar si hay un error de parseo
    return null;
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 🛑 CAMBIO CLAVE 1: Inicializar el estado leyendo localStorage de forma síncrona
  const [user, setUser] = useState(getInitialUser());

  // Si el usuario es null, isAuthenticated será false
  const isAuthenticated = !!user;

  // Ya no necesitas el useEffect para inicializar, ¡pero lo mantendremos para limpieza!
  // useEffect(() => { /* Eliminado */ }, []);

  // ... (Tu función de login es correcta, solo actualiza el estado)
  const login = async (correo, contrasena) => {
    try {
      const data = await AuthService.login(correo, contrasena);
      setUser(data);
      return data;
    } catch (error) {
      // Asegúrate de propagar el error para que LoginView lo capture
      throw error;
    }
  };

  // ... (Tu función de logout es correcta)
  const logout = () => {
    AuthService.logout(); // Esto elimina el user de localStorage
    setUser(null); // Esto limpia el estado de React
  };

  // La función isAuthenticated ya no se necesita como función, ya es una variable booleana
  // const isAuthenticated = () => !!user;

  const value = {
    user,
    isAuthenticated, // Pasamos el booleano
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
