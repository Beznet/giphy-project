"use client";

import React from "react";
import GifCard from "./GifCard";
import { GifData } from "../api/fetchGifs";

interface GifGridProps {
  gifs: GifData[];
  onCopy: () => void;
}

const GifGrid: React.FC<GifGridProps> = ({ gifs, onCopy }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {gifs.map((gif) => (
        <GifCard
          key={gif.id}
          mp4Url={gif.images.original_mp4.mp4}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
};

export default GifGrid;
