import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-[#E0F7FF] via-[#CFE7FF] to-[#E4ECFF] rounded-t-xl">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 transition-colors"
            aria-label="Close modal"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 text-gray-700">{children}</div>

        {/* Footer (Optional) */}
        
      </div>
    </div>
  );
};

export default Modal;
