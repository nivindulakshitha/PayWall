@echo off
REM Create directory structure
mkdir app components lib public\locales 2>nul

echo Creating app/layout.tsx...
(
echo import type { Metadata } from 'next'
echo import { Inter } from 'next/font/google'
echo import './globals.css'
echo.
echo const inter = Inter({ subsets: ['latin'] })
echo.
echo export const metadata: Metadata = {
echo   title: 'Class Fee Calculator',
echo   description: 'Calculate your tuition class fees easily',
echo }
echo.
echo export default function RootLayout(^{
echo   children,
echo }: ^{
echo   children: React.ReactNode
echo }) {
echo   return (
echo     ^<html lang="en"^>
echo       ^<body className={inter.className}^>{children}^</body^>
echo     ^</html^>
echo   )
echo }
) > app\layout.tsx

echo Creating app/globals.css...
(
echo @tailwind base;
echo @tailwind components;
echo @tailwind utilities;
echo.
echo * {
echo   margin: 0;
echo   padding: 0;
echo   box-sizing: border-box;
echo }
echo.
echo html {
echo   scroll-behavior: smooth;
echo }
echo.
echo body {
echo   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
echo     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
echo     sans-serif;
echo   -webkit-font-smoothing: antialiased;
echo   -moz-osx-font-smoothing: grayscale;
echo   background: linear-gradient^(135deg, #f5f7fa 0%%, #c3cfe2 100%%^);
echo   min-height: 100vh;
echo }
) > app\globals.css

echo Setup complete! Now run: npm install --legacy-peer-deps
