import { type HTMLAttributes } from "react";

interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: React.ElementType;
}

export default function MetricCard({
  label,
  value,
  icon: Icon,
  className = "",
  ...props
}: MetricCardProps) {
  return (
    <div
      className={`rounded-2xl border border-[#BAD6F5] bg-white p-6 font-dmsans ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-neutral-700">{label}</p>
        {Icon && <Icon className="size-5 text-[#296FDA]" />}
      </div>
      <p className="mt-3 text-4xl font-bold text-[#296FDA]">{value}</p>
    </div>
  );
}
