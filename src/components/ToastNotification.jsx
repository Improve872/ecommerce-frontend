import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Check } from "lucide-react";

const ToastNotification = () => {
  const [toast, setToast] = useState(null);
  const { setOnItemAdded } = useCart();

  useEffect(() => {
    setOnItemAdded((product) => {
      setToast(product);
      setTimeout(() => setToast(null), 3000);
    });
  }, [setOnItemAdded]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 border-l-4 border-green-500">
        <div className="bg-green-100 rounded-full p-2">
          <Check className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{toast.name}</p>
          <p className="text-sm text-gray-600">Añadido al carrito</p>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
