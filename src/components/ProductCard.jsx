import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Se envía el producto completo
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 500);
    console.log(`Producto ${product.name} añadido al carrito.`);
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      {/* Estilo más clean */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
        {/* imagen */}
        <div className="relative overflow-hidden bg-gray-200">
          {product.imageUrl ? (
            <>
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                // Altura fija para la consistencia visual de todas las tarjetas
                className={`w-full h-64 object-cover transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Placeholder LQIP: visible hasta que la imagen cargue */}
              <div
                aria-hidden
                className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400 transition-opacity duration-500 ${
                  imageLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              />
            </>
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
              <svg
                className="w-16 h-16 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          {/* Overlay sutil al pasar el ratón para dar sensación de interactividad */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition duration-300"></div>
        </div>

        {/* contenido */}
        <div className="p-5">
          {/* categoria */}
          <p className="text-xs text-brand-600 uppercase font-bold tracking-wider">
            {product.category}
          </p>

          {/* Nombre: Fuente más grande, truncada y fuerte */}
          <h3 className="text-lg font-bold text-gray-900 mt-1 truncate">
            {product.name}
          </h3>

          <div className="flex justify-between items-end mt-4">
            {/* Precio: Mantener el foco en el precio */}
            <span className="text-2xl font-extrabold text-stone-800">
              S/ {product.price.toFixed(2)}
            </span>

            {/* añadir carrito*/}
            <button
              className={`flex items-center space-x-1 bg-brand-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-brand-700 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-opacity-50 ${
                justAdded ? "animate-pulse scale-105" : ""
              }`}
              onClick={handleAddToCart}
              aria-label={`Añadir ${product.name} al carrito`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Añadir</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
