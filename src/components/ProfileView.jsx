// 📁 src/components/ProfileView.jsx

import React from "react";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";
import { Navigate } from "react-router-dom";

const ProfileView = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // El objeto 'user' ahora contiene las propiedades del usuario
  // Usamos el encadenamiento opcional (?) aquí también por seguridad,
  // aunque 'isAuthenticated' debería evitar que 'user' sea nulo.
  const { correo, rol } = user || {};

  return (
    <div className="container mx-auto p-6 pt-24 min-h-screen bg-gray-50">
           {" "}
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
               {" "}
        <div className="text-center mb-6">
                    <User className="w-12 h-12 text-blue-600 mx-auto mb-3" />   
                <h1 className="text-3xl font-bold text-gray-900">Mi Cuenta</h1> 
                 {" "}
          <p className="text-gray-500">
                        Información de tu perfil en URBAN STYLE          {" "}
          </p>
                 {" "}
        </div>
               {" "}
        <div className="space-y-4">
                   {" "}
          <div className="border-b pb-2">
                       {" "}
            <p className="text-sm font-medium text-gray-500">
                            Correo Electrónico:            {" "}
            </p>
                        {/* Usamos 'correo' que fue desestructurado */}         
              <p className="text-lg font-semibold text-gray-900">{correo}</p>   
                 {" "}
          </div>
                   {" "}
          <div className="border-b pb-2">
                       {" "}
            <p className="text-sm font-medium text-gray-500">Rol:</p>           {" "}
            <p
              className={`text-lg font-semibold ${
                rol === "ADMIN" ? "text-red-600" : "text-green-600"
              }`}
            >
                            {rol}           {" "}
            </p>
                     {" "}
          </div>
                    {/* cambio pedido → agregar enlace "Mis pedidos" */}       
           {" "}
          <p className="pt-4 text-center text-sm text-gray-600">
                       {" "}
            <a
              href="/orders"
              className="text-amber-600 font-semibold hover:underline"
            >
                            Ver mi historial de pedidos            {" "}
            </a>
                     {" "}
          </p>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default ProfileView;
