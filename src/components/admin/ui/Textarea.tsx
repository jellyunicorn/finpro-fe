import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 font-dmsans">
        {label && (
          <label htmlFor={id} className="text-neutral-500 text-sm font-medium">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={`min-h-[80px] border rounded-lg border-neutral-300 px-4 py-2 text-sm focus:border-[#296FDA] focus:outline-none focus:ring-2 focus:ring-[#296FDA]/20 disabled:bg-neutral-100 disabled:text-neutral-400 resize-y ${
            error ? "border-[#F87171] focus:border-[#F87171] focus:ring-[#F87171]/20" : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-[#F87171]">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
