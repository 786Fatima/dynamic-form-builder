export const capitalizeWords = (input) => {
  if (input == null || typeof input !== "string") return input;
  const str = String(input).trim();
  if (str.length === 0) return "";

  return str
    .split(/\s+/)
    .map((word) =>
      // Preserve separators like hyphen and apostrophe but capitalize each segment
      word
        .split(/([-'])/)
        .map((seg) => {
          if (seg === "-" || seg === "'") return seg;
          return seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase();
        })
        .join("")
    )
    .join(" ")
    .replaceAll("_", " ");
};
