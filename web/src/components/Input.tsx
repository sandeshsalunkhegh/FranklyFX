import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftAddon, rightAddon, className = '', id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={`flex flex-col space-y-1.5 ${className}`}>
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 font-medium">{leftAddon}</span>
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full py-2.5 bg-white border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${
              leftAddon ? 'pl-10' : 'px-4'
            } ${rightAddon ? 'pr-10' : 'px-4'} ${
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 hover:border-gray-300'
            }`}
            {...props}
          />
          {rightAddon && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-gray-500 font-medium">{rightAddon}</span>
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p className={`text-xs ${error ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
