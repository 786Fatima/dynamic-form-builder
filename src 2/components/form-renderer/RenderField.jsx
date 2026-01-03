import React, { useState } from "react";
import { FIELD_TYPES } from "../../utils/constants";
import { Label, Text } from "../common/Typography";
import ValidationMessage from "./ValidationMessage";

const RenderField = ({ field, value = "", onChange, error = null }) => {
  const { type, label, placeholder, required, helpText, options, id } = field;

  const renderInput = () => {
    const baseInputClasses = `form-input ${
      error
        ? "border-danger-500 focus:border-danger-500 focus:ring-danger-200"
        : ""
    }`;

    switch (type) {
      case FIELD_TYPES.TEXT:
      case FIELD_TYPES.EMAIL:
      case FIELD_TYPES.PASSWORD:
      case FIELD_TYPES.NUMBER:
      case FIELD_TYPES.PHONE:
      case FIELD_TYPES.URL:
      case FIELD_TYPES.DATE:
      case FIELD_TYPES.TIME:
        return (
          <input
            type={type}
            id={id}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={`${baseInputClasses}`}
          />
        );

      case FIELD_TYPES.TEXTAREA:
        return (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            required={required}
            rows={4}
            className={`${baseInputClasses} resize-none`}
          />
        );

      case FIELD_TYPES.SELECT:
        return (
          <select
            id={id}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            required={required}
            className={`${baseInputClasses} appearance-none bg-white cursor-pointer`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "36px",
            }}
          >
            <option value="">-- Select {label} --</option>
            {options?.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case FIELD_TYPES.RADIO:
        return (
          <fieldset className="space-y-3">
            {options?.map((opt, idx) => (
              <label
                key={idx}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="radio"
                  name={id}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => onChange?.(e.target.value)}
                  className="w-5 h-5 text-primary-600 border-2 border-gray-200 focus:ring-2 focus:ring-primary-500"
                  required={required}
                />
                <span className="ml-3 text-gray-700 font-medium group-hover:text-gray-900">
                  {opt}
                </span>
              </label>
            ))}
          </fieldset>
        );

      case FIELD_TYPES.CHECKBOX:
        return (
          <fieldset className="space-y-3">
            {options?.map((opt, idx) => (
              <label
                key={idx}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  value={opt}
                  checked={Array.isArray(value) && value.includes(opt)}
                  onChange={(e) => {
                    const newValue = Array.isArray(value) ? [...value] : [];
                    if (e.target.checked) {
                      newValue.push(opt);
                    } else {
                      newValue.splice(newValue.indexOf(opt), 1);
                    }
                    onChange?.(newValue);
                  }}
                  className="w-5 h-5 text-primary-600 border-2 border-gray-200 rounded focus:ring-2 focus:ring-primary-500"
                />
                <span className="ml-3 text-gray-700 font-medium group-hover:text-gray-900">
                  {opt}
                </span>
              </label>
            ))}
          </fieldset>
        );

      case FIELD_TYPES.FILE:
        return (
          <div className="relative">
            <input
              type="file"
              id={id}
              onChange={(e) => onChange?.(e.target.files?.[0]?.name || "")}
              required={required}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-700 cursor-pointer"
            />
          </div>
        );

      default:
        return (
          <input
            type="text"
            className={`${baseInputClasses} ${errorClasses}`}
          />
        );
    }
  };

  return (
    <div className="mb-6">
      {label && (
        <Label
          htmlFor={id}
          size="sm"
          color="gray"
          weight="semibold"
          required={required}
        >
          {label}
        </Label>
      )}

      {renderInput()}

      {helpText && !error && (
        <Text size="sm" color="muted" italic className="mt-2">
          {helpText}
        </Text>
      )}

      {error && <ValidationMessage message={error} />}
    </div>
  );
};

export default RenderField;
