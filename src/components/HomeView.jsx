import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HeroSection from "./HeroSection";
import PromoCarousel from "./PromoCarousel";
import ProductGrid from "./ProductGrid";

// URL para la conexión al backend
const API_URL = "http://localhost:4000/api/products";

// datos estaticos temporales
const productsData = [
  {
    id: "101",
    name: "Chaqueta de Cuero Premium",
    category: "Ropa",
    price: 189.99,
    imageUrl: "https://saratex.cl/wp-content/uploads/2023/12/1.jpg",
    description: "Chaqueta de cuero genuino, estilo clásico y corte slim fit.",
  },
  {
    id: "202",
    name: "Reloj de Pulsera Minimalista",
    category: "Accesorios",
    price: 75.0,
    imageUrl:
      "https://tse3.mm.bing.net/th/id/OIP.fUpd-URzpOeYAqu20XKL3QHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Reloj elegante con correa de malla y diseño minimalista.",
  },
  {
    id: "303",
    name: "Auriculares Inalámbricos Pro X",
    category: "Tecnología",
    price: 150.0,
    imageUrl:
      "https://i.pinimg.com/736x/20/c3/83/20c3839c00190714a5d76b5f4e44a0c6.jpg",
    description:
      "Auriculares con cancelación de ruido activa y 30 horas de batería.",
  },
  {
    id: "404",
    name: "Camisa Oxford Clásica",
    category: "Ropa",
    price: 45.99,
    imageUrl:
      "https://tse1.mm.bing.net/th/id/OIP.Pb4LJyKM83RBHzRMy61fHwHaHa?cb=ucfimg2&pid=ImgDet&ucfimg=1&w=190&h=190&c=7&o=7&rm=3",
    description:
      "Camisa de algodón Oxford 100%, ideal para un look formal o casual.",
  },
  {
    id: "505",
    name: "Correa de Cuero Elegante",
    category: "Accesorios",
    price: 30.0,
    imageUrl:
      "https://dcuero.online/wp-content/uploads/2018/10/renzocosta-cuero-correa-hombre-marron-bn17-03..jpg",
    description: "Correa de cuero premium para cualquier ocasión.",
  },
  {
    id: "606",
    name: "Smartwatch Deportivo",
    category: "Tecnología",
    price: 99.99,
    imageUrl:
      "https://img.freepik.com/fotos-premium/smartwatch-blanco-seguimiento-fitness-fondo-dinamico-prueba-agua_979568-2487.jpg",
    description: "Reloj inteligente con GPS y monitor de ritmo cardíaco.",
  },
];

const HomeView = () => {
  const [products, setProducts] = useState(productsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();

  // Obtener parámetros de la URL
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  useEffect(() => {
    // **********************************************
    // logica de fetch AL BACKEND
    // const fetchProducts = async () => {
    //     setLoading(true);
    //     const url = category
    //         ? `${API_URL}?category=${category}`
    //         : search
    //         ? `${API_URL}?search=${search}`
    //         : API_URL;
    //
    //     try {
    //         const response = await fetch(url);
    //         const data = await response.json();
    //         setProducts(data);
    //     } catch (err) {
    //         setError("Error al cargar productos del servidor.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // fetchProducts();
    // **********************************************

    // simulacion temporal
    let filteredProducts = productsData;

    // filtro por categoria
    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category.toLowerCase() === category
      );
    }

    // filtro por busqueda
    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerCaseSearch) ||
          (p.description &&
            p.description.toLowerCase().includes(lowerCaseSearch))
      );
    }

    setProducts(filteredProducts);
  }, [category, search]); // Se ejecuta cada vez que los filtros cambian

  // Determinar el título a mostrar
  const title = category
    ? `Colección: ${category.toUpperCase()}`
    : search
    ? `Resultados para: "${search}"`
    : "Productos Destacados";

  // Renderizado Condicional
  let content;

  if (loading) {
    content = (
      <p className="text-center text-xl mt-12 text-blue-600">
        Cargando datos del backend...
      </p>
    );
  } else if (error) {
    content = <p className="text-center text-xl mt-12 text-red-600">{error}</p>;
  } else if (products.length === 0) {
    content = (
      <p className="text-center text-xl mt-12 text-gray-600">
        No hay productos que coincidan con la selección.
      </p>
    );
  } else {
    // Pasa los productos filtrados/obtenidos al ProductGrid
    content = <ProductGrid products={products} />;
  }

  return (
    <>
      <HeroSection />

      {/* Carrusel promocional */}
      <section className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PromoCarousel />
        </div>
      </section>

      {/* seccion de productos destacados */}
      <section className="bg-gray-100 py-16">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* titulo dinamico */}
          <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
            {title}
          </h2>

          {/* mostrar contenido */}
          {content}
        </main>
      </section>
    </>
  );
};

export default HomeView;
