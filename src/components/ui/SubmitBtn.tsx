import React, { ButtonHTMLAttributes } from "react";

interface SubmitBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "text" | "outline";
}

const SubmitBtn: React.FC<SubmitBtnProps> = ({
  children,
  isLoading = false,
  loadingText = "Loading...",
  variant = "primary",
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "w-full font-medium py-3 text-xl! rounded-md transition-colors flex justify-center items-center gap-2 cursor-pointer";

  const variants = {
    primary: "bg-[#d79d32] hover:bg-[#c89837] text-white",
    text: "bg-transparent text-[#d79d32] hover:text-[#c89837] py-1 w-auto text-sm",
    outline:
      "bg-transparent text-[#d79d32] border border-[#d79d32] hover:bg-[#d79d32] hover:text-white",
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${isDisabled ? "opacity-70 cursor-not-allowed" : ""} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitBtn;
