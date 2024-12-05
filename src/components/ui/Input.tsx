import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  isDark?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, isDark = false, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              'flex h-10 w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              icon && 'pl-10',
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-400 focus:ring-offset-gray-900'
                : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:ring-blue-500 focus:ring-offset-white',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-500'}`}>{error}</p>
        )}
      </div>
    );
  }
);