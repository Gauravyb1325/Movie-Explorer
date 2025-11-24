import axios from "axios";
import { config } from "./config.js";
import { LRUCache } from "./cache.js";

const cache = new LRUCache(config.cacheMaxSize, config.cacheTtlMs);

async function fetchFromOmdb(params) {
  const key = JSON.stringify(params);

  const cached = cache.get(key);
  if (cached) {
    return cached;
  }

  const response = await axios.get(config.omdbBaseUrl, {
    params: {
      ...params,
      apikey: config.omdbApiKey
    }
  });

  if (response.data?.Response === "False") {
    // OMDB returns error messages in payload
    const err = new Error(response.data.Error || "OMDB error");
    err.status = 400;
    throw err;
  }

  cache.set(key, response.data);
  return response.data;
}

export async function searchMovies(query, page = 1) {
  return fetchFromOmdb({ s: query, page, type: "movie" });
}

export async function getMovieById(imdbID) {
  return fetchFromOmdb({ i: imdbID, plot: "full" });
}
