# Class Fee Calculator - Setup Instructions

## Quick Start

### Step 1: Create Directory Structure
```bash
mkdir -p app components lib public\locales
```

### Step 2: Install Dependencies
```bash
npm install --legacy-peer-deps
```

### Step 3: Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Calculator.tsx      # Main calculator component
│   ├── LanguageToggle.tsx  # Language selector
│   ├── StepForm.tsx        # Step-by-step form
│   ├── FeeBreakdown.tsx    # Fee display
│   └── WhatsAppShare.tsx   # Share button
├── lib/
│   ├── i18n.ts            # i18n hook
│   ├── calculations.ts    # Fee calculations
│   └── translations.ts    # Translation data
└── public/
    └── locales/           # Translation JSON files
```

## Features

- ✨ Bilingual UI (Sinhala/English with toggle)
- 📊 Real-time fee calculation
- 💰 Comprehensive fee breakdown (base, distance, frequency, discounts)
- 📱 WhatsApp integration for sharing
- 🎨 Modern, professional educational design
- ✅ Smooth animations and transitions

## Configuration

All tuition fee parameters are in `lib/calculations.ts`:
- Base fees by grade
- Distance calculations
- Frequency surcharges
- Group discounts
- Fuel charges
- Rounding logic

## Building for Production

```bash
npm run build
npm start
```
