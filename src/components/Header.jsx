import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, User, Search, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, logout, user } = useAuth();
  const isAdmin = user?.roles?.includes("ADMIN") || user?.isAdmin || false;
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useRef(null);
  const { totalItems } = useCart();
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
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setCategoriesOpen(false);
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") {
        setUserMenuOpen(false);
        setCategoriesOpen(false);
      }
    };

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const onDemoDone = () => {
      navigate("/profile");
    };
    window.addEventListener("demo-login-done", onDemoDone);
    return () => window.removeEventListener("demo-login-done", onDemoDone);
  }, [navigate]);

  return (
    <header className="bg-stone-900 text-white shadow-lg fixed w-full z-20 top-0 left-0">
      {/* Usamos el mismo ancho máximo que en App.jsx para centrar el contenido del header */}
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* logo, marca */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-widest text-amber-400"
        >
          URBAN STYLE
        </Link>

        {/* navegación principal: categorías (dropdown), búsqueda inline en desktop y CTA */}
        <div className="hidden md:flex items-center space-x-6 w-full max-w-3xl mx-6">
          {/* Categorías dropdown */}
          <div className="relative" ref={categoriesRef}>
            <button
              onClick={() => setCategoriesOpen((v) => !v)}
              className="text-gray-300 hover:text-amber-400 transition text-sm font-medium px-3 py-2 rounded-md"
              aria-haspopup="menu"
              aria-expanded={categoriesOpen}
            >
              Categorías
            </button>
            {categoriesOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-white text-stone-900 rounded-md shadow-lg py-2 z-40">
                <Link
                  to="/products?category=ropa"
                  onClick={() => setCategoriesOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-stone-100"
                >
                  Ropa
                </Link>
                <Link
                  to="/products?category=accesorios"
                  onClick={() => setCategoriesOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-stone-100"
                >
                  Accesorios
                </Link>
                <Link
                  to="/products?category=tecnologia"
                  onClick={() => setCategoriesOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-stone-100"
                >
                  Tecnología
                </Link>
                <Link
                  to="/products"
                  onClick={() => setCategoriesOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-stone-100"
                >
                  Ver Todo
                </Link>
              </div>
            )}
          </div>

          {/* Búsqueda inline para desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center flex-1"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos, marcas o estilos..."
              className="hidden md:block w-full py-2 px-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </form>

          {/* CTA Ofertas */}
          <Link
            to="/products?tag=ofertas"
            className="ml-2 inline-block bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-amber-600 transition"
          >
            Ofertas
          </Link>
        </div>

        {/* iconos de usuario carrito logout */}
        <div className="flex space-x-4 items-center">
          {/* boton de busqueda */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-gray-300 hover:text-amber-400 transition p-2 rounded-full hover:bg-stone-800"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* usuario: link a login o menú desplegable cuando está autenticado */}
          {!isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Link
                to="/auth/login"
                className="text-gray-300 hover:text-amber-400 transition p-2 rounded-full hover:bg-stone-800"
                aria-label="Iniciar Sesión"
              >
                <User className="w-5 h-5" />
              </Link>
              <button
                onClick={async () => {
                  // quick demo login
                  const { demoLogin } = await import(
                    "../context/AuthContext.jsx"
                  ).then((m) => m);
                  // demoLogin is provided by context; call via hook fallback: use window event
                  const event = new CustomEvent("demo-login-request");
                  document.dispatchEvent(event);
                }}
                title="Entrar como Demo"
                className="text-sm bg-white text-stone-900 px-3 py-1 rounded-full hover:opacity-90"
              >
                Demo
              </button>
            </div>
          ) : (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="text-gray-300 hover:text-amber-400 transition p-2 rounded-full hover:bg-stone-800 flex items-center"
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                aria-label="Menú de Usuario"
              >
                <User className="w-5 h-5" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-stone-900 rounded-md shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-stone-100"
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-stone-100"
                  >
                    Mis Pedidos
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-stone-100"
                    >
                      Panel Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                      navigate("/");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-stone-100 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* icono de carrito */}
          <Link
            to="/cart"
            className="text-gray-300 hover:text-amber-400 transition p-2 rounded-full hover:bg-stone-800 relative"
            aria-label="Ver Carrito de Compras"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* boton de logout visible si estas logueado */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 transition p-2 rounded-full hover:bg-stone-800"
              title="Cerrar Sesión"
              aria-label="Cerrar Sesión"
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
            className="max-w-6xl 2xl:max-w-7xl mx-auto flex items-center space-x-3"
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
