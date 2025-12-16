import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HERO_IMAGE_URL =
  "https://img.freepik.com/fotos-premium/auriculares-blancos-aislados-sobre-fondo-negro-auriculares-inalambricos-cable-cancelacion-ruido-ia-generativa_379824-1686.jpg";

const HeroSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((node) => {
            node.classList.remove("opacity-0", "translate-y-6");
            node.classList.add("opacity-100", "translate-y-0");
          });
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      aria-label="Hero principal: ofertas y destacados"
      className="relative overflow-hidden bg-gradient-to-r from-stone-900 via-neutral-900 to-neutral-800 text-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full opacity-20"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#000"
            d="M0,224L48,213.3C96,203,192,181,288,165.3C384,149,480,139,576,160C672,181,768,235,864,256C960,277,1056,267,1152,240C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div
        ref={containerRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28"
      >
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-left reveal opacity-0 translate-y-6 transition-all duration-700 ease-out">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="block">Estilo y</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200">
                Tecnología Esencial
              </span>
            </h1>

            <p className="mt-4 text-gray-300 text-base sm:text-lg lg:text-xl max-w-xl">
              Ropa, accesorios y dispositivos seleccionados para elevar tu día a
              día. Calidad, diseño y funcionalidad en un solo lugar.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition transform hover:-translate-y-0.5"
                aria-label="Comprar ahora - ver productos"
              >
                Comprar ahora
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center border border-white/20 text-white/90 hover:bg-white/5 py-3 px-5 rounded-full transition"
                aria-label="Conócenos - más información"
              >
                Conócenos
              </Link>
            </div>

            <ul className="mt-6 flex flex-wrap gap-3 text-sm text-gray-300">
              <li className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                <span className="font-semibold text-amber-300">
                  Envío rápido
                </span>
                <span className="opacity-70">·</span>
                Entrega en 24-48h
              </li>
              <li className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                Calidad verificada
              </li>
              <li className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                Soporte 24/7
              </li>
            </ul>
          </div>

          <div className="lg:w-5/12 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition hover:scale-105 reveal opacity-0 translate-y-6 transition-all duration-700 ease-out">
              <img
                src={HERO_IMAGE_URL}
                alt="Auriculares inalámbricos sobre fondo oscuro"
                className="w-full h-auto object-cover block"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
