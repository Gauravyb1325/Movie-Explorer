import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export async function searchMovies(q, page = 1) {
  const res = await api.get("/movies/search", { params: { q, page } });
  return res.data;
}

export async function getMovieDetails(imdbID) {
  const res = await api.get(`/movies/${imdbID}`);
  return res.data;
}
