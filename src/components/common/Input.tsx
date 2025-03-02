import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, error, className, ...props }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
    const fieldError = (errors[name]?.message as string | undefined) || error;
    return (
      <div className="flex flex-col space-y-1">
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <input
          id={name}
          {...register(name)}
          className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${fieldError ? "border-red-500" : "border-gray-300"}
            ${className || ""}`}
          {...props}
          ref={ref}
        />
        {fieldError && <p className="text-sm text-red-600">{fieldError}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";