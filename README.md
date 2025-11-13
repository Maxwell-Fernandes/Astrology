# Bobo Astrologer

A comprehensive web application for Vedic Astrology calculations, featuring natal chart generation, KP Horary (Prasna) calculations, planetary aspects, house systems, Vimshottari Dasa tables, and ABCD significators.

## Project Status

- **Frontend**: ✅ Complete and running
- **Backend**: ⚠️ Setup in progress
- **Integration**: 🔄 Ready for testing once backend is running

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS (dark theme)
- **State Management**: Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **UI Components**: Custom atomic design system
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python)
- **Astrology Engine**: VedicAstro package
- **Calculations**: flatlib (sidereal fork)
- **API Docs**: Swagger UI

## Prerequisites

### Frontend
- Node.js 18+
- npm or yarn

### Backend
- Python 3.11+ (or 3.10 with setup.py modification)
- pip
- virtualenv

## Quick Start

### 1. Frontend Setup

```bash
# Navigate to frontend directory
cd bobo-astrologer-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at: `http://localhost:3000`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd VedicAstro

# Activate virtual environment
source venv/bin/activate

# If using Python 3.10, modify setup.py
# Change: python_requires=">=3.11"
# To:     python_requires=">=3.10"

# Install flatlib dependency (sidereal fork)
pip install git+https://github.com/diliprk/flatlib.git@sidereal#egg=flatlib

# Install VedicAstro package in editable mode
pip install -e .

# Start FastAPI server
uvicorn VedicAstroAPI:app --host 127.0.0.1 --port 8088
```

The backend API will be available at: `http://127.0.0.1:8088`

API documentation: `http://127.0.0.1:8088/docs`

### 3. Verify Integration

Once both servers are running:
1. Open `http://localhost:3000` in your browser
2. Navigate to "Get Started" → Natal Chart form
3. Search for a location (e.g., "New York")
4. Fill in birth date and time
5. Select timezone, ayanamsa, house system
6. Submit form and view results

## Project Structure

```
Astrology/
├── bobo-astrologer-app/          # React frontend application
│   ├── src/
│   │   ├── components/           # UI components (atoms/molecules/organisms)
│   │   ├── pages/                # Page components
│   │   ├── store/                # Zustand state management
│   │   ├── api/                  # API integration layer
│   │   ├── types/                # TypeScript type definitions
│   │   ├── utils/                # Utility functions
│   │   └── hooks/                # Custom React hooks
│   ├── README.md                 # Frontend-specific documentation
│   └── NEXT_STEPS.md             # Implementation guide
│
├── VedicAstro/                   # FastAPI backend
│   ├── VedicAstroAPI.py          # FastAPI endpoints
│   ├── setup.py                  # Package configuration
│   ├── venv/                     # Python virtual environment
│   └── ...                       # VedicAstro package code
│
├── ARCHITECTURE.md               # System architecture documentation
├── PROJECT_STRUCTURE.md          # Detailed file organization
├── STYLE_GUIDE.md                # Design system & component patterns
├── CLAUDE.md                     # AI assistant context & API reference
├── GETTING_STARTED.md            # Detailed setup guide
├── design.md                     # Original design document
└── README.md                     # This file
```

## Key Features

### Implemented
- ✅ Natal chart generation with birth data input
- ✅ Location search with autocomplete (OpenStreetMap Nominatim)
- ✅ Timezone selection (38 UTC offset options)
- ✅ Ayanamsa selection (Lahiri/Krishnamurti)
- ✅ House system selection (Equal/Placidus)
- ✅ Form validation with Zod schemas
- ✅ Dark theme with glass morphism effects
- ✅ Starfield background animation
- ✅ Responsive design
- ✅ Chart results display (planets, houses, aspects, dasa)

### Planned (See TODO Section)
- 🔄 Backend activation and testing
- 🔄 KP Horary (Prasna) chart form
- 🔄 Chart wheel visualization (SVG)
- 🔄 Interactive aspects graph
- 🔄 Dasa timeline visualization
- 🔄 Chart save/load functionality
- 🔄 Export to PDF/PNG/CSV
- 🔄 User settings persistence
- 🔄 Chart history/database

## Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

### Backend

```bash
# From VedicAstro/ directory with venv activated
uvicorn VedicAstroAPI:app --reload              # Development server
uvicorn VedicAstroAPI:app --host 0.0.0.0        # Expose to network
python -m pytest                                 # Run tests (if available)
```

## API Endpoints

### Root
- `GET /` - Health check / welcome message

### Natal Charts
- `POST /get_all_horoscope_data` - Generate complete natal chart data

**Request Body:**
```json
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
```

### Horary Charts
- `POST /get_all_horary_data` - Generate KP Horary (Prasna) chart

**Request Body:**
```json
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
```

## Development Workflow

### Daily Development

```bash
# Terminal 1: Frontend
cd bobo-astrologer-app
npm run dev

# Terminal 2: Backend
cd VedicAstro
source venv/bin/activate
uvicorn VedicAstroAPI:app --reload

# Terminal 3: Type checking (optional)
cd bobo-astrologer-app
npm run type-check
```

### Making Changes

1. **Frontend Changes**: Edit files in `bobo-astrologer-app/src/` - Vite will hot-reload
2. **Backend Changes**: Edit files in `VedicAstro/` - uvicorn will auto-reload with `--reload` flag
3. **Styling**: Edit Tailwind classes - changes apply immediately
4. **Types**: Update TypeScript types in `src/types/` - run `npm run type-check`

## Troubleshooting

### Frontend Issues

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Dependencies not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Type errors:**
```bash
npm run type-check
```

### Backend Issues

**Python version mismatch:**
- Modify `VedicAstro/setup.py` line with `python_requires=">=3.10"`
- Or install Python 3.11+

**flatlib not found:**
```bash
pip install git+https://github.com/diliprk/flatlib.git@sidereal#egg=flatlib
```

**Port 8088 already in use:**
```bash
lsof -ti:8088 | xargs kill -9
```

**Virtual environment not activated:**
```bash
# Check if prompt shows (venv)
source VedicAstro/venv/bin/activate
```

### Integration Issues

**CORS errors:**
- Check backend CORS configuration in `VedicAstroAPI.py`
- Ensure `allow_origins=["*"]` is set

**API connection failed:**
```bash
# Test backend directly
curl http://127.0.0.1:8088/

# Test natal chart endpoint
curl -X POST "http://127.0.0.1:8088/get_all_horoscope_data" \
  -H "Content-Type: application/json" \
  -d '{"year":1990,"month":5,"day":15,"hour":6,"minute":30,"second":0,"utc":"+05:30","latitude":12.9716,"longitude":77.5946,"ayanamsa":"Lahiri","house_system":"Equal"}'
```

**Location search not working:**
- Check network connectivity to `nominatim.openstreetmap.org`
- Use manual lat/lon entry as fallback

## Documentation

- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Detailed setup and implementation guide
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Complete system architecture and data flow
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - File organization explained
- **[STYLE_GUIDE.md](STYLE_GUIDE.md)** - Design system, colors, typography, components
- **[CLAUDE.md](CLAUDE.md)** - AI assistant context and backend API reference
- **[bobo-astrologer-app/README.md](bobo-astrologer-app/README.md)** - Frontend-specific docs
- **[bobo-astrologer-app/NEXT_STEPS.md](bobo-astrologer-app/NEXT_STEPS.md)** - Implementation code examples

## TODO

### High Priority

#### Backend Setup & Testing
- [ ] **Activate VedicAstro Backend**
  - [ ] Fix Python version requirement in setup.py (3.11 → 3.10)
  - [ ] Install flatlib dependency
  - [ ] Install VedicAstro package in editable mode
  - [ ] Start FastAPI server and verify it runs
  - [ ] Test `/get_all_horoscope_data` endpoint with cURL
  - [ ] Test `/get_all_horary_data` endpoint with cURL

#### Frontend-Backend Integration
- [ ] **Test Full Integration Flow**
  - [ ] Submit natal chart form from frontend
  - [ ] Verify API request reaches backend
  - [ ] Confirm response data structure matches frontend expectations
  - [ ] Test error handling for invalid inputs
  - [ ] Verify CORS is working correctly

### Medium Priority

#### Horary Chart Implementation
- [ ] **Create Horary Chart Form**
  - [ ] Create `HoraryChart.tsx` page component
  - [ ] Add horary number input field (1-249)
  - [ ] Reuse location, date, time components from NatalChart
  - [ ] Set default ayanamsa to "Krishnamurti"
  - [ ] Set default house system to "Placidus"
  - [ ] Add form validation schema
  - [ ] Display matched ascendant time in results

- [ ] **Update Routing**
  - [ ] Add `/horary-chart` route to App.tsx
  - [ ] Add navigation link from Home page
  - [ ] Update ChartResults to handle horary data

#### Chart Visualizations
- [ ] **Implement Chart Wheel (SVG)**
  - [ ] Create `ChartWheel.tsx` visualization component
  - [ ] Draw zodiac circle with 12 signs
  - [ ] Plot planets at correct degrees
  - [ ] Show house cusps
  - [ ] Add planet symbols/glyphs
  - [ ] Add tooltips for planets
  - [ ] Implement responsive sizing

- [ ] **Aspects Graph**
  - [ ] Create `AspectsGraph.tsx` component
  - [ ] Implement chord diagram or network graph
  - [ ] Color-code aspect types (trine, square, opposition, etc.)
  - [ ] Add interactive hover states
  - [ ] Show angular separation on hover

- [ ] **Dasa Timeline Visualization**
  - [ ] Create `DasaTimeline.tsx` component
  - [ ] Implement expandable/collapsible timeline
  - [ ] Show current period highlighting
  - [ ] Add date range labels
  - [ ] Make it scrollable for long periods

### Low Priority

#### User Features
- [ ] **Chart Save/Load**
  - [ ] Add "Save Chart" button to ChartResults
  - [ ] Implement localStorage persistence
  - [ ] Create "Saved Charts" page
  - [ ] Add chart naming functionality
  - [ ] Implement delete saved chart
  - [ ] Add "Load Chart" functionality

- [ ] **Export Functionality**
  - [ ] Export chart data as JSON
  - [ ] Export chart as PDF (with visualizations)
  - [ ] Export chart as PNG image
  - [ ] Export tabular data as CSV
  - [ ] Add print stylesheet

- [ ] **Settings & Preferences**
  - [ ] Create Settings page
  - [ ] Save default ayanamsa preference
  - [ ] Save default house system preference
  - [ ] Save default timezone
  - [ ] Theme customization options (if expanding beyond dark theme)
  - [ ] Persist settings to localStorage

- [ ] **Chart History**
  - [ ] Implement chart calculation history
  - [ ] Store last 10 calculations in localStorage
  - [ ] Add "Recent Charts" section to Home page
  - [ ] Quick access to recalculate with same data

#### UI/UX Enhancements
- [ ] **Error Handling**
  - [ ] Implement global error boundary
  - [ ] Add app-wide error toast notifications
  - [ ] Create custom error pages (404, 500)
  - [ ] Add retry mechanism for failed API calls
  - [ ] Better error messages for validation failures

- [ ] **Loading States**
  - [ ] Add global loading indicator
  - [ ] Skeleton loaders for chart results
  - [ ] Loading animations for calculations
  - [ ] Progress indicator for long computations

- [ ] **Accessibility**
  - [ ] Add ARIA labels to all interactive elements
  - [ ] Implement keyboard navigation for forms
  - [ ] Test with screen readers
  - [ ] Ensure WCAG AA color contrast
  - [ ] Add focus indicators
  - [ ] Add skip-to-content links

- [ ] **Performance**
  - [ ] Implement request caching for repeated calculations
  - [ ] Add React.memo to prevent unnecessary re-renders
  - [ ] Lazy load visualization components
  - [ ] Optimize starfield animation performance
  - [ ] Virtualize large Dasa tables if needed

#### Backend Enhancements
- [ ] **Database Integration**
  - [ ] Set up database (PostgreSQL/SQLite)
  - [ ] Create chart storage schema
  - [ ] Implement chart save/retrieve endpoints
  - [ ] Add user authentication
  - [ ] Implement user-specific chart storage

- [ ] **API Improvements**
  - [ ] Add request validation middleware
  - [ ] Implement rate limiting
  - [ ] Add caching for common calculations
  - [ ] Better error responses with error codes
  - [ ] Add request logging
  - [ ] Implement background job queue for heavy calculations

#### Testing
- [ ] **Frontend Tests**
  - [ ] Set up Vitest
  - [ ] Unit tests for utility functions
  - [ ] Component tests with React Testing Library
  - [ ] Integration tests for forms
  - [ ] E2E tests with Playwright

- [ ] **Backend Tests**
  - [ ] Set up pytest
  - [ ] Unit tests for calculation functions
  - [ ] API endpoint tests
  - [ ] Integration tests
  - [ ] Test edge cases (invalid dates, coordinates)

#### DevOps
- [ ] **Deployment**
  - [ ] Dockerize frontend
  - [ ] Dockerize backend
  - [ ] Create docker-compose.yml
  - [ ] Set up CI/CD pipeline
  - [ ] Deploy to production server
  - [ ] Set up monitoring and logging

- [ ] **Documentation**
  - [ ] Add JSDoc comments to functions
  - [ ] Generate API documentation
  - [ ] Create user guide
  - [ ] Add video tutorials
  - [ ] Document deployment process

### Future Ideas
- [ ] Mobile app version (React Native)
- [ ] Progressive Web App (PWA) support
- [ ] Multi-language support (i18n)
- [ ] Chart comparison feature (synastry)
- [ ] Transit calculations
- [ ] Ashtakavarga calculations
- [ ] Share charts via URL
- [ ] Printable chart reports
- [ ] Collaboration features (share with astrologers)
- [ ] Advanced search/filter for saved charts

## Contributing

This project follows:
- **Atomic Design** for component organization
- **TypeScript** for type safety
- **ESLint + Prettier** for code quality
- **Conventional Commits** for commit messages

### Code Style

- Use functional components with hooks
- Prefer named exports over default exports
- Use TypeScript for all new files
- Follow the existing component structure
- No emojis in code or UI (use Lucide icons)

### Commit Guidelines

```
feat: Add horary chart form
fix: Resolve timezone selector bug
docs: Update README with API examples
style: Format with Prettier
refactor: Simplify chart data parsing
test: Add unit tests for validators
```

## License

[Specify license here]

## Contact

[Add contact information or repository links]

---

**Happy Coding!** 🌟

For detailed implementation guides, see [GETTING_STARTED.md](GETTING_STARTED.md) and [bobo-astrologer-app/NEXT_STEPS.md](bobo-astrologer-app/NEXT_STEPS.md).
