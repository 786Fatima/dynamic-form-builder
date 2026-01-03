// Form field validators
export const validators = {
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || "Invalid email address";
  },

  required: (value) => {
    return (value && value.trim() !== "") || "This field is required";
  },

  minLength: (min) => (value) => {
    return (
      (value && value.length >= min) || `Minimum ${min} characters required`
    );
  },

  maxLength: (max) => (value) => {
    return (
      (value && value.length <= max) || `Maximum ${max} characters allowed`
    );
  },

  phone: (value) => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(value) || "Invalid phone number";
  },

  url: (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return "Invalid URL";
    }
  },

  number: (value) => {
    return (!isNaN(value) && value !== "") || "Must be a number";
  },

  custom: (pattern, message) => (value) => {
    const regex = new RegExp(pattern);
    return regex.test(value) || message;
  },
};

// Validate field based on rules
export const validateField = (value, rules) => {
  if (!rules || rules.length === 0) return true;

  for (const rule of rules) {
    const result = rule(value);
    if (result !== true) {
      return result;
    }
  }
  return true;
};
