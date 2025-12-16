import React from "react";

const ModalConfirm = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-10">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-3 text-sm text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
