export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePageClick = (page) => {
      const newPage = Math.max(1, Math.min(totalPages, page));
      onPageChange(newPage);
    };
  
    return (
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 cursor-pointer disabled:cursor-auto"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-3 py-1 text-sm font-medium rounded cursor-pointer ${
                currentPage === page
                  ? "bg-gray-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 cursor-pointer disabled:cursor-auto"
        >
          Next
        </button>
      </div>
    );
  }
  