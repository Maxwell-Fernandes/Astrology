# VedicAstro — Web App Design Notes

Version: generated from Maxwell-Fernandes/VedicAstro (VedicAstroAPI.py & README.md)

Purpose
- This document lists all API endpoints exposed by the repository's FastAPI service, describes what each endpoint does, lists the package features you can surface in a web application, and gives UI / data-flow recommendations to build a frontend around the API.

Contents
1. API Endpoints (all endpoints)
2. Request / Response summaries and examples
3. Package features (functions / capabilities)
4. Suggested web app pages, UI components and data flow
5. Example API calls (curl)
6. Notes & implementation considerations

---

## 1. API Endpoints

Summary of endpoints implemented in VedicAstroAPI.py:

- GET /
  - Path: /
  - Method: GET
  - Purpose: Root / welcome endpoint. Returns a JSON with a welcome message and a pointer to the interactive docs (the repo's FastAPI docs).
  - Example response:
    - message: string
    - info: string (pointer to docs: http://127.0.0.1:8088/docs)

- POST /get_all_horoscope_data
  - Path: /get_all_horoscope_data
  - Method: POST
  - Purpose: Generate a full horoscope data payload for a specific date/time/location. Uses the main VedicHoroscopeData class to compute chart, planets, houses, significators, aspects, dasa table, and consolidated chart data.
  - Request body model: ChartInput (JSON)
    - year: int
    - month: int
    - day: int
    - hour: int
    - minute: int
    - second: int
    - utc: str (timezone / UTC offset string; repository examples use formats like "+05:30" or "+00:00")
    - latitude: float
    - longitude: float
    - ayanamsa: str = "Lahiri" (default)
    - house_system: str = "Equal" (default)
    - return_style: Optional[str] = None
  - Response: JSON object with these top-level keys:
    - planets_data: list of objects (each planet converted from an internal namedtuple to a dict)
    - houses_data: list of objects (each house converted to dict)
    - planet_significators: object/structure describing planet-wise ABCD significators
    - planetary_aspects: object/structure describing aspects between planets
    - house_significators: object/structure describing house-wise ABCD significators
    - vimshottari_dasa_table: structure representing the computed Vimshottari Dasa table
    - consolidated_chart_data: aggregated chart representation (custom structure by VedicHoroscopeData, influenced by return_style)
  - Notes: planets_data and houses_data are built from the package namedtuples and returned as dictionaries via ._asdict(). The exact field names in each dict are defined by the vedicastro package internals.

- POST /get_all_horary_data
  - Path: /get_all_horary_data
  - Method: POST
  - Purpose: Compute a KP Horary (Prasna) chart for a provided horary number and location/time. This endpoint calls horary helper functions to find exact ascendant timing for the given horary number, then computes a horoscope and all tables similar to the standard horoscope endpoint.
  - Request body model: HoraryChartInput (JSON)
    - horary_number: int
    - year: int
    - month: int
    - day: int
    - hour: int
    - minute: int
    - second: int
    - utc: str
    - latitude: float
    - longitude: float
    - ayanamsa: str = "Krishnamurti" (default)
    - house_system: str = "Placidus" (default)
    - return_style: Optional[str] = None
  - Response: JSON object with same top-level structure as /get_all_horoscope_data:
    - planets_data, houses_data, planet_significators, planetary_aspects, house_significators, vimshottari_dasa_table, consolidated_chart_data
  - Notes: This endpoint relies on horary_chart.find_exact_ascendant_time to compute matched_time and hour-specific house chart. The horary computation workflow is distinct and returns the KP-specific ascendant computation results in addition to normal chart tables.

---

## 2. Request / Response details and examples

Request schema examples

- ChartInput sample:
{
  "year": 1990,
  "month": 5,
  "day": 15,
  "hour": 6,
  "minute": 30,
  "second": 0,
  "utc": "+05:30",
  "latitude": 12.9716,
  "longitude": 77.5946,
  "ayanamsa": "Lahiri",
  "house_system": "Equal"
}

- HoraryChartInput sample:
{
  "horary_number": 3,
  "year": 2025,
  "month": 11,
  "day": 11,
  "hour": 8,
  "minute": 0,
  "second": 0,
  "utc": "+00:00",
  "latitude": 51.5074,
  "longitude": -0.1278,
  "ayanamsa": "Krishnamurti",
  "house_system": "Placidus"
}

Example response structure (overview)
- planets_data: [
    {
      // fields depend on VedicAstro package namedtuple, typical fields may include:
      // name, longitude, sign, sign_degree, house, retrograde, velocity, other computed attributes
    },
    ...
  ]
- houses_data: [
    {
      // typical fields: house_number, cusp_degree, sign, planets_on_cusp, lord, other metadata
    },
    ...
  ]
- planet_significators: object — planet -> ABCD significators
- planetary_aspects: object — list of aspects between planets, aspect type and angular separations
- house_significators: object — house -> ABCD significators
- vimshottari_dasa_table: object/list — sequence of dasa periods with start/end dates and lords
- consolidated_chart_data: object — summary dataset intended for front-end consumption (pre-aggregated)

Important: For exact field names and types in planets_data/houses_data/consolidated_chart_data, inspect the vedicastro package model code (these dict keys mirror the namedtuple fields returned by the package).

---

## 3. Package features (exposed capabilities you can surface in the UI)

From the repository README and VedicAstro API, the main high-level features are:

Core class and primary methods
- VedicHoroscopeData (main class)
  - generate_chart: builds a flatlib.Chart object for a given datetime and location.
  - get_planets_data_from_chart: produce planets table/data from a Chart.
  - get_houses_data_from_chart: produce houses table/data from a Chart.
  - get_planet_wise_significators: compute ABCD significators per planet.
  - get_house_wise_significators: compute ABCD significators per house.
  - compute_vimshottari_dasa: compute Vimshottari Dasa table for the chart.
  - get_planetary_aspects: compute aspects (conjunction, trine, square, sextile, etc.) between planets.
  - get_consolidated_chart_data: produce a combined, frontend-friendly chart summary (accepts return_style to control format).

Horary (Prasna / KP) specific functionality
- get_horary_ascendant_degree (in horary_chart.py) — compute ascendant degree for horary timing.
- find_exact_ascendant_time (in horary_chart.py) — find exact time for an ascendant matching a horary number; used to build KP horary charts.

Other useful capabilities
- Generates outputs as JSON-friendly dictionaries (uses ._asdict() on namedtuples).
- Supports multiple ayanamsa choices (e.g., Lahiri, Krishnamurti) — default values shown in API models.
- Supports multiple house systems (e.g., Equal, Placidus) — default values shown in API models.
- Computes Vimshottari Dasa (major Dasa system) and Dasa tables.
- Computes planet-wise and house-wise ABCD significators (used for predictive interpretation).
- Computes planetary aspects (useful for visualization).
- Exposes a FastAPI wrapper with interactive docs at /docs.
- CORS middleware enabled (allow_origins=["*"]) — ready for browser frontends without extra CORS config.

---

## 4. Suggested web app pages & UI components

Pages
- Landing / Home
  - Brief description, link to API docs, quick input snippet.
- Chart Input (Natal Chart)
  - Form: date/time fields, timezone / utc string, latitude, longitude, ayanamsa select, house system select, return_style select (if supported)
  - Submit triggers POST /get_all_horoscope_data
  - Optional: Save / History of previous lookups (local storage or backend)
- Horary Input (KP Horary)
  - Form: horary_number, date/time, timezone, lat/lon, ayanamsa, house system, return_style
  - Submit triggers POST /get_all_horary_data
- Chart Results (per submission)
  - Summary panel: matched_time (for horary), ascendant, lagna sign, quick highlights
  - Planets table: name, zodiac degree, sign, house, retrograde, additional attributes
  - Houses table: cusp, sign, planets in house, lord
  - Aspects visualization (graph or chord diagram)
  - Dasa timeline: interactive timeline for Vimshottari Dasa periods (expand/collapse)
  - Consolidated chart data: cards for quick interpretation points
  - Chart wheel visualization: render zodiac wheel with planet positions
  - Significators view: ABCD tables per planet and per house
  - Download / Export options: export JSON, CSV tables, or PNG of chart wheel
- Settings
  - Default ayanamsa and house system (persisted per user)
  - Language/format preferences (date/time formats)
- API Explorer
  - Embed interactive Swagger / ReDoc or provide prefilled example requests

UI Components & interactions
- Date/time picker with timezone selector (output UTC string)
- Map or geolocation input for lat/long (allow manual override)
- Select / dropdown for ayanamsa and house system
- Results tabs: Planets | Houses | Aspects | Dasa | Consolidated
- Chart wheel renderer (SVG/Canvas) — use planet positions from planets_data to plot angles and labels
- Aspects graph: lines between planets with hover tooltips showing aspect type and orb
- Export modal: select formats and download
- Error handling area: show API validation errors or computation warnings

Data Flow for a simple request
1. User fills form → Frontend validates minimal fields.
2. Frontend POSTs to /get_all_horoscope_data with JSON ChartInput.
3. Backend returns JSON payload.
4. Frontend updates UI: populate tables and render visualizations from returned objects.

Design UX notes
- Make it obvious which ayanamsa & house system is being used; show these as part of results metadata.
- Provide a compact summary card with top interpretive results (first-degree highlights).
- For horary: show matched_time (the exact ascendant time the algorithm found) prominently.
- Allow toggling of display styles if return_style affects consolidated_chart_data.

---

## 5. Example API calls (curl)

- GET root:
curl -X GET "http://127.0.0.1:8088/"

- POST get_all_horoscope_data:
curl -X POST "http://127.0.0.1:8088/get_all_horoscope_data" -H "Content-Type: application/json" -d '{
  "year":1990,"month":5,"day":15,"hour":6,"minute":30,"second":0,
  "utc":"+05:30","latitude":12.9716,"longitude":77.5946,
  "ayanamsa":"Lahiri","house_system":"Equal"
}'

- POST get_all_horary_data:
curl -X POST "http://127.0.0.1:8088/get_all_horary_data" -H "Content-Type: application/json" -d '{
  "horary_number":3,"year":2025,"month":11,"day":11,
  "hour":8,"minute":0,"second":0,"utc":"+00:00",
  "latitude":51.5074,"longitude":-0.1278,
  "ayanamsa":"Krishnamurti","house_system":"Placidus"
}'

---

## 6. Notes & implementation considerations

- CORS: The API file already enables CORS for all origins (allow_origins=["*"]). This simplifies frontend origin setup but consider restricting origins for production.
- Timezones: The API expects a utc string — standardize how the frontend constructs this (ISO offset like "+05:30" or use a full timezone conversion to UTC). Provide client-side timezone detection to fill this automatically.
- Field exactness: planets_data and houses_data keys are defined by the vedicastro package namedtuples — inspect vedicastro code for exact field names if you need field-level mapping for UI columns.
- Return styles: The API accepts a return_style optional field (ChartInput.return_style). The meaning and available style values are defined in the package; check get_consolidated_chart_data implementation for permitted values.
- Horary specifics: Horary calculations use specialized ascendant-finding logic (KP). If building a horary UI, include explanation text and a display of matched_time and horary-derived houses.
- Performance: If many users or heavy requests expected, consider running compute-heavy operations in a worker queue (currently synchronous). The API imports ThreadPoolExecutor — you can adapt the endpoints to run computations concurrently if needed.
- Tests & validation: Add client-side and server-side validation for lat/lon, date/time ranges, horary number bounds, etc.

---

Appendix / Quick checklist for web app MVP
- [ ] Chart input form (Natal) wired to /get_all_horoscope_data
- [ ] Horary input form wired to /get_all_horary_data
- [ ] Planets & Houses table views
- [ ] Chart wheel visualization
- [ ] Vimshottari Dasa timeline view
- [ ] Aspects visualization (graph or lines on wheel)
- [ ] Settings (ayanamsa, house system)
- [ ] Export (JSON/CSV/PNG)
- [ ] Embedded API docs link to /docs

End of design.md