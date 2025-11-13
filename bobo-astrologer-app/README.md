# Bobo Astrologer - Vedic Astrology Web Application

A modern web application for Vedic Astrology calculations, built with React, TypeScript, and D3.js.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build
```

## 📋 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **State Management:** Zustand
- **Styling:** Tailwind CSS (custom dark theme)
- **Visualizations:** D3.js
- **Forms:** React Hook Form + Zod validation
- **HTTP Client:** Axios
- **Routing:** React Router v6

## 🏗️ Architecture

See the parent directory for complete documentation:
- `../ARCHITECTURE.md` - System architecture
- `../PROJECT_STRUCTURE.md` - File organization
- `../STYLE_GUIDE.md` - Design system
- `../CLAUDE.md` - Development guidance

## 📁 Project Structure

```
src/
├── api/              # API integration (axios client, endpoints, types)
├── assets/           # Images, styles
├── components/       # React components (Atomic Design)
│   ├── atoms/        # Button, Input, Select, etc.
│   ├── molecules/    # FormField, ZodiacCard, etc.
│   ├── organisms/    # Navbar, Tables, Forms, etc.
│   └── visualizations/ # D3.js ChartWheel, AspectsGraph
├── hooks/            # Custom React hooks
├── layouts/          # Page layouts
├── pages/            # Route pages
├── store/            # Zustand stores (chartStore, uiStore, preferencesStore)
├── types/            # TypeScript definitions
└── utils/            # Utilities (validation, formatters, constants)
```

## 🎨 Design System

**Theme:** Dark mystical aesthetic
- Primary Colors: `#0a0a0a` (dark), `#8b5cf6` (purple accent)
- Typography: Cinzel (headings), Montserrat (body)
- Spacing: 4px-based system
- Components: Glassmorphism effects, subtle glows, starfield backgrounds

See `../STYLE_GUIDE.md` for complete design tokens and component patterns.

## 🔌 API Integration

Connects to VedicAstro FastAPI backend at `http://127.0.0.1:8088`

### Endpoints
- `POST /get_all_horoscope_data` - Generate natal chart
- `POST /get_all_horary_data` - Generate horary (prasna) chart

### Example Request
```typescript
const chartInput = {
  year: 1990,
  month: 5,
  day: 15,
  hour: 6,
  minute: 30,
  second: 0,
  utc: "+05:30",
  latitude: 12.9716,
  longitude: 77.5946,
  ayanamsa: "Lahiri",
  house_system: "Equal"
};
```

## 🎯 Features

### Current Status ✅
- Project setup (Vite + React + TypeScript)
- Dependencies installed
- TypeScript + Tailwind configured
- Path aliases (`@/components`, `@/utils`, etc.)
- Folder structure created
- Global styles with dark theme

### To Implement ⏳
- API layer (axios client + endpoints)
- Type definitions (Chart, Planet, House, etc.)
- Zustand stores (chartStore, uiStore, preferencesStore)
- Component library (atoms → molecules → organisms)
- D3.js chart wheel visualization
- Pages (Home, ChartInput, ChartResults, Settings)
- React Router configuration
- Form validation
- Chart history (localStorage)
- Export functionality

## 🛠️ Development

### Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking
```

### Code Style

- Functional components with hooks
- TypeScript for all files (`.ts`, `.tsx`)
- Atomic Design principles
- Named exports preferred
- Path aliases for imports
- Prettier formatting (configured)

### Example Component

```typescript
// src/components/atoms/Button/Button.tsx
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export const Button = ({
  variant = 'primary',
  isLoading,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'px-6 py-3 rounded-lg font-semibold transition-all',
        {
          'bg-accent-purple hover:bg-purple-700 text-white': variant === 'primary',
          'border-2 border-white/40 hover:border-white text-white': variant === 'secondary',
          'opacity-50 cursor-not-allowed': isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Netlify
```bash
netlify deploy --prod --dir=dist
```

### Docker
```bash
docker build -t bobo-astrologer .
docker run -p 80:80 bobo-astrologer
```

## 📝 Implementation Roadmap

1. **Core Infrastructure**
   - API client + endpoints
   - TypeScript types
   - Zustand stores
   - Utility functions
   - Custom hooks

2. **Component Library**
   - Atoms (Button, Input, Select, Card, etc.)
   - Molecules (FormField, ZodiacCard, DateTimePicker, etc.)
   - Organisms (Navbar, Forms, Tables, etc.)

3. **Visualizations**
   - D3.js ChartWheel
   - AspectsGraph

4. **Pages & Routing**
   - Home (zodiac selector)
   - ChartInput (Natal & Horary forms)
   - ChartResults (tabs with data)
   - Settings
   - React Router setup

5. **Polish**
   - Loading states
   - Error handling
   - Responsive design
   - Accessibility

## 📄 License

[Add license]

---

**Status:** Foundation complete. Ready for core implementation.

For detailed architecture and implementation guidance, see documentation in parent directory.
