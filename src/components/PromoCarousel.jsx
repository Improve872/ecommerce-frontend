import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const promotions = [
  {
    id: 1,
    title: "Descuento de Verano",
    subtitle: "Hasta 40% en Ropa",
    color: "from-blue-500 to-blue-600",
    image: "https://via.placeholder.com/1200x400.png?text=Verano",
  },
  {
    id: 2,
    title: "Tecnología en Oferta",
    subtitle: "Los mejores gadgets a precios increíbles",
    color: "from-purple-500 to-purple-600",
    image: "https://via.placeholder.com/1200x400.png?text=Tech",
  },
  {
    id: 3,
    title: "Accesorios Premium",
    subtitle: "Eleva tu estilo con nuestros accesorios",
    color: "from-amber-500 to-amber-600",
    image: "https://via.placeholder.com/1200x400.png?text=Accesorios",
  },
];

const PromoCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + promotions.length) % promotions.length);
  const next = () => setCurrent((prev) => (prev + 1) % promotions.length);

  return (
    <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-2xl shadow-2xl">
      {promotions.map((promo, idx) => (
        <div
          key={promo.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`w-full h-full bg-gradient-to-r ${promo.color} flex items-center justify-center`}
          >
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">
                {promo.title}
              </h2>
              <p className="text-lg md:text-xl">{promo.subtitle}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Controles */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {promotions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoCarousel;
