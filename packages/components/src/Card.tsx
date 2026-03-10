import { type ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated';

export interface CardProps {
  /** Optional card title shown in header */
  title?: string;
  /** Card content */
  children: ReactNode;
  /** Visual variant. "elevated" adds shadow. Default: "default" */
  variant?: CardVariant;
  /** Additional class name */
  className?: string;
}

/**
 * Container for grouped content with optional header.
 * Use `variant="elevated"` for cards that need visual separation.
 *
 * @example
 * ```tsx
 * <Card title="Settings">
 *   <p>Card content here.</p>
 * </Card>
 * <Card variant="elevated">Elevated card</Card>
 * ```
 */
export function Card({ title, children, variant = 'default', className = '' }: CardProps) {
  return (
    <div
      className={`hepta-card hepta-card--${variant} ${className}`.trim()}
      data-variant={variant}
    >
      {title && <div className="hepta-card__header">{title}</div>}
      <div className="hepta-card__body">{children}</div>
    </div>
  );
}
