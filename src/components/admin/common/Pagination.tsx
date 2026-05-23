import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  perPage?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  perPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers to display (ellipsis logic)
  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  const startItem = (currentPage - 1) * (perPage || 10) + 1;
  const endItem = Math.min(currentPage * (perPage || 10), totalItems || 0);

  return (
    <div className="flex items-center justify-between gap-4 font-dmsans flex-wrap">
      {/* Info */}
      {totalItems !== undefined && (
        <p className="text-sm text-neutral-500">
          Menampilkan <span className="font-medium text-neutral-700">{startItem}</span>
          {" - "}
          <span className="font-medium text-neutral-700">{endItem}</span> dari{" "}
          <span className="font-medium text-neutral-700">{totalItems}</span> data
        </p>
      )}

      {/* Page controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-[#296FDA] hover:bg-[#BAD6F5]/40 disabled:opacity-40 disabled:cursor-not-allowed hover:cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-neutral-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 rounded-lg text-sm font-medium hover:cursor-pointer transition-colors ${
                page === currentPage
                  ? "bg-[#296FDA] text-white"
                  : "text-[#296FDA] hover:bg-[#BAD6F5]/40"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-[#296FDA] hover:bg-[#BAD6F5]/40 disabled:opacity-40 disabled:cursor-not-allowed hover:cursor-pointer"
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
