import { type HTMLAttributes } from "react";

type BadgeVariant = "mint" | "peach" | "coral" | "info" | "neutral";

interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  mint: "bg-[#A7F3D0] text-[#047857]",
  peach: "bg-[#FED7AA] text-[#B45309]",
  coral: "bg-[#F87171] text-white",
  info: "bg-[#BAD6F5] text-[#296FDA]",
  neutral: "bg-neutral-100 text-neutral-600",
};

export default function StatusBadge({
  variant = "info",
  className = "",
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide font-dmsans ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
