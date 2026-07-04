/**
 * public/index.js  — NIT Jalandhar Campus Navigator (Frontend)
 * =============================================================
 * All location data is fetched from the Express backend API.
 * No hardcoded coordinates live here — they come from:
 *   GET /api/locations
 *   GET /api/navigate?from=<key>&to=<key>
 *   GET /api/categories
 */

// ─────────────────────────────────────────────
// 1. STATE
// ─────────────────────────────────────────────
const state = {
  locations:       [],   // full list from API
  filteredCategory: "all",
};

// ─────────────────────────────────────────────
// 2. API CALLS  (fetch from Express backend)
// ─────────────────────────────────────────────

/**
 * Fetch all locations from the backend.
 * Optionally filter by category.
 * @param {string} [category]
 * @returns {Promise<Array>}
 */
async function fetchLocations(category = "") {
  const url = category && category !== "all"
    ? `/api/locations?category=${encodeURIComponent(category)}`
    : "/api/locations";

  const res  = await fetch(url);
  const json = await res.json();

  if (!json.success) throw new Error(json.error || "Failed to load locations");
  return json.data;
}

/**
 * Fetch categories from the backend.
 * @returns {Promise<Array>}
 */
async function fetchCategories() {
  const res  = await fetch("/api/categories");
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

/**
 * Call the navigate endpoint on the backend.
 * @param {string} from  - location key
 * @param {string} to    - location key
 * @returns {Promise<{from, to, mapsUrl}>}
 */
async function fetchNavigate(from, to) {
  const url  = `/api/navigate?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
  const res  = await fetch(url);
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

// ─────────────────────────────────────────────
// 3. POPULATE DROPDOWNS
// ─────────────────────────────────────────────

function populateDropdowns(locations) {
  const srcSel  = document.getElementById("source-select");
  const dstSel  = document.getElementById("destination-select");

  // Remove all existing options except the placeholder
  while (srcSel.options.length > 1)  srcSel.remove(1);
  while (dstSel.options.length > 1)  dstSel.remove(1);

  locations.forEach(({ key, label }) => {
    srcSel.appendChild(new Option(label, key));
    dstSel.appendChild(new Option(label, key));
  });
}

// ─────────────────────────────────────────────
// 4. CATEGORY FILTER PILLS
// ─────────────────────────────────────────────

const CATEGORY_LABELS = {
  all:       "All",
  gate:      "Gates",
  admin:     "Admin",
  dept:      "Departments",
  facility:  "Facilities",
  hostel:    "Hostels",
  food:      "Food",
  residence: "Residences",
  transport: "Transport",
};

async function buildCategoryFilter() {
  const categories = await fetchCategories();
  const bar        = document.getElementById("category-filter");

  // Clear existing dynamic buttons (keep "All")
  bar.querySelectorAll(".cat-btn:not(#cat-all)").forEach((b) => b.remove());

  categories.forEach(({ category, icon }) => {
    const btn = document.createElement("button");
    btn.className    = "cat-btn";
    btn.dataset.category = category;
    btn.textContent  = `${icon} ${CATEGORY_LABELS[category] || category}`;
    btn.addEventListener("click", () => handleCategoryFilter(category));
    bar.appendChild(btn);
  });
}

function handleCategoryFilter(category) {
  state.filteredCategory = category;

  // Update active pill
  document.querySelectorAll(".cat-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.category === category);
  });

  // Re-filter the displayed locations
  const query = document.getElementById("location-search").value;
  renderLocations(applyFilter(state.locations, category, query));

  // Re-populate dropdowns with the filtered set
  const filtered = category === "all"
    ? state.locations
    : state.locations.filter((l) => l.category === category);
  populateDropdowns(filtered);
}

// ─────────────────────────────────────────────
// 5. LOCATIONS GRID
// ─────────────────────────────────────────────

function applyFilter(locations, category, query = "") {
  let list = category === "all"
    ? locations
    : locations.filter((l) => l.category === category);

  if (query.trim()) {
    const q = query.toLowerCase();
    list = list.filter(
      (l) => l.label.toLowerCase().includes(q) || l.key.toLowerCase().includes(q)
    );
  }

  return list;
}

function renderLocations(locations) {
  const grid = document.getElementById("locations-grid");
  grid.innerHTML = "";

  if (locations.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px 0;">No locations found.</p>`;
    return;
  }

  locations.forEach(({ key, label, category, icon }, i) => {
    const card = document.createElement("div");
    card.className = "location-card";
    card.style.animationDelay = `${i * 0.025}s`;
    card.title = "Click to set as destination";

    card.innerHTML = `
      <span class="lc-icon">${icon}</span>
      <div>
        <div class="lc-name">${label}</div>
        <span class="lc-cat">${CATEGORY_LABELS[category] || category}</span>
      </div>
    `;

    // Click → pre-fill destination & scroll to form
    card.addEventListener("click", () => {
      document.getElementById("destination-select").value = key;
      document.getElementById("navigator").scrollIntoView({ behavior: "smooth" });
      // Reset to "all" dropdown if needed
      populateDropdowns(state.locations);
      document.getElementById("destination-select").value = key;

      card.style.background = "rgba(59,130,246,0.18)";
      setTimeout(() => { card.style.background = ""; }, 600);
    });

    grid.appendChild(card);
  });
}

// ─────────────────────────────────────────────
// 6. FORM VALIDATION
// ─────────────────────────────────────────────

function validateForm() {
  const sourceKey = document.getElementById("source-select").value;
  const destKey   = document.getElementById("destination-select").value;
  let   valid     = true;

  document.getElementById("group-source").classList.remove("error");
  document.getElementById("group-destination").classList.remove("error");
  document.getElementById("same-location-alert").style.display = "none";

  if (!sourceKey) {
    document.getElementById("group-source").classList.add("error");
    valid = false;
  }

  if (!destKey) {
    document.getElementById("group-destination").classList.add("error");
    valid = false;
  }

  if (valid && sourceKey === destKey) {
    document.getElementById("same-location-alert").style.display = "block";
    valid = false;
  }

  return { valid, sourceKey, destKey };
}

// ─────────────────────────────────────────────
// 7. EVENT HANDLERS
// ─────────────────────────────────────────────

/**
 * Handle Navigate button click:
 *  1. Validate form
 *  2. Call /api/navigate on the backend
 *  3. Show route preview
 *  4. Open Google Maps
 */
async function handleNavigate(e) {
  e.preventDefault();

  const { valid, sourceKey, destKey } = validateForm();
  if (!valid) return;

  const btn = document.getElementById("btn-navigate");
  btn.disabled = true;
  btn.querySelector(".btn-label").textContent = "Getting route…";

  try {
    const data = await fetchNavigate(sourceKey, destKey);

    // Show route preview
    document.getElementById("preview-from").textContent = data.from.label;
    document.getElementById("preview-to").textContent   = data.to.label;
    document.getElementById("route-preview").style.display = "block";

    // Open Google Maps in new tab
    window.open(data.mapsUrl, "_blank");
  } catch (err) {
    alert(`Navigation error: ${err.message}`);
  } finally {
    btn.disabled = false;
    btn.querySelector(".btn-label").textContent = "Navigate on Google Maps";
  }
}

/**
 * Swap source ↔ destination dropdowns.
 */
function handleSwap() {
  const srcSel  = document.getElementById("source-select");
  const dstSel  = document.getElementById("destination-select");
  const tmp     = srcSel.value;
  srcSel.value  = dstSel.value;
  dstSel.value  = tmp;

  clearErrors();
}

/**
 * Reset the form to its default state.
 */
function handleReset() {
  document.getElementById("navigation-form").reset();
  document.getElementById("route-preview").style.display = "none";
  clearErrors();
}

/**
 * Quick-set source to Main Gate.
 */
function handleMainGate() {
  document.getElementById("source-select").value = "main_gate";
  document.getElementById("group-source").classList.remove("error");
}

function clearErrors() {
  document.getElementById("group-source").classList.remove("error");
  document.getElementById("group-destination").classList.remove("error");
  document.getElementById("same-location-alert").style.display = "none";
  document.getElementById("route-preview").style.display = "none";
}

/**
 * Live-clear validation errors when user makes a selection.
 */
function attachLiveValidation() {
  ["source-select", "destination-select"].forEach((id) => {
    document.getElementById(id).addEventListener("change", clearErrors);
  });
}

function attachEventHandlers() {
  document.getElementById("navigation-form")
    .addEventListener("submit", handleNavigate);

  document.getElementById("btn-swap")
    .addEventListener("click", handleSwap);

  document.getElementById("btn-reset")
    .addEventListener("click", handleReset);

  document.getElementById("btn-main-gate")
    .addEventListener("click", handleMainGate);

  // Category "All" pill
  document.getElementById("cat-all")
    .addEventListener("click", () => handleCategoryFilter("all"));

  // Search box
  document.getElementById("location-search")
    .addEventListener("input", function () {
      renderLocations(applyFilter(state.locations, state.filteredCategory, this.value));
    });
}

// ─────────────────────────────────────────────
// 8. STATS — animated count-up
// ─────────────────────────────────────────────

function animateCount(id, target, duration = 1100) {
  const el   = document.getElementById(id);
  if (!el) return;
  const step = Math.ceil(target / (duration / 16));
  let   curr = 0;
  const t    = setInterval(() => {
    curr = Math.min(curr + step, target);
    el.textContent = curr;
    if (curr >= target) clearInterval(t);
  }, 16);
}

// ─────────────────────────────────────────────
// 9. API STATUS PILL
// ─────────────────────────────────────────────

function setApiStatus(status, text) {
  const pill = document.getElementById("api-status");
  pill.className = `api-status-pill ${status}`;
  pill.querySelector(".api-text").textContent = text;
}

// ─────────────────────────────────────────────
// 10. THEME TOGGLE (Light/Dark Mode)
// ─────────────────────────────────────────────

function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;
  const themeIcon = themeToggle.querySelector(".theme-icon");

  // Sync initial state of the icon
  if (document.documentElement.classList.contains("light-theme")) {
    themeIcon.textContent = "☀️";
  } else {
    themeIcon.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.classList.toggle("light-theme");
    themeIcon.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

// ─────────────────────────────────────────────
// 11. INIT
// ─────────────────────────────────────────────

async function init() {
  initTheme();
  attachEventHandlers();
  attachLiveValidation();

  try {
    // Load categories and locations in parallel
    const [locations] = await Promise.all([
      fetchLocations(),
      buildCategoryFilter(),
    ]);

    state.locations = locations;

    populateDropdowns(locations);
    renderLocations(locations);

    // Stats
    const deptCount = locations.filter((l) => l.category === "dept").length;
    animateCount("stat-locations", locations.length);
    animateCount("stat-depts", deptCount);

    setApiStatus("online", `API online — ${locations.length} locations loaded`);
  } catch (err) {
    setApiStatus("error", "API error — check server");
    document.getElementById("locations-grid").innerHTML =
      `<p style="color:var(--error);grid-column:1/-1;text-align:center;padding:40px 0;">
        ⚠️ Failed to load locations from server.<br/>
        <code style="font-size:0.8rem;color:var(--text-muted)">${err.message}</code>
      </p>`;
    console.error("Init error:", err);
  }
}

document.addEventListener("DOMContentLoaded", init);
