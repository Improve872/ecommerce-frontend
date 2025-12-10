import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  // logica de proteccion
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
