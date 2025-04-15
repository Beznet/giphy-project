const BASE_URL = "https://api.giphy.com/v1/gifs";

const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export interface GifData {
  id: string;
  title: string;
  images: {
    original_mp4: {
      mp4: string;
    };
  };
}

export interface GiphyResponse {
  data: GifData[] | GifData;
  pagination?: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}

export async function getRandomGifs(count: number = 3): Promise<GifData[]> {
  const fetchRandomGif = async (): Promise<GifData> => {
    const url = `${BASE_URL}/random?api_key=${API_KEY}&rating=g`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    if (response.status === 429) {
      const error = new Error("API limit hit") as Error & { status?: number };
      error.status = 429;
      throw error;
    }
    const json: GiphyResponse = await response.json();
    return json.data as GifData;
  };

  const requests: Promise<GifData>[] = [];
  for (let i = 0; i < count; i++) {
    requests.push(fetchRandomGif());
  }

  return Promise.all(requests);
}

export async function searchGifs(
  query: string,
  limit: number = 8,
  offset: number = 0
): Promise<GiphyResponse> {
  const url = `${BASE_URL}/search?api_key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&limit=${limit}&offset=${offset}&rating=g&lang=en`;

  const response = await fetch(url);

  if (response.status === 429) {
    const error = new Error("API limit hit") as Error & { status?: number };
    error.status = 429;
    throw error;
  }

  if (!response.ok) {
    throw new Error(`Giphy API error: ${response.status}`);
  }

  return response.json();
}
