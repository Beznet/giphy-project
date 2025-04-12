"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getRandomGifs, searchGifs, GifData } from "./api/fetchGifs";

const Home: NextPage = () => {
  const [gifs, setGifs] = useState<GifData[]>([]);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    getRandomGifs(3).then(setGifs).catch(console.error);
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await searchGifs(query);
      setGifs(res.data as GifData[]);
      setHasSearched(true);
    } catch (err) {
      console.error("Error fetching search results", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">GIPHY Picker</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8 w-full max-w-xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for GIFs..."
          className="flex-grow p-3 rounded border border-gray-300 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Search
        </button>
      </form>

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
              Copy URL
            </button>
          </div>
        ))}
      </div>

      {!hasSearched && gifs.length === 0 && (
        <div className="mt-6 flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-orange-500 border-solid"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
