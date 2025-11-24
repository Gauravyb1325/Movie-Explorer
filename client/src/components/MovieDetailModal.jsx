import React from "react";

export default function MovieDetailModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="modal-content">
          <img
            className="modal-poster"
            src={
              movie.poster && movie.poster !== "N/A"
                ? movie.poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.title}
          />
          <div className="modal-details">
            <h2>
              {movie.title} ({movie.year})
            </h2>
            <p className="sub">
              {movie.rated} • {movie.runtime} • {movie.genre}
            </p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Actors:</strong> {movie.actors}</p>
            <p className="plot">{movie.plot}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
            {movie.ratings?.length > 0 && (
              <ul className="ratings">
                {movie.ratings.map(r => (
                  <li key={r.Source}>
                    {r.Source}: {r.Value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
