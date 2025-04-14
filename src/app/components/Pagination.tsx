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
    <div className="flex gap-4 mt-10">
      <button
        onClick={onPrevious}
        disabled={currentPage === 0}
        className={`px-4 py-2 rounded ${
          currentPage === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        Previous
      </button>
      <span className="self-center text-gray-700">
        Page {currentPage + 1} of {maxPage}
      </span>
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`px-4 py-2 rounded ${
          isNextDisabled
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
