# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bobo_astrologer is a web application for Vedic Astrology calculations, built around the VedicAstro FastAPI backend. The project provides natal chart generation, KP Horary (Prasna) calculations, planetary aspects, house systems, Vimshottari Dasa tables, and ABCD significators.

**Current Status**: Frontend complete and running. Backend setup in progress.

**Last Updated**: 2025-11-11

## Project Status Summary

### Completed Components

#### Frontend Application (React + TypeScript + Vite)
✓ **Complete** - Running on http://localhost:3002/

- **Build Tool**: Vite with TypeScript
- **Styling**: TailwindCSS with dark theme
- **State Management**: Zustand
- **Routing**: React Router v6
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios (configured for http://127.0.0.1:8088)
- **Notifications**: React Hot Toast
- **Icons**: Lucide React (no emojis used)

#### Component Architecture (Atomic Design)

**Atoms** (all located in `/home/maxwell/Desktop/Bobo_astrologer/frontend/src/components/atoms/`):
- `Button.tsx` - Primary/secondary variants with loading state, dark theme styling
- `Input.tsx` - Text input with dark theme, focus states
- `Select.tsx` - Dropdown selector with dark background (#1f2937), proper z-index handling
- `Label.tsx` - Form labels with dark theme
- `Card.tsx` - Container component with glass morphism effect
- `Spinner.tsx` - Loading indicator

**Molecules** (in `/home/maxwell/Desktop/Bobo_astrologer/frontend/src/components/molecules/`):
- `FormField.tsx` - Combines Label + Input/Select with error display
- `LocationSearch.tsx` - Autocomplete location search using OpenStreetMap Nominatim API
  - Debounced search (300ms)
  - Returns city, state, country, lat, lon
  - No API key required
  - Uses absolute positioning for dropdown
  - Handles loading and error states

**Pages** (in `/home/maxwell/Desktop/Bobo_astrologer/frontend/src/pages/`):
- `Home.tsx` - Landing page with:
  - Animated starfield background (canvas-based)
  - Glass morphism hero card
  - Navigation to natal chart form
- `NatalChart.tsx` - Birth data input form with:
  - Date picker (native HTML5 date input)
  - Time input (hour/minute/second)
  - Timezone selector (38 UTC offset options from -12:00 to +14:00)
  - Location search with autocomplete
  - Manual lat/lon override inputs
  - Ayanamsa selector (Lahiri/Krishnamurti)
  - House system selector (Equal/Placidus)
  - Form validation with Zod schema
  - Submit to backend API
- `ChartResults.tsx` - Displays horoscope data returned from backend
  - Planets data table
  - Houses data table
  - Planetary aspects
  - Vimshottari Dasa table
  - Significators display
  - JSON data viewer for debugging

### Backend Setup

#### VedicAstro Package Status
- **Location**: `/home/maxwell/Desktop/Bobo_astrologer/VedicAstro/`
- **Repository**: Cloned from Maxwell-Fernandes/VedicAstro
- **API File**: `VedicAstroAPI.py` exists with correct FastAPI endpoints
- **Virtual Environment**: Found at `./VedicAstro/venv/bin/activate`
- **Status**: Not yet activated or configured

#### Known Backend Issues
1. **Python Version Mismatch**:
   - VedicAstro `setup.py` requires Python 3.11+
   - System has Python 3.10.12
   - **Solution Options**:
     - Modify `setup.py` to allow Python 3.10: `python_requires=">=3.10"`
     - OR upgrade Python to 3.11+

2. **Missing Dependencies**:
   - Requires `flatlib` fork: `git+https://github.com/diliprk/flatlib.git@sidereal#egg=flatlib`
   - Must be installed before VedicAstro package

### Next Steps for Backend Activation

Execute these commands from `/home/maxwell/Desktop/Bobo_astrologer/VedicAstro/`:

```bash
# 1. Activate virtual environment
source ./venv/bin/activate

# 2. Fix Python version requirement (if needed)
# Edit setup.py line containing python_requires to:
# python_requires=">=3.10"

# 3. Install flatlib dependency
pip install git+https://github.com/diliprk/flatlib.git@sidereal#egg=flatlib

# 4. Install VedicAstro package in editable mode
pip install -e .

# 5. Start FastAPI server
uvicorn VedicAstroAPI:app --host 127.0.0.1 --port 8088
```

The frontend will automatically connect once the backend is running.

## Backend API Architecture

The backend (from Maxwell-Fernandes/VedicAstro) exposes a FastAPI service with the following endpoints:

- `GET /` - Welcome/root endpoint
- `POST /get_all_horoscope_data` - Generate complete natal chart data
- `POST /get_all_horary_data` - Compute KP Horary (Prasna) chart

### Core Backend Components

**VedicHoroscopeData Class** (main computation engine):
- `generate_chart()` - Creates flatlib.Chart for datetime/location
- `get_planets_data_from_chart()` - Returns planets table (namedtuples converted to dicts)
- `get_houses_data_from_chart()` - Returns houses table
- `get_planet_wise_significators()` - Computes ABCD significators per planet
- `get_house_wise_significators()` - Computes ABCD significators per house
- `compute_vimshottari_dasa()` - Generates Dasa table
- `get_planetary_aspects()` - Computes planetary aspects (conjunction, trine, square, etc.)
- `get_consolidated_chart_data()` - Returns frontend-friendly aggregated data

**Horary Module** (horary_chart.py):
- `get_horary_ascendant_degree()` - Computes ascendant for horary timing
- `find_exact_ascendant_time()` - Finds exact time matching horary number for KP charts

### API Request/Response Models

**ChartInput** (for natal charts):
```json
{
  "year": int,
  "month": int,
  "day": int,
  "hour": int,
  "minute": int,
  "second": int,
  "utc": string (e.g., "+05:30"),
  "latitude": float,
  "longitude": float,
  "ayanamsa": string (default: "Lahiri"),
  "house_system": string (default: "Equal"),
  "return_style": optional string
}
```

**HoraryChartInput** (for horary/prasna charts):
Same as ChartInput plus:
```json
{
  "horary_number": int,
  // ... (other ChartInput fields)
  "ayanamsa": string (default: "Krishnamurti"),
  "house_system": string (default: "Placidus")
}
```

**Response Structure** (both endpoints):
- `planets_data`: Array of planet objects with longitude, sign, house, retrograde status, velocity
- `houses_data`: Array of house objects with cusp degree, sign, planets, lord
- `planet_significators`: Planet-wise ABCD significators object
- `planetary_aspects`: List of aspects between planets with types and angular separations
- `house_significators`: House-wise ABCD significators object
- `vimshottari_dasa_table`: Dasa periods with start/end dates and lords
- `consolidated_chart_data`: Pre-aggregated frontend-friendly summary

## Frontend Implementation Details

### Technology Stack

**Core Dependencies** (see `/home/maxwell/Desktop/Bobo_astrologer/frontend/package.json`):
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0",
  "zustand": "^5.0.2",
  "react-hook-form": "^7.54.0",
  "zod": "^3.23.8",
  "@hookform/resolvers": "^3.9.1",
  "axios": "^1.7.9",
  "react-hot-toast": "^2.4.1",
  "lucide-react": "^0.469.0"
}
```

### State Management (Zustand)

**Store Location**: `/home/maxwell/Desktop/Bobo_astrologer/frontend/src/store/chartStore.ts`

```typescript
interface ChartStore {
  chartData: any | null;
  setChartData: (data: any) => void;
  clearChartData: () => void;
}
```

Stores horoscope results from API for display on ChartResults page.

### API Integration

**Client Configuration**: `/home/maxwell/Desktop/Bobo_astrologer/frontend/src/api/client.ts`

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8088',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**Backend CORS**: Already configured to accept all origins in VedicAstroAPI.py

### Form Validation Schema

**Location**: `/home/maxwell/Desktop/Bobo_astrologer/frontend/src/pages/NatalChart.tsx`

```typescript
const natalChartSchema = z.object({
  date: z.string().min(1, "Date is required"),
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
  second: z.number().min(0).max(59),
  timezone: z.string(),
  location: z.string().min(1, "Location is required"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  ayanamsa: z.string(),
  houseSystem: z.string(),
});
```

### Timezone Options

**Total Options**: 38 UTC offsets

**Range**: -12:00 to +14:00 in 30-minute increments

**Implementation**: Select dropdown in NatalChart form includes labels with major cities for each timezone.

### Location Search Implementation

**API Used**: OpenStreetMap Nominatim (https://nominatim.openstreetmap.org/)

**Key Features**:
- Free, no API key required
- Debounced search (300ms delay)
- Returns formatted address with city, state, country
- Provides precise latitude/longitude
- User-Agent header: "Bobo_astrologer/1.0"

**Request Format**:
```
GET https://nominatim.openstreetmap.org/search?q={query}&format=json&addressdetails=1&limit=5
```

**Manual Override**: Users can manually edit latitude/longitude values if autocomplete location isn't precise enough.

### Routing Configuration

**Router Setup**: `/home/maxwell/Desktop/Bobo_astrologer/frontend/src/App.tsx`

```typescript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/natal-chart" element={<NatalChart />} />
    <Route path="/chart-results" element={<ChartResults />} />
  </Routes>
</BrowserRouter>
```

### Dark Theme Configuration

**TailwindCSS Config**: `/home/maxwell/Desktop/Bobo_astrologer/frontend/tailwind.config.js`

- Background: `bg-gray-900` (#111827)
- Card backgrounds: `bg-gray-800` (#1f2937)
- Text: `text-gray-100` / `text-gray-300`
- Borders: `border-gray-700`
- Glass morphism: `backdrop-blur-md bg-opacity-90`

**Select Component Fix**:
- Background explicitly set to `#1f2937` to prevent white background
- Z-index set to `z-10` for proper dropdown layering
- Dark arrow indicator using CSS filter

### Starfield Animation

**Implementation**: Canvas-based animation in Home.tsx

**Features**:
- 200 stars with random positions and sizes
- Parallax effect (3 depth layers with different speeds)
- Continuous horizontal scrolling
- Responsive to window resize
- Runs at 60 FPS using requestAnimationFrame

## Development Workflow

### Frontend Development

**Directory**: `/home/maxwell/Desktop/Bobo_astrologer/frontend/`

**Install Dependencies**:
```bash
cd /home/maxwell/Desktop/Bobo_astrologer/frontend
npm install
```

**Run Development Server**:
```bash
npm run dev
# Runs on http://localhost:3002/
```

**Build for Production**:
```bash
npm run build
# Output: dist/
```

**Linting**:
```bash
npm run lint
```

### Backend Development

**Directory**: `/home/maxwell/Desktop/Bobo_astrologer/VedicAstro/`

**Activate Environment**:
```bash
source ./VedicAstro/venv/bin/activate
```

**Run Server**:
```bash
uvicorn VedicAstroAPI:app --host 127.0.0.1 --port 8088
# API docs available at: http://127.0.0.1:8088/docs
```

**Deactivate Environment**:
```bash
deactivate
```

## API Integration

**Base URL**: `http://127.0.0.1:8088`

**Example cURL requests**:

```bash
# Get natal chart
curl -X POST "http://127.0.0.1:8088/get_all_horoscope_data" \
  -H "Content-Type: application/json" \
  -d '{
    "year":1990,"month":5,"day":15,"hour":6,"minute":30,"second":0,
    "utc":"+05:30","latitude":12.9716,"longitude":77.5946,
    "ayanamsa":"Lahiri","house_system":"Equal"
  }'

# Get horary chart
curl -X POST "http://127.0.0.1:8088/get_all_horary_data" \
  -H "Content-Type: application/json" \
  -d '{
    "horary_number":3,"year":2025,"month":11,"day":11,
    "hour":8,"minute":0,"second":0,"utc":"+00:00",
    "latitude":51.5074,"longitude":-0.1278,
    "ayanamsa":"Krishnamurti","house_system":"Placidus"
  }'
```

## Important Implementation Notes

### CORS
Backend has CORS enabled for all origins (`allow_origins=["*"]`). Consider restricting for production.

### Timezone Handling
- API expects UTC offset strings (e.g., "+05:30", "+00:00")
- Frontend provides 38 timezone options in Select dropdown
- User selects from predefined list (no auto-detection implemented)

### Data Structure Details
- `planets_data` and `houses_data` keys are defined by vedicastro package namedtuples (use `._asdict()`)
- Field names depend on package internals - inspect vedicastro source for exact mappings
- `return_style` parameter controls `consolidated_chart_data` format - check package documentation for valid values

### Horary Calculations
- Uses specialized KP ascendant-finding logic
- Returns `matched_time` (exact computed ascendant time) - display this prominently
- Default ayanamsa is "Krishnamurti", house system is "Placidus"

### Ayanamsa and House Systems
- **Supported Ayanamsa**: "Lahiri", "Krishnamurti" (check package for full list)
- **Supported House Systems**: "Equal", "Placidus" (check package for full list)
- Frontend currently offers these two options in dropdowns
- Always show which system is being used in results

### Design System Consistency
- **No emojis**: All UI uses Lucide React icons exclusively
- **Color Palette**: Strict adherence to gray-900/800/700/300/100 scale
- **Typography**: System font stack with sans-serif fallback
- **Spacing**: TailwindCSS spacing scale (px-4, py-2, gap-6, etc.)
- **Component Reusability**: Atomic design pattern enforced

## Known Issues and Limitations

### Backend Issues
1. **Python Version**: VedicAstro requires 3.11+, system has 3.10.12
   - Workaround: Modify setup.py `python_requires` line
2. **Backend Not Started**: Server not yet running, frontend will show connection errors

### Frontend Limitations
1. **No Chart Visualization**: ChartResults page shows raw data tables, no wheel diagram yet
2. **No Horary Form**: Only natal chart input implemented, horary form planned
3. **No Data Persistence**: No save/load functionality for charts
4. **No Error Boundary**: App-wide error handling not implemented
5. **No Loading State**: No global loading indicator for API calls (only local spinners)

### UX Enhancements Needed
1. **Chart Wheel SVG**: Visual representation of planetary positions
2. **Aspects Graph**: Chord diagram or network graph for planetary relationships
3. **Dasa Timeline**: Interactive, expandable timeline view
4. **Export Options**: PDF/PNG/CSV export for results
5. **Settings Persistence**: Save user preferences (ayanamsa, house system) to localStorage
6. **Chart History**: Store and retrieve previous calculations

## Future Considerations

### Performance
- API operations are currently synchronous; consider worker queues for heavy loads (ThreadPoolExecutor is imported)
- Frontend could implement request caching for repeated calculations
- Consider pagination or virtualization for large Dasa tables

### Validation
- Add client and server-side validation for lat/lon ranges, date/time bounds, horary number constraints
- Implement more sophisticated form error handling with field-specific messages

### Settings Persistence
- Store user preferences (default ayanamsa, house system) in localStorage or backend
- Implement user profiles for saved preferences

### History/Saved Charts
- Implement chart save/load functionality
- Backend database integration for persistent storage
- User authentication for private chart storage

### Interactive API Docs
- Backend provides Swagger UI at `http://127.0.0.1:8088/docs`
- Consider adding examples and better descriptions to API schema

### Accessibility
- Add ARIA labels to all interactive elements
- Implement keyboard navigation for dropdowns
- Ensure color contrast meets WCAG AA standards
- Add screen reader announcements for dynamic content

### Testing
- No tests currently implemented
- Consider: Vitest for unit tests, React Testing Library for components, Playwright for E2E

## File Structure Overview

```
/home/maxwell/Desktop/Bobo_astrologer/
├── frontend/                          # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/                # Basic UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Label.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Spinner.tsx
│   │   │   └── molecules/            # Composite components
│   │   │       ├── FormField.tsx
│   │   │       └── LocationSearch.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx             # Landing page with starfield
│   │   │   ├── NatalChart.tsx       # Birth data input form
│   │   │   └── ChartResults.tsx     # Results display
│   │   ├── store/
│   │   │   └── chartStore.ts        # Zustand state management
│   │   ├── api/
│   │   │   └── client.ts            # Axios HTTP client
│   │   ├── App.tsx                  # Router configuration
│   │   └── main.tsx                 # React entry point
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── VedicAstro/                       # Backend package
│   ├── VedicAstroAPI.py             # FastAPI endpoints
│   ├── setup.py                     # Package configuration
│   ├── venv/                        # Virtual environment
│   └── ...                          # VedicAstro package code
├── design.md                         # Design documentation
└── CLAUDE.md                         # This file
```

## Quick Start Guide for Next Developer

1. **Start Frontend** (already working):
   ```bash
   cd /home/maxwell/Desktop/Bobo_astrologer/frontend
   npm run dev
   # Access at http://localhost:3002/
   ```

2. **Fix and Start Backend** (not yet done):
   ```bash
   cd /home/maxwell/Desktop/Bobo_astrologer/VedicAstro

   # Activate venv
   source ./venv/bin/activate

   # Fix Python version (edit setup.py)
   # Change: python_requires=">=3.11"
   # To:     python_requires=">=3.10"

   # Install dependencies
   pip install git+https://github.com/diliprk/flatlib.git@sidereal#egg=flatlib
   pip install -e .

   # Start server
   uvicorn VedicAstroAPI:app --host 127.0.0.1 --port 8088
   ```

3. **Test Integration**:
   - Open http://localhost:3002/ in browser
   - Navigate to "Get Started" → Natal Chart form
   - Search for a location (e.g., "New York")
   - Fill in birth date and time
   - Select timezone, ayanamsa, house system
   - Submit form
   - View results on Chart Results page

4. **Verify Backend**:
   - Check API docs at http://127.0.0.1:8088/docs
   - Test endpoint with cURL (see API Integration section)

## Troubleshooting

### Frontend won't start
- Check Node.js version: `node --version` (should be 18+)
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check port 3002 is available: `lsof -i :3002`

### Backend won't start
- Verify venv is activated: prompt should show `(venv)`
- Check Python version: `python --version`
- Review setup.py Python requirement
- Check flatlib installation: `pip list | grep flatlib`
- Verify port 8088 is available: `lsof -i :8088`

### Location search not working
- Check browser console for CORS errors
- Verify network connectivity to nominatim.openstreetmap.org
- Try manual lat/lon entry as fallback

### API connection failed
- Confirm backend is running: `curl http://127.0.0.1:8088/`
- Check browser console for error messages
- Verify frontend axios baseURL matches backend port
- Review CORS configuration in VedicAstroAPI.py

### Form validation errors
- Check browser console for Zod validation messages
- Verify all required fields are filled
- Check latitude range: -90 to 90
- Check longitude range: -180 to 180
- Ensure date format is valid (YYYY-MM-DD)
