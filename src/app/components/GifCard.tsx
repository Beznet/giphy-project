"use client";

import React from "react";

interface GifCardProps {
  mp4Url: string;
}

const GifCard: React.FC<GifCardProps> = ({ mp4Url }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(mp4Url);
    alert("URL Copied");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="rounded-md w-full max-h-64 object-contain mb-4"
      >
        <source src={mp4Url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
      >
        Copy URL
      </button>
    </div>
  );
};

export default GifCard;
