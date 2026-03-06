import React from "react";
import { createPortal } from "react-dom";
import { FaCheckCircle } from "react-icons/fa";
import Button from "./Button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-background border border-border rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center animate-scale-in">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full animate-bounce-subtle">
            <FaCheckCircle className="text-green-500 w-12 h-12" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>

        <p className="text-gray-500 mb-8">{message}</p>

        <Button
          onClick={onClose}
          className="w-full text-lg h-12 rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Back to Login
        </Button>
      </div>
    </div>,
    document.body,
  );
};

export default SuccessModal;
