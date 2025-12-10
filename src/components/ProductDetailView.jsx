import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

// datos estaticos temporales
const productsData = [
  {
    id: "101",
    name: "Chaqueta de Cuero Premium",
    price: 189.99,
    category: "Ropa",
    imageUrl: "https://saratex.cl/wp-content/uploads/2023/12/1.jpg",
    description:
      "Chaqueta de cuero genuino, estilo clásico y corte slim fit. Material de alta calidad para durabilidad y estilo.",
  },
  {
    id: "202",
    name: "Reloj de Pulsera Minimalista",
    price: 75.0,
    category: "Accesorios",
    imageUrl:
      "https://tse3.mm.bing.net/th/id/OIP.fUpd-URzpOeYAqu20XKL3QHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Reloj elegante con correa de malla y diseño minimalista. Resistente al agua y perfecto para el uso diario.",
  },
  {
    id: "303",
    name: "Auriculares Inalámbricos Pro X",
    price: 150.0,
    category: "Tecnología",
    imageUrl:
      "https://i.pinimg.com/736x/20/c3/83/20c3839c00190714a5d76b5f4e44a0c6.jpg",
    description:
      "Auriculares con cancelación de ruido activa y 30 horas de batería. Audio inmersivo para música y llamadas.",
  },
  {
    id: "404",
    name: "Camisa Oxford Clásica",
    price: 45.99,
    category: "Ropa",
    imageUrl:
      "https://tse1.mm.bing.net/th/id/OIP.Pb4LJyKM83RBHzRMy61fHwHaHa?cb=ucfimg2&pid=ImgDet&ucfimg=1&w=190&h=190&c=7&o=7&rm=3",
    description:
      "Camisa de algodón Oxford 100%, ideal para un look formal o casual. Disponible en varias tallas.",
  },
  {
    id: "500",
    name: "Correa de Cuero Elegante",
    price: 30.0,
    category: "Accesorios",
    imageUrl: "ruta/temporal/correa.jpg",
    description:
      "Correa de cuero premium para cualquier ocasión. Hebilla de acero inoxidable.",
  },
  {
    id: "600",
    name: "Smartwatch Deportivo",
    price: 99.99,
    category: "Tecnología",
    imageUrl: "ruta/temporal/smartwatch.jpg",
    description:
      "Reloj inteligente con GPS, monitor de ritmo cardíaco y notificaciones.",
  },
];

const ProductDetailView = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 pt-20 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Producto No Encontrado
        </h1>
        <Link
          to="/"
          className="mt-6 inline-block text-amber-600 hover:text-amber-800 font-semibold"
        >
          ← Volver a la página principal
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} ha sido añadido al carrito.`);
  };

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* imagen principal*/}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-xl shadow-2xl object-cover"
          />
        </div>

        {/* informacion y compra */}
        <div className="lg:sticky lg:top-24">
          <p className="text-sm font-semibold uppercase text-amber-600">
            {product.category}
          </p>
          <h1 className="text-4xl font-extrabold text-stone-900 mt-2">
            {product.name}
          </h1>

          <p className="mt-4 text-3xl font-bold text-stone-800">
            {formatPrice(product.price)}
          </p>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full mt-8 flex items-center justify-center space-x-2 bg-amber-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-amber-600 transition duration-300 shadow-xl"
          >
            <ShoppingCart className="w-6 h-6" />
            <span>Añadir al Carrito</span>
          </button>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Envío Rápido y Devoluciones Fáciles. (30 días de garantía).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
