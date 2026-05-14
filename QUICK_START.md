# ⚡ QUICK START (5 MINUTES)

## What You Got
A complete Next.js bilingual class fee calculator with WhatsApp integration.

## What It Does
1. Students select grade, location, method, frequency, student count
2. System calculates fees using mathematical formula
3. Shows monthly & per-session fees with breakdown
4. Share via WhatsApp button

## Setup (Choose One)

### 🟢 EASIEST: PowerShell Script
```powershell
.\setup-project.ps1
npm run dev
# Open http://localhost:3000
```

### 🟡 MANUAL: Windows Command Prompt
```cmd
mkdir app components lib public
move lib-i18n.ts lib\i18n.ts
move lib-translations.ts lib\translations.ts
move lib-calculations.ts lib\calculations.ts
move components-*.tsx components\

npm install --legacy-peer-deps
npm run dev
```

### 🔵 DETAILED: Step-by-Step
👉 See `COMPLETE_SETUP_GUIDE.md` for file-by-file creation

## Create App Files (Required)
You need to create 3 files in the `app/` directory:
- `app/layout.tsx` - Root layout
- `app/page.tsx` - Home page
- `app/globals.css` - Global styles

See `COMPLETE_SETUP_GUIDE.md` for exact contents.

## Key Features
✅ Sinhala (default) + English
✅ 5-step wizard form
✅ Real-time fee calculation
✅ WhatsApp sharing (0787124080)
✅ Professional animations
✅ Mobile responsive

## Fee Formula
```
Base Fee (by grade)
+ Distance Surcharge (if physical: distance × 30 Rs/km × sessions/month)
+ Frequency Surcharge (+10% per extra session)
- Group Discount (-5% for 2, -10% for 3+)
+ Fuel Charge (if physical: distance × 30 Rs/km × sessions/month)
→ Rounded to Rs. 500
```

## Fees By Grade
- Grade 6-9: Rs. 2,500
- O/L: Rs. 3,500
- A/L: Rs. 5,000

## Commands
```bash
npm run dev    # Start development (http://localhost:3000)
npm run build  # Production build
npm start      # Run production
npm run lint   # Check code
```

## Files Structure After Setup
```
app/
├── layout.tsx
├── page.tsx
└── globals.css
components/
├── Calculator.tsx
├── StepForm.tsx
├── FeeBreakdown.tsx
├── LanguageToggle.tsx
└── WhatsAppShare.tsx
lib/
├── i18n.ts
├── translations.ts
└── calculations.ts
```

## Contact
WhatsApp: 0787124080

## Documentation
- `README.md` - Overview (5 min read)
- `COMPLETE_SETUP_GUIDE.md` - Detailed setup (15 min)
- `PROJECT_SUMMARY.md` - Features & customization
- `INDEX.md` - File reference

## Troubleshooting
**npm install fails?**
```cmd
npm install --legacy-peer-deps --force
```

**Port 3000 in use?**
```cmd
npm run dev -- -p 3001
```

## Next Steps
1. Read `README.md`
2. Run setup (PowerShell script recommended)
3. npm install
4. npm run dev
5. Open http://localhost:3000
6. Test with sample data
7. Deploy to Vercel (free)

---
**Version**: 1.0.0 | **Status**: ✅ Ready | **Type**: Next.js + TypeScript + Tailwind CSS
