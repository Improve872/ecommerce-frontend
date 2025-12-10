import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react"; // Importar icono para el botón

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Se envía el producto completo (incluyendo imageUrl) para mayor consistencia
    addToCart(product); 
    console.log(`Producto ${product.name} añadido al carrito.`);
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      {/* Estilo más clean: Sin borde, sombra inicial más suave, escala sutil */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
        
        {/* IMAGEN */}
        <div className="relative overflow-hidden">
            <img
                src={product.imageUrl}
                alt={product.name}
                // Altura fija para la consistencia visual de todas las tarjetas
                className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-90" 
            />
            {/* Overlay sutil al pasar el ratón para dar sensación de interactividad */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition duration-300"></div>
        </div>

        {/* CONTENIDO */}
        <div className="p-5">
          {/* Categoría: Texto más discreto */}
          <p className="text-xs text-amber-500 uppercase font-bold tracking-wider">
            {product.category}
          </p>
          
          {/* Nombre: Fuente más grande, truncada y fuerte */}
          <h3 className="text-lg font-bold text-gray-900 mt-1 truncate">
            {product.name}
          </h3>

          <div className="flex justify-between items-end mt-4">
            {/* Precio: Mantener el foco en el precio */}
            <span className="text-2xl font-extrabold text-stone-800">
              ${product.price.toFixed(2)}
            </span>

            {/* BOTÓN: Cambiado a "Añadir al Carrito" con icono para claridad */}
            <button
              className="flex items-center space-x-1 bg-amber-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-amber-600 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
              onClick={handleAddToCart}
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