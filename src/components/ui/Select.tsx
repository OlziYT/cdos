import React from 'react';
import { clsx } from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  isDark?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, children, isDark = false, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            'block w-full rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1',
            isDark
              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400'
              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500',
            error && isDark
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
              : 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-500'}`}>{error}</p>
        )}
      </div>
    );
  }
);