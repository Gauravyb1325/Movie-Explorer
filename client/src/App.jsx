import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import MovieGrid from "./components/MovieGrid.jsx";
import MovieDetailModal from "./components/MovieDetailModal.jsx";
import { searchMovies, getMovieDetails } from "./api.js";
import { useFavorites } from "./hooks/useFavorites.js";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState(null);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // -------- Search Movies --------
  async function handleSearch(q) {
    setQuery(q);
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(q);
      setMovies(data.items || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }

  // -------- Load Movie Details --------
  async function handleMovieClick(imdbID) {
    setLoadingDetail(true);
    setSelectedMovie(null);
    try {
      const details = await getMovieDetails(imdbID);
      setSelectedMovie(details);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch details");
    } finally {
      setLoadingDetail(false);
    }
  }

  function closeModal() {
    setSelectedMovie(null);
  }

  // -------- Load Favorite Movies List --------
  useEffect(() => {
    async function loadFavorites() {
      if (favorites.length === 0) {
        setFavoriteMovies([]);
        return;
      }

      const results = [];
      for (const imdbID of favorites) {
        try {
          const movieData = await getMovieDetails(imdbID);
          results.push(movieData);
        } catch {
          console.log("Error loading favorite:", imdbID);
        }
      }
      setFavoriteMovies(results);
    }

    loadFavorites();
  }, [favorites]);

  return (
    <div className="app">
      <header>
        <h1>🎬 OMDB Movie Explorer</h1>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} />

        {query && (
          <p className="results-text">
            Showing results for <strong>{query}</strong>
          </p>
        )}

        {error && <p className="error">{error}</p>}
        {loading && <p className="loading">Loading movies...</p>}

        {/* Search Results */}
        {!loading && movies.length > 0 && (
          <MovieGrid
            movies={movies}
            onMovieClick={handleMovieClick}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        )}

        {/* FAVORITES SECTION */}
        {favoriteMovies.length > 0 && (
          <section className="favorites-section">
            <h2>⭐ Your Favorite Movies</h2>

            <MovieGrid
              movies={favoriteMovies}
              onMovieClick={handleMovieClick}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />
          </section>
        )}
      </main>

      {loadingDetail && <p className="loading">Loading details...</p>}
      <MovieDetailModal movie={selectedMovie} onClose={closeModal} />
    </div>
  );
}
