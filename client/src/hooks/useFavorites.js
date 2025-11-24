import { useEffect, useState } from "react";

const STORAGE_KEY = "omdb_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(imdbID) {
    setFavorites(prev =>
      prev.includes(imdbID)
        ? prev.filter(id => id !== imdbID)
        : [...prev, imdbID]
    );
  }

  function isFavorite(imdbID) {
    return favorites.includes(imdbID);
  }

  return { favorites, toggleFavorite, isFavorite };
}
