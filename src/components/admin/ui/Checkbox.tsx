import { forwardRef, type InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={`flex items-center gap-2 cursor-pointer font-dmsans ${className}`}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="size-4 rounded border-neutral-300 text-[#296FDA] focus:ring-[#296FDA]/30 cursor-pointer"
          {...props}
        />
        <span className="text-sm text-neutral-700">{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
