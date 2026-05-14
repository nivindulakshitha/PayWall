@echo off
setlocal enabledelayedexpansion

cd /d "d:\Progressing\GitHub\2026-05-14\PayWall.worktrees\agents-class-fee-calculator-implementation"

echo Creating directories...
if not exist app mkdir app
if not exist components mkdir components
if not exist lib mkdir lib

echo Moving files to lib directory...
if exist lib-i18n.ts move lib-i18n.ts lib\i18n.ts
if exist lib-translations.ts move lib-translations.ts lib\translations.ts
if exist lib-calculations.ts move lib-calculations.ts lib\calculations.ts

echo Moving files to components directory...
if exist components-LanguageToggle.tsx move components-LanguageToggle.tsx components\LanguageToggle.tsx
if exist components-FeeBreakdown.tsx move components-FeeBreakdown.tsx components\FeeBreakdown.tsx
if exist components-WhatsAppShare.tsx move components-WhatsAppShare.tsx components\WhatsAppShare.tsx
if exist components-Calculator.tsx move components-Calculator.tsx components\Calculator.tsx
if exist components-StepForm.tsx move components-StepForm.tsx components\StepForm.tsx

echo Listing final structure...
tree /a /f

echo Done!
