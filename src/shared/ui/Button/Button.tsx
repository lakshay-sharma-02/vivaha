import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-md)] font-medium transition-all duration-[var(--animate-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-action-primary)] text-surface shadow-[var(--shadow-low)] hover:bg-[var(--color-action-hover)] hover:shadow-[var(--shadow-medium)] hover:-translate-y-[1px]",
        secondary:
          "bg-[var(--color-surface-secondary)] text-text-primary shadow-[var(--shadow-low)] hover:bg-[var(--color-border)] hover:shadow-[var(--shadow-medium)] hover:-translate-y-[1px]",
        ghost:
          "bg-transparent text-text-primary hover:bg-[var(--color-surface-secondary)]",
        text:
          "bg-transparent text-text-primary underline-offset-4 hover:underline",
        premium:
          "bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-700)] text-surface shadow-[var(--shadow-low)] hover:shadow-[var(--shadow-medium)] hover:-translate-y-[1px]",
        danger:
          "bg-[var(--color-error-500)] text-surface shadow-[var(--shadow-low)] hover:bg-[var(--color-error-600)] hover:shadow-[var(--shadow-medium)] hover:-translate-y-[1px]",
      },
      size: {
        sm: "h-9 px-4 text-[var(--font-size-sm)]",
        md: "h-11 px-6 text-[var(--font-size-md)]",
        lg: "h-14 px-8 text-[var(--font-size-lg)]",
        xl: "h-16 px-12 text-[var(--font-size-xl)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading, disabled, leftIcon, rightIcon, children, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
