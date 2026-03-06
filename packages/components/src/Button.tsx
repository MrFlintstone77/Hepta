import { forwardRef, type ButtonHTMLAttributes } from 'react';

/** Button variants */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

/** Button sizes */
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant. Default: "primary" */
  variant?: ButtonVariant;
  /** Size of the button. Default: "md" */
  size?: ButtonSize;
  /** Disables the button */
  disabled?: boolean;
}

/**
 * Primary action component for forms and UI flows.
 * Use `variant` for different emphasis levels and `size` for layout scaling.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>Save</Button>
 * <Button variant="outline" size="sm">Cancel</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={`pario-btn pario-btn--${variant} pario-btn--${size} ${className}`.trim()}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
