/**
 * routes/api.js
 * REST API routes for NIT Jalandhar Campus Navigator
 *
 * Endpoints:
 *  GET  /api/locations          → all locations (label, key, category, icon, coords)
 *  GET  /api/locations/:key     → single location by key
 *  GET  /api/categories         → list of unique categories
 *  GET  /api/navigate           → build Google Maps URL for source→destination
 *                                  ?from=<key>&to=<key>
 */

const express  = require("express");
const router   = express.Router();
const {
  blockCoordinates,
  locationLabels,
  locationCategories,
  categoryIcons,
} = require("../data/campusData");

// ── Helper: build a full location object ──────────────────
function buildLocation(key) {
  const category = locationCategories[key] || "facility";
  return {
    key,
    label:     locationLabels[key]    || key,
    coords:    blockCoordinates[key],
    category,
    icon:      categoryIcons[category] || "📍",
  };
}

// ── Helper: build Google Maps directions URL ──────────────
function mapsUrl(fromCoords, toCoords) {
  const f = encodeURIComponent(fromCoords.trim());
  const t = encodeURIComponent(toCoords.trim());
  return `https://www.google.com/maps/dir/${f}/${t}`;
}

// ─────────────────────────────────────────────────────────
// GET /api/locations
// Returns all campus locations as an array, sorted by label.
// Optional query param: ?category=dept  (filter by category)
// ─────────────────────────────────────────────────────────
router.get("/locations", (req, res) => {
  const { category, q } = req.query;

  let locations = Object.keys(blockCoordinates).map(buildLocation);

  if (category) {
    locations = locations.filter((l) => l.category === category);
  }

  if (q) {
    const query = q.toLowerCase();
    locations = locations.filter(
      (l) =>
        l.label.toLowerCase().includes(query) ||
        l.key.toLowerCase().includes(query)
    );
  }

  locations.sort((a, b) => a.label.localeCompare(b.label));

  res.json({
    success: true,
    count:   locations.length,
    data:    locations,
  });
});

// ─────────────────────────────────────────────────────────
// GET /api/locations/:key
// Returns a single location by its key.
// ─────────────────────────────────────────────────────────
router.get("/locations/:key", (req, res) => {
  const { key } = req.params;

  if (!blockCoordinates[key]) {
    return res.status(404).json({
      success: false,
      error:   `Location '${key}' not found.`,
    });
  }

  res.json({
    success: true,
    data:    buildLocation(key),
  });
});

// ─────────────────────────────────────────────────────────
// GET /api/categories
// Returns all unique categories with icon and count.
// ─────────────────────────────────────────────────────────
router.get("/categories", (req, res) => {
  const counts = {};

  Object.keys(locationCategories).forEach((key) => {
    const cat = locationCategories[key];
    if (!counts[cat]) {
      counts[cat] = { category: cat, icon: categoryIcons[cat] || "📍", count: 0 };
    }
    counts[cat].count++;
  });

  res.json({
    success: true,
    data:    Object.values(counts).sort((a, b) => a.category.localeCompare(b.category)),
  });
});

// ─────────────────────────────────────────────────────────
// GET /api/navigate?from=<key>&to=<key>
// Validates both locations and returns a Google Maps URL.
// ─────────────────────────────────────────────────────────
router.get("/navigate", (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      success: false,
      error:   "Both 'from' and 'to' query parameters are required.",
    });
  }

  if (!blockCoordinates[from]) {
    return res.status(404).json({
      success: false,
      error:   `Source location '${from}' not found.`,
    });
  }

  if (!blockCoordinates[to]) {
    return res.status(404).json({
      success: false,
      error:   `Destination location '${to}' not found.`,
    });
  }

  if (from === to) {
    return res.status(400).json({
      success: false,
      error:   "Source and destination cannot be the same location.",
    });
  }

  const url = mapsUrl(blockCoordinates[from], blockCoordinates[to]);

  res.json({
    success: true,
    data: {
      from:     buildLocation(from),
      to:       buildLocation(to),
      mapsUrl:  url,
    },
  });
});

module.exports = router;
