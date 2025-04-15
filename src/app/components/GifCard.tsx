"use client";

import React from "react";
import Image from "next/image";

interface GifCardProps {
  mp4Url: string;
  onCopy: () => void;
}

const GifCard: React.FC<GifCardProps> = ({ mp4Url, onCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(mp4Url);
    onCopy();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2 flex flex-col items-center w-full max-w-xs mx-auto">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="rounded-md w-full max-h-64 object-contain mb-2"
      >
        <source src={mp4Url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex justify-center">
        <Image
          src="/copy.svg"
          alt="Copy URL"
          width={20}
          height={20}
          title="Copy URL"
          onClick={handleCopy}
          className="cursor-pointer hover:scale-110 transition"
        />
      </div>
    </div>
  );
};

export default GifCard;
