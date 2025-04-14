"use client";

import type { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";
import { useEffect, useState, useCallback } from "react";
import {
  getRandomGifs,
  searchGifs,
  GifData,
  GiphyResponse,
} from "./api/fetchGifs";

const Home: NextPage = () => {
  const [gifs, setGifs] = useState<GifData[]>([]);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlQuery = searchParams.get("query");
    if (urlQuery) {
      setQuery(urlQuery);
      fetchSearchResults(urlQuery, 0);
      setHasSearched(true);
    } else {
      getRandomGifs(3).then(setGifs).catch(console.error);
    }
  }, []);

  const LIMIT = 6;

  const fetchSearchResults = async (searchQuery: string, pageNum: number) => {
    try {
      const offset = pageNum * LIMIT;
      const res: GiphyResponse = await searchGifs(searchQuery, LIMIT, offset);
      setGifs(res.data as GifData[]);
      setTotalCount(res.pagination?.total_count ?? 0);
      setHasSearched(true);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.trim()) {
        router.push(`/?query=${encodeURIComponent(value.trim())}`);
        fetchSearchResults(value, 0);
        setPage(0);
        setHasSearched(true);
      }
    }, 1000),
    [router, fetchSearchResults]
  );

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    setPage(0);
    setHasSearched(true);
    router.push(`/?query=${encodeURIComponent(query.trim())}`);
    fetchSearchResults(query, 0);
  };

  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchSearchResults(query, nextPage);
  };

  const handlePrevious = () => {
    const prevPage = page - 1;
    setPage(prevPage);
    fetchSearchResults(query, prevPage);
  };

  const maxPage = Math.floor(totalCount / LIMIT);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">GIPHY Picker</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8 w-full max-w-xl">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            debouncedSearch(val);
          }}
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
      {hasSearched && (
        <div className="flex gap-4 mt-10">
          <button
            onClick={handlePrevious}
            disabled={page === 0}
            className={`px-4 py-2 rounded ${
              page === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Previous
          </button>
          <span className="self-center text-gray-700">
            Page {page + 1} of {maxPage}
          </span>
          <button
            onClick={handleNext}
            disabled={(page + 1) * LIMIT >= totalCount}
            className={`px-4 py-2 rounded ${
              (page + 1) * LIMIT >= totalCount
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {!hasSearched && gifs.length === 0 && (
        <div className="mt-6 flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-orange-500 border-solid"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
