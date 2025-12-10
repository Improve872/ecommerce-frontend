// 📁 src/routes/AdminRoute.jsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Componente de Ruta Protegida:
 * 1. Verifica si el usuario está autenticado.
 * 2. Verifica si el usuario tiene el rol 'ADMIN'.
 */
const AdminRoute = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  // Si aún está cargando la verificación inicial de LocalStorage, esperar
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  // 🛑 Lógica de Protección
  if (!isAuthenticated || !isAdmin) {
    // Redirigir al inicio de sesión si no está logueado O si no es ADMIN
    return <Navigate to="/auth/login" replace />;
  }

  // Si está autenticado y es ADMIN, renderizar las rutas hijas (el Dashboard)
  return <Outlet />;
};

export default AdminRoute;
