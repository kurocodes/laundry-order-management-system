export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  onPageChange,
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="p-6 border-t border-outline-variant/10 flex items-center justify-between">
      <span className="text-xs font-medium text-on-surface-variant">
        Showing {startItem} to {endItem} of {totalItems} orders
      </span>
      <div className="flex items-center gap-1">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          className="p-2 hover:bg-surface-container-highest rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-sm">
            chevron_left
          </span>
        </button>

        {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                pageNum === currentPage
                  ? "bg-primary text-on-primary"
                  : "hover:bg-surface-container-highest text-on-surface"
              }`}
            >
              {pageNum}
            </button>
          ),
        )}

        <button
          disabled={currentPage >= (totalPages || 1)}
          onClick={() =>
            onPageChange(Math.min(currentPage + 1, totalPages || 1))
          }
          className="p-2 hover:bg-surface-container-highest rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-sm">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}
