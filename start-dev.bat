@echo off
echo Starting Student Management System...
echo.

echo Starting Backend Server...
start cmd /k "cd backend && npm run dev"

echo Waiting 3 seconds...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo.
echo ================================
echo   Student Management System
echo ================================
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:4000
echo.
echo Default Login:
echo Email: admin@example.com
echo Password: admin123
echo.
echo Press any key to exit...
pause > nul
