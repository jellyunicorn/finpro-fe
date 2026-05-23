import { forwardRef, type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variantClass =
      variant === "bordered"
        ? "border border-[#BAD6F5]"
        : "shadow-sm";
    return (
      <div
        ref={ref}
        className={`rounded-2xl bg-white p-6 font-dmsans ${variantClass} ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
export default Card;
