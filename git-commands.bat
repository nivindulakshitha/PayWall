@echo off
cd /d "d:\Progressing\GitHub\2026-05-14\PayWall.worktrees\agents-class-fee-calculator-implementation"
echo === Git Log (20 recent commits) ===
git log --oneline -20
echo.
echo === Git Status ===
git status --short
echo.
echo === Git Config User ===
git config user.name
echo.
echo === Git Config Email ===
git config user.email
