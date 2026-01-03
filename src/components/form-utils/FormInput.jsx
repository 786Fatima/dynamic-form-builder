import React from "react";

function FormInput({
  name = "",
  label = "",
  placeholder = "",
  type = "text",
  errors = { isError: false, message: "" },
  register = () => {},
  ...props
}) {
  //   if (props.type === "select") {
  //     return (
  //       <select {...props}>
  //         {props.options &&
  //           props.options.map((option) => (
  //             <option key={option.value} value={option.value}>
  //               {option.label}
  //             </option>
  //           ))}
  //       </select>
  //     );
  //   }

  if (type === "checkbox") {
    return (
      <div className="flex align-center space-x-2">
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={props.checked}
          onChange={props.onChange}
          {...props}
        />
        <label htmlFor={name} className="ml-2 text-sm text-gray-700">
          {label}
        </label>
      </div>
    );
  }

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>

      {type == "text" && (
        <input
          type={type}
          {...register(name)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder={placeholder}
        />
      )}
      {type == "textarea" && (
        <textarea
          rows="6"
          {...register(name)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder={placeholder}
        />
      )}
      {errors?.isError && (
        <p className="mt-1 text-sm text-red-500">{errors?.message}</p>
      )}
    </div>
  );
}

export default FormInput;
