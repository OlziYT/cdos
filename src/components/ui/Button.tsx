import { clsx } from "clsx";
import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
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
    const baseClasses = clsx(
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto",
      isDark
        ? "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md focus-visible:ring-blue-400 focus-visible:ring-offset-gray-900"
        : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md focus-visible:ring-blue-600 focus-visible:ring-offset-white",
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
