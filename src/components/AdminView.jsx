// 📁 src/views/AdminView.jsx

import React from 'react';

const AdminView = () => {
    return (
        <div className="container mx-auto p-6 pt-24 min-h-screen bg-gray-50">
            <h1 className="text-4xl font-extrabold text-stone-900 mb-6 border-b pb-2">
                Panel de Administración
            </h1>
            <p className="text-lg text-gray-700 mb-8">
                Bienvenido, Administrador. Desde aquí puedes gestionar usuarios y productos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold text-amber-600 mb-3">Gestión de Usuarios</h2>
                    <p>Revisar y modificar la lista completa de usuarios registrados.</p>
                    {/* Link para ver la lista de usuarios (ej. /admin/users) */}
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold text-amber-600 mb-3">Gestión de Productos</h2>
                    <p>Añadir, editar o eliminar productos del catálogo.</p>
                    {/* Link para ver el CRUD de Productos */}
                </div>
                
                {/* Puedes añadir más tarjetas para Contratos, Pedidos, etc. */}
            </div>
        </div>
    );
};

export default AdminView;