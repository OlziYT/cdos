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
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            'block w-full rounded-md border py-2 pl-3 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
            {
              'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400': isDark,
              'bg-white border-gray-300 text-gray-900 placeholder-gray-500': !isDark,
              'focus:border-blue-500 focus:ring-blue-500': !error && !isDark,
              'focus:border-blue-400 focus:ring-blue-400 focus:ring-offset-gray-900': !error && isDark,
              'border-red-500 focus:border-red-500 focus:ring-red-500': error && !isDark,
              'border-red-400 focus:border-red-400 focus:ring-red-400 focus:ring-offset-gray-900': error && isDark,
            },
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className={`mt-1 text-sm ${isDark ? 'text-red-400' : 'text-red-500'}`}>{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';