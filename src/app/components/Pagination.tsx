"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  maxPage: number;
  onPrevious: () => void;
  onNext: () => void;
  isNextDisabled: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  maxPage,
  onPrevious,
  onNext,
  isNextDisabled,
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-10 text-base">
      <button
        onClick={onPrevious}
        disabled={currentPage === 0}
        className={`px-3 py-2 rounded-md font-bold text-lg transition-all duration-200 transform ${
          currentPage === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-orange-500 text-white hover:bg-orange-600 hover:-translate-x-1"
        }`}
        title="Previous Page"
      >
        ←
      </button>

      <span className="text-gray-700 font-medium">
        Page {currentPage + 1} of {maxPage}
      </span>

      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`px-3 py-2 rounded-md font-bold text-lg transition-all duration-200 transform ${
          isNextDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-orange-500 text-white hover:bg-orange-600 hover:translate-x-1"
        }`}
        title="Next Page"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
