import { InputHTMLAttributes, useState, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, type = "text", className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const currentType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-[#475467] font-medium text-sm mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            {...props}
            type={currentType}
            ref={ref}
            className={`w-full text-primary p-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#d79d32] focus:ring-offset-0 focus:border-[#d79d32] focus:shadow-md ${
              error ? "border-red-500" : "border-gray-800"
            } ${isPassword ? "pr-10" : ""} ${className}`}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
