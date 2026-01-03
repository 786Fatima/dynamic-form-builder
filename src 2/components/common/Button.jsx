import React from "react";

/**
 * Button Component - Highly reusable button component with theme colors
 * @param {string} variant - Button variant (primary, secondary, success, danger, warning, outline, ghost)
 * @param {string} size - Button size (sm, md, lg, xl)
 * @param {boolean} disabled - Disabled state
 * @param {boolean} fullWidth - Full width button
 * @param {string} type - Button type (button, submit, reset)
 * @param {string} className - Additional CSS classes
 */
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  fullWidth = false,
  ...props
}) => {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none inline-flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500 shadow-lg hover:shadow-xl active:scale-[0.98]",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300 hover:border-gray-400 active:scale-[0.98]",
    success:
      "bg-gradient-to-r from-success-600 to-success-700 text-white hover:from-success-700 hover:to-success-800 focus:ring-success-500 shadow-lg hover:shadow-xl active:scale-[0.98]",
    danger:
      "bg-gradient-to-r from-danger-600 to-danger-700 text-white hover:from-danger-700 hover:to-danger-800 focus:ring-danger-500 shadow-lg hover:shadow-xl active:scale-[0.98]",
    warning:
      "bg-gradient-to-r from-warning-500 to-warning-600 text-white hover:from-warning-600 hover:to-warning-700 focus:ring-warning-500 shadow-lg hover:shadow-xl active:scale-[0.98]",
    outline:
      "bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 active:scale-[0.98]",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const sizeClasses = sizes[size] || sizes.md;
  const variantClasses = variants[variant] || variants.primary;
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
