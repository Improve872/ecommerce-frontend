import React, { useState, useEffect, useContext, createContext } from "react";
import AuthService from "../services/auth.service";

const getInitialUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error("Error al leer el usuario de localStorage:", e);
    localStorage.removeItem("user");
    return null;
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser());

  const isAuthenticated = !!user;

  const login = async (correo, contrasena) => {
    try {
      const data = await AuthService.login(correo, contrasena);
      // data debe incluir user.token
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); // guardar en localStorage
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    localStorage.removeItem("user");
  };

  const demoLogin = async () => {
    const demoUser = {
      id: "demo",
      name: "Usuario Demo",
      token: "demo-token",
      isAdmin: false,
      roles: [],
    };
    setUser(demoUser);
    localStorage.setItem("user", JSON.stringify(demoUser));
    return demoUser;
  };

  useEffect(() => {
    const onDemoRequest = async () => {
      await demoLogin();
      window.dispatchEvent(new Event("demo-login-done"));
    };

    document.addEventListener("demo-login-request", onDemoRequest);
    return () =>
      document.removeEventListener("demo-login-request", onDemoRequest);
  }, []);

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    demoLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

// Helper opcional para fetch con token
export const authFetch = (url, options = {}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });
};
