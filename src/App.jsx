import React from "react";
import { Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext.jsx";
import ToastNotification from "./components/ToastNotification.jsx";
import OrdersView from "./components/OrdersView.jsx";
import OrderDetailView from "./components/OrderDetailView.jsx";
// === Componentes de Layout y Navegación ===
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// === Vistas / Páginas (Todas dentro de /components) ===
import HomeView from "./components/HomeView.jsx";
import ProductsView from "./components/ProductsView.jsx";
import ProductDetailView from "./components/ProductDetailView.jsx";
import CartView from "./components/CartView.jsx";
import LoginView from "./components/LoginView.jsx";
import RegisterView from "./components/RegisterView.jsx";
import ProfileView from "./components/ProfileView.jsx";
import AdminView from "./components/AdminView.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen max-w-full mx-auto">
      <CartProvider>
        <Header />
        <ToastNotification />

        {/*  correcion para que el HeroSection se pegue al Header. */}
        <div className="flex-grow">
          <Routes>
            {/* rutas publicas y de cliente*/}
            <Route path="/" element={<HomeView />} />
            <Route path="/products" element={<ProductsView />} />
            <Route path="/product/:id" element={<ProductDetailView />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/orders" element={<OrdersView />} />
            <Route path="/orders/:id" element={<OrderDetailView />} />
            {/* Rutas de Autenticación */}
            <Route path="/auth/login" element={<LoginView />} />
            <Route path="/auth/register" element={<RegisterView />} />{" "}
            {/* RUTAS PROTEGIDAS POR ROL ADMIN */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminView />} />
            </Route>
            {/* RUTA FALLBACK (404) */}
            <Route
              path="*"
              element={
                <h1 className="text-center p-20 text-3xl text-red-500">
                  404 - Página no encontrada
                </h1>
              }
            />
          </Routes>
        </div>

        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
