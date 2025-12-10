import React, { useState } from "react";

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = type === "login";
  const title = isLogin ? "Inicia Sesión" : "Crea tu Cuenta";
  const primaryCta = isLogin ? "Entrar a URBAN STYLE" : "Registrarme";

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${title} simulado con éxito`);
  };

  return (
    <div className="flex justify-center items-center py-16 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-stone-800 text-center mb-6">
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-amber-600 transition duration-300 shadow-md"
          >
            {primaryCta}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          <a
            href={isLogin ? "/register" : "/login"}
            className="font-semibold text-indigo-600 hover:text-indigo-800"
          >
            {isLogin ? "Regístrate aquí" : "Inicia Sesión"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
