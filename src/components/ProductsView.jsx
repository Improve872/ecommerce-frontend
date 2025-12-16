import React, { useMemo, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import ProductGrid from "./ProductGrid";

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
  {
    id: "707",
    name: "Gafas de Sol Premium",
    category: "Accesorios",
    price: 120.0,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/71bGhhbfFkL._AC_UL1500_.jpg",
    description: "Gafas polarizadas con protección UV.",
  },
  {
    id: "808",
    name: "Cinturón Clásico",
    category: "Accesorios",
    price: 45.0,
    imageUrl:
      "https://tse4.mm.bing.net/th/id/OIP.mo3SV96MLAnwT59-Av4myAHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Cinturón de cuero genuino para cualquier ocasión.",
  },
  {
    id: "909",
    name: "Camiseta Casual",
    category: "Ropa",
    price: 25.0,
    imageUrl:
      "https://home.ripley.com.pe/Attachment/WOP_5/YONISTER7/POLO%20B%C3%81SICO%20NEGRO1.jpg",
    description: "Camiseta 100% algodón, cómoda y duradera.",
  },
  {
    id: "1010",
    name: "Jean Negro",
    category: "Ropa",
    price: 65.0,
    imageUrl:
      "https://i.pinimg.com/736x/4e/57/99/4e5799f235bb4cb89c4c2a39817a348d.jpg",
    description: "Jean negro de corte slim.",
  },
  {
    id: "1111",
    name: "Auriculares Bluetooth",
    category: "Tecnología",
    price: 75.0,
    imageUrl:
      "https://images.fravega.com/f1000/a22ebf5025c47ae287233d00ff5a1450.jpg",
    description: "Auriculares inalámbricos con batería de 20h.",
  },
  {
    id: "1212",
    name: "Casaca Urbana",
    category: "Ropa",
    price: 149.99,
    imageUrl:
      "https://http2.mlstatic.com/D_NQ_NP_869336-MPE69401265139_052023-O.webp",
    description: "Casaca ligera y resistente para ciudad.",
  },
  {
    id: "1313",
    name: "Camisa Casual",
    category: "Ropa",
    price: 39.99,
    imageUrl:
      "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/20058373_1/public",
    description: "Camisa versátil de uso diario.",
  },
  {
    id: "1414",
    name: "Cadena Decorativa",
    category: "Accesorios",
    price: 60.0,
    imageUrl:
      "https://lionluxury.com.pe/cdn/shop/files/cadenas-para-hombres-lion-luxury-695751.png?v=1734565664",
    description: "Cadena metálica de diseño moderno.",
  },
  {
    id: "1515",
    name: "Pulsera Minimal",
    category: "Accesorios",
    price: 35.0,
    imageUrl:
      "https://img.ltwebstatic.com/images3_pi/2021/09/08/1631104848eea24b4b46af2a5287a3afaa85d224fb_thumbnail_900x.jpg",
    description: "Pulsera ajustable de acero inoxidable.",
  },
];

const CATEGORIES = [
  { key: "", label: "Todos" },
  { key: "ropa", label: "Ropa" },
  { key: "accesorios", label: "Accesorios" },
  { key: "tecnologia", label: "Tecnología" },
];

const ProductsView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const normalizeKey = (s) =>
    s
      ? s
          .normalize("NFD")
          .replace(/[[\u0300-\u036f]/g, "")
          .toLowerCase()
      : "";

  const filtered = useMemo(() => {
    let list = productsData;
    if (category) {
      const catKey = normalizeKey(category);
      list = list.filter((p) => normalizeKey(p.category) === catKey);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }
    // Filtro por precio
    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    return list;
  }, [category, search, minPrice, maxPrice]);

  const handleTabClick = (key) => {
    const params = new URLSearchParams();
    if (key) params.set("category", key);
    navigate({ pathname: "/products", search: params.toString() });
  };

  const title = category
    ? `Colección: ${category.toUpperCase()}`
    : search
    ? `Resultados para: "${search}"`
    : "Catálogo";

  return (
    <section className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
          {title}
        </h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => handleTabClick(c.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition 
                  ${
                    c.key === category
                      ? "bg-amber-500 text-white"
                      : "bg-white border text-gray-700"
                  }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements.search.value.trim();
                const params = new URLSearchParams();
                if (category) params.set("category", category);
                if (input) params.set("search", input);
                navigate({ pathname: "/products", search: params.toString() });
              }}
            >
              <input
                name="search"
                defaultValue={search}
                placeholder="Buscar en catálogo..."
                className="px-3 py-2 rounded-lg border focus:outline-none"
              />
              <button className="ml-2 px-3 py-2 bg-amber-500 text-white rounded-lg">
                Buscar
              </button>
            </form>
          </div>
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-gray-900 mb-3">Filtro de Precio</h3>
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Mínimo: S/ {minPrice}
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Máximo: S/ {maxPrice}
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <button
              onClick={() => {
                setMinPrice(0);
                setMaxPrice(500);
              }}
              className="text-sm px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Limpiar
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-600">No se encontraron productos.</p>
        ) : (
          <ProductGrid products={filtered} />
        )}
      </div>
    </section>
  );
};

export default ProductsView;
