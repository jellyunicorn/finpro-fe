import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 font-dmsans">
        {label && (
          <label htmlFor={id} className="text-neutral-500 text-sm font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`h-10 border rounded-lg border-neutral-500 px-5 focus:border-[#296FDA] focus:outline-none focus:ring-2 focus:ring-[#296FDA]/20 disabled:bg-neutral-100 disabled:text-neutral-400 ${
            error ? "border-[#F87171] focus:border-[#F87171] focus:ring-[#F87171]/20" : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-[#F87171]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
