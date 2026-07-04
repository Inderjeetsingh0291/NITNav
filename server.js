/**
 * server.js
 * Express backend for Dr. B. R. Ambedkar NIT Jalandhar Campus Navigator
 * -----------------------------------------------------------------------
 * Serves the REST API at  /api/*
 * Serves the static frontend from  ./public/
 */

const express = require("express");
const cors = require("cors");
const path = require("path");
const apiRouter = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── API routes ─────────────────────────────────────────────
app.use("/api", apiRouter);

// ── Serve static frontend ──────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// ── Catch-all: serve index.html for SPA fallback ──────────
app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ── Start ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎓  NIT Jalandhar Campus Navigator`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API available at  http://localhost:${PORT}/api\n`);
});
