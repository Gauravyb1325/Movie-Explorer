import express from "express";
import { searchMovies, getMovieById } from "../omdbClient.js";

const router = express.Router();

// GET /api/movies/search?q=batman&page=1
router.get("/search", async (req, res) => {
  const { q, page = 1 } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Missing query parameter 'q'" });
  }

  try {
    const data = await searchMovies(q, page);
    // Simplify shape if you want
    return res.json({
      totalResults: data.totalResults,
      items: (data.Search || []).map(item => ({
        imdbID: item.imdbID,
        title: item.Title,
        year: item.Year,
        type: item.Type,
        poster: item.Poster
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
});

// GET /api/movies/:imdbID
router.get("/:imdbID", async (req, res) => {
  const { imdbID } = req.params;
  try {
    const data = await getMovieById(imdbID);
    const mapped = {
      imdbID: data.imdbID,
      title: data.Title,
      year: data.Year,
      rated: data.Rated,
      released: data.Released,
      runtime: data.Runtime,
      genre: data.Genre,
      director: data.Director,
      writer: data.Writer,
      actors: data.Actors,
      plot: data.Plot,
      language: data.Language,
      country: data.Country,
      awards: data.Awards,
      poster: data.Poster,
      ratings: data.Ratings,
      metascore: data.Metascore,
      imdbRating: data.imdbRating,
      imdbVotes: data.imdbVotes,
      type: data.Type
    };

    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
});

export default router;
