import React from "react";

function Typography({ children, variant = "body", className = "" }) {
  const variants = {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-bold",
    h3: "text-xl font-bold",
    body: "text-base",
  };

  return <p className={`${variants[variant]} ${className}`}>{children}</p>;
}

export default Typography;
