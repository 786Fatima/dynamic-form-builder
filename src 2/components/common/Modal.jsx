import React from "react";
import Button from "./Button";
import { Heading } from "./Typography";

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "primary",
  size = "md",
  className = "",
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className={`inline-block align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle ${
            sizeClasses[size] || sizeClasses.md
          } w-full ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 px-6 py-4 sm:px-8">
              <div className="flex items-center justify-between">
                <Heading variant="h3" size="lg" color="white" weight="semibold">
                  {title}
                </Heading>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Body */}
          <div className="bg-white px-6 py-4 sm:px-8">{children}</div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse gap-3">
            {onConfirm && (
              <Button
                onClick={onConfirm}
                variant={confirmVariant}
                className="w-full sm:w-auto"
              >
                {confirmText}
              </Button>
            )}
            <Button
              onClick={onClose}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {cancelText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
