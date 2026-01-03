import React from "react";

/**
 * Heading Component - Reusable heading component with multiple variants
 * @param {string} variant - h1, h2, h3, h4, h5, h6
 * @param {string} size - xs, sm, md, lg, xl, 2xl, 3xl, 4xl
 * @param {string} color - primary, secondary, success, danger, warning, gray, white
 * @param {string} weight - light, normal, medium, semibold, bold
 * @param {string} align - left, center, right
 * @param {string} className - Additional CSS classes
 */
export const Heading = ({
  variant = "h1",
  size,
  color = "gray",
  weight = "bold",
  align = "left",
  className = "",
  children,
  ...props
}) => {
  const Component = variant;

  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
  };

  const defaultSizes = {
    h1: "text-4xl md:text-5xl",
    h2: "text-3xl md:text-4xl",
    h3: "text-2xl md:text-3xl",
    h4: "text-xl md:text-2xl",
    h5: "text-lg md:text-xl",
    h6: "text-base md:text-lg",
  };

  const colorClasses = {
    primary: "text-primary-600",
    secondary: "text-secondary-700",
    success: "text-success-600",
    danger: "text-danger-600",
    warning: "text-warning-600",
    gray: "text-gray-900",
    white: "text-white",
  };

  const weightClasses = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const sizeClass = size
    ? sizeClasses[size]
    : defaultSizes[variant] || defaultSizes.h1;

  const classes = `
    ${sizeClass}
    ${colorClasses[color] || colorClasses.gray}
    ${weightClasses[weight] || weightClasses.bold}
    ${alignClasses[align] || alignClasses.left}
    ${className}
  `.trim().replace(/\s+/g, " ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

/**
 * Text Component - Reusable text component with multiple variants
 * @param {string} variant - p, span, div, label
 * @param {string} size - xs, sm, md, lg, xl
 * @param {string} color - primary, secondary, success, danger, warning, gray, muted
 * @param {string} weight - light, normal, medium, semibold, bold
 * @param {string} align - left, center, right
 * @param {boolean} italic - Apply italic styling
 * @param {string} className - Additional CSS classes
 */
export const Text = ({
  variant = "p",
  size = "md",
  color = "gray",
  weight = "normal",
  align = "left",
  italic = false,
  className = "",
  children,
  ...props
}) => {
  const Component = variant;

  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const colorClasses = {
    primary: "text-primary-600",
    secondary: "text-secondary-700",
    success: "text-success-600",
    danger: "text-danger-600",
    warning: "text-warning-600",
    gray: "text-gray-900",
    muted: "text-gray-600",
    white: "text-white",
  };

  const weightClasses = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const classes = `
    ${sizeClasses[size] || sizeClasses.md}
    ${colorClasses[color] || colorClasses.gray}
    ${weightClasses[weight] || weightClasses.normal}
    ${alignClasses[align] || alignClasses.left}
    ${italic ? "italic" : ""}
    ${className}
  `.trim().replace(/\s+/g, " ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

/**
 * Label Component - Reusable label component
 */
export const Label = ({
  size = "sm",
  color = "gray",
  weight = "semibold",
  required = false,
  className = "",
  children,
  ...props
}) => {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
  };

  const colorClasses = {
    primary: "text-primary-700",
    secondary: "text-secondary-700",
    gray: "text-gray-700",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const classes = `
    block
    ${sizeClasses[size] || sizeClasses.sm}
    ${colorClasses[color] || colorClasses.gray}
    ${weightClasses[weight] || weightClasses.semibold}
    mb-2
    ${className}
  `.trim().replace(/\s+/g, " ");

  return (
    <label className={classes} {...props}>
      {children}
      {required && <span className="text-danger-500 ml-1">*</span>}
    </label>
  );
};

export default { Heading, Text, Label };

