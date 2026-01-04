import { FORM_INPUT_TYPES } from "./constants";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

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

export const convertStringToCamelCase = (input) => {
  if (input == null || typeof input !== "string") return input;
  const str = String(input).trim();
  if (str.length === 0) return "";
  const words = str.split(/[\s-_]+/);
  return (
    words[0].toLowerCase() +
    words
      .slice(1)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("")
  );
};

export const generateFieldKey = (input) => {
  if (input == null || typeof input !== "string") return input;
  const str = String(input).trim();
  if (str.length === 0) return "";
  const camelCase = convertStringToCamelCase(str);
  return camelCase;
};

export const getDynamicSchemaAndDefaultValues = (fields) => {
  const defaultFields = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const dynamicSchema = {
    id: yup.string().required(),
  };
  const generateDynamicFieldSchema = (field, fieldType) => {
    let fieldSchema = yup.string();
    switch (fieldType) {
      case FORM_INPUT_TYPES.TEXT:
      case FORM_INPUT_TYPES.TEXTAREA:
        fieldSchema = yup.string();
        break;

      case FORM_INPUT_TYPES.NUMBER:
        fieldSchema = yup.number();
        break;

      case FORM_INPUT_TYPES.SELECT:
        fieldSchema = yup.string();
        break;
      default:
        fieldSchema = yup.string();
    }

    if (field.required) {
      fieldSchema = fieldSchema.required(`${field.label} is required`);
    }

    dynamicSchema[field.key] = fieldSchema;
  };
  const getDynamicFieldCommonValue = (fieldType, fieldOptions = []) => {
    switch (fieldType) {
      case FORM_INPUT_TYPES.TEXT:
      case FORM_INPUT_TYPES.TEXTAREA:
        return "";
      case FORM_INPUT_TYPES.NUMBER:
        return 0;
      case FORM_INPUT_TYPES.SELECT:
        return fieldOptions?.length > 0 ? fieldOptions[0].value : null;
      default:
        return null;
    }
  };
  fields?.map((field) => {
    // get common value
    const commonValue = getDynamicFieldCommonValue(field.type, field.options);
    // generate dynamic schema
    generateDynamicFieldSchema(field, field.type);
    defaultFields[field.key] = field.defaultValue || commonValue;
  });
  return { defaultFields, dynamicSchema };
};
