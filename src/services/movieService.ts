
import axios from "axios";
import type{ Movie }  from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3";

interface FetchMoviesResp {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (
  film: string,
  page: number
): Promise<FetchMoviesResp> => {
  const response = await axios.get<FetchMoviesResp>("/search/movie", {
    params: {
      query: film,
      include_adult: false,
      language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
};

 
