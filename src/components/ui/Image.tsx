import React, { useState, ImgHTMLAttributes } from "react";
import { IconType } from "react-icons";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  containerClassName?: string;
  icon?: IconType;
  iconClassName?: string;
  iconSize?: number | string;
}

const CustomImage = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      className = "",
      containerClassName = "",
      fallback = "https://placehold.co/600x400?text=Not+Found",
      loading = "lazy",
      decoding = "async",
      icon: Icon,
      iconClassName = "",
      iconSize,
      ...props
    },
    ref,
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    if (Icon) {
      return (
        <Icon className={`inline-block ${iconClassName}`} size={iconSize} />
      );
    }

    return (
      <div
        className={`relative overflow-hidden flex items-center justify-center ${containerClassName}`}
      >
        {/* Loading Skeleton */}
        {isLoading && !hasError && src && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {src ? (
          <img
            ref={ref}
            src={hasError ? fallback : src}
            alt={alt || ""}
            loading={loading}
            decoding={decoding}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className={`transition-opacity duration-300 w-full h-full object-cover ${
              isLoading ? "opacity-0" : "opacity-100"
            } ${className}`}
            {...props}
          />
        ) : (
          <div
            className={`bg-gray-100 w-full h-full flex items-center justify-center text-gray-400 text-sm ${className}`}
          >
            No source
          </div>
        )}
      </div>
    );
  },
);

CustomImage.displayName = "CustomImage";

export default CustomImage;
