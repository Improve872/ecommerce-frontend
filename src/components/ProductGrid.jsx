import React from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

const defaultProducts = [
  {
    id: "101",
    name: "Chaqueta de Cuero Premium",
    price: 189.99,
    category: "Ropa",
    imageUrl: "https://saratex.cl/wp-content/uploads/2023/12/1.jpg",
  },
  {
    id: "202",
    name: "Reloj de Pulsera Minimalista",
    price: 75.0,
    category: "Accesorios",
    imageUrl:
      "https://tse3.mm.bing.net/th/id/OIP.fUpd-URzpOeYAqu20XKL3QHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "303",
    name: "Auriculares Inalámbricos Pro X",
    price: 150.0,
    category: "Tecnología",
    imageUrl:
      "https://i.pinimg.com/736x/20/c3/83/20c3839c00190714a5d76b5f4e44a0c6.jpg",
  },
  {
    id: "404",
    name: "Camisa Oxford Clásica",
    price: 45.99,
    category: "Ropa",
    imageUrl:
      "https://tse1.mm.bing.net/th/id/OIP.Pb4LJyKM83RBHzRMy61fHwHaHa?cb=ucfimg2&pid=ImgDet&ucfimg=1&w=190&h=190&c=7&o=7&rm=3",
  },
  {
    id: "505",
    name: "Correa de Cuero Elegante",
    price: 30.0,
    category: "Accesorios",
    imageUrl:
      "https://dcuero.online/wp-content/uploads/2018/10/renzocosta-cuero-correa-hombre-marron-bn17-03..jpg",
  },
  {
    id: "606",
    name: "Smartwatch Deportivo",
    price: 99.99,
    category: "Tecnología",
    imageUrl:
      "https://img.freepik.com/fotos-premium/smartwatch-blanco-seguimiento-fitness-fondo-dinamico-prueba-agua_979568-2487.jpg",
  },
];

const ProductGrid = ({ products = defaultProducts, loading = false }) => {
  if (loading) {
    const placeholders = new Array(8).fill(0);
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        {placeholders.map((_, i) => (
          <SkeletonCard key={`s-${i}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
