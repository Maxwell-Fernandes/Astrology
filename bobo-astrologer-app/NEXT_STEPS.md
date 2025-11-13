# Next Steps - Implementation Guide

## ✅ What's Been Completed

### Phase 1 & 2: Foundation ✅
- ✅ Vite + React 18 + TypeScript project initialized
- ✅ All dependencies installed (React, Zustand, D3.js, Tailwind CSS, Axios, React Hook Form, Zod, etc.)
- ✅ TypeScript configured with path aliases
- ✅ Tailwind CSS configured with custom dark theme
- ✅ Vite configuration with API proxy
- ✅ Prettier configuration
- ✅ Complete folder structure created
- ✅ Global CSS with dark theme and animations
- ✅ Environment variables configured

### What You Can Do Now
```bash
cd bobo-astrologer-app
npm run dev  # Start development server on http://localhost:3000
```

---

## 📋 Implementation Roadmap

The project structure is ready. Now you need to implement the application layer by layer.

### Phase 3: Core Infrastructure (NEXT)

Implement these files in order:

#### 1. API Layer (`src/api/`)

**File: `src/api/types.ts`**
```typescript
// Define all API request/response interfaces
export interface ChartInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  utc: string;
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
}

export interface HouseData {
  house_number: number;
  cusp_degree: number;
  sign: string;
  planets_on_cusp: string[];
  lord: string;
}

export interface ChartResponse {
  planets_data: PlanetData[];
  houses_data: HouseData[];
  planet_significators: Record<string, any>;
  house_significators: Record<string, any>;
  planetary_aspects: any[];
  vimshottari_dasa_table: any[];
  consolidated_chart_data: any;
  matched_time?: string;
}
```

**File: `src/api/client.ts`**
```typescript
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8088';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);
```

**File: `src/api/endpoints.ts`**
```typescript
import { apiClient } from './client';
import type { ChartInput, HoraryChartInput, ChartResponse } from './types';

export const api = {
  generateNatalChart: async (input: ChartInput): Promise<ChartResponse> => {
    return apiClient.post('/get_all_horoscope_data', input);
  },

  generateHoraryChart: async (input: HoraryChartInput): Promise<ChartResponse> => {
    return apiClient.post('/get_all_horary_data', input);
  },

  healthCheck: async (): Promise<any> => {
    return apiClient.get('/');
  },
};
```

**File: `src/api/index.ts`**
```typescript
export * from './client';
export * from './endpoints';
export * from './types';
export { api } from './endpoints';
```

#### 2. Type Definitions (`src/types/`)

**File: `src/types/chart.ts`**
```typescript
import type { ChartInput, HoraryChartInput, ChartResponse } from '@/api/types';

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
  name?: string;
  input: ChartInput | HoraryChartInput;
  createdAt: string;
}
```

**File: `src/types/index.ts`**
```typescript
export * from './chart';
export type { ChartInput, ChartResponse, PlanetData, HouseData } from '@/api/types';
```

#### 3. Utilities (`src/utils/`)

**File: `src/utils/constants.ts`**
```typescript
export const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const;

export const PLANETS = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu'
] as const;

export const AYANAMSA_OPTIONS = [
  { value: 'Lahiri', label: 'Lahiri' },
  { value: 'Krishnamurti', label: 'Krishnamurti' },
  { value: 'Raman', label: 'Raman' },
];

export const HOUSE_SYSTEM_OPTIONS = [
  { value: 'Equal', label: 'Equal' },
  { value: 'Placidus', label: 'Placidus' },
  { value: 'Koch', label: 'Koch' },
];
```

**File: `src/utils/validation.ts`**
```typescript
import { z } from 'zod';

export const chartInputSchema = z.object({
  year: z.number().int().min(1800).max(2100),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
  second: z.number().int().min(0).max(59),
  utc: z.string().regex(/^[+-]\d{2}:\d{2}$/),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  ayanamsa: z.string().optional().default('Lahiri'),
  house_system: z.string().optional().default('Equal'),
  return_style: z.string().optional().nullable(),
});

export const horaryChartInputSchema = chartInputSchema.extend({
  horary_number: z.number().int().min(1).max(249),
});

export type ChartInputFormData = z.infer<typeof chartInputSchema>;
export type HoraryChartInputFormData = z.infer<typeof horaryChartInputSchema>;
```

**File: `src/utils/formatters.ts`**
```typescript
export const formatDegree = (degree: number): string => {
  const deg = Math.floor(degree);
  const minFloat = (degree - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = Math.floor((minFloat - min) * 60);
  return `${deg}° ${min}' ${sec}"`;
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
```

**File: `src/utils/helpers.ts`**
```typescript
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
```

**File: `src/utils/index.ts`**
```typescript
export * from './constants';
export * from './validation';
export * from './formatters';
export * from './helpers';
```

#### 4. Zustand Stores (`src/store/`)

**File: `src/store/chartStore.ts`**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/api';
import type { ChartData, ChartHistoryItem } from '@/types';
import type { ChartInput, HoraryChartInput } from '@/api/types';
import { generateId } from '@/utils/helpers';

interface ChartState {
  currentChart: ChartData | null;
  chartHistory: ChartHistoryItem[];
  isLoading: boolean;
  error: string | null;

  generateNatalChart: (input: ChartInput) => Promise<void>;
  generateHoraryChart: (input: HoraryChartInput) => Promise<void>;
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
          const chartData: ChartData = {
            id: generateId(),
            type: 'natal',
            input,
            data: response,
            createdAt: new Date().toISOString(),
          };

          set({
            currentChart: chartData,
            chartHistory: [
              { id: chartData.id, type: 'natal', input, createdAt: chartData.createdAt },
              ...get().chartHistory,
            ].slice(0, 50),
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
          });
        }
      },

      generateHoraryChart: async (input) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.generateHoraryChart(input);
          const chartData: ChartData = {
            id: generateId(),
            type: 'horary',
            input,
            data: response,
            createdAt: new Date().toISOString(),
          };

          set({
            currentChart: chartData,
            chartHistory: [
              { id: chartData.id, type: 'horary', input, createdAt: chartData.createdAt },
              ...get().chartHistory,
            ].slice(0, 50),
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
          });
        }
      },

      clearCurrentChart: () => set({ currentChart: null, error: null }),
      setError: (error) => set({ error }),
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

**File: `src/store/uiStore.ts`**
```typescript
import { create } from 'zustand';

type TabType = 'planets' | 'houses' | 'aspects' | 'dasa' | 'significators';

interface UIState {
  activeTab: TabType;
  exportModalOpen: boolean;
  sidebarOpen: boolean;

  setActiveTab: (tab: TabType) => void;
  toggleExportModal: () => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'planets',
  exportModalOpen: false,
  sidebarOpen: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleExportModal: () => set((state) => ({ exportModalOpen: !state.exportModalOpen })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
```

**File: `src/store/preferencesStore.ts`**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PreferencesState {
  defaultAyanamsa: string;
  defaultHouseSystem: string;

  setDefaultAyanamsa: (ayanamsa: string) => void;
  setDefaultHouseSystem: (system: string) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      defaultAyanamsa: 'Lahiri',
      defaultHouseSystem: 'Equal',

      setDefaultAyanamsa: (ayanamsa) => set({ defaultAyanamsa: ayanamsa }),
      setDefaultHouseSystem: (system) => set({ defaultHouseSystem: system }),
    }),
    {
      name: 'bobo-preferences',
    }
  )
);
```

**File: `src/store/index.ts`**
```typescript
export { useChartStore } from './chartStore';
export { useUIStore } from './uiStore';
export { usePreferencesStore } from './preferencesStore';
```

#### 5. Custom Hooks (`src/hooks/`)

**File: `src/hooks/useLocalStorage.ts`**
```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

**File: `src/hooks/index.ts`**
```typescript
export { useLocalStorage } from './useLocalStorage';
```

---

### Phase 4: Component Library

Start with atoms, then molecules, then organisms. Each component should:
1. Have proper TypeScript interfaces
2. Use Tailwind CSS classes
3. Follow the style guide
4. Include proper accessibility

Example structure for Button component (`src/components/atoms/Button/`):
- `Button.tsx` - Main component
- `index.ts` - Export

---

### Phase 5: Pages & Routing

1. Create page components in `src/pages/`
2. Create layouts in `src/layouts/`
3. Set up routing in `src/router.tsx`
4. Update `src/App.tsx` to use router
5. Update `src/main.tsx` to import global styles

---

## 🎯 Priority Order

**Critical Path (Must implement first):**
1. Core infrastructure (API, types, stores, utils) ← START HERE
2. Basic atoms (Button, Input, Card, Spinner)
3. Simple page structure (Home, basic routing)
4. Form components (FormField, ChartInputForm)
5. Chart results display (tables)

**Nice to Have (Later):**
- D3.js visualizations
- Advanced features
- Animations
- Export functionality

---

## 🚀 Quick Start Command

```bash
# You're ready to start implementing!
cd bobo-astrologer-app
npm run dev

# Open http://localhost:3000 in your browser
```

---

## 📚 Reference Documentation

All comprehensive documentation is in the parent directory:

- `../ARCHITECTURE.md` - Complete system design
- `../PROJECT_STRUCTURE.md` - File organization details
- `../STYLE_GUIDE.md` - Design system and components
- `../CLAUDE.md` - Backend API reference

---

## 💡 Development Tips

1. **Test API First**: Make sure the VedicAstro backend is running before testing forms
2. **Start Simple**: Build a minimal working version first, then enhance
3. **Use TypeScript**: Let types guide your implementation
4. **Follow Patterns**: Copy the code patterns shown in this guide
5. **Reference Docs**: Check ARCHITECTURE.md and STYLE_GUIDE.md when building components

---

**Status:** Foundation complete ✅ | Ready for core implementation 🚀

Happy coding! 🎉
