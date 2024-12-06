import React from 'react';
import { Controller } from 'react-hook-form';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface TagInputProps {
  label?: string;
  name: string;
  control: any;
  error?: string;
  isDark?: boolean;
}

export const TagInput = ({ label, name, control, error, isDark = false }: TagInputProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field: { value, onChange } }) => (
          <div>
            <div className={clsx(
              'flex flex-wrap gap-2 p-2 border rounded-md',
              isDark 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-300'
            )}>
              {value.map((tag: string, index: number) => (
                <span
                  key={index}
                  className={clsx(
                    'inline-flex items-center px-2 py-1 rounded-md text-sm font-medium',
                    isDark
                      ? 'bg-blue-900/50 text-blue-200'
                      : 'bg-blue-100 text-blue-800'
                  )}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => {
                      const newTags = [...value];
                      newTags.splice(index, 1);
                      onChange(newTags);
                    }}
                    className={clsx(
                      'ml-1',
                      isDark
                        ? 'text-blue-300 hover:text-blue-200'
                        : 'text-blue-600 hover:text-blue-800'
                    )}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                className={clsx(
                  'flex-1 min-w-[120px] outline-none',
                  isDark
                    ? 'bg-transparent text-white placeholder:text-gray-400'
                    : 'bg-transparent text-gray-900 placeholder:text-gray-500',
                  error && isDark
                    ? 'text-red-400'
                    : 'text-red-500'
                )}
                placeholder="Type and press Enter"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const target = e.target as HTMLInputElement;
                    const newTag = target.value.trim();
                    if (newTag && !value.includes(newTag)) {
                      onChange([...value, newTag]);
                      target.value = '';
                    }
                  }
                }}
              />
            </div>
            {error && (
              <p className={`mt-1 text-sm ${isDark ? 'text-red-400' : 'text-red-500'}`}>
                {error}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};