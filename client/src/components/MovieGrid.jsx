import React from "react";
import MovieCard from "./MovieCard.jsx";

export default function MovieGrid({
  movies,
  onMovieClick,
  isFavorite,
  toggleFavorite
}) {
  if (!movies || movies.length === 0) {
    return <p className="empty-state">No movies to display.</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={onMovieClick}
          isFavorite={isFavorite(movie.imdbID)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

