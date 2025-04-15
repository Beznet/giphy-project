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
    <div className="p-2 w-full max-w-xs mx-auto">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition hover:scale-105"
        >
          <source src={mp4Url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Image
          src="/copy.svg"
          alt="Copy URL"
          width={30}
          height={30}
          title="Copy URL"
          onClick={handleCopy}
          className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-full hover:scale-110 transition cursor-pointer shadow-sm"
        />
      </div>
    </div>
  );
};

export default GifCard;
