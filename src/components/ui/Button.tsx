import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'primary-dark' | 'secondary' | 'secondary-dark' | 'outline' | 'outline-dark' | 'ghost' | 'ghost-dark';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md focus-visible:ring-blue-600 focus-visible:ring-offset-white',
      'primary-dark': 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md focus-visible:ring-blue-400 focus-visible:ring-offset-gray-900',
      secondary: 'bg-white text-gray-900 hover:bg-gray-50 hover:shadow-md focus-visible:ring-gray-500 focus-visible:ring-offset-white',
      'secondary-dark': 'bg-gray-700 text-white hover:bg-gray-600 hover:shadow-md focus-visible:ring-gray-400 focus-visible:ring-offset-gray-900',
      outline: 'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-50 hover:shadow-sm focus-visible:ring-gray-500 focus-visible:ring-offset-white',
      'outline-dark': 'border border-gray-600 bg-transparent text-gray-300 hover:bg-gray-700 hover:shadow-sm focus-visible:ring-gray-400 focus-visible:ring-offset-gray-900',
      ghost: 'bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-500 focus-visible:ring-offset-white',
      'ghost-dark': 'bg-transparent text-gray-300 hover:bg-gray-800 focus-visible:ring-gray-400 focus-visible:ring-offset-gray-900',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg',
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';