import React from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isDark?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, isDark = false, checked, ...props }, ref) => {
    return (
      <label className="flex items-center group cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            ref={ref}
            checked={checked}
            className="sr-only"
            {...props}
          />
          <div
            className={clsx(
              'h-5 w-5 rounded transition-all duration-200 border-2 flex items-center justify-center',
              checked
                ? isDark
                  ? 'bg-blue-500 border-blue-500'
                  : 'bg-blue-600 border-blue-600'
                : isDark
                ? 'border-gray-600 group-hover:border-gray-500'
                : 'border-gray-300 group-hover:border-gray-400',
            )}
          >
            {checked && (
              <Check 
                className="h-3 w-3 text-white" 
                strokeWidth={3}
              />
            )}
          </div>
        </div>
        <span 
          className={clsx(
            'ml-3 text-sm transition-colors duration-200',
            isDark 
              ? checked
                ? 'text-gray-200'
                : 'text-gray-400 group-hover:text-gray-300'
              : checked
                ? 'text-gray-900'
                : 'text-gray-600 group-hover:text-gray-800'
          )}
        >
          {label}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';