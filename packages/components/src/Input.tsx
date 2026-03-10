import { forwardRef, type InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label displayed above the input */
  label?: string;
  /** Error message - shows error state when present */
  error?: string;
}

/**
 * Text input for forms.
 * Use `label` for accessibility and `error` for validation feedback.
 *
 * @example
 * ```tsx
 * <Input label="Email" placeholder="you@example.com" />
 * <Input label="Name" error="Name is required" />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2)}`;
    return (
      <div className={`hepta-input-wrapper ${error ? 'hepta-input-wrapper--error' : ''}`}>
        {label && (
          <label htmlFor={inputId} className="hepta-input-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`hepta-input ${className}`.trim()}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <span id={`${inputId}-error`} className="hepta-input-error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
