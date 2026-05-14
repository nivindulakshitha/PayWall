# 🎓 Class Fee Calculator

A bilingual (Sinhala/English) fee calculator application for tuition classes built with Next.js, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Bilingual UI** - Seamless toggle between Sinhala and English
- **Step-by-Step Wizard** - Intuitive 5-step form for easy data entry
- **Real-Time Calculation** - Instant fee calculations with detailed breakdown
- **Fee Breakdown** - Shows monthly fee + per-session fee
- **WhatsApp Integration** - Share calculated fees directly via WhatsApp
- **Professional Design** - Modern, educational look with smooth animations
- **Responsive** - Works on desktop, tablet, and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone/Navigate to project**
   ```bash
   cd agents-class-fee-calculator-implementation
   ```

2. **Create directory structure** (Windows Command Prompt)
   ```bash
   mkdir app components lib public
   ```

3. **Organize files** (Move the component/lib files to their directories)
   ```bash
   move lib-i18n.ts lib\i18n.ts
   move lib-translations.ts lib\translations.ts
   move lib-calculations.ts lib\calculations.ts
   move components-*.tsx components\
   ```

4. **Create app files** (`app/layout.tsx`, `app/page.tsx`, `app/globals.css`)
   - See the SETUP.md for detailed file contents

5. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📊 Fee Calculation Formula

```
Monthly Fee = Base Fee 
            + Distance Surcharge (physical only)
            + Frequency Surcharge (+10% per extra session)
            - Group Discount (-5% for 2 students, -10% for 3+)
            + Fuel Charge (physical only)
```

### Base Fees
- Grade 6-9: Rs. 2,500
- O/L (Grade 10-11): Rs. 3,500
- A/L (Grade 12-13): Rs. 5,000

### Adjustments
- **Distance**: +8 km constant (user distance + 8)
- **Distance Charge**: Rs. 30/km per session
- **Frequency**: +10% surcharge per extra session
- **Group Discount**: -5% for 2 students, -10% for 3+
- **Fuel Charge**: Rs. 30/km per session (physical only)
- **Online Method**: Ignores distance surcharge

### Rounding
- All fees rounded to nearest Rs. 500

## 🗂 Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with i18n provider
│   ├── page.tsx                # Home page
│   └── globals.css             # Global Tailwind styles
├── components/
│   ├── Calculator.tsx          # Main calculator with step logic
│   ├── StepForm.tsx            # Step-by-step form component
│   ├── FeeBreakdown.tsx        # Fee display with breakdown
│   ├── LanguageToggle.tsx      # Language selector button
│   └── WhatsAppShare.tsx       # WhatsApp share functionality
├── lib/
│   ├── i18n.ts                 # i18n hook and provider
│   ├── translations.ts         # Translation data (EN/SI)
│   └── calculations.ts         # Fee calculation logic
├── package.json                # Dependencies
├── next.config.js              # Next.js config
├── tailwind.config.js          # Tailwind CSS config
└── tsconfig.json               # TypeScript config
```

## 🎯 How It Works

### Step 1: Grade Selection
- Choose between Grade 6-9, O/L (10-11), or A/L (12-13)
- Each grade has a different base fee

### Step 2: Location
- Enter distance from Wariyapola to home (in km)
- System adds 8 km constant
- Only applicable for physical classes

### Step 3: Class Method
- **Online**: No distance surcharge
- **Physical**: Includes distance + fuel charges

### Step 4: Session Frequency
- Select 1x, 2x, or 3x per week
- Extra sessions have +10% surcharge each

### Step 5: Number of Students
- 1 student: No discount
- 2 students: -5% discount
- 3+ students: -10% discount

### Results
- Shows monthly fee (rounded to nearest 500)
- Shows per-session fee
- Detailed breakdown of all charges
- Share button to send via WhatsApp

## 🌐 Language Support

The app supports both **Sinhala** (සිංහල) and **English**:
- Default language: **Sinhala**
- Toggle button in top-right corner
- All UI text, labels, and messages are translated

## 📱 WhatsApp Integration

When sharing via WhatsApp:
- Message includes all selected parameters
- Shows monthly and per-session fees
- Displays fee breakdown
- Recipient can contact at 0787124080

## 🛠 Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

## 📦 Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Context** - State management (i18n)

## ✅ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Contact

For questions about the calculator, contact: **0787124080** (WhatsApp)

## 📄 License

MIT License - See LICENSE file

---

**Version**: 1.0.0  
**Last Updated**: 2026-05-14
