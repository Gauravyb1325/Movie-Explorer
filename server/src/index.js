import express from "express";
import cors from "cors";
import { config } from "./config.js";
import moviesRouter from "./routes/movies.js";

const app = express();

app.use(cors());            // allow local dev frontend
app.use(express.json());

// Healthcheck
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api/movies", moviesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(config.port, () => {
  console.log(`✅ Server listening on http://localhost:${config.port}`);
});
