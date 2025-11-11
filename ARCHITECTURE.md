# Bobo Astrologer - Application Architecture

**Version:** 1.0
**Last Updated:** 2025-11-11
**Stack:** React + Zustand + D3.js + Tailwind CSS

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Technology Stack](#2-technology-stack)
3. [Frontend Architecture](#3-frontend-architecture)
4. [Data Flow Architecture](#4-data-flow-architecture)
5. [State Management Design](#5-state-management-design)
6. [API Integration Layer](#6-api-integration-layer)
7. [Component Architecture](#7-component-architecture)
8. [Data Models & Types](#8-data-models--types)
9. [Visualization Architecture](#9-visualization-architecture)
10. [Performance Optimization](#10-performance-optimization)
11. [Build & Deployment](#11-build--deployment)

---

## 1. System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Landing    │  │ Chart Input  │  │   Results    │         │
│  │     Page     │  │    Forms     │  │    Views     │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REACT COMPONENT LAYER                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Layouts    │  │  Organisms   │  │  Molecules   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │    Atoms     │  │   D3.js      │                            │
│  │              │  │ Visualizations│                            │
│  └──────────────┘  └──────────────┘                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STATE MANAGEMENT (ZUSTAND)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  chartStore  │  │   uiStore    │  │preferencesStore        │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API INTEGRATION LAYER                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   API Client │  │  Interceptors│  │    Types     │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VEDICASTRO FASTAPI BACKEND                   │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │ /get_all_    │  │ /get_all_    │                            │
│  │ horoscope_   │  │ horary_      │                            │
│  │    data      │  │    data      │                            │
│  └──────────────┘  └──────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

### System Description

Bobo Astrologer is a single-page application (SPA) built with React that provides Vedic astrology chart calculations. The application follows a unidirectional data flow architecture where:

1. **User interacts** with React components
2. **Components dispatch actions** to Zustand stores
3. **Stores trigger API calls** via the API integration layer
4. **API responses update store state**
5. **React components re-render** based on state changes
6. **D3.js visualizations** render based on chart data

The application operates entirely client-side with no user authentication, using localStorage for preferences and chart history.

---

## 2. Technology Stack

### Core Technologies

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **UI Framework** | React | 18.x | Component-based UI rendering |
| **State Management** | Zustand | 4.x | Lightweight global state |
| **Styling** | Tailwind CSS | 3.x | Utility-first styling |
| **Visualization** | D3.js | 7.x | Chart wheel and aspects |
| **Build Tool** | Vite | 5.x | Fast dev server and bundling |
| **Language** | TypeScript | 5.x | Type safety and tooling |
| **HTTP Client** | Axios | 1.x | API communication |
| **Routing** | React Router | 6.x | Client-side navigation |

### Supporting Libraries

| Library | Purpose |
|---------|---------|
| `date-fns` or `dayjs` | Date/time manipulation and formatting |
| `react-hook-form` | Form state management and validation |
| `zod` | Schema validation |
| `clsx` or `classnames` | Conditional className composition |
| `framer-motion` | Animations and transitions |
| `react-hot-toast` | Notifications and toasts |
| `lucide-react` | Icon library |

### Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Prettier | Code formatting |
| Husky | Git hooks |
| lint-staged | Pre-commit linting |
| TypeScript ESLint | TypeScript-specific linting |

---

## 3. Frontend Architecture

### Project Structure

```
bobo-astrologer/
├── public/
│   ├── fonts/
│   │   ├── Cinzel/
│   │   └── Montserrat/
│   └── zodiac-icons/
│       ├── aries.svg
│       ├── taurus.svg
│       └── ...
├── src/
│   ├── api/
│   │   ├── client.ts              # Axios instance configuration
│   │   ├── endpoints.ts           # API endpoint definitions
│   │   └── types.ts               # API request/response types
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       └── globals.css        # Global styles and Tailwind imports
│   ├── components/
│   │   ├── atoms/                 # Basic building blocks
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.test.tsx
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   ├── Label/
│   │   │   └── Card/
│   │   ├── molecules/             # Composite components
│   │   │   ├── FormField/
│   │   │   ├── DateTimePicker/
│   │   │   ├── LocationInput/
│   │   │   ├── ZodiacCard/
│   │   │   └── PlanetRow/
│   │   ├── organisms/             # Complex components
│   │   │   ├── Navbar/
│   │   │   ├── ChartInputForm/
│   │   │   ├── HoraryInputForm/
│   │   │   ├── PlanetsTable/
│   │   │   ├── HousesTable/
│   │   │   ├── DasaTimeline/
│   │   │   ├── SignificatorsView/
│   │   │   └── ExportModal/
│   │   └── visualizations/        # D3.js components
│   │       ├── ChartWheel/
│   │       │   ├── ChartWheel.tsx
│   │       │   ├── useChartWheel.ts
│   │       │   └── chartWheelHelpers.ts
│   │       └── AspectsGraph/
│   ├── hooks/
│   │   ├── useChartData.ts        # Chart data fetching
│   │   ├── useLocalStorage.ts     # localStorage abstraction
│   │   ├── useTimezone.ts         # Timezone utilities
│   │   └── useGeolocation.ts      # Geolocation API
│   ├── layouts/
│   │   ├── MainLayout.tsx         # Primary app layout
│   │   ├── AuthLayout.tsx         # Future auth layout
│   │   └── EmptyLayout.tsx        # Minimal layout
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   └── components/
│   │   ├── ChartInput/
│   │   │   ├── NatalChart.tsx
│   │   │   └── HoraryChart.tsx
│   │   ├── ChartResults/
│   │   │   ├── ChartResults.tsx
│   │   │   └── components/
│   │   │       ├── SummaryPanel.tsx
│   │   │       ├── PlanetsTab.tsx
│   │   │       ├── HousesTab.tsx
│   │   │       ├── AspectsTab.tsx
│   │   │       └── DasaTab.tsx
│   │   ├── Settings/
│   │   │   └── Settings.tsx
│   │   └── NotFound/
│   │       └── NotFound.tsx
│   ├── store/
│   │   ├── chartStore.ts          # Chart data state
│   │   ├── uiStore.ts             # UI state (modals, tabs, etc.)
│   │   ├── preferencesStore.ts    # User preferences
│   │   └── types.ts               # Store types
│   ├── types/
│   │   ├── chart.ts               # Chart domain types
│   │   ├── planet.ts              # Planet types
│   │   ├── house.ts               # House types
│   │   └── common.ts              # Shared types
│   ├── utils/
│   │   ├── validation.ts          # Form validation schemas
│   │   ├── formatters.ts          # Data formatting utilities
│   │   ├── calculations.ts        # Client-side calculations
│   │   ├── constants.ts           # App constants
│   │   └── helpers.ts             # General utilities
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Entry point
│   └── router.tsx                 # Route configuration
├── .env.example                   # Environment variables template
├── .eslintrc.json                 # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── index.html                     # HTML entry point
├── package.json                   # Dependencies
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
├── ARCHITECTURE.md                # This file
├── CLAUDE.md                      # Claude Code guidance
├── STYLE_GUIDE.md                 # Design system
└── README.md                      # Project documentation
```

### Routing Structure

```typescript
// src/router.tsx
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'natal-chart', element: <NatalChart /> },
      { path: 'horary-chart', element: <HoraryChart /> },
      { path: 'chart/:chartId', element: <ChartResults /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];
```

**Route Descriptions:**

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page with zodiac selector |
| `/natal-chart` | NatalChart | Birth chart input form |
| `/horary-chart` | HoraryChart | Horary chart input form |
| `/chart/:chartId` | ChartResults | Display chart results (tabs, visualizations) |
| `/settings` | Settings | User preferences |
| `*` | NotFound | 404 error page |

---

## 4. Data Flow Architecture

### Overall Data Flow

```
┌──────────────┐
│     USER     │
└──────┬───────┘
       │ Interacts
       ▼
┌──────────────────────┐
│  REACT COMPONENTS    │
│  (Form, Buttons)     │
└──────┬───────────────┘
       │ Triggers action
       ▼
┌──────────────────────┐
│   ZUSTAND STORE      │
│   (chartStore)       │
└──────┬───────────────┘
       │ Calls API
       ▼
┌──────────────────────┐
│   API CLIENT         │
│   (axios)            │
└──────┬───────────────┘
       │ HTTP POST
       ▼
┌──────────────────────┐
│   VEDICASTRO API     │
│   (FastAPI Backend)  │
└──────┬───────────────┘
       │ Returns JSON
       ▼
┌──────────────────────┐
│   API CLIENT         │
│   (Response)         │
└──────┬───────────────┘
       │ Updates state
       ▼
┌──────────────────────┐
│   ZUSTAND STORE      │
│   (Updated state)    │
└──────┬───────────────┘
       │ Triggers re-render
       ▼
┌──────────────────────┐
│  REACT COMPONENTS    │
│  (UI Updates)        │
└──────┬───────────────┘
       │ D3.js renders
       ▼
┌──────────────────────┐
│  CHART WHEEL SVG     │
│  (Visualization)     │
└──────────────────────┘
```

### Natal Chart Flow (Detailed)

```
1. USER FILLS FORM
   ┌─────────────────────────────────────────┐
   │ NatalChartForm Component                │
   │ - Date inputs (year, month, day)        │
   │ - Time inputs (hour, minute, second)    │
   │ - Location inputs (lat, long)           │
   │ - Ayanamsa select                       │
   │ - House system select                   │
   └─────────────────┬───────────────────────┘
                     │ onSubmit
                     ▼
2. FORM VALIDATION
   ┌─────────────────────────────────────────┐
   │ react-hook-form + zod                   │
   │ - Validate date ranges                  │
   │ - Validate lat/long bounds              │
   │ - Check required fields                 │
   └─────────────────┬───────────────────────┘
                     │ if valid
                     ▼
3. STORE ACTION
   ┌─────────────────────────────────────────┐
   │ chartStore.generateNatalChart(data)     │
   │ - Set loading: true                     │
   │ - Clear previous errors                 │
   └─────────────────┬───────────────────────┘
                     │
                     ▼
4. API CALL
   ┌─────────────────────────────────────────┐
   │ POST /get_all_horoscope_data            │
   │ Headers: { Content-Type: application/json }
   │ Body: ChartInput                        │
   └─────────────────┬───────────────────────┘
                     │
                     ▼
5. BACKEND PROCESSING
   ┌─────────────────────────────────────────┐
   │ VedicAstro API                          │
   │ - Generate chart (flatlib)              │
   │ - Calculate planets positions           │
   │ - Calculate houses cusps                │
   │ - Compute significators                 │
   │ - Compute aspects                       │
   │ - Compute Vimshottari Dasa              │
   └─────────────────┬───────────────────────┘
                     │
                     ▼
6. RESPONSE RECEIVED
   ┌─────────────────────────────────────────┐
   │ API Response (JSON)                     │
   │ - planets_data                          │
   │ - houses_data                           │
   │ - planet_significators                  │
   │ - house_significators                   │
   │ - planetary_aspects                     │
   │ - vimshottari_dasa_table                │
   │ - consolidated_chart_data               │
   └─────────────────┬───────────────────────┘
                     │
                     ▼
7. STATE UPDATE
   ┌─────────────────────────────────────────┐
   │ chartStore                              │
   │ - Set currentChart: response            │
   │ - Set loading: false                    │
   │ - Add to chartHistory                   │
   │ - Persist to localStorage               │
   └─────────────────┬───────────────────────┘
                     │
                     ▼
8. NAVIGATION
   ┌─────────────────────────────────────────┐
   │ navigate('/chart/:chartId')             │
   └─────────────────┬───────────────────────┘
                     │
                     ▼
9. UI RENDERING
   ┌─────────────────────────────────────────┐
   │ ChartResults Component                  │
   │ - Read from chartStore                  │
   │ - Render tabs (Planets, Houses, etc.)   │
   │ - Trigger D3.js visualization           │
   └─────────────────────────────────────────┘
```

### Horary Chart Flow

Similar to natal chart flow, with differences:

1. **Additional Input:** Horary number field
2. **Different API Endpoint:** `/get_all_horary_data`
3. **Different Defaults:** Krishnamurti ayanamsa, Placidus house system
4. **Additional Response Field:** `matched_time` (exact ascendant time)

### Error Handling Flow

```
API CALL FAILS
   │
   ▼
┌─────────────────────────────────────────┐
│ Axios Interceptor                       │
│ - Catches error                         │
│ - Checks error type                     │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
┌──────────────┐    ┌──────────────┐
│ Network      │    │ API Error    │
│ Error        │    │ (4xx, 5xx)   │
└──────┬───────┘    └──────┬───────┘
       │                   │
       └─────────┬─────────┘
                 ▼
┌─────────────────────────────────────────┐
│ chartStore.setError(error)              │
│ - Set error message                     │
│ - Set loading: false                    │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ Toast Notification                      │
│ - Display error to user                 │
│ - Show retry button if applicable       │
└─────────────────────────────────────────┘
```

---

## 5. State Management Design

### Zustand Store Architecture

We use three separate stores following the single responsibility principle:

#### 5.1 Chart Store (`chartStore.ts`)

**Purpose:** Manages all chart-related data and operations

```typescript
// src/store/chartStore.ts
interface ChartState {
  // Current chart data
  currentChart: ChartData | null;

  // Chart history (localStorage backed)
  chartHistory: ChartHistoryItem[];

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Actions
  generateNatalChart: (input: ChartInput) => Promise<void>;
  generateHoraryChart: (input: HoraryChartInput) => Promise<void>;
  loadChartFromHistory: (chartId: string) => void;
  deleteChartFromHistory: (chartId: string) => void;
  clearCurrentChart: () => void;
  setError: (error: string | null) => void;
}

export const useChartStore = create<ChartState>()(
  persist(
    (set, get) => ({
      currentChart: null,
      chartHistory: [],
      isLoading: false,
      error: null,

      generateNatalChart: async (input) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.generateNatalChart(input);
          const chartData = {
            id: generateId(),
            type: 'natal',
            input,
            data: response,
            createdAt: new Date().toISOString(),
          };

          set({
            currentChart: chartData,
            chartHistory: [chartData, ...get().chartHistory].slice(0, 50),
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
        }
      },

      // ... other actions
    }),
    {
      name: 'bobo-chart-storage',
      partialize: (state) => ({
        chartHistory: state.chartHistory,
      }),
    }
  )
);
```

**State Partitioning:**
- Only `chartHistory` is persisted to localStorage
- `currentChart`, `isLoading`, and `error` are session-only

#### 5.2 UI Store (`uiStore.ts`)

**Purpose:** Manages UI state (modals, tabs, sidebar, etc.)

```typescript
// src/store/uiStore.ts
interface UIState {
  // Active tab in chart results
  activeTab: 'planets' | 'houses' | 'aspects' | 'dasa' | 'significators';

  // Modal states
  exportModalOpen: boolean;
  settingsModalOpen: boolean;

  // Mobile sidebar
  sidebarOpen: boolean;

  // Theme (future feature)
  theme: 'dark' | 'light';

  // Actions
  setActiveTab: (tab: UIState['activeTab']) => void;
  toggleExportModal: () => void;
  toggleSettingsModal: () => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'planets',
  exportModalOpen: false,
  settingsModalOpen: false,
  sidebarOpen: false,
  theme: 'dark',

  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleExportModal: () => set((state) => ({
    exportModalOpen: !state.exportModalOpen
  })),
  toggleSettingsModal: () => set((state) => ({
    settingsModalOpen: !state.settingsModalOpen
  })),
  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  })),
  setTheme: (theme) => set({ theme }),
}));
```

#### 5.3 Preferences Store (`preferencesStore.ts`)

**Purpose:** Manages user preferences (persisted)

```typescript
// src/store/preferencesStore.ts
interface PreferencesState {
  // Default calculation settings
  defaultAyanamsa: string;
  defaultHouseSystem: string;

  // UI preferences
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  timeFormat: '12h' | '24h';

  // Default location (last used)
  defaultLocation: {
    latitude: number | null;
    longitude: number | null;
    name?: string;
  };

  // Actions
  setDefaultAyanamsa: (ayanamsa: string) => void;
  setDefaultHouseSystem: (system: string) => void;
  setDateFormat: (format: PreferencesState['dateFormat']) => void;
  setTimeFormat: (format: PreferencesState['timeFormat']) => void;
  setDefaultLocation: (location: PreferencesState['defaultLocation']) => void;
  resetToDefaults: () => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      defaultAyanamsa: 'Lahiri',
      defaultHouseSystem: 'Equal',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      defaultLocation: {
        latitude: null,
        longitude: null,
      },

      setDefaultAyanamsa: (ayanamsa) => set({ defaultAyanamsa: ayanamsa }),
      setDefaultHouseSystem: (system) => set({ defaultHouseSystem: system }),
      setDateFormat: (format) => set({ dateFormat: format }),
      setTimeFormat: (format) => set({ timeFormat: format }),
      setDefaultLocation: (location) => set({ defaultLocation: location }),
      resetToDefaults: () => set({
        defaultAyanamsa: 'Lahiri',
        defaultHouseSystem: 'Equal',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        defaultLocation: { latitude: null, longitude: null },
      }),
    }),
    {
      name: 'bobo-preferences',
    }
  )
);
```

### Store Usage Patterns

```typescript
// In components
import { useChartStore } from '@/store/chartStore';
import { useUIStore } from '@/store/uiStore';
import { usePreferencesStore } from '@/store/preferencesStore';

function ChartInputForm() {
  // Select only needed state (prevents unnecessary re-renders)
  const generateNatalChart = useChartStore(state => state.generateNatalChart);
  const isLoading = useChartStore(state => state.isLoading);
  const defaultAyanamsa = usePreferencesStore(state => state.defaultAyanamsa);

  const handleSubmit = async (data) => {
    await generateNatalChart(data);
  };

  // ...
}
```

---

## 6. API Integration Layer

### API Client Configuration

```typescript
// src/api/client.ts
import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8088';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now(),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'Server error occurred';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something else happened
      return Promise.reject(new Error('An unexpected error occurred'));
    }
  }
);
```

### API Endpoints

```typescript
// src/api/endpoints.ts
import { apiClient } from './client';
import type {
  ChartInput,
  HoraryChartInput,
  ChartResponse
} from './types';

export const api = {
  // Generate natal chart
  generateNatalChart: async (input: ChartInput): Promise<ChartResponse> => {
    return apiClient.post('/get_all_horoscope_data', input);
  },

  // Generate horary chart
  generateHoraryChart: async (input: HoraryChartInput): Promise<ChartResponse> => {
    return apiClient.post('/get_all_horary_data', input);
  },

  // Health check
  healthCheck: async (): Promise<{ message: string; info: string }> => {
    return apiClient.get('/');
  },
};
```

### API Types

```typescript
// src/api/types.ts

export interface ChartInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  utc: string; // e.g., "+05:30"
  latitude: number;
  longitude: number;
  ayanamsa?: string;
  house_system?: string;
  return_style?: string | null;
}

export interface HoraryChartInput extends ChartInput {
  horary_number: number;
}

export interface PlanetData {
  name: string;
  longitude: number;
  sign: string;
  sign_degree: number;
  house: number;
  retrograde: boolean;
  velocity: number;
  [key: string]: any; // Additional fields from vedicastro
}

export interface HouseData {
  house_number: number;
  cusp_degree: number;
  sign: string;
  planets_on_cusp: string[];
  lord: string;
  [key: string]: any;
}

export interface Significators {
  A: string[];
  B: string[];
  C: string[];
  D: string[];
}

export interface PlanetaryAspect {
  planet1: string;
  planet2: string;
  aspect_type: 'conjunction' | 'trine' | 'square' | 'sextile' | 'opposition';
  angular_separation: number;
  orb: number;
}

export interface DasaPeriod {
  major_dasa_lord: string;
  start_date: string;
  end_date: string;
  sub_periods?: DasaPeriod[];
}

export interface ChartResponse {
  planets_data: PlanetData[];
  houses_data: HouseData[];
  planet_significators: Record<string, Significators>;
  house_significators: Record<string, Significators>;
  planetary_aspects: PlanetaryAspect[];
  vimshottari_dasa_table: DasaPeriod[];
  consolidated_chart_data: any;
  matched_time?: string; // Only for horary charts
}
```

---

## 7. Component Architecture

### Atomic Design Pattern

We follow the atomic design methodology for component organization:

```
Atoms → Molecules → Organisms → Templates → Pages
```

#### 7.1 Atoms (Basic Building Blocks)

**Button Component:**
```typescript
// src/components/atoms/Button/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'transition-all duration-200 font-semibold uppercase tracking-wide',
        'focus:outline-none focus:ring-2 focus:ring-purple-500',
        {
          // Variants
          'bg-purple-600 hover:bg-purple-700 text-white': variant === 'primary',
          'bg-transparent border-2 border-white/40 hover:border-white hover:bg-white/10 text-white': variant === 'secondary',
          'w-10 h-10 flex items-center justify-center rounded-full': variant === 'icon',

          // Sizes
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',

          // States
          'opacity-50 cursor-not-allowed': disabled || isLoading,
          'hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0': !disabled && !isLoading,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
};
```

**Other Atoms:**
- `Input` - Text/number input field
- `Select` - Dropdown selector
- `Label` - Form label
- `Card` - Container card
- `Badge` - Status badge
- `Spinner` - Loading spinner

#### 7.2 Molecules (Composite Components)

**FormField Component:**
```typescript
// src/components/molecules/FormField/FormField.tsx
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  register?: any; // react-hook-form register
}

export const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  required,
  register,
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        error={!!error}
        {...register}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};
```

**ZodiacCard Component:**
```typescript
// src/components/molecules/ZodiacCard/ZodiacCard.tsx
import { Card } from '@/components/atoms/Card';

interface ZodiacCardProps {
  name: string;
  dateRange: string;
  icon: ReactNode;
  onClick: () => void;
}

export const ZodiacCard = ({ name, dateRange, icon, onClick }: ZodiacCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer relative overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4">
          {icon}
        </div>

        {/* Name */}
        <h3 className="text-2xl font-serif font-semibold text-center text-white mb-2">
          {name}
        </h3>

        {/* Date Range */}
        <p className="text-sm text-center text-white/60 uppercase tracking-wider">
          {dateRange}
        </p>
      </div>
    </Card>
  );
};
```

**Other Molecules:**
- `DateTimePicker` - Combined date/time inputs
- `LocationInput` - Lat/long with map picker
- `PlanetRow` - Single planet data row
- `HouseRow` - Single house data row

#### 7.3 Organisms (Complex Components)

**ChartInputForm Component:**
```typescript
// src/components/organisms/ChartInputForm/ChartInputForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { chartInputSchema } from '@/utils/validation';
import { useChartStore } from '@/store/chartStore';
import { usePreferencesStore } from '@/store/preferencesStore';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';

export const ChartInputForm = () => {
  const generateNatalChart = useChartStore(state => state.generateNatalChart);
  const isLoading = useChartStore(state => state.isLoading);
  const defaultAyanamsa = usePreferencesStore(state => state.defaultAyanamsa);
  const defaultHouseSystem = usePreferencesStore(state => state.defaultHouseSystem);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(chartInputSchema),
    defaultValues: {
      ayanamsa: defaultAyanamsa,
      house_system: defaultHouseSystem,
    },
  });

  const onSubmit = async (data) => {
    await generateNatalChart(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Date Row */}
      <div className="grid grid-cols-3 gap-4">
        <FormField
          label="Year"
          name="year"
          type="number"
          placeholder="1990"
          error={errors.year?.message}
          register={register('year')}
          required
        />
        <FormField
          label="Month"
          name="month"
          type="number"
          placeholder="5"
          error={errors.month?.message}
          register={register('month')}
          required
        />
        <FormField
          label="Day"
          name="day"
          type="number"
          placeholder="15"
          error={errors.day?.message}
          register={register('day')}
          required
        />
      </div>

      {/* Time Row */}
      <div className="grid grid-cols-4 gap-4">
        <FormField
          label="Hour"
          name="hour"
          type="number"
          placeholder="06"
          error={errors.hour?.message}
          register={register('hour')}
          required
        />
        <FormField
          label="Minute"
          name="minute"
          type="number"
          placeholder="30"
          error={errors.minute?.message}
          register={register('minute')}
          required
        />
        <FormField
          label="Second"
          name="second"
          type="number"
          placeholder="00"
          error={errors.second?.message}
          register={register('second')}
          required
        />
        <FormField
          label="UTC"
          name="utc"
          placeholder="+05:30"
          error={errors.utc?.message}
          register={register('utc')}
          required
        />
      </div>

      {/* Location Row */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Latitude"
          name="latitude"
          type="number"
          placeholder="12.9716"
          error={errors.latitude?.message}
          register={register('latitude')}
          required
        />
        <FormField
          label="Longitude"
          name="longitude"
          type="number"
          placeholder="77.5946"
          error={errors.longitude?.message}
          register={register('longitude')}
          required
        />
      </div>

      {/* System Settings Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Ayanamsa & House System selects */}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isLoading}
      >
        Generate Chart
      </Button>
    </form>
  );
};
```

**PlanetsTable Component:**
```typescript
// src/components/organisms/PlanetsTable/PlanetsTable.tsx
import { useMemo } from 'react';
import { useChartStore } from '@/store/chartStore';
import { PlanetRow } from '@/components/molecules/PlanetRow';

export const PlanetsTable = () => {
  const currentChart = useChartStore(state => state.currentChart);

  const planets = useMemo(() => {
    return currentChart?.data.planets_data || [];
  }, [currentChart]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <div className="bg-black/50 border-b border-white/10 px-6 py-4">
        <h3 className="text-xl font-semibold text-white font-serif">
          Planetary Positions
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black/30 border-b-2 border-white/20">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Planet
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Sign
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Degree
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                House
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {planets.map((planet) => (
              <PlanetRow key={planet.name} planet={planet} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

**Other Organisms:**
- `Navbar` - Application navigation
- `HoraryInputForm` - Horary-specific form
- `HousesTable` - Houses data table
- `DasaTimeline` - Interactive timeline
- `SignificatorsView` - ABCD significators display
- `ExportModal` - Export options modal

---

## 8. Data Models & Types

### Core Domain Types

```typescript
// src/types/chart.ts

export type ChartType = 'natal' | 'horary';

export interface ChartData {
  id: string;
  type: ChartType;
  input: ChartInput | HoraryChartInput;
  data: ChartResponse;
  createdAt: string;
}

export interface ChartHistoryItem {
  id: string;
  type: ChartType;
  name?: string; // Optional user-given name
  input: ChartInput | HoraryChartInput;
  createdAt: string;
  thumbnail?: string; // Base64 or URL to chart image
}

// src/types/planet.ts

export interface Planet {
  name: PlanetName;
  longitude: number;
  sign: ZodiacSign;
  sign_degree: number;
  house: number;
  retrograde: boolean;
  velocity: number;
  nakshatra?: string;
  nakshatra_pada?: number;
}

export type PlanetName =
  | 'Sun'
  | 'Moon'
  | 'Mercury'
  | 'Venus'
  | 'Mars'
  | 'Jupiter'
  | 'Saturn'
  | 'Rahu'
  | 'Ketu'
  | 'Ascendant';

export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

// src/types/house.ts

export interface House {
  house_number: number;
  cusp_degree: number;
  sign: ZodiacSign;
  planets_in_house: PlanetName[];
  lord: PlanetName;
  sub_lord?: PlanetName;
}

// src/types/common.ts

export interface Location {
  latitude: number;
  longitude: number;
  name?: string;
  timezone?: string;
}

export interface DateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  utc: string;
}

export interface ValidationError {
  field: string;
  message: string;
}
```

### Form Validation Schemas

```typescript
// src/utils/validation.ts
import { z } from 'zod';

export const chartInputSchema = z.object({
  year: z.number()
    .int()
    .min(1800, 'Year must be after 1800')
    .max(2100, 'Year must be before 2100'),
  month: z.number()
    .int()
    .min(1, 'Month must be between 1-12')
    .max(12, 'Month must be between 1-12'),
  day: z.number()
    .int()
    .min(1, 'Day must be between 1-31')
    .max(31, 'Day must be between 1-31'),
  hour: z.number()
    .int()
    .min(0, 'Hour must be between 0-23')
    .max(23, 'Hour must be between 0-23'),
  minute: z.number()
    .int()
    .min(0, 'Minute must be between 0-59')
    .max(59, 'Minute must be between 0-59'),
  second: z.number()
    .int()
    .min(0, 'Second must be between 0-59')
    .max(59, 'Second must be between 0-59'),
  utc: z.string()
    .regex(/^[+-]\d{2}:\d{2}$/, 'UTC must be in format +HH:MM or -HH:MM'),
  latitude: z.number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  longitude: z.number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
  ayanamsa: z.string().optional().default('Lahiri'),
  house_system: z.string().optional().default('Equal'),
  return_style: z.string().optional().nullable(),
});

export const horaryChartInputSchema = chartInputSchema.extend({
  horary_number: z.number()
    .int()
    .min(1, 'Horary number must be between 1-249')
    .max(249, 'Horary number must be between 1-249'),
}).merge(z.object({
  ayanamsa: z.string().optional().default('Krishnamurti'),
  house_system: z.string().optional().default('Placidus'),
}));

export type ChartInputFormData = z.infer<typeof chartInputSchema>;
export type HoraryChartInputFormData = z.infer<typeof horaryChartInputSchema>;
```

---

## 9. Visualization Architecture

### D3.js Chart Wheel Implementation

#### 9.1 Chart Wheel Component Structure

```typescript
// src/components/visualizations/ChartWheel/ChartWheel.tsx
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useChartWheel } from './useChartWheel';
import { ChartData } from '@/types/chart';

interface ChartWheelProps {
  chartData: ChartData;
  width?: number;
  height?: number;
}

export const ChartWheel = ({
  chartData,
  width = 600,
  height = 600
}: ChartWheelProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { renderChart } = useChartWheel();

  useEffect(() => {
    if (!svgRef.current || !chartData) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Render new chart
    renderChart(svgRef.current, chartData, width, height);
  }, [chartData, width, height, renderChart]);

  return (
    <div className="relative aspect-square max-w-2xl mx-auto">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="chart-wheel"
      />
    </div>
  );
};
```

#### 9.2 Chart Wheel Hook

```typescript
// src/components/visualizations/ChartWheel/useChartWheel.ts
import * as d3 from 'd3';
import {
  drawOuterCircle,
  drawZodiacDivisions,
  drawHouseCusps,
  drawPlanets,
  drawAspectLines,
  drawCenter,
} from './chartWheelHelpers';

export const useChartWheel = () => {
  const renderChart = (
    svg: SVGSVGElement,
    chartData: ChartData,
    width: number,
    height: number
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;

    const g = d3.select(svg)
      .append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`);

    // Layer 1: Outer circle and zodiac divisions
    drawOuterCircle(g, radius);
    drawZodiacDivisions(g, radius);

    // Layer 2: House cusps
    const houses = chartData.data.houses_data;
    drawHouseCusps(g, radius, houses);

    // Layer 3: Planets
    const planets = chartData.data.planets_data;
    drawPlanets(g, radius, planets);

    // Layer 4: Aspect lines
    const aspects = chartData.data.planetary_aspects;
    drawAspectLines(g, radius * 0.6, planets, aspects);

    // Layer 5: Center
    drawCenter(g);
  };

  return { renderChart };
};
```

#### 9.3 Chart Wheel Helper Functions

```typescript
// src/components/visualizations/ChartWheel/chartWheelHelpers.ts
import * as d3 from 'd3';

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const SIGN_COLORS = {
  Fire: '#ef4444',    // Aries, Leo, Sagittarius
  Earth: '#10b981',   // Taurus, Virgo, Capricorn
  Air: '#3b82f6',     // Gemini, Libra, Aquarius
  Water: '#8b5cf6',   // Cancer, Scorpio, Pisces
};

export const drawOuterCircle = (g: any, radius: number) => {
  g.append('circle')
    .attr('r', radius)
    .attr('fill', 'none')
    .attr('stroke', 'rgba(255, 255, 255, 0.2)')
    .attr('stroke-width', 2);
};

export const drawZodiacDivisions = (g: any, radius: number) => {
  const zodiacGroup = g.append('g').attr('class', 'zodiac-signs');

  ZODIAC_SIGNS.forEach((sign, index) => {
    const angle = (index * 30) - 90; // Start from Aries at 0°
    const startAngle = (angle * Math.PI) / 180;
    const endAngle = ((angle + 30) * Math.PI) / 180;

    // Draw division line
    const lineAngle = endAngle;
    const x1 = Math.cos(lineAngle) * (radius * 0.85);
    const y1 = Math.sin(lineAngle) * (radius * 0.85);
    const x2 = Math.cos(lineAngle) * radius;
    const y2 = Math.sin(lineAngle) * radius;

    zodiacGroup.append('line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .attr('stroke', 'rgba(255, 255, 255, 0.15)')
      .attr('stroke-width', 1);

    // Add sign label
    const labelAngle = angle + 15; // Center of sign
    const labelRadius = radius * 0.92;
    const labelX = Math.cos((labelAngle * Math.PI) / 180) * labelRadius;
    const labelY = Math.sin((labelAngle * Math.PI) / 180) * labelRadius;

    zodiacGroup.append('text')
      .attr('x', labelX)
      .attr('y', labelY)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'rgba(255, 255, 255, 0.6)')
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .text(sign.substring(0, 3).toUpperCase());
  });
};

export const drawHouseCusps = (g: any, radius: number, houses: any[]) => {
  const housesGroup = g.append('g').attr('class', 'houses');

  houses.forEach((house) => {
    const angle = ((house.cusp_degree) - 90) * (Math.PI / 180);
    const x1 = 0;
    const y1 = 0;
    const x2 = Math.cos(angle) * (radius * 0.85);
    const y2 = Math.sin(angle) * (radius * 0.85);

    // Draw cusp line
    housesGroup.append('line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .attr('stroke', 'rgba(139, 92, 246, 0.5)')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,4');

    // Add house number
    const labelRadius = radius * 0.75;
    const labelX = Math.cos(angle) * labelRadius;
    const labelY = Math.sin(angle) * labelRadius;

    housesGroup.append('text')
      .attr('x', labelX)
      .attr('y', labelY)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'rgba(139, 92, 246, 0.8)')
      .attr('font-size', '14px')
      .attr('font-weight', '600')
      .text(house.house_number);
  });
};

export const drawPlanets = (g: any, radius: number, planets: any[]) => {
  const planetsGroup = g.append('g').attr('class', 'planets');

  planets.forEach((planet) => {
    const angle = ((planet.longitude) - 90) * (Math.PI / 180);
    const planetRadius = radius * 0.65;
    const x = Math.cos(angle) * planetRadius;
    const y = Math.sin(angle) * planetRadius;

    // Draw planet circle
    planetsGroup.append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', 8)
      .attr('fill', planet.retrograde ? '#ef4444' : '#3b82f6')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseenter', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 12);
      })
      .on('mouseleave', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 8);
      })
      .append('title')
      .text(`${planet.name}\n${planet.sign} ${planet.sign_degree.toFixed(2)}°\nHouse ${planet.house}`);

    // Add planet symbol/abbreviation
    planetsGroup.append('text')
      .attr('x', x)
      .attr('y', y)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#ffffff')
      .attr('font-size', '10px')
      .attr('font-weight', '700')
      .attr('pointer-events', 'none')
      .text(getPlanetAbbreviation(planet.name));
  });
};

export const drawAspectLines = (
  g: any,
  radius: number,
  planets: any[],
  aspects: any[]
) => {
  const aspectsGroup = g.append('g').attr('class', 'aspects');

  aspects.forEach((aspect) => {
    const planet1 = planets.find(p => p.name === aspect.planet1);
    const planet2 = planets.find(p => p.name === aspect.planet2);

    if (!planet1 || !planet2) return;

    const angle1 = ((planet1.longitude) - 90) * (Math.PI / 180);
    const angle2 = ((planet2.longitude) - 90) * (Math.PI / 180);

    const x1 = Math.cos(angle1) * radius;
    const y1 = Math.sin(angle1) * radius;
    const x2 = Math.cos(angle2) * radius;
    const y2 = Math.sin(angle2) * radius;

    const aspectColor = getAspectColor(aspect.aspect_type);

    aspectsGroup.append('line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .attr('stroke', aspectColor)
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.3)
      .attr('stroke-dasharray', getAspectDashArray(aspect.aspect_type))
      .append('title')
      .text(`${aspect.planet1} ${aspect.aspect_type} ${aspect.planet2}\n${aspect.angular_separation.toFixed(2)}°`);
  });
};

export const drawCenter = (g: any) => {
  g.append('circle')
    .attr('r', 4)
    .attr('fill', '#8b5cf6')
    .attr('filter', 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.8))');
};

// Helper functions
const getPlanetAbbreviation = (name: string): string => {
  const abbrevMap: Record<string, string> = {
    'Sun': '☉',
    'Moon': '☽',
    'Mercury': '☿',
    'Venus': '♀',
    'Mars': '♂',
    'Jupiter': '♃',
    'Saturn': '♄',
    'Rahu': '☊',
    'Ketu': '☋',
    'Ascendant': 'As',
  };
  return abbrevMap[name] || name.substring(0, 2);
};

const getAspectColor = (aspectType: string): string => {
  const colorMap: Record<string, string> = {
    'conjunction': '#ffffff',
    'trine': '#10b981',
    'square': '#ef4444',
    'sextile': '#3b82f6',
    'opposition': '#f59e0b',
  };
  return colorMap[aspectType] || '#ffffff';
};

const getAspectDashArray = (aspectType: string): string => {
  const dashMap: Record<string, string> = {
    'conjunction': 'none',
    'trine': '5,5',
    'square': '3,3',
    'sextile': '8,4',
    'opposition': '2,2',
  };
  return dashMap[aspectType] || 'none';
};
```

#### 9.4 Interactive Features

- **Zoom & Pan:** Implement D3 zoom behavior
- **Hover tooltips:** Show planet/house details on hover
- **Click interactions:** Click planet to highlight aspects
- **Export:** Convert SVG to PNG/PDF for export

---

## 10. Performance Optimization

### 10.1 Code Splitting

```typescript
// src/router.tsx
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';

// Lazy load route components
const Home = lazy(() => import('@/pages/Home'));
const NatalChart = lazy(() => import('@/pages/ChartInput/NatalChart'));
const HoraryChart = lazy(() => import('@/pages/ChartInput/HoraryChart'));
const ChartResults = lazy(() => import('@/pages/ChartResults'));
const Settings = lazy(() => import('@/pages/Settings'));

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'natal-chart',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NatalChart />
          </Suspense>
        ),
      },
      // ... other routes
    ],
  },
];
```

### 10.2 Memoization Patterns

```typescript
// Memoize expensive computations
import { useMemo } from 'react';

function PlanetsTable({ planets }) {
  const sortedPlanets = useMemo(() => {
    return [...planets].sort((a, b) => a.longitude - b.longitude);
  }, [planets]);

  return (
    // ... render sortedPlanets
  );
}

// Memoize components
import { memo } from 'react';

export const PlanetRow = memo(({ planet }) => {
  // Component will only re-render if planet prop changes
  return (
    <tr>
      <td>{planet.name}</td>
      {/* ... */}
    </tr>
  );
});
```

### 10.3 Virtual Scrolling

For large tables (Dasa timeline with many periods):

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

function DasaTimeline({ dasaPeriods }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: dasaPeriods.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // Estimated row height
    overscan: 5, // Render 5 extra items outside viewport
  });

  return (
    <div ref={parentRef} className="h-96 overflow-auto">
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <DasaPeriodRow period={dasaPeriods[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 10.4 Image Optimization

- Use WebP format for images with fallback
- Lazy load off-screen images
- Implement progressive image loading

### 10.5 Bundle Size Optimization

```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'd3-vendor': ['d3'],
          'form-vendor': ['react-hook-form', 'zod'],
        },
      },
    },
  },
});
```

---

## 11. Build & Deployment

### 11.1 Development Workflow

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm run test

# Build for production
npm run build

# Preview production build
npm run preview
```

### 11.2 Environment Variables

```bash
# .env.example
VITE_API_BASE_URL=http://127.0.0.1:8088
VITE_APP_NAME=Bobo Astrologer
VITE_APP_VERSION=1.0.0
```

### 11.3 Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8088',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'd3-vendor': ['d3'],
        },
      },
    },
  },
});
```

### 11.4 Deployment Options

**Option 1: Static Hosting (Vercel, Netlify)**
```bash
# Build
npm run build

# Deploy to Vercel
vercel

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

**Option 2: Docker**
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Option 3: AWS S3 + CloudFront**
```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://bobo-astrologer-bucket --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id XXXXX --paths "/*"
```

### 11.5 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Build
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 12. Future Enhancements

### Phase 2 Features

1. **User Authentication**
   - User accounts with JWT
   - Save charts to backend database
   - Share charts via links

2. **Advanced Visualizations**
   - Interactive aspects graph
   - Transit animations
   - Dasa period timeline with current position indicator

3. **PDF Reports**
   - Generate comprehensive PDF reports
   - Customizable report templates
   - Email delivery

4. **Multi-language Support**
   - i18n integration
   - Support for Hindi, Sanskrit transliterations

5. **PWA Features**
   - Offline support
   - Push notifications for transit alerts
   - Install as mobile app

6. **Social Features**
   - Share charts on social media
   - Compare charts (synastry)
   - Public chart library

---

## Conclusion

This architecture provides a solid foundation for building the Bobo Astrologer web application. Key architectural decisions:

1. **React + Zustand** for simple, performant state management
2. **TypeScript** for type safety and better developer experience
3. **Atomic Design** for scalable component architecture
4. **D3.js** for powerful, customizable chart visualizations
5. **Tailwind CSS** for rapid, consistent styling
6. **Vite** for fast development and optimized production builds

The architecture is designed to be:
- **Maintainable:** Clear separation of concerns, well-organized code
- **Scalable:** Modular components, efficient state management
- **Performant:** Code splitting, memoization, virtual scrolling
- **Accessible:** WCAG compliant, keyboard navigation, screen reader support
- **Extensible:** Easy to add new features and integrations

Refer to this document when implementing any part of the application to ensure consistency and adherence to architectural principles.
