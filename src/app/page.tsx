"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getRandomGifs, GifData } from "./api/fetchGifs";

const Home: NextPage = () => {
  const [gifs, setGifs] = useState<GifData[]>([]);

  useEffect(() => {
    getRandomGifs(3).then(setGifs).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">GIPHY Picker</h1>
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {gifs.map((gif) => (
          <div
            key={gif.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="rounded-md w-full max-h-64 object-contain mb-4"
            >
              <source src={gif.images.original_mp4.mp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={() => {
                navigator.clipboard.writeText(gif.images.original_mp4.mp4);
                alert("URL Copied to clipboard!");
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Copy GIF URL
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
