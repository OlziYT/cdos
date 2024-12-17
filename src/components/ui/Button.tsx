import { clsx } from "clsx";
import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 
    | "primary"
    | "primary-dark"
    | "secondary"
    | "outline"
    | "outline-dark"
    | "danger";
  size?: "sm" | "md" | "lg";
  isDark?: boolean;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isDark = false,
      isLoading = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary: "bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600",
      "primary-dark":
        "bg-blue-500 text-white hover:bg-blue-400 focus-visible:outline-blue-500",
      secondary:
        "bg-gray-800 text-white hover:bg-gray-900 focus-visible:outline-gray-600",
      outline:
        "bg-white text-gray-900 border-gray-300 hover:bg-gray-50 focus-visible:outline-blue-600",
      "outline-dark":
        "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700/50 focus-visible:outline-blue-500",
      danger:
        "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600",
    };

    const baseClasses = clsx(
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto",
      isDark
        ? "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md focus-visible:ring-blue-400 focus-visible:ring-offset-gray-900"
        : variantStyles[variant],
      {
        "h-12 px-6 text-lg": size === "lg",
        "h-10 px-4": size === "md",
        "h-8 px-3 text-sm": size === "sm",
      },
      className
    );

    return (
      <button ref={ref} className={baseClasses} disabled={isLoading} {...props}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
