import * as React from "react";
import { cn } from "@/shared/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, helperText, error, required, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex flex-col space-y-1.5 w-full">
        <label
          htmlFor={inputId}
          className="text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)]"
        >
          {label}
          {!required && (
            <span className="ml-1 text-[var(--color-text-secondary)] font-normal">
              (Optional)
            </span>
          )}
        </label>
        
        {helperText && !error && (
          <p className="text-[var(--font-size-xs)] text-[var(--color-text-secondary)]">
            {helperText}
          </p>
        )}

        <input
          type={type}
          id={inputId}
          className={cn(
            "flex h-12 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[var(--font-size-md)] text-[var(--color-text-primary)] transition-colors duration-[var(--animate-fast)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-[var(--color-error-500)] focus-visible:ring-[var(--color-error-500)]",
            className
          )}
          ref={ref}
          required={required}
          {...props}
        />

        {error && (
          <p className="text-[var(--font-size-sm)] text-[var(--color-error-500)] mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
