import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#296FDA] text-white hover:bg-[#1d52a8]",
  outline: "border border-[#296FDA] text-[#296FDA] hover:bg-[#296FDA] hover:text-white",
  ghost: "text-[#296FDA] hover:bg-[#BAD6F5]/40",
  danger: "bg-[#F87171] text-white hover:bg-red-600",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2 text-sm",
  lg: "px-8 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center gap-2 rounded-full font-medium font-dmsans transition-all hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading && (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
