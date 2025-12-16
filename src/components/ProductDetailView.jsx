import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

// datos estaticos temporales con variantes y galería
const productsData = [
  {
    id: "101",
    name: "Chaqueta de Cuero Premium",
    price: 189.99,
    category: "Ropa",
    images: [
      "https://saratex.cl/wp-content/uploads/2023/12/1.jpg",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=60",
    ],
    colors: ["Marrón", "Negro"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Chaqueta de cuero genuino, estilo clásico y corte slim fit. Material de alta calidad para durabilidad y estilo.",
  },
  {
    id: "202",
    name: "Reloj de Pulsera Minimalista",
    price: 75.0,
    category: "Accesorios",
    images: [
      "https://tse3.mm.bing.net/th/id/OIP.fUpd-URzpOeYAqu20XKL3QHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://images.unsplash.com/photo-1518544882587-6d3c1da0c6f3?auto=format&fit=crop&w=800&q=60",
    ],
    colors: ["Plata", "Negro"],
    description:
      "Reloj elegante con correa de malla y diseño minimalista. Resistente al agua y perfecto para el uso diario.",
  },
  {
    id: "303",
    name: "Auriculares Inalámbricos Pro X",
    price: 150.0,
    category: "Tecnología",
    images: [
      "https://i.pinimg.com/736x/20/c3/83/20c3839c00190714a5d76b5f4e44a0c6.jpg",
      "https://images.unsplash.com/photo-1585386959984-a4155224af0e?auto=format&fit=crop&w=800&q=60",
    ],
    colors: ["Blanco", "Negro"],
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
  {
    id: "505",
    name: "Correa de Cuero Elegante",
    price: 30.0,
    category: "Accesorios",
    images: [
      "https://dcuero.online/wp-content/uploads/2018/10/renzocosta-cuero-correa-hombre-marron-bn17-03..jpg",
    ],
    description: "Correa de cuero premium para cualquier ocasión.",
  },
  {
    id: "606",
    name: "Smartwatch Deportivo (Variante)",
    price: 99.99,
    category: "Tecnología",
    images: [
      "https://img.freepik.com/fotos-premium/smartwatch-blanco-seguimiento-fitness-fondo-dinamico-prueba-agua_979568-2487.jpg",
    ],
    description: "Reloj inteligente con GPS y monitor de ritmo cardíaco.",
  },
  {
    id: "707",
    name: "Gafas de Sol Premium",
    price: 120.0,
    category: "Accesorios",
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/71bGhhbfFkL._AC_UL1500_.jpg",
    ],
    description: "Gafas polarizadas con protección UV.",
  },
  {
    id: "808",
    name: "Cinturón Clásico",
    price: 45.0,
    category: "Accesorios",
    images: [
      "https://tse4.mm.bing.net/th/id/OIP.mo3SV96MLAnwT59-Av4myAHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    ],
    description: "Cinturón de cuero genuino para cualquier ocasión.",
  },
  {
    id: "909",
    name: "Camiseta Casual",
    price: 25.0,
    category: "Ropa",
    images: [
      "https://home.ripley.com.pe/Attachment/WOP_5/YONISTER7/POLO%20B%C3%81SICO%20NEGRO1.jpg",
    ],
    description: "Camiseta 100% algodón, cómoda y duradera.",
  },
  {
    id: "1010",
    name: "Jean Negro",
    price: 65.0,
    category: "Ropa",
    images: [
      "https://i.pinimg.com/736x/4e/57/99/4e5799f235bb4cb89c4c2a39817a348d.jpg",
    ],
    description: "Jean negro de corte slim.",
  },
  {
    id: "1111",
    name: "Auriculares Bluetooth",
    price: 75.0,
    category: "Tecnología",
    images: [
      "https://images.fravega.com/f1000/a22ebf5025c47ae287233d00ff5a1450.jpg",
    ],
    description: "Auriculares inalámbricos con batería de 20h.",
  },
  {
    id: "1212",
    name: "Casaca Urbana",
    price: 149.99,
    category: "Ropa",
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_869336-MPE69401265139_052023-O.webp",
    ],
    description: "Casaca ligera y resistente para ciudad.",
  },
  {
    id: "1313",
    name: "Camisa Casual",
    price: 39.99,
    category: "Ropa",
    images: [
      "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/20058373_1/public",
    ],
    description: "Camisa versátil de uso diario.",
  },
  {
    id: "1414",
    name: "Cadena Decorativa",
    price: 60.0,
    category: "Accesorios",
    images: [
      "https://lionluxury.com.pe/cdn/shop/files/cadenas-para-hombres-lion-luxury-695751.png?v=1734565664",
    ],
    description: "Cadena metálica de diseño moderno.",
  },
  {
    id: "1515",
    name: "Pulsera Minimal",
    price: 35.0,
    category: "Accesorios",
    images: [
      "https://img.ltwebstatic.com/images3_pi/2021/09/08/1631104848eea24b4b46af2a5287a3afaa85d224fb_thumbnail_900x.jpg",
    ],
    description: "Pulsera ajustable de acero inoxidable.",
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

  const gallery =
    product.images && product.images.length
      ? product.images
      : product.imageUrl
      ? [product.imageUrl]
      : [];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : null
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const variantId = `${product.id}-${selectedColor || "def"}-${
      selectedSize || "def"
    }`;
    const cartItem = {
      ...product,
      id: variantId,
      chosenColor: selectedColor,
      chosenSize: selectedSize,
      quantity: quantity,
    };

    addToCart(cartItem);
    alert(
      `${product.name} (${selectedColor || "—"}, ${
        selectedSize || "—"
      }) añadido al carrito.`
    );
  };

  const formatPrice = (price) => `S/ ${price.toFixed(2)}`;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* galería e imagenes */}
        <div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            {gallery.length > 0 ? (
              <img
                src={gallery[selectedImage]}
                alt={`${product.name} - imagen ${selectedImage + 1}`}
                className="w-full h-96 object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-gray-200 rounded-xl">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="mt-4 flex space-x-3">
              {gallery.map((g, idx) => (
                <button
                  key={g}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-md overflow-hidden border ${
                    selectedImage === idx
                      ? "ring-2 ring-amber-400"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={g}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
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

          {/* Opciones: colores y tallas si existen */}
          <div className="mt-6 space-y-4">
            {product.colors && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Color
                </h4>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1 rounded-full border ${
                        selectedColor === c
                          ? "bg-amber-500 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Talla
                </h4>
                <div className="flex items-center gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 rounded-full border ${
                        selectedSize === s
                          ? "bg-amber-500 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cantidad */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2"
                >
                  -
                </button>
                <div className="px-4">{quantity}</div>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="ml-4 flex items-center justify-center space-x-2 bg-amber-500 text-white py-3 px-5 rounded-lg text-lg font-bold hover:bg-amber-600 transition duration-300 shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Añadir al Carrito</span>
              </button>
            </div>
          </div>

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
