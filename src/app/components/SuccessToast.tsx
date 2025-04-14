"use client";

import React from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

const SuccessToast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div
      className="fixed top-6 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-md p-4 text-gray-500 bg-white rounded-lg shadow-sm z-50"
      role="alert"
    >
      <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="sr-only">Success icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        onClick={onClose}
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
          />
        </svg>
      </button>
    </div>
  );
};

export default SuccessToast;
