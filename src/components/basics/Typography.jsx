import React from "react";

function Typography({ children, variant = "body", className = "" }) {
  const variants = {
    h1: "text-xl md:text-3xl font-bold text-blue-700",
    h2: "text-xl md:text-2xl font-bold text-blue-700",
    h3: "text-lg md:text-xl font-bold text-blue-700",
    h4: "text-sm md:text-lg font-medium text-blue-700",
    h5: "text-sm font-medium text-blue-700",
    body: "text-xs md:text-base",
  };

  return <p className={`${variants[variant]} ${className}`}>{children}</p>;
}

export default Typography;
