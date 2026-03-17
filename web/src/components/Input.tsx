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
        <div 
          className={`flex items-center w-full bg-white border rounded-xl overflow-hidden transition-shadow focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${
            error ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-200' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          {leftAddon && (
            <div className="pl-4 pr-2 flex items-center pointer-events-none bg-transparent">
              <span className="text-gray-500 font-medium">{leftAddon}</span>
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`flex-1 py-2.5 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none ${
              !leftAddon ? 'pl-4' : ''
            } ${!rightAddon ? 'pr-4' : ''}`}
            {...props}
          />
          {rightAddon && (
            <div className="pr-4 pl-2 flex items-center pointer-events-none bg-transparent">
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
