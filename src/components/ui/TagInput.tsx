import React from 'react';
import { Controller } from 'react-hook-form';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface TagInputProps {
  label?: string;
  name: string;
  control: any;
  error?: string;
}

export const TagInput = ({ label, name, control, error }: TagInputProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field: { value, onChange } }) => (
          <div>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md">
              {value.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => {
                      const newTags = [...value];
                      newTags.splice(index, 1);
                      onChange(newTags);
                    }}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                className={clsx(
                  'flex-1 min-w-[120px] outline-none bg-transparent',
                  error && 'text-red-500'
                )}
                placeholder="Type and press Enter"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const target = e.target as HTMLInputElement;
                    const tag = target.value.trim();
                    if (tag && !value.includes(tag)) {
                      onChange([...value, tag]);
                      target.value = '';
                    }
                  }
                }}
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};