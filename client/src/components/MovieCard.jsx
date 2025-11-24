import React from "react";

const placeholderPoster =
  "https://via.placeholder.com/300x450?text=No+Image";

export default function MovieCard({ movie, onClick, isFavorite, onToggleFavorite }) {
  const poster =
    movie.poster && movie.poster !== "N/A" ? movie.poster : placeholderPoster;

  return (
    <div className="movie-card" onClick={() => onClick(movie.imdbID)}>
      <div className="movie-poster-wrapper">
        <img src={poster} alt={movie.title} />
        <button
          type="button"
          className={`fav-btn ${isFavorite ? "fav-btn--active" : ""}`}
          onClick={e => {
            e.stopPropagation();
            onToggleFavorite(movie.imdbID);
          }}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
      </div>
    </div>
  );
}
