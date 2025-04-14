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
    <div className="flex flex-wrap justify-center gap-6 w-full">
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
