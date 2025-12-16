import React, { useState } from "react";

const PaymentModal = ({ open, amount = 0, onClose, onPaid }) => {
  const [method, setMethod] = useState("card");
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!open) return null;

  const handleConfirm = () => {
    if (method === "card" && (!name || card.replace(/\s/g, "").length < 12)) {
      alert("Completa los datos de la tarjeta.");
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      const tx = `txn-${Date.now()}`;
      setProcessing(false);
      if (typeof onPaid === "function") {
        onPaid({ transactionId: tx, method });
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-10 p-6">
        <h3 className="text-lg font-semibold mb-2">Metodo de pago</h3>
        <p className="text-sm text-gray-600 mb-4">
          Total: <span className="font-bold">S/ {amount.toFixed(2)}</span>
        </p>

        <div className="flex gap-2 mb-4">
          {["card", "paypal", "bank"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 py-2 px-3 rounded border text-sm font-medium transition ${
                method === m
                  ? "bg-amber-100 border-amber-500 text-amber-900"
                  : "bg-gray-50 border-gray-300 text-gray-600"
              }`}
            >
              {m === "card"
                ? "Tarjeta"
                : m === "paypal"
                ? "PayPal"
                : "Transferencia"}
            </button>
          ))}
        </div>

        {method === "card" && (
          <div className="space-y-2 mb-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre en tarjeta"
              className="w-full border rounded px-3 py-2 text-sm"
            />
            <input
              value={card}
              onChange={(e) => setCard(e.target.value)}
              placeholder="4242 4242 4242 4242"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        )}

        {method === "paypal" && (
          <p className="text-sm text-gray-600 mb-4">
            Seras redirigido a PayPal para completar.
          </p>
        )}

        {method === "bank" && (
          <p className="text-sm text-gray-600 mb-4">
            Cuenta: 123-456-789. Referencia: tu ID.
          </p>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            disabled={processing}
            className="flex-1 bg-amber-500 text-white py-2 rounded font-medium hover:bg-amber-600 disabled:opacity-50"
          >
            {processing ? "Procesando..." : "Pagar"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
