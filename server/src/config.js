import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  omdbApiKey: process.env.OMDB_API_KEY,
  omdbBaseUrl: process.env.OMDB_BASE_URL || "https://www.omdbapi.com/",
  cacheMaxSize: parseInt(process.env.CACHE_MAX_SIZE || "100", 10),
  cacheTtlMs: parseInt(process.env.CACHE_TTL_MS || "600000", 10) // 10 min
};

if (!config.omdbApiKey) {
  console.error("❌ OMDB_API_KEY is missing in .env");
  process.exit(1);
}
