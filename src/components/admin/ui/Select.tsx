import { type SelectHTMLAttributes, forwardRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: Option[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", options, placeholder, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`h-10 px-3 pr-8 border border-neutral-300 rounded-lg bg-white text-sm font-dmsans focus:border-[#296FDA] focus:outline-none focus:ring-2 focus:ring-[#296FDA]/20 hover:cursor-pointer ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";
export default Select;
