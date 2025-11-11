# Bobo Astrologer - Project Structure

**Version:** 1.0
**Last Updated:** 2025-11-11
**Framework:** React + TypeScript + Vite

---

## Table of Contents

1. [Directory Overview](#directory-overview)
2. [Root Level Files](#root-level-files)
3. [Source Directory Structure](#source-directory-structure)
4. [Component Organization](#component-organization)
5. [File Naming Conventions](#file-naming-conventions)
6. [Import Path Aliases](#import-path-aliases)
7. [Module Responsibilities](#module-responsibilities)

---

## Directory Overview

```
bobo-astrologer/
├── .github/                      # GitHub specific files
│   └── workflows/                # CI/CD workflows
│       ├── deploy.yml           # Deployment pipeline
│       └── test.yml             # Test pipeline
│
├── .vscode/                     # VSCode workspace settings
│   ├── settings.json            # Editor settings
│   ├── extensions.json          # Recommended extensions
│   └── launch.json              # Debug configurations
│
├── public/                      # Static assets (not processed by Vite)
│   ├── fonts/                   # Custom fonts
│   │   ├── Cinzel/
│   │   │   ├── Cinzel-Regular.woff2
│   │   │   ├── Cinzel-SemiBold.woff2
│   │   │   └── Cinzel-Bold.woff2
│   │   └── Montserrat/
│   │       ├── Montserrat-Light.woff2
│   │       ├── Montserrat-Regular.woff2
│   │       ├── Montserrat-Medium.woff2
│   │       ├── Montserrat-SemiBold.woff2
│   │       └── Montserrat-Bold.woff2
│   │
│   ├── zodiac-icons/            # SVG icons for zodiac signs
│   │   ├── aries.svg
│   │   ├── taurus.svg
│   │   ├── gemini.svg
│   │   ├── cancer.svg
│   │   ├── leo.svg
│   │   ├── virgo.svg
│   │   ├── libra.svg
│   │   ├── scorpio.svg
│   │   ├── sagittarius.svg
│   │   ├── capricorn.svg
│   │   ├── aquarius.svg
│   │   └── pisces.svg
│   │
│   ├── planet-symbols/          # SVG symbols for planets
│   │   ├── sun.svg
│   │   ├── moon.svg
│   │   ├── mercury.svg
│   │   ├── venus.svg
│   │   ├── mars.svg
│   │   ├── jupiter.svg
│   │   ├── saturn.svg
│   │   ├── rahu.svg
│   │   └── ketu.svg
│   │
│   ├── favicon.ico              # Website favicon
│   ├── manifest.json            # PWA manifest
│   └── robots.txt               # Search engine crawling rules
│
├── src/                         # Source code directory
│   ├── api/                     # API integration layer
│   ├── assets/                  # App assets (processed by Vite)
│   ├── components/              # React components
│   ├── hooks/                   # Custom React hooks
│   ├── layouts/                 # Page layouts
│   ├── pages/                   # Route pages
│   ├── store/                   # State management (Zustand)
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Application entry point
│   └── router.tsx               # Route configuration
│
├── .env.example                 # Environment variables template
├── .env.development             # Development environment variables
├── .env.production              # Production environment variables
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore rules
├── .prettierrc                  # Prettier configuration
├── .prettierignore              # Prettier ignore rules
├── index.html                   # HTML entry point
├── package.json                 # NPM dependencies and scripts
├── package-lock.json            # NPM dependency lock file
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── tsconfig.node.json           # TypeScript config for Node
├── vite.config.ts               # Vite build configuration
│
├── ARCHITECTURE.md              # Architecture documentation
├── CLAUDE.md                    # Claude Code guidance
├── STYLE_GUIDE.md               # Design system and styles
├── PROJECT_STRUCTURE.md         # This file
├── design.md                    # Original design document
└── README.md                    # Project overview and setup
```

---

## Root Level Files

### Configuration Files

#### `package.json`
```json
{
  "name": "bobo-astrologer",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.7",
    "axios": "^1.6.2",
    "d3": "^7.8.5",
    "react-hook-form": "^7.48.2",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.2",
    "date-fns": "^2.30.0",
    "clsx": "^2.0.0",
    "framer-motion": "^10.16.16",
    "react-hot-toast": "^2.4.1",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@types/d3": "^7.4.3",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "prettier": "^3.1.1",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "vitest": "^1.0.4"
  }
}
```

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/api/*": ["./src/api/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/store/*": ["./src/store/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/assets/*": ["./src/assets/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/api': path.resolve(__dirname, './src/api'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/store': path.resolve(__dirname, './src/store'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/assets': path.resolve(__dirname, './src/assets'),
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
          'form-vendor': ['react-hook-form', 'zod', '@hookform/resolvers'],
        },
      },
    },
  },
});
```

#### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0a0a0a',
          darker: '#000000',
        },
        surface: {
          elevated: '#1a1a1a',
          hover: '#2a2a2a',
        },
        border: {
          subtle: '#333333',
          emphasis: '#4a4a4a',
        },
        accent: {
          purple: '#8b5cf6',
          blue: '#4a90e2',
          gold: '#d4af37',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)',
      },
    },
  },
  plugins: [],
}
```

#### `.eslintrc.json`
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react-refresh", "@typescript-eslint"],
  "rules": {
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  }
}
```

#### `.prettierrc`
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

---

## Source Directory Structure

### Complete `src/` Directory Tree

```
src/
├── api/
│   ├── client.ts                # Axios instance and interceptors
│   ├── endpoints.ts             # API endpoint functions
│   ├── types.ts                 # API request/response types
│   └── index.ts                 # Public API exports
│
├── assets/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-bg.jpg
│   │   └── starfield.png
│   └── styles/
│       └── globals.css          # Global styles and Tailwind imports
│
├── components/
│   ├── atoms/                   # Basic building blocks
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   ├── Input.test.tsx
│   │   │   └── index.ts
│   │   ├── Select/
│   │   │   ├── Select.tsx
│   │   │   ├── Select.test.tsx
│   │   │   └── index.ts
│   │   ├── Label/
│   │   │   ├── Label.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   ├── Badge/
│   │   │   ├── Badge.tsx
│   │   │   └── index.ts
│   │   ├── Spinner/
│   │   │   ├── Spinner.tsx
│   │   │   └── index.ts
│   │   └── index.ts             # Barrel export for all atoms
│   │
│   ├── molecules/               # Composite components
│   │   ├── FormField/
│   │   │   ├── FormField.tsx
│   │   │   ├── FormField.test.tsx
│   │   │   └── index.ts
│   │   ├── DateTimePicker/
│   │   │   ├── DateTimePicker.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── TimePicker.tsx
│   │   │   └── index.ts
│   │   ├── LocationInput/
│   │   │   ├── LocationInput.tsx
│   │   │   ├── MapPicker.tsx
│   │   │   └── index.ts
│   │   ├── ZodiacCard/
│   │   │   ├── ZodiacCard.tsx
│   │   │   └── index.ts
│   │   ├── PlanetRow/
│   │   │   ├── PlanetRow.tsx
│   │   │   └── index.ts
│   │   ├── HouseRow/
│   │   │   ├── HouseRow.tsx
│   │   │   └── index.ts
│   │   ├── DasaPeriodRow/
│   │   │   ├── DasaPeriodRow.tsx
│   │   │   └── index.ts
│   │   └── index.ts             # Barrel export for all molecules
│   │
│   ├── organisms/               # Complex components
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx
│   │   │   ├── NavLink.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── index.ts
│   │   ├── ChartInputForm/
│   │   │   ├── ChartInputForm.tsx
│   │   │   ├── DateTimeSection.tsx
│   │   │   ├── LocationSection.tsx
│   │   │   ├── SettingsSection.tsx
│   │   │   └── index.ts
│   │   ├── HoraryInputForm/
│   │   │   ├── HoraryInputForm.tsx
│   │   │   └── index.ts
│   │   ├── PlanetsTable/
│   │   │   ├── PlanetsTable.tsx
│   │   │   ├── PlanetsTableHeader.tsx
│   │   │   ├── PlanetsTableBody.tsx
│   │   │   └── index.ts
│   │   ├── HousesTable/
│   │   │   ├── HousesTable.tsx
│   │   │   ├── HousesTableHeader.tsx
│   │   │   ├── HousesTableBody.tsx
│   │   │   └── index.ts
│   │   ├── DasaTimeline/
│   │   │   ├── DasaTimeline.tsx
│   │   │   ├── DasaTimelineItem.tsx
│   │   │   ├── DasaSubPeriods.tsx
│   │   │   └── index.ts
│   │   ├── SignificatorsView/
│   │   │   ├── SignificatorsView.tsx
│   │   │   ├── PlanetSignificators.tsx
│   │   │   ├── HouseSignificators.tsx
│   │   │   └── index.ts
│   │   ├── ExportModal/
│   │   │   ├── ExportModal.tsx
│   │   │   ├── ExportOptions.tsx
│   │   │   └── index.ts
│   │   └── index.ts             # Barrel export for all organisms
│   │
│   ├── visualizations/          # D3.js visualization components
│   │   ├── ChartWheel/
│   │   │   ├── ChartWheel.tsx
│   │   │   ├── useChartWheel.ts
│   │   │   ├── chartWheelHelpers.ts
│   │   │   ├── chartWheelConfig.ts
│   │   │   └── index.ts
│   │   ├── AspectsGraph/
│   │   │   ├── AspectsGraph.tsx
│   │   │   ├── useAspectsGraph.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   └── index.ts                 # Public component exports
│
├── hooks/
│   ├── useChartData.ts          # Chart data fetching and caching
│   ├── useLocalStorage.ts       # localStorage abstraction
│   ├── useTimezone.ts           # Timezone detection and conversion
│   ├── useGeolocation.ts        # Browser geolocation API
│   ├── useDebounce.ts           # Debounce hook
│   ├── useMediaQuery.ts         # Responsive design hook
│   ├── useOnClickOutside.ts     # Click outside detection
│   └── index.ts                 # Barrel export for all hooks
│
├── layouts/
│   ├── MainLayout/
│   │   ├── MainLayout.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── index.ts
│   ├── EmptyLayout/
│   │   ├── EmptyLayout.tsx
│   │   └── index.ts
│   └── index.ts
│
├── pages/
│   ├── Home/
│   │   ├── Home.tsx
│   │   ├── components/
│   │   │   ├── Hero.tsx
│   │   │   ├── ZodiacSelector.tsx
│   │   │   ├── Features.tsx
│   │   │   └── CallToAction.tsx
│   │   └── index.ts
│   │
│   ├── ChartInput/
│   │   ├── NatalChart.tsx
│   │   ├── HoraryChart.tsx
│   │   └── index.ts
│   │
│   ├── ChartResults/
│   │   ├── ChartResults.tsx
│   │   ├── components/
│   │   │   ├── SummaryPanel.tsx
│   │   │   ├── PlanetsTab.tsx
│   │   │   ├── HousesTab.tsx
│   │   │   ├── AspectsTab.tsx
│   │   │   ├── DasaTab.tsx
│   │   │   ├── SignificatorsTab.tsx
│   │   │   └── ChartWheelTab.tsx
│   │   └── index.ts
│   │
│   ├── Settings/
│   │   ├── Settings.tsx
│   │   ├── components/
│   │   │   ├── GeneralSettings.tsx
│   │   │   ├── CalculationSettings.tsx
│   │   │   ├── DisplaySettings.tsx
│   │   │   └── DataManagement.tsx
│   │   └── index.ts
│   │
│   ├── NotFound/
│   │   ├── NotFound.tsx
│   │   └── index.ts
│   │
│   └── index.ts
│
├── store/
│   ├── chartStore.ts            # Chart data and operations
│   ├── uiStore.ts               # UI state (modals, tabs, etc.)
│   ├── preferencesStore.ts      # User preferences
│   ├── types.ts                 # Store-specific types
│   └── index.ts                 # Barrel export for stores
│
├── types/
│   ├── chart.ts                 # Chart domain types
│   ├── planet.ts                # Planet types
│   ├── house.ts                 # House types
│   ├── aspect.ts                # Aspect types
│   ├── dasa.ts                  # Dasa period types
│   ├── significator.ts          # Significator types
│   ├── common.ts                # Shared types
│   └── index.ts                 # Barrel export for all types
│
├── utils/
│   ├── validation.ts            # Zod validation schemas
│   ├── formatters.ts            # Data formatting utilities
│   │   ├── dateFormatters.ts
│   │   ├── degreeFormatters.ts
│   │   └── numberFormatters.ts
│   ├── calculations.ts          # Client-side calculations
│   │   ├── angleCalculations.ts
│   │   ├── aspectCalculations.ts
│   │   └── timeCalculations.ts
│   ├── constants.ts             # App constants
│   │   ├── zodiacConstants.ts
│   │   ├── planetConstants.ts
│   │   └── aspectConstants.ts
│   ├── helpers.ts               # General utilities
│   │   ├── stringHelpers.ts
│   │   ├── arrayHelpers.ts
│   │   └── objectHelpers.ts
│   └── index.ts                 # Barrel export for utilities
│
├── App.tsx                      # Root component with providers
├── main.tsx                     # Application entry point
├── router.tsx                   # React Router configuration
└── vite-env.d.ts               # Vite environment type definitions
```

---

## Component Organization

### Atomic Design Hierarchy

```
Components follow the Atomic Design methodology:

Atoms (Basic UI elements)
  ↓
Molecules (Simple component combinations)
  ↓
Organisms (Complex component sections)
  ↓
Templates (Page layouts)
  ↓
Pages (Complete page implementations)
```

### Component File Structure

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx            # Main component
├── ComponentName.test.tsx       # Unit tests (optional)
├── ComponentName.module.css     # Component-specific styles (if needed)
├── SubComponent1.tsx            # Sub-components (if complex)
├── SubComponent2.tsx
├── types.ts                     # Component-specific types (if many)
├── utils.ts                     # Component-specific utilities
└── index.ts                     # Barrel export
```

**Example: Button Component**

```
Button/
├── Button.tsx
├── Button.test.tsx
└── index.ts
```

**index.ts:**
```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

**Button.tsx:**
```typescript
// Component implementation
export interface ButtonProps {
  // ...
}

export const Button = ({ ... }: ButtonProps) => {
  // ...
};
```

---

## File Naming Conventions

### General Rules

| File Type | Convention | Example |
|-----------|-----------|---------|
| Components | PascalCase | `Button.tsx`, `ChartWheel.tsx` |
| Hooks | camelCase with 'use' prefix | `useChartData.ts`, `useTimezone.ts` |
| Utilities | camelCase | `formatters.ts`, `validation.ts` |
| Types | PascalCase | `Chart.ts`, `Planet.ts` |
| Constants | SCREAMING_SNAKE_CASE | `ZODIAC_SIGNS`, `API_BASE_URL` |
| Stores | camelCase with 'Store' suffix | `chartStore.ts`, `uiStore.ts` |
| Tests | Same as source + `.test.ts(x)` | `Button.test.tsx` |
| Styles | Same as component + `.module.css` | `Button.module.css` |

### Import/Export Patterns

**Barrel Exports (index.ts):**
```typescript
// Good: Use barrel exports for clean imports
export { Button } from './Button';
export { Input } from './Input';
export { Select } from './Select';

// Usage
import { Button, Input, Select } from '@/components/atoms';
```

**Named Exports (Preferred):**
```typescript
// Good: Named exports
export const Button = () => { ... };
export type ButtonProps = { ... };

// Usage
import { Button, ButtonProps } from '@/components/atoms/Button';
```

**Default Exports (Avoid for components):**
```typescript
// Avoid: Default exports make refactoring harder
export default Button;

// Usage (less clear)
import Button from '@/components/atoms/Button';
```

---

## Import Path Aliases

### Configured Aliases

```typescript
// Available path aliases (configured in tsconfig.json and vite.config.ts)

@/*                  → ./src/*
@/components/*       → ./src/components/*
@/api/*              → ./src/api/*
@/hooks/*            → ./src/hooks/*
@/store/*            → ./src/store/*
@/types/*            → ./src/types/*
@/utils/*            → ./src/utils/*
@/assets/*           → ./src/assets/*
```

### Usage Examples

```typescript
// Import components
import { Button } from '@/components/atoms/Button';
import { ChartInputForm } from '@/components/organisms/ChartInputForm';

// Import hooks
import { useChartData } from '@/hooks/useChartData';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Import stores
import { useChartStore } from '@/store/chartStore';
import { useUIStore } from '@/store/uiStore';

// Import types
import type { ChartData, Planet } from '@/types';

// Import utilities
import { formatDegree, formatDate } from '@/utils/formatters';
import { chartInputSchema } from '@/utils/validation';

// Import API functions
import { api } from '@/api';

// Import assets
import logo from '@/assets/images/logo.svg';
import '@/assets/styles/globals.css';
```

---

## Module Responsibilities

### `/api` - API Integration Layer

**Purpose:** Centralize all API communication logic

**Files:**
- `client.ts` - Axios instance, base configuration, interceptors
- `endpoints.ts` - API endpoint functions (generateNatalChart, generateHoraryChart)
- `types.ts` - Request/response TypeScript interfaces
- `index.ts` - Public API exports

**Responsibilities:**
- HTTP client configuration
- Request/response interceptors
- Error handling
- Type definitions for API data

**Example Usage:**
```typescript
import { api } from '@/api';

const chartData = await api.generateNatalChart({
  year: 1990,
  month: 5,
  day: 15,
  // ...
});
```

---

### `/components` - React Components

**Purpose:** Reusable UI components following Atomic Design

**Subdirectories:**

#### `/atoms`
Basic, indivisible UI elements
- Button, Input, Select, Label, Card, Badge, Spinner

#### `/molecules`
Simple combinations of atoms
- FormField (Label + Input + Error)
- DateTimePicker (Multiple inputs)
- LocationInput (Lat/Long inputs + Map)
- ZodiacCard (Icon + Text)

#### `/organisms`
Complex, feature-complete components
- Navbar, ChartInputForm, PlanetsTable, HousesTable
- DasaTimeline, SignificatorsView, ExportModal

#### `/visualizations`
D3.js powered visualizations
- ChartWheel, AspectsGraph

**Responsibilities:**
- Presentation logic
- User interactions
- Component-specific state
- Emit events to parent components

---

### `/hooks` - Custom React Hooks

**Purpose:** Reusable stateful logic

**Common Hooks:**
- `useChartData` - Fetch and cache chart data
- `useLocalStorage` - Persist data to localStorage
- `useTimezone` - Timezone detection and conversion
- `useGeolocation` - Browser geolocation API
- `useDebounce` - Debounce values
- `useMediaQuery` - Responsive design queries

**Responsibilities:**
- Encapsulate reusable logic
- Manage component lifecycle effects
- Abstract complex state management
- Provide clean interfaces for common tasks

**Example:**
```typescript
const { latitude, longitude, error } = useGeolocation();
const timezone = useTimezone();
```

---

### `/layouts` - Page Layouts

**Purpose:** Define page structure and common elements

**Layouts:**
- `MainLayout` - Standard layout with header, footer, sidebar
- `EmptyLayout` - Minimal layout (for modals, overlays)

**Responsibilities:**
- Page structure
- Navigation components
- Common headers/footers
- Outlet for page content

---

### `/pages` - Route Pages

**Purpose:** Top-level route components

**Pages:**
- `Home` - Landing page with zodiac selector
- `ChartInput` - Natal and horary input forms
- `ChartResults` - Chart visualization and data tables
- `Settings` - User preferences
- `NotFound` - 404 error page

**Responsibilities:**
- Route-level logic
- Data fetching for page
- Compose organisms into full pages
- Handle navigation

---

### `/store` - State Management (Zustand)

**Purpose:** Global application state

**Stores:**
- `chartStore` - Chart data, history, loading states
- `uiStore` - UI state (modals, tabs, sidebar)
- `preferencesStore` - User preferences (persistent)

**Responsibilities:**
- Global state management
- State persistence (localStorage)
- Actions to modify state
- Derived state (selectors)

**Example:**
```typescript
const currentChart = useChartStore(state => state.currentChart);
const generateChart = useChartStore(state => state.generateNatalChart);
```

---

### `/types` - TypeScript Definitions

**Purpose:** Centralized type definitions

**Type Categories:**
- `chart.ts` - Chart, ChartInput, ChartData
- `planet.ts` - Planet, PlanetName, ZodiacSign
- `house.ts` - House, HouseData
- `aspect.ts` - Aspect, AspectType
- `dasa.ts` - DasaPeriod, DasaLord
- `significator.ts` - Significators (ABCD)
- `common.ts` - Shared types (Location, DateTime, etc.)

**Responsibilities:**
- Type safety across the app
- API contract definitions
- Domain model types
- Utility types

---

### `/utils` - Utility Functions

**Purpose:** Pure helper functions

**Utility Categories:**
- `validation.ts` - Zod schemas for form validation
- `formatters.ts` - Date, number, degree formatting
- `calculations.ts` - Angle, aspect calculations
- `constants.ts` - App constants (zodiac signs, planets, etc.)
- `helpers.ts` - General utilities (array, object, string helpers)

**Responsibilities:**
- Pure functions (no side effects)
- Data transformations
- Validation logic
- Reusable calculations

**Example:**
```typescript
import { formatDegree, formatDate } from '@/utils/formatters';

const formatted = formatDegree(123.456); // "123° 27' 22""
```

---

## Best Practices

### 1. Component Organization
- Keep components small and focused (Single Responsibility Principle)
- Use composition over inheritance
- Extract reusable logic to custom hooks
- Prefer named exports over default exports

### 2. File Structure
- One component per file
- Group related files in folders
- Use barrel exports (index.ts) for cleaner imports
- Keep test files next to source files

### 3. Import Organization
```typescript
// 1. External dependencies
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Internal absolute imports (using aliases)
import { Button } from '@/components/atoms/Button';
import { useChartStore } from '@/store/chartStore';
import { formatDegree } from '@/utils/formatters';

// 3. Relative imports (only for local files)
import { SubComponent } from './SubComponent';

// 4. Type imports
import type { ChartData } from '@/types';

// 5. Assets
import logo from '@/assets/images/logo.svg';
```

### 4. Naming Consistency
- Components: PascalCase
- Files: Match component name
- Props interfaces: `ComponentNameProps`
- Event handlers: `handleEventName`
- State variables: Descriptive camelCase

### 5. Type Safety
- Always define prop interfaces
- Use TypeScript for all files (.ts, .tsx)
- Avoid `any` type (use `unknown` if necessary)
- Export types alongside components

---

## Additional Notes

### Adding New Components

1. Determine atomic level (atom, molecule, organism)
2. Create folder with component name
3. Create component file (`ComponentName.tsx`)
4. Create barrel export (`index.ts`)
5. Add to parent folder's barrel export
6. Write tests if complex logic exists

### Adding New Pages

1. Create folder in `/pages`
2. Create main page component
3. Create `components/` subfolder for page-specific components
4. Add route to `router.tsx`
5. Add navigation link if needed

### Adding New Stores

1. Create store file in `/store` (`nameStore.ts`)
2. Define state interface
3. Implement store with Zustand
4. Add persistence if needed (with `persist` middleware)
5. Export from `/store/index.ts`

### Adding New Utilities

1. Determine category (formatters, calculations, helpers, etc.)
2. Add function to appropriate file
3. Export function
4. Add to barrel export if needed
5. Write JSDoc comments for complex utilities

---

This structure provides a scalable, maintainable foundation for the Bobo Astrologer web application. All team members should follow these conventions to ensure consistency across the codebase.
