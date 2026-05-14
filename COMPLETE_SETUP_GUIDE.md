# 📋 CLASS FEE CALCULATOR - COMPLETE SETUP & USAGE GUIDE

## 📌 OVERVIEW

This is a **Next.js-based bilingual class fee calculator** for tuition services. It allows students to:
1. Select their grade, location, class method, frequency, and group size
2. See real-time fee calculations with detailed breakdown
3. Share results via WhatsApp with one click

**Key Languages**: Sinhala (සිංහල) & English  
**Contact**: 0787124080 (WhatsApp)

---

## 🔧 INSTALLATION STEPS (Windows)

### Step 1: Navigate to Project Directory
```cmd
cd "d:\Progressing\GitHub\2026-05-14\PayWall.worktrees\agents-class-fee-calculator-implementation"
```

### Step 2: Create Directory Structure
```cmd
mkdir app components lib public
```

### Step 3: Move and Organize Files

**Move library files:**
```cmd
move lib-i18n.ts lib\i18n.ts
move lib-translations.ts lib\translations.ts
move lib-calculations.ts lib\calculations.ts
```

**Move component files:**
```cmd
move components-LanguageToggle.tsx components\LanguageToggle.tsx
move components-FeeBreakdown.tsx components\FeeBreakdown.tsx
move components-WhatsAppShare.tsx components\WhatsAppShare.tsx
move components-Calculator.tsx components\Calculator.tsx
move components-StepForm.tsx components\StepForm.tsx
```

### Step 4: Create App Files

**Create `app/layout.tsx`:**
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Class Fee Calculator',
  description: 'Calculate your tuition class fees easily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
```

**Create `app/page.tsx`:**
```tsx
'use client'

import Calculator from '@/components/Calculator'
import LanguageToggle from '@/components/LanguageToggle'
import { useLanguage } from '@/lib/i18n'

export default function Home() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{t('title')}</h1>
            <p className="text-gray-600">{t('subtitle')}</p>
          </div>
          <LanguageToggle />
        </div>
        <Calculator />
      </div>
    </main>
  )
}
```

**Create `app/globals.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg;
  }

  .card {
    @apply bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl;
  }

  .input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all;
  }

  .slide-in {
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
```

### Step 5: Install Dependencies
```cmd
npm install --legacy-peer-deps
```

**Note**: If you get permission errors, try:
```cmd
npm install --legacy-peer-deps --force
```

### Step 6: Start Development Server
```cmd
npm run dev
```

### Step 7: Open in Browser
```
http://localhost:3000
```

---

## 💰 FEE CALCULATION BREAKDOWN

### Base Fees (per month)
| Grade Group | Base Fee |
|-------------|----------|
| Grade 6-9 | Rs. 2,500 |
| O/L (10-11) | Rs. 3,500 |
| A/L (12-13) | Rs. 5,000 |

### Additional Charges

**Distance Surcharge** (Physical only):
- User enters distance from Wariyapola
- System adds 8 km constant
- Charged: Rs. 30/km per session
- Formula: `(user_distance + 8) × 30 × sessions_per_month`

**Frequency Surcharge**:
- 1x/week: No surcharge
- 2x/week: +10% of base fee
- 3x/week: +20% of base fee

**Fuel Charge** (Physical only):
- Same as distance surcharge: Rs. 30/km per session

**Group Discount** (Subtracted):
- 1 student: 0%
- 2 students: -5%
- 3+ students: -10%

### Calculation Formula
```
Monthly Fee = Base Fee 
            + Distance Surcharge (if physical)
            + Frequency Surcharge
            - Group Discount
            + Fuel Charge (if physical)
            [Rounded to nearest Rs. 500]
```

### Example
```
Grade: O/L (Rs. 3,500)
Distance: 5 km → 5 + 8 = 13 km
Method: Physical
Frequency: 2x/week
Students: 2

Calculation:
- Base Fee: Rs. 3,500
- Distance: 13 × 30 × (2 × 4.33) = Rs. 3,385.80
- Frequency: 3,500 × 10% = Rs. 350
- Fuel: 13 × 30 × (2 × 4.33) = Rs. 3,385.80
- Group Discount: (3,500 + 3,385.80 + 350 + 3,385.80) × 5% = Rs. 550.58
- Subtotal: 3,500 + 3,385.80 + 350 + 3,385.80 - 550.58 = Rs. 10,471.02
- Final (rounded to 500): Rs. 10,500
- Per Session: Rs. 10,500 ÷ (2 × 4.33) = Rs. 1,210 (approx)
```

---

## 📱 HOW TO USE THE APP

### Step 1: Language Selection
- Click the button in top-right corner (English/සිංහල)
- Default language: **Sinhala**
- All UI updates instantly

### Step 2: Grade Selection
- Choose one of three grade groups
- Each has a different base fee

### Step 3: Location
- Enter your distance from Wariyapola in kilometers
- System automatically adds 8 km
- Skipped for online classes

### Step 4: Class Method
- **Online** 🌐 - No distance charges
- **Physical** 🏢 - Includes distance + fuel charges

### Step 5: Session Frequency
- Select 1x, 2x, or 3x per week
- Each extra session adds 10% surcharge

### Step 6: Number of Students
- Use +/- buttons or type directly
- System shows group discount automatically

### Step 7: View Results
- **Monthly Fee**: Total cost per month (rounded to Rs. 500)
- **Per Session Fee**: Calculated monthly fee ÷ total sessions
- **Breakdown**: Detailed view of all charges and discounts

### Step 8: Share via WhatsApp
- Click "Share via WhatsApp" button
- Message includes:
  - Selected parameters (grade, method, distance, etc.)
  - Monthly and per-session fees
  - Detailed fee breakdown
  - Contact number: 0787124080

---

## 🗂 FILE STRUCTURE

```
agents-class-fee-calculator-implementation/
├── app/
│   ├── layout.tsx              # Root layout with i18n
│   ├── page.tsx                # Home page
│   └── globals.css             # Global Tailwind styles
├── components/
│   ├── Calculator.tsx          # Main calculator logic
│   ├── StepForm.tsx            # 5-step form component
│   ├── FeeBreakdown.tsx        # Results display
│   ├── LanguageToggle.tsx      # Language selector
│   └── WhatsAppShare.tsx       # WhatsApp integration
├── lib/
│   ├── i18n.ts                 # i18n context & hook
│   ├── translations.ts         # EN/SI translations
│   └── calculations.ts         # Fee calculation logic
├── public/                      # Static assets
├── package.json                # Dependencies
├── next.config.js              # Next.js config
├── tailwind.config.js          # Tailwind config
├── tsconfig.json               # TypeScript config
├── README.md                   # Project README
└── SETUP.md                    # This file
```

---

## 🚀 BUILD & DEPLOYMENT

### Development Build
```cmd
npm run dev
```
- Starts dev server at http://localhost:3000
- Hot-reload enabled

### Production Build
```cmd
npm run build
npm start
```
- Optimized for production
- Minified and compiled

### Linting
```cmd
npm run lint
```
- Checks code quality
- Fixes basic issues

---

## 🌐 TRANSLATIONS

### Available Languages
1. **Sinhala (සිංහල)** - Default
2. **English**

### Adding New Translations
Edit `lib/translations.ts`:
```typescript
export const translations = {
  en: { /* English strings */ },
  si: { /* Sinhala strings */ }
}
```

All UI text automatically updates when language changes.

---

## 🐛 TROUBLESHOOTING

### Issue: Port 3000 already in use
```cmd
npm run dev -- -p 3001
```
Use port 3001 instead

### Issue: npm install fails
```cmd
npm install --legacy-peer-deps --force
```

### Issue: TypeScript errors
```cmd
npm run build
```
Check build output for specific errors

### Issue: Components not rendering
- Ensure all files are in correct directories
- Check that `I18nProvider` wraps the app in layout.tsx
- Verify imports use `@/` path alias

---

## 📞 SUPPORT

**Contact Number**: 0787124080 (WhatsApp)

For technical issues with the calculator:
1. Check browser console (F12) for errors
2. Verify all files are in place
3. Ensure npm dependencies are installed
4. Try clearing browser cache

---

## ✅ VERIFICATION CHECKLIST

- [ ] Directories created (app, components, lib, public)
- [ ] Files moved to correct locations
- [ ] app/layout.tsx, page.tsx, globals.css created
- [ ] npm install completed successfully
- [ ] npm run dev starts without errors
- [ ] http://localhost:3000 loads in browser
- [ ] Language toggle works (English/Sinhala)
- [ ] All 5 steps display correctly
- [ ] Fee calculations show expected results
- [ ] WhatsApp share button opens message

---

## 📝 NOTES

- **Default Language**: Sinhala (සිංහල)
- **Default Frequency**: 1x per week
- **Default Grade**: O/L
- **WhatsApp Contact**: 0787124080
- **Rounding**: All fees rounded to nearest Rs. 500
- **Sessions/Month**: Calculated as frequency × 4.33 (avg weeks per month)

---

**Last Updated**: 2026-05-14  
**Version**: 1.0.0
