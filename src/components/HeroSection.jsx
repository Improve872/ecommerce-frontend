import React from "react";
import { Link } from "react-router-dom";

const HERO_IMAGE_URL =
  "https://img.freepik.com/fotos-premium/auriculares-blancos-aislados-sobre-fondo-negro-auriculares-inalambricos-cable-cancelacion-ruido-ia-generativa_379824-1686.jpg";

const HeroSection = () => {
  return (
    <div className="bg-stone-900 text-white py-20 lg:py-32">
                     {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
                            {/* texto izquierda */}         {" "}
        <div className="lg:w-1/2 mb-10 lg:mb-0 text-left">
                     {" "}
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-white">
                          Estilo <br /> Tecnología Esencial            {" "}
          </h1>
                     {" "}
          <p className="mt-4 text-lg lg:text-xl text-gray-300">
                          Ropa, accesorios y dispositivos que definen la
            calidad.            {" "}
          </p>
                                  {/* boton de acento */}           {" "}
          <Link
            to="/products"
            className="mt-8 bg-amber-500 hover:bg-amber-600 transition duration-300 text-white font-bold py-3 px-8 rounded-full shadow-xl transform hover:scale-105 inline-block"
          >
                          Comprar Ahora →            {" "}
          </Link>
                   {" "}
        </div>
                  {/* imagen derecha */}         {" "}
        <div className="lg:w-5/12">
                     {" "}
          <div className="rounded-xl shadow-2xl overflow-hidden">
                         {" "}
            <img
              src={HERO_IMAGE_URL}
              alt="Auriculares Inalámbricos Pro X"
              className="w-full h-auto object-cover"
            />
                       {" "}
          </div>
                   {" "}
        </div>
                         {" "}
      </div>
           {" "}
    </div>
  );
};

export default HeroSection;
