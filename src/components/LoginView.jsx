import React, { useState, useEffect } from "react"; // 🛑 IMPORTAR useEffect
import { User, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // 🛑 1. SOLUCIÓN: Usar useEffect para la redirección
  // Este efecto se ejecutará *después* de que el render haya terminado.
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true }); // Se recomienda 'replace: true' para no dejar la página de login en el historial
    }
  }, [isAuthenticated, navigate]); // Depende de isAuthenticated y navigate

  // Si ya estás autenticado, el componente no se renderiza (opcional, pero limpio)
  if (isAuthenticated) {
    return null;
  }

  // 2. FUNCIÓN PARA LLAMAR AL BACKEND (sin cambios, es correcta)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const correo = email;
    const contrasena = password;

    try {
      await login(correo, contrasena);

      // 🛑 La redirección AQUI ya NO es necesaria.
      // Se manejará automáticamente por el useEffect una vez que 'isAuthenticated' cambie.
    } catch (err) {
      setError("Fallo el inicio de sesión. Verifica tu correo y contraseña.");
      console.error("Error de autenticación:", err);
    }
  };

  return (
    // ... (El resto del return con el formulario, sin cambios) ...

    <div className="min-h-screen flex items-start justify-center pt-24 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        {/* TÍTULO */}
        <div className="text-center mb-8">
          <User className="w-10 h-10 text-amber-500 mx-auto mb-2" />
          <h2 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="text-gray-500 text-sm mt-1">
            Accede a tu cuenta de URBAN STYLE
          </p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 🛑 MOSTRAR MENSAJE DE ERROR */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {/* CAMPO EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                placeholder="ejemplo@correo.com"
              />
            </div>
          </div>

          {/* CAMPO CONTRASEÑA */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                placeholder="Ingresa tu contraseña"
              />
            </div>
          </div>

          {/* BOTÓN SUBMIT */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-150"
          >
            Entrar
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        {/* LINK A REGISTRO */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link
              to="/auth/register"
              className="font-medium text-amber-600 hover:text-amber-700"
            >
              Crea una cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
