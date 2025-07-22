import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";


export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query:string) => {
    
    setMovies([]);
    setIsError(false);
    setIsLoading(true);

    try {
      const fetchedMovies = await fetchMovies(query);

      if (fetchedMovies.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(fetchedMovies); 
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && !isLoading && <ErrorMessage />}
      {!isLoading && !isError && (
        <MovieGrid
         movies={movies}
         onSelect={(movie) => setSelectedMovie(movie)}
        />
      )}
      {selectedMovie && (
       <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
}