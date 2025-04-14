"use client";

import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="mt-6 flex justify-center items-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-orange-500 border-solid"></div>
    </div>
  );
};

export default LoadingSpinner;
