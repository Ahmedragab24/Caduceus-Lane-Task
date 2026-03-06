import React from "react";

interface Props {
  children: React.ReactNode;
  variant?: "default" | "gray";
  title?: string;
  className?: string;
}

const CustomCard: React.FC<Props> = ({
  children,
  variant = "default",
  title,
  className,
}) => {
  return (
    <div
      className={`bg-background p-10 rounded-[32px] w-full max-w-[480px] shadow-md border border-border animate-scale-in ${
        variant === "gray" ? "bg-gray-200!" : ""
      } ${className}`}
    >
      {title && (
        <h2 className="text-[32px] font-medium text-[#1e2b58] mb-8">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default CustomCard;
