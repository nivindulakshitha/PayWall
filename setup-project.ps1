# setup-project.ps1
# PowerShell setup script for Class Fee Calculator

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Class Fee Calculator - Setup Script" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "✓ Checking Node.js installation..." -ForegroundColor Yellow
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "✗ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Node.js found: $(node --version)" -ForegroundColor Green

# Check npm
Write-Host "✓ Checking npm..." -ForegroundColor Yellow
$npmVersion = npm --version
Write-Host "✓ npm version: $npmVersion" -ForegroundColor Green
Write-Host ""

# Create directories
Write-Host "📁 Creating directory structure..." -ForegroundColor Yellow
@("app", "components", "lib", "public") | ForEach-Object {
    New-Item -ItemType Directory -Path $_ -Force | Out-Null
    Write-Host "  ✓ Created: $_"
}
Write-Host ""

# Move files
Write-Host "📄 Organizing files..." -ForegroundColor Yellow
@(
    @("lib-i18n.ts", "lib\i18n.ts"),
    @("lib-translations.ts", "lib\translations.ts"),
    @("lib-calculations.ts", "lib\calculations.ts"),
    @("components-LanguageToggle.tsx", "components\LanguageToggle.tsx"),
    @("components-FeeBreakdown.tsx", "components\FeeBreakdown.tsx"),
    @("components-WhatsAppShare.tsx", "components\WhatsAppShare.tsx"),
    @("components-Calculator.tsx", "components\Calculator.tsx"),
    @("components-StepForm.tsx", "components\StepForm.tsx")
) | ForEach-Object {
    if (Test-Path $_[0]) {
        Move-Item -Path $_[0] -Destination $_[1] -Force
        Write-Host "  ✓ Moved: $_[0] -> $_[1]"
    }
}
Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray
npm install --legacy-peer-deps

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ npm install failed" -ForegroundColor Red
    Write-Host "Try: npm install --legacy-peer-deps --force" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✓ Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Start dev server: npm run dev" -ForegroundColor Cyan
Write-Host "  2. Open browser: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "For help, see: COMPLETE_SETUP_GUIDE.md" -ForegroundColor Gray
Write-Host ""
