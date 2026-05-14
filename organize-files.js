const fs = require('fs');
const path = require('path');

const baseDir = 'd:\\Progressing\\GitHub\\2026-05-14\\PayWall.worktrees\\agents-class-fee-calculator-implementation';

// Create directories
const dirs = ['app', 'components', 'lib'];
dirs.forEach(dir => {
  const dirPath = path.join(baseDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
});

// Define files to move
const fileMoves = [
  { from: 'lib-i18n.ts', to: 'lib/i18n.ts' },
  { from: 'lib-translations.ts', to: 'lib/translations.ts' },
  { from: 'lib-calculations.ts', to: 'lib/calculations.ts' },
  { from: 'components-LanguageToggle.tsx', to: 'components/LanguageToggle.tsx' },
  { from: 'components-FeeBreakdown.tsx', to: 'components/FeeBreakdown.tsx' },
  { from: 'components-WhatsAppShare.tsx', to: 'components/WhatsAppShare.tsx' },
  { from: 'components-Calculator.tsx', to: 'components/Calculator.tsx' },
  { from: 'components-StepForm.tsx', to: 'components/StepForm.tsx' },
];

// Move files
fileMoves.forEach(({ from, to }) => {
  const fromPath = path.join(baseDir, from);
  const toPath = path.join(baseDir, to);
  
  if (fs.existsSync(fromPath)) {
    fs.renameSync(fromPath, toPath);
    console.log(`Moved: ${from} -> ${to}`);
  } else {
    console.log(`File not found: ${from}`);
  }
});

console.log('Done!');
