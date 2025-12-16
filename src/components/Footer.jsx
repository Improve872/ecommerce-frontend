import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white mt-16">
      {/* ANCHO AJUSTADO Y MÁS RESPONSIVO */}
      <div
        role="contentinfo"
        className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-stone-700"
      >
        {/* ESPACIADO AJUSTADO EN MÓVIL */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-8">
          {/* logo y copy */}
          <div className="md:col-span-1">
            <Link
              to="/"
              className="text-xl font-extrabold tracking-wider text-amber-400"
            >
              URBAN STYLE
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-xs">
              &copy; {new Date().getFullYear()} Urban Style. Todos los derechos
              reservados.
            </p>
            <p className="mt-3 text-sm text-gray-400">Contacto:</p>
            <a
              href="mailto:soporte@urbanstyle.com"
              className="text-sm text-gray-300 hover:text-amber-400 block"
            >
              soporte@urbanstyle.com
            </a>
            <a
              href="tel:+34123456789"
              className="text-sm text-gray-300 hover:text-amber-400 block"
            >
              <Phone className="inline w-4 h-4 mr-2" /> +34 123 456 789
            </a>
          </div>

          {/* navegacion (igual, bien) */}
          <div>
            <h3 className="text-md font-semibold mb-3">Enlaces</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/products" className="hover:text-amber-400">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-amber-400">
                  Mi cuenta
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-amber-400">
                  Pedidos
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400">
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>

          {/* informacion (igual, bien) */}
          <div>
            <h3 className="text-md font-semibold mb-3">Soporte</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/help" className="hover:text-amber-400">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-amber-400">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-amber-400">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* redes sociales y newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-md font-semibold mb-3">Síguenos</h3>
            <div className="flex space-x-3 mb-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-amber-400 transition p-2 rounded-full hover:bg-stone-800"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-amber-400 transition p-2 rounded-full hover:bg-stone-800"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-amber-400 transition p-2 rounded-full hover:bg-stone-800"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:soporte@urbanstyle.com"
                className="text-gray-400 hover:text-amber-400 transition p-2 rounded-full hover:bg-stone-800"
                aria-label="Correo electrónico"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <Newsletter />
            <div className="mt-4 flex items-center gap-3 text-gray-300">
              <CreditCard className="w-6 h-6" />
              <span className="text-sm">Visa • MasterCard • PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("invalid");
      return;
    }
    setStatus("ok");
    setEmail("");
    // aquí podrías integrar API o una lista real
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <label htmlFor="footer-news" className="sr-only">
        Suscríbete al newsletter
      </label>
      <div className="flex">
        <input
          id="footer-news"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          className="w-full px-3 py-2 rounded-l-lg text-gray-900"
          aria-label="Correo electrónico"
        />
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-r-lg text-white font-medium"
        >
          Suscribir
        </button>
      </div>
      {status === "invalid" && (
        <p className="text-sm text-red-400 mt-2">Introduce un email válido.</p>
      )}
      {status === "ok" && (
        <p className="text-sm text-green-400 mt-2">
          ¡Gracias! Te hemos suscrito.
        </p>
      )}
    </form>
  );
};

export default Footer;
