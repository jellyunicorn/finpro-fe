import { type HTMLAttributes } from "react";
import { AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";

type AlertVariant = "danger" | "warning" | "success" | "info";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const variantStyles: Record<AlertVariant, string> = {
  danger: "bg-[#F87171] text-white",
  warning: "bg-[#FED7AA] text-[#B45309]",
  success: "bg-[#A7F3D0] text-[#047857]",
  info: "bg-[#BAD6F5] text-[#296FDA]",
};

const variantIcons: Record<AlertVariant, React.ElementType> = {
  danger: XCircle,
  warning: AlertTriangle,
  success: CheckCircle2,
  info: Info,
};

export default function Alert({
  variant = "info",
  className = "",
  children,
  ...props
}: AlertProps) {
  const Icon = variantIcons[variant];

  return (
    <div
      className={`flex items-center gap-3 px-6 py-3 text-sm font-medium font-dmsans ${variantStyles[variant]} ${className}`}
      role="alert"
      {...props}
    >
      <Icon className="size-5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
