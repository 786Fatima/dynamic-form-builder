import React from "react";

function FormInput({
  name = "",
  label = "",
  placeholder = "",
  type = "text",
  errors = { isError: false, message: "" },
  register = () => {},
  options = [],
  ...props
}) {
  const inputBase =
    "w-full px-3 py-2 border rounded-md bg-white text-sm focus:outline-none transition duration-150 shadow-sm";

  const errorClasses = errors?.isError
    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
    : "border-gray-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300";

  if (type === "checkbox") {
    return (
      <label className="inline-flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          {...register(name)}
          className="w-5 h-5 rounded-md text-indigo-600 border-gray-300"
          {...props}
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    );
  }

  if (props.type === "select") {
    return (
      <select {...props}>
        {props.options &&
          props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    );
  }
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {label}
        </label>
      )}

      {type === "select" && (
        <select
          {...register(name)}
          className={`${inputBase} ${errorClasses}`}
          {...props}
        >
          {options && options.length > 0
            ? options.map((opt) => (
                <option key={opt.value || opt} value={opt.value || opt}>
                  {opt.label || opt}
                </option>
              ))
            : null}
        </select>
      )}

      {type === "textarea" && (
        <textarea
          rows="6"
          {...register(name)}
          className={`${inputBase} ${errorClasses} min-h-[120px]`}
          placeholder={placeholder}
          {...props}
        />
      )}

      {type !== "textarea" && type !== "select" && type !== "checkbox" && (
        <input
          type={type}
          {...register(name)}
          className={`${inputBase} ${errorClasses}`}
          placeholder={placeholder}
          {...props}
        />
      )}

      {errors?.isError && (
        <p className="mt-1 text-sm text-red-500">{errors?.message}</p>
      )}
    </div>
  );
}

export default FormInput;
