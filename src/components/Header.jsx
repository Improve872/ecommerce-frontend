import React, { useState } from "react";
import { ShoppingCart, User, Search, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const { isAuthenticated, isAdmin, logout } = useAuth();

  const navigate = useNavigate();

  let userLinkTo = "/auth/login";

  if (isAuthenticated) {
    if (isAdmin) {
      userLinkTo = "/admin";
    } else {
      userLinkTo = "/profile";
    }
  }

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);

      setIsSearchOpen(false);

      setSearchTerm("");
    }
  };
  return (
    <header className="bg-stone-900 text-white shadow-lg fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* logo, marca */}

        <Link
          to="/"
          className="text-2xl font-extrabold tracking-widest text-amber-400"
        >
          URBAN STYLE
        </Link>

        {/* navegacion categorias */}

        <nav className="hidden md:flex space-x-6">
          <Link
            to="/?category=ropa"
            className="text-gray-300 hover:text-amber-400 transition text-sm font-medium"
          >
            Ropa
          </Link>

          <Link
            to="/?category=accesorios"
            className="text-gray-300 hover:text-amber-400 transition text-sm font-medium"
          >
            Accesorios
          </Link>

          <Link
            to="/?category=tecnologia"
            className="text-gray-300 hover:text-amber-400 transition text-sm font-medium"
          >
            Tecnología
          </Link>
        </nav>

        {/* iconos de usuario carrito logout */}

        <div className="flex space-x-4 items-center">
          {/* boton de busqueda */}

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-gray-300 hover:text-amber-400 transition p-2 rounded-full hover:bg-stone-800"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* enlace de USUARIO/ADMIN/CLIENTE */}

          <Link
            to={userLinkTo}
            className="text-gray-300 hover:text-amber-400 transition p-2 rounded-full hover:bg-stone-800"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* icono de carrito */}

          <Link
            to="/cart"
            className="text-gray-300 hover:text-amber-400 transition p-2 rounded-full hover:bg-stone-800 relative"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>

          {/* boton de logout visible si estas logueado */}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 transition p-2 rounded-full hover:bg-stone-800"
              title="Cerrar Sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* barra de busqueda */}

      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-stone-800 shadow-xl py-3 px-4 transition-all duration-300">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-7xl mx-auto flex items-center space-x-3"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos, marcas o estilos..."
              className="flex-grow py-2 px-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-semibold"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsSearchOpen(false)}
              type="button"
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
