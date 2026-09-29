import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-4 select-none">
      {totalItems !== undefined && (
        <p className="text-xs text-slate-400">
          Showing <span className="font-semibold text-slate-200">{startItem}</span> to{" "}
          <span className="font-semibold text-slate-200">{endItem}</span> of{" "}
          <span className="font-semibold text-slate-200">{totalItems}</span> complaints
        </p>
      )}

      <div className="flex items-center gap-1.5 ml-auto">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
          // If total pages is large, only show nearby pages
          if (
            pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          ) {
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === pageNum
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "border border-slate-700/80 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                }`}
              >
                {pageNum}
              </button>
            );
          } else if (
            pageNum === currentPage - 2 ||
            pageNum === currentPage + 2
          ) {
            return (
              <span key={pageNum} className="text-slate-500 px-1 text-xs">
                ...
              </span>
            );
          }
          return null;
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
