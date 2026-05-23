import { type ReactNode } from "react";
import { Search, X } from "lucide-react";

interface FilterBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  onClear?: () => void;
  hasFilters?: boolean;
  children?: ReactNode;
}

export default function FilterBar({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Cari...",
  onClear,
  hasFilters,
  children,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl p-4 mb-4 font-dmsans border border-[#BAD6F5]">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search input */}
        {onSearchChange && (
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-10 pl-10 pr-4 border border-neutral-300 rounded-lg focus:border-[#296FDA] focus:outline-none focus:ring-2 focus:ring-[#296FDA]/20 text-sm"
            />
          </div>
        )}

        {/* Custom filters (dropdowns, date pickers) */}
        {children}

        {/* Clear filters button */}
        {hasFilters && onClear && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-2 text-sm text-[#296FDA] hover:bg-[#BAD6F5]/40 rounded-lg hover:cursor-pointer transition-colors"
          >
            <X className="size-4" />
            Reset Filter
          </button>
        )}
      </div>
    </div>
  );
}
