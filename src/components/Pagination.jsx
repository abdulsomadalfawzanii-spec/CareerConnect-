import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 10;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-1.5 my-12">
     

      {getPageNumbers().map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3.5 py-2 border font-medium text-sm rounded-lg transition-all ${
            currentPage === number 
              ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
              : 'border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-600'
          }`}
        >
          {number}
        </button>
      ))}

      
    </div>
  );
}

export default Pagination;