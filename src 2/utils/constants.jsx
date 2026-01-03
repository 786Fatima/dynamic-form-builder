// Field types available in form builder
export const FIELD_TYPES = {
  TEXT: "text",
  EMAIL: "email",
  PASSWORD: "password",
  NUMBER: "number",
  PHONE: "phone",
  TEXTAREA: "textarea",
  SELECT: "select",
  RADIO: "radio",
  CHECKBOX: "checkbox",
  DATE: "date",
  TIME: "time",
  FILE: "file",
  URL: "url",
};

// Field type labels for UI
export const FIELD_LABELS = {
  text: "Text",
  email: "Email",
  password: "Password",
  number: "Number",
  phone: "Phone",
  textarea: "Text Area",
  select: "Select Dropdown",
  radio: "Radio Button",
  checkbox: "Checkbox",
  date: "Date",
  time: "Time",
  file: "File Upload",
  url: "URL",
};

// Default field config
export const DEFAULT_FIELD_CONFIG = {
  label: "",
  type: FIELD_TYPES.TEXT,
  placeholder: "",
  required: false,
  helpText: "",
  options: [],
  validation: [],
};

// LocalStorage key for forms
export const FORMS_STORAGE_KEY = "dynamic_forms";

// Validation rules presets
export const VALIDATION_PRESETS = {
  EMAIL: "email",
  REQUIRED: "required",
  MIN_LENGTH: "minLength",
  MAX_LENGTH: "maxLength",
  PHONE: "phone",
  URL: "url",
  NUMBER: "number",
};
