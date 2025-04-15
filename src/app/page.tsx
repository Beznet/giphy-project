"use client";

import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";
import Image from "next/image";
import { Sixtyfour } from "next/font/google";
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
  Suspense,
} from "react";
import {
  getRandomGifs,
  searchGifs,
  GifData,
  GiphyResponse,
} from "./api/fetchGifs";
import Pagination from "./components/Pagination";
import SearchForm from "./components/SearchForm";
import LoadingSpinner from "./components/LoadingSpinner";
import GifGrid from "./components/GifGrid";
import { LIMIT } from "./constants";
import Toast from "./components/Toast";

const sixtyfour = Sixtyfour({
  weight: ["400"],
  subsets: ["latin"],
});

type ResultCache = Record<string, Record<number, GifData[]>>;

function Home() {
  const [gifs, setGifs] = useState<GifData[]>([]);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [resultCache, setResultCache] = useState<ResultCache>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const previousQueryRef = useRef<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlQuery = searchParams.get("query");

    if (isInitialLoad) {
      if (urlQuery) {
        setQuery(urlQuery);
        fetchSearchResults(urlQuery, 0);
        setHasSearched(true);
      } else {
        getRandomGifs(3).then(setGifs).catch(console.error);
      }
      setIsInitialLoad(false);
    }
  }, [searchParams, isInitialLoad]);

  const fetchSearchResults = useCallback(
    async (searchQuery: string, pageNum: number) => {
      const lowerQuery = searchQuery.toLowerCase();

      if (previousQueryRef.current && previousQueryRef.current !== lowerQuery) {
        setResultCache({});
      }
      previousQueryRef.current = lowerQuery;

      const cached = resultCache[lowerQuery]?.[pageNum];
      if (cached) {
        setGifs(cached);
        return;
      }

      const offset = pageNum * LIMIT;

      try {
        const res: GiphyResponse = await searchGifs(searchQuery, LIMIT, offset);
        const newData = res.data as GifData[];

        setGifs(newData);
        setTotalCount(res.pagination?.total_count ?? 0);
        setHasSearched(true);

        setResultCache((prev) => ({
          ...prev,
          [lowerQuery]: {
            ...(prev[lowerQuery] || {}),
            [pageNum]: newData,
          },
        }));
      } catch (err) {
        if ((err as { status?: number })?.status === 429) {
          setToastMessage("Giphy API limit reached");
          setToastType("error");
        } else {
          console.error("Search error:", err);
        }
      }
    },
    [resultCache]
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (!value.trim()) {
          getRandomGifs(3).then(setGifs).catch(console.error);
          setHasSearched(false);
          router.push("/");
          return;
        }

        setPage(0);
        setHasSearched(true);
        fetchSearchResults(value, 0);
        router.push(`/?query=${encodeURIComponent(value.trim())}`);
      }, 500),
    [fetchSearchResults, router]
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

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const maxPage = Math.floor(totalCount / LIMIT);

  return (
    <div className="min-h-screen bg-purple-100 p-4 sm:p-6 flex flex-col">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Image
            src="/giphy-logo.svg"
            alt="Giphy Logo"
            title="Giphy Logo"
            width={0}
            height={0}
            sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
            className="w-8 sm:w-10 md:w-12 h-auto"
          />

          <span
            className={`${sixtyfour.className} text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-tight`}
          >
            GIPHY PICKER
          </span>
        </div>
        <SearchForm
          query={query}
          onChange={(val) => {
            setQuery(val);
            debouncedSearch(val);
          }}
          onSubmit={handleSearch}
        />
        <GifGrid
          gifs={gifs}
          onCopy={() => {
            setToastMessage("URL copied");
            setToastType("success");
          }}
        />
        {hasSearched && (
          <Pagination
            currentPage={page}
            maxPage={maxPage}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isNextDisabled={(page + 1) * LIMIT >= totalCount}
          />
        )}
        {!hasSearched && gifs.length === 0 && <LoadingSpinner />}
        {toastMessage && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => {
              setToastMessage(null);
              setToastType("success");
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <Home />
    </Suspense>
  );
}
