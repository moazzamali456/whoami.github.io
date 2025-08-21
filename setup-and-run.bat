@echo off
echo ========================================
echo  Matrix Student Management System
echo  Local Setup and Run Script
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

echo Node.js found! Version:
node --version

echo.
echo Installing dependencies...
cd frontend
npm install

if errorlevel 1 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo Try running this script as administrator.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Starting Matrix Student Management System
echo ========================================
echo.
echo Your Matrix website will open at: http://localhost:5173
echo.
echo To stop the server, press Ctrl+C in this window
echo.

npm run dev

pause
