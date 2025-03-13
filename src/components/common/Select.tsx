import React, { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { string } from "zod";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  name: string;
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ name, label, options, error, placeholder, className, ...props }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
    const fieldError = (errors[name]?.message as string | undefined) || error;

    return (
      <div className="flex flex-col space-y-1">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          id={name}
          {...register(name)}
          className={` px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${fieldError ? "border-red-500" : "border-gray-300"}
            ${className || ""}`}
          {...props}
          ref={ref}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {fieldError && <p className="text-sm text-red-600">{fieldError}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
