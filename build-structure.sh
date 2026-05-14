#!/bin/bash
# Build script to organize project files

set -e

echo "🔨 Building Next.js project structure..."

# Create directories
mkdir -p app components lib public

# Move and rename library files
mv lib-i18n.ts lib/i18n.ts
mv lib-translations.ts lib/translations.ts
mv lib-calculations.ts lib/calculations.ts

# Move component files
mv components-*.tsx components/

# Create app files
cat > app/layout.tsx << 'EOF'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Class Fee Calculator',
  description: 'Calculate your tuition class fees easily - Bilingual (Sinhala/English)',
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
EOF

cat > app/page.tsx << 'EOF'
'use client'

import { useState } from 'react'
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
EOF

cp app/globals.css app/globals.css.bak 2>/dev/null || true

cat > app/globals.css << 'EOF'
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
EOF

echo "✅ Project structure created successfully!"
echo "📦 Next step: npm install --legacy-peer-deps"
