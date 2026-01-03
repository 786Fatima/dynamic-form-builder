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
      "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary:
      "bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500",
    error: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  const sizes = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-3 text-lg",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${sizes[size]} ${variants[variant]} rounded-md focus:outline-none focus:ring-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default AppButton;
