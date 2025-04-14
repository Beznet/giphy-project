"use client";

import React from "react";
import GifCard from "./GifCard";
import { GifData } from "../api/fetchGifs";

interface GifGridProps {
  gifs: GifData[];
}

const GifGrid: React.FC<GifGridProps> = ({ gifs }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 w-full">
      {gifs.map((gif) => (
        <GifCard key={gif.id} mp4Url={gif.images.original_mp4.mp4} />
      ))}
    </div>
  );
};

export default GifGrid;
