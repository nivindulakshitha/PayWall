#!/bin/bash

cd "d:\Progressing\GitHub\2026-05-14\PayWall.worktrees\agents-class-fee-calculator-implementation"

echo "Creating directories..."
mkdir -p app
mkdir -p components
mkdir -p lib

echo "Moving files to lib directory..."
[ -f lib-i18n.ts ] && mv lib-i18n.ts lib/i18n.ts
[ -f lib-translations.ts ] && mv lib-translations.ts lib/translations.ts
[ -f lib-calculations.ts ] && mv lib-calculations.ts lib/calculations.ts

echo "Moving files to components directory..."
[ -f components-LanguageToggle.tsx ] && mv components-LanguageToggle.tsx components/LanguageToggle.tsx
[ -f components-FeeBreakdown.tsx ] && mv components-FeeBreakdown.tsx components/FeeBreakdown.tsx
[ -f components-WhatsAppShare.tsx ] && mv components-WhatsAppShare.tsx components/WhatsAppShare.tsx
[ -f components-Calculator.tsx ] && mv components-Calculator.tsx components/Calculator.tsx
[ -f components-StepForm.tsx ] && mv components-StepForm.tsx components/StepForm.tsx

echo "Listing directories..."
ls -la

echo "Done!"
