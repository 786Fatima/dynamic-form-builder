import React, { useState } from "react";
import { Label } from "./Typography";

/**
 * Input Component - Highly reusable input component with theme colors
 * @param {string} type - Input type (text, email, password, number, etc.)
 * @param {string} label - Label text
 * @param {string} placeholder - Placeholder text
 * @param {any} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} error - Error message
 * @param {string} helpText - Help text
 * @param {boolean} disabled - Disabled state
 * @param {boolean} required - Required field
 * @param {string} variant - Input variant (default, filled, outlined)
 * @param {string} size - Input size (sm, md, lg)
 * @param {string} className - Additional CSS classes
 */
const Input = ({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  error,
  helpText,
  disabled = false,
  required = false,
  variant = "outlined",
  size = "md",
  className = "",
  name,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const variantClasses = {
    default: `
      bg-white border-2 border-gray-200
      focus:border-primary-500 focus:ring-2 focus:ring-primary-200
      ${error ? "border-danger-500 focus:border-danger-500 focus:ring-danger-200" : ""}
    `,
    filled: `
      bg-gray-50 border-2 border-transparent
      focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200
      ${error ? "bg-danger-50 focus:border-danger-500 focus:ring-danger-200" : ""}
    `,
    outlined: `
      bg-white border-2 border-gray-200
      focus:border-primary-500 focus:ring-2 focus:ring-primary-200
      ${error ? "border-danger-500 focus:border-danger-500 focus:ring-danger-200" : ""}
    `,
  };

  const baseClasses = `
    w-full
    ${sizeClasses[size] || sizeClasses.md}
    text-gray-900
    rounded-lg
    transition-all duration-200
    focus:outline-none
    disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200
    placeholder-gray-400
    font-medium
    ${variantClasses[variant] || variantClasses.outlined}
    ${isFocused ? "shadow-sm" : ""}
    ${className}
  `.trim().replace(/\s+/g, " ");

  return (
    <div className="w-full mb-4">
      {label && (
        <Label
          htmlFor={name}
          required={required}
          color="gray"
          size="sm"
          weight="semibold"
        >
          {label}
        </Label>
      )}
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={baseClasses}
          {...props}
        />
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="h-5 w-5 text-danger-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm font-medium text-danger-600 flex items-center gap-1">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}
      {helpText && !error && (
        <p className="mt-1.5 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default Input;
