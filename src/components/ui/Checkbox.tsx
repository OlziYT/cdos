import React from 'react';
import { clsx } from 'clsx';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center">
        <input
          type="checkbox"
          ref={ref}
          className={clsx(
            'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
            className
          )}
          {...props}
        />
        <span className="ml-2 text-sm text-gray-700">{label}</span>
      </label>
    );
  }
);