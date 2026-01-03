import React from "react";

function AppButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-purple-300",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-200",
    error:
      "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-300",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm md:text-base",
    large: "px-5 py-3 text-base md:text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 ${sizes[size]} ${variants[variant]} rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 shadow-sm transition transform hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default AppButton;
