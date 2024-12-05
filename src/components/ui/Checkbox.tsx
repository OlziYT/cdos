import React from 'react';
import { clsx } from 'clsx';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isDark?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, isDark = false, ...props }, ref) => {
    return (
      <label className="flex items-center">
        <input
          type="checkbox"
          ref={ref}
          className={clsx(
            'h-4 w-4 rounded focus:ring-2',
            isDark 
              ? 'border-gray-600 bg-gray-700 text-blue-400 focus:ring-blue-400 focus:ring-offset-gray-900'
              : 'border-gray-300 bg-white text-blue-600 focus:ring-blue-500 focus:ring-offset-white',
            className
          )}
          {...props}
        />
        <span className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {label}
        </span>
      </label>
    );
  }
);