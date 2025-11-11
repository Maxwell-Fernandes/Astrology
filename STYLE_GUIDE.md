# Bobo Astrologer - Style Guide

Based on Astrology.com design analysis

---

## 1. Color Palette

### Primary Colors
```css
--primary-dark: #0a0a0a;        /* Deep black background */
--primary-darker: #000000;      /* Pure black for contrast */
--text-primary: #ffffff;        /* White text on dark */
--text-secondary: #b8b8b8;      /* Muted gray for secondary text */
```

### Accent Colors
```css
--accent-blue: #4a90e2;         /* Interactive elements, links */
--accent-gold: #d4af37;         /* Premium features, highlights */
--accent-purple: #8b5cf6;       /* Mystical/spiritual elements */
```

### Semantic Colors
```css
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Surface Colors
```css
--surface-elevated: #1a1a1a;    /* Cards, modals */
--surface-hover: #2a2a2a;       /* Hover states */
--border-subtle: #333333;       /* Borders, dividers */
--border-emphasis: #4a4a4a;     /* Emphasized borders */
```

### Opacity Variations
```css
--overlay-light: rgba(0, 0, 0, 0.5);
--overlay-heavy: rgba(0, 0, 0, 0.8);
--white-10: rgba(255, 255, 255, 0.1);
--white-20: rgba(255, 255, 255, 0.2);
--white-60: rgba(255, 255, 255, 0.6);
```

---

## 2. Typography

### Font Families
```css
--font-primary: 'Cinzel', serif;           /* Headings, mystical feel */
--font-secondary: 'Montserrat', sans-serif; /* Body text, UI elements */
--font-mono: 'Courier New', monospace;      /* Data tables, numbers */
```

### Font Sizes (rem-based scale)
```css
--text-xs: 0.75rem;      /* 12px - Labels, captions */
--text-sm: 0.875rem;     /* 14px - Small text, dates */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;     /* 18px - Emphasized text */
--text-xl: 1.25rem;      /* 20px - Section headers */
--text-2xl: 1.5rem;      /* 24px - Card titles */
--text-3xl: 1.875rem;    /* 30px - Page headers */
--text-4xl: 2.25rem;     /* 36px - Hero text */
--text-5xl: 3rem;        /* 48px - Main headlines */
--text-6xl: 3.75rem;     /* 60px - Landing hero */
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-black: 900;
```

### Typography Usage Examples

#### Headings
```css
h1 {
  font-family: var(--font-primary);
  font-size: var(--text-6xl);
  font-weight: var(--font-bold);
  letter-spacing: 0.02em;
  line-height: 1.1;
  color: var(--text-primary);
}

h2 {
  font-family: var(--font-primary);
  font-size: var(--text-4xl);
  font-weight: var(--font-semibold);
  letter-spacing: 0.01em;
  line-height: 1.2;
}

h3 {
  font-family: var(--font-secondary);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  letter-spacing: 0.01em;
  line-height: 1.3;
}
```

#### Body Text
```css
body {
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: 1.6;
  color: var(--text-secondary);
}

.lead-text {
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  line-height: 1.7;
  color: var(--text-primary);
}

.caption {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: 1.5;
  color: var(--text-secondary);
}
```

#### Letter Spacing
```css
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;
```

---

## 3. Spacing System

### Base Unit: 4px (0.25rem)

```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
--spacing-32: 8rem;     /* 128px */
```

### Spacing Usage Guidelines

#### Component Padding
```css
--padding-component-xs: var(--spacing-2) var(--spacing-3);   /* 8px 12px */
--padding-component-sm: var(--spacing-3) var(--spacing-4);   /* 12px 16px */
--padding-component-md: var(--spacing-4) var(--spacing-6);   /* 16px 24px */
--padding-component-lg: var(--spacing-6) var(--spacing-8);   /* 24px 32px */
--padding-component-xl: var(--spacing-8) var(--spacing-12);  /* 32px 48px */
```

#### Section Spacing
```css
--section-spacing-sm: var(--spacing-12);   /* 48px between sections */
--section-spacing-md: var(--spacing-16);   /* 64px */
--section-spacing-lg: var(--spacing-24);   /* 96px */
--section-spacing-xl: var(--spacing-32);   /* 128px */
```

#### Element Gaps
```css
--gap-xs: var(--spacing-1);    /* 4px - Tight spacing */
--gap-sm: var(--spacing-2);    /* 8px - Form elements */
--gap-md: var(--spacing-4);    /* 16px - Card content */
--gap-lg: var(--spacing-6);    /* 24px - Section content */
--gap-xl: var(--spacing-8);    /* 32px - Major sections */
```

---

## 4. Component Styles

### Zodiac Sign Cards

```css
.zodiac-card {
  background: var(--surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.zodiac-card:hover {
  background: var(--surface-hover);
  border-color: var(--border-emphasis);
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.zodiac-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(138, 92, 246, 0.1),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.zodiac-card:hover::before {
  opacity: 1;
}

.zodiac-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.zodiac-icon svg {
  width: 100%;
  height: 100%;
  stroke: var(--text-primary);
  stroke-width: 1.5px;
  fill: none;
}

.zodiac-name {
  font-family: var(--font-primary);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  text-align: center;
  margin-bottom: var(--spacing-2);
  color: var(--text-primary);
}

.zodiac-dates {
  font-family: var(--font-secondary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  text-align: center;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}
```

### Navigation Bar

```css
.navbar {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-subtle);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: var(--spacing-4) var(--spacing-8);
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  font-family: var(--font-primary);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.navbar-menu {
  display: flex;
  gap: var(--spacing-8);
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-link {
  font-family: var(--font-secondary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  transition: color 0.2s ease;
  padding: var(--spacing-2) 0;
  position: relative;
}

.navbar-link:hover {
  color: var(--text-primary);
}

.navbar-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-purple);
  transition: width 0.3s ease;
}

.navbar-link:hover::after {
  width: 100%;
}
```

### Buttons

```css
/* Primary Button */
.btn-primary {
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  background: var(--accent-purple);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-3) var(--spacing-6);
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.btn-primary:hover {
  background: #7c3aed;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-md);
}

/* Secondary Button */
.btn-secondary {
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  background: transparent;
  border: 2px solid var(--border-emphasis);
  border-radius: var(--radius-md);
  padding: var(--spacing-3) var(--spacing-6);
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.btn-secondary:hover {
  background: var(--surface-hover);
  border-color: var(--text-primary);
}

/* Icon Button */
.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background: var(--surface-hover);
  border-color: var(--border-emphasis);
  transform: scale(1.05);
}
```

### Form Inputs

```css
.form-group {
  margin-bottom: var(--spacing-6);
}

.form-label {
  font-family: var(--font-secondary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  margin-bottom: var(--spacing-2);
  display: block;
}

.form-input {
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  color: var(--text-primary);
  background: var(--surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--spacing-3) var(--spacing-4);
  width: 100%;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-purple);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.form-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23b8b8b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
  background-position: right var(--spacing-3) center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: var(--spacing-10);
}
```

### Cards

```css
.card {
  background: var(--surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  transition: all 0.3s ease;
}

.card-header {
  margin-bottom: var(--spacing-4);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--border-subtle);
}

.card-title {
  font-family: var(--font-primary);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin: 0;
}

.card-body {
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--text-secondary);
}

.card-elevated {
  box-shadow: var(--shadow-lg);
}

.card-elevated:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-2px);
}
```

### Data Tables

```css
.table-container {
  background: var(--surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-secondary);
}

.table thead {
  background: var(--primary-darker);
  border-bottom: 2px solid var(--border-emphasis);
}

.table th {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  text-align: left;
  padding: var(--spacing-4) var(--spacing-6);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}

.table td {
  font-size: var(--text-base);
  color: var(--text-secondary);
  padding: var(--spacing-4) var(--spacing-6);
  border-bottom: 1px solid var(--border-subtle);
}

.table tbody tr:hover {
  background: var(--surface-hover);
}

.table tbody tr:last-child td {
  border-bottom: none;
}
```

---

## 5. Shadows & Elevation

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4),
            0 2px 4px -1px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5),
            0 4px 6px -2px rgba(0, 0, 0, 0.3);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6),
            0 10px 10px -5px rgba(0, 0, 0, 0.3);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.7);

/* Glow effects for mystical elements */
--shadow-glow-purple: 0 0 20px rgba(139, 92, 246, 0.4),
                      0 0 40px rgba(139, 92, 246, 0.2);
--shadow-glow-gold: 0 0 20px rgba(212, 175, 55, 0.4),
                    0 0 40px rgba(212, 175, 55, 0.2);
```

### Elevation Levels

```css
.elevation-0 { box-shadow: none; z-index: 0; }
.elevation-1 { box-shadow: var(--shadow-sm); z-index: 100; }
.elevation-2 { box-shadow: var(--shadow-md); z-index: 200; }
.elevation-3 { box-shadow: var(--shadow-lg); z-index: 300; }
.elevation-4 { box-shadow: var(--shadow-xl); z-index: 400; }
.elevation-5 { box-shadow: var(--shadow-2xl); z-index: 500; }
```

---

## 6. Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem;    /* 4px - Small elements */
--radius-md: 0.5rem;     /* 8px - Buttons, inputs */
--radius-lg: 0.75rem;    /* 12px - Cards */
--radius-xl: 1rem;       /* 16px - Large cards */
--radius-2xl: 1.5rem;    /* 24px - Hero sections */
--radius-full: 9999px;   /* Full circle */
```

---

## 7. Animations & Transitions

### Transition Durations
```css
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

### Easing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Common Animations

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/* Starfield animation for background */
@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.animate-fade-in {
  animation: fadeIn var(--duration-slow) var(--ease-out);
}

.animate-slide-in {
  animation: slideInRight var(--duration-slow) var(--ease-out);
}

.animate-pulse {
  animation: pulse 2s var(--ease-in-out) infinite;
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

### Hover Transitions

```css
.transition-all {
  transition: all var(--duration-normal) var(--ease-in-out);
}

.transition-transform {
  transition: transform var(--duration-normal) var(--ease-out);
}

.transition-colors {
  transition: background-color var(--duration-normal) var(--ease-in-out),
              color var(--duration-normal) var(--ease-in-out),
              border-color var(--duration-normal) var(--ease-in-out);
}

.transition-opacity {
  transition: opacity var(--duration-normal) var(--ease-in-out);
}

.transition-shadow {
  transition: box-shadow var(--duration-slow) var(--ease-out);
}
```

---

## 8. Opacity & Transparency

```css
--opacity-0: 0;
--opacity-5: 0.05;
--opacity-10: 0.1;
--opacity-20: 0.2;
--opacity-30: 0.3;
--opacity-40: 0.4;
--opacity-50: 0.5;
--opacity-60: 0.6;
--opacity-70: 0.7;
--opacity-80: 0.8;
--opacity-90: 0.9;
--opacity-95: 0.95;
--opacity-100: 1;
```

### Glass Morphism Effect

```css
.glass {
  background: rgba(26, 26, 26, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-strong {
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

---

## 9. Common Tailwind CSS Patterns

### Layout Patterns

```html
<!-- Container -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>

<!-- Grid Layout - Zodiac Signs -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
  <!-- Cards -->
</div>

<!-- Flex Center -->
<div class="flex items-center justify-center min-h-screen">
  <!-- Centered content -->
</div>

<!-- Flex Between (Navbar) -->
<div class="flex items-center justify-between">
  <!-- Navigation items -->
</div>
```

### Responsive Design

```html
<!-- Responsive Text -->
<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold">

<!-- Responsive Spacing -->
<div class="p-4 sm:p-6 lg:p-8">

<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">

<!-- Hide on Mobile -->
<div class="hidden md:block">

<!-- Show only on Mobile -->
<div class="block md:hidden">
```

### Color Utilities

```html
<!-- Background -->
<div class="bg-[#0a0a0a]">

<!-- Text -->
<p class="text-white opacity-60">

<!-- Border -->
<div class="border border-white/10">

<!-- Gradient -->
<div class="bg-gradient-to-b from-purple-500/20 to-transparent">
```

### Interactive States

```html
<!-- Hover Effects -->
<button class="hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl transition-all">

<!-- Focus States -->
<input class="focus:outline-none focus:ring-2 focus:ring-purple-500">

<!-- Active States -->
<button class="active:scale-95">

<!-- Group Hover -->
<div class="group">
  <div class="group-hover:opacity-100 opacity-0 transition-opacity">
</div>
```

---

## 10. Example Component Reference Designs

### Zodiac Sign Selector (Landing Page)

```html
<section class="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
  <!-- Starfield Background -->
  <div class="absolute inset-0 opacity-50">
    <div class="stars"></div>
  </div>

  <!-- Content -->
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- Header -->
    <div class="text-center mb-16">
      <h1 class="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
        WELCOME TO ASTROLOGY.COM
      </h1>
      <p class="text-xl text-white/60 font-light">
        Choose your sign
      </p>
    </div>

    <!-- Zodiac Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
      <!-- Zodiac Card -->
      <div class="zodiac-card group cursor-pointer">
        <!-- Icon -->
        <div class="zodiac-icon mb-4">
          <svg viewBox="0 0 64 64" class="w-16 h-16 mx-auto">
            <!-- Aries constellation -->
            <path d="M20,40 L25,30 L30,35 L35,25 L40,30"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  class="text-white group-hover:text-purple-400 transition-colors"/>
          </svg>
        </div>

        <!-- Name -->
        <h3 class="text-2xl font-semibold text-center text-white mb-2 font-serif">
          Aries
        </h3>

        <!-- Dates -->
        <p class="text-sm text-center text-white/60 uppercase tracking-wider">
          Mar 21 - Apr 19
        </p>

        <!-- Hover Gradient -->
        <div class="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
      </div>

      <!-- Repeat for other signs -->
    </div>

    <!-- Description -->
    <div class="text-center max-w-3xl mx-auto">
      <p class="text-lg text-white/70 leading-relaxed">
        Learn about astrology, zodiac signs, retrogrades, and more! Your world becomes
        clear once you understand how the universe influences it.
      </p>
    </div>
  </div>
</section>

<style>
.zodiac-card {
  @apply relative bg-white/5 border border-white/10 rounded-lg p-6
         transition-all duration-300 hover:bg-white/10 hover:border-white/20
         hover:-translate-y-1 hover:shadow-2xl;
}

.stars {
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(2px 2px at 20% 30%, white, transparent),
    radial-gradient(2px 2px at 60% 70%, white, transparent),
    radial-gradient(1px 1px at 50% 50%, white, transparent),
    radial-gradient(1px 1px at 80% 10%, white, transparent),
    radial-gradient(2px 2px at 90% 60%, white, transparent);
  background-size: 200% 200%;
  animation: twinkle 4s ease-in-out infinite;
}
</style>
```

### Chart Input Form

```html
<div class="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
  <h2 class="text-3xl font-bold text-white mb-8 font-serif">
    Generate Your Birth Chart
  </h2>

  <form class="space-y-6">
    <!-- Date & Time Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-white/90 mb-2 uppercase tracking-wide">
          Year
        </label>
        <input
          type="number"
          placeholder="1990"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-white/90 mb-2 uppercase tracking-wide">
          Month
        </label>
        <input
          type="number"
          placeholder="5"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-white/90 mb-2 uppercase tracking-wide">
          Day
        </label>
        <input
          type="number"
          placeholder="15"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>
    </div>

    <!-- Time Row -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-sm font-medium text-white/90 mb-2 uppercase tracking-wide">
          Hour
        </label>
        <input
          type="number"
          placeholder="06"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-white/90 mb-2 uppercase tracking-wide">
          Minute
        </label>
        <input
          type="number"
          placeholder="30"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-white/90 mb-2 uppercase tracking-wide">
          Second
        </label>
        <input
          type="number"
          placeholder="00"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-white/90 mb-2 uppercase tracking-wide">
          UTC
        </label>
        <input
          type="text"
          placeholder="+05:30"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>
    </div>

    <!-- Location Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-white/90 mb-2 uppercase tracking-wide">
          Latitude
        </label>
        <input
          type="number"
          step="0.0001"
          placeholder="12.9716"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-white/90 mb-2 uppercase tracking-wide">
          Longitude
        </label>
        <input
          type="number"
          step="0.0001"
          placeholder="77.5946"
          class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>
    </div>

    <!-- System Settings Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-white/90 mb-2 uppercase tracking-wide">
          Ayanamsa
        </label>
        <select class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer">
          <option value="Lahiri">Lahiri</option>
          <option value="Krishnamurti">Krishnamurti</option>
          <option value="Raman">Raman</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-white/90 mb-2 uppercase tracking-wide">
          House System
        </label>
        <select class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer">
          <option value="Equal">Equal</option>
          <option value="Placidus">Placidus</option>
          <option value="Koch">Koch</option>
        </select>
      </div>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
    >
      Generate Chart
    </button>
  </form>
</div>
```

### Planets Data Table

```html
<div class="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
  <!-- Table Header -->
  <div class="bg-black/50 border-b border-white/10 px-6 py-4">
    <h3 class="text-xl font-semibold text-white font-serif">
      Planetary Positions
    </h3>
  </div>

  <!-- Table -->
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-black/30 border-b-2 border-white/20">
        <tr>
          <th class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
            Planet
          </th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
            Sign
          </th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
            Degree
          </th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
            House
          </th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr class="hover:bg-white/5 transition-colors">
          <td class="px-6 py-4 text-white font-medium">Sun</td>
          <td class="px-6 py-4 text-white/70">Taurus</td>
          <td class="px-6 py-4 text-white/70 font-mono">24° 32' 15"</td>
          <td class="px-6 py-4 text-white/70">2nd</td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
              Direct
            </span>
          </td>
        </tr>
        <tr class="hover:bg-white/5 transition-colors">
          <td class="px-6 py-4 text-white font-medium">Mercury</td>
          <td class="px-6 py-4 text-white/70">Aries</td>
          <td class="px-6 py-4 text-white/70 font-mono">15° 48' 22"</td>
          <td class="px-6 py-4 text-white/70">1st</td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Retrograde
            </span>
          </td>
        </tr>
        <!-- More rows -->
      </tbody>
    </table>
  </div>
</div>
```

### Chart Wheel Visualization Container

```html
<div class="relative aspect-square max-w-2xl mx-auto bg-gradient-to-br from-purple-900/10 to-blue-900/10 rounded-full p-8 border-2 border-purple-500/30">
  <!-- Outer Circle -->
  <div class="absolute inset-8 rounded-full border-2 border-white/20"></div>

  <!-- Middle Circle -->
  <div class="absolute inset-16 rounded-full border border-white/10"></div>

  <!-- Inner Circle -->
  <div class="absolute inset-24 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm"></div>

  <!-- Center Point -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-500 shadow-glow-purple"></div>

  <!-- Zodiac Signs (12 divisions) -->
  <svg class="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
    <!-- Planet positions, house cusps, aspect lines will be rendered here -->
  </svg>

  <!-- Decorative Glow -->
  <div class="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 animate-pulse"></div>
</div>

<style>
.shadow-glow-purple {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.6),
              0 0 40px rgba(139, 92, 246, 0.4),
              0 0 60px rgba(139, 92, 246, 0.2);
}
</style>
```

---

## 11. Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 1024px;  /* Large devices */
--breakpoint-xl: 1280px;  /* Extra large devices */
--breakpoint-2xl: 1536px; /* 2X large devices */
```

```css
/* Mobile: Base styles */
.container {
  padding: var(--spacing-4);
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-6);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-8);
  }
}
```

---

## 12. Accessibility Considerations

```css
/* Focus Visible for Keyboard Navigation */
*:focus-visible {
  outline: 2px solid var(--accent-purple);
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  :root {
    --border-subtle: #666666;
    --border-emphasis: #999999;
    --text-secondary: #cccccc;
  }
}
```

---

## 13. Loading & Skeleton States

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--surface-elevated) 0%,
    var(--surface-hover) 50%,
    var(--surface-elevated) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-md);
}

.skeleton-text {
  height: 1rem;
  margin-bottom: var(--spacing-2);
}

.skeleton-title {
  height: 2rem;
  width: 60%;
  margin-bottom: var(--spacing-4);
}

.skeleton-avatar {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
}
```

---

## 14. Z-Index Scale

```css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1100;
--z-fixed: 1200;
--z-modal-backdrop: 1300;
--z-modal: 1400;
--z-popover: 1500;
--z-tooltip: 1600;
--z-notification: 1700;
```

---

## Usage Guidelines Summary

1. **Always use CSS variables** for colors, spacing, and other design tokens
2. **Mobile-first responsive design** - start with mobile styles, add breakpoints for larger screens
3. **Consistent spacing** - use the 4px-based spacing system
4. **Animation performance** - use `transform` and `opacity` for smooth 60fps animations
5. **Dark theme by default** - all components designed for dark backgrounds
6. **Mystical aesthetic** - incorporate subtle glows, gradients, and cosmic themes
7. **Accessibility** - ensure proper contrast ratios, keyboard navigation, and screen reader support
8. **Component reusability** - build modular, composable components
9. **Performance** - optimize images, lazy load off-screen content, minimize bundle size

---

*This style guide should be referenced for all UI development to maintain visual consistency across the Bobo Astrologer application.*
