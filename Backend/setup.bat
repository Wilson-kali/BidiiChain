@echo off
echo ========================================
echo ImpactChain Backend - Automated Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/6] Node.js detected: 
node --version
echo.

REM Check if MySQL is running
echo [2/6] Checking MySQL service...
sc query MySQL80 | find "RUNNING" >nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] MySQL service not running. Attempting to start...
    net start MySQL80
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Could not start MySQL. Please start it manually.
        pause
        exit /b 1
    )
)
echo MySQL is running!
echo.

REM Install dependencies
echo [3/6] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)
echo Dependencies installed successfully!
echo.

REM Check if .env exists
echo [4/6] Checking environment configuration...
if not exist .env (
    echo [WARNING] .env file not found. Creating from .env.example...
    copy .env.example .env
    echo.
    echo [ACTION REQUIRED] Please edit .env file with your MySQL password!
    echo Press any key to open .env in notepad...
    pause >nul
    notepad .env
)
echo.

REM Prompt for database creation
echo [5/6] Database setup...
echo.
echo IMPORTANT: Make sure you have created the database in MySQL:
echo.
echo   mysql -u root -p
echo   CREATE DATABASE impactchain_dev;
echo   exit;
echo.
echo Have you created the database? (Y/N)
set /p dbcreated=
if /i "%dbcreated%" NEQ "Y" (
    echo.
    echo Please create the database first, then run this script again.
    pause
    exit /b 0
)
echo.

REM Run migrations
echo [6/6] Running database migrations...
call npm run db:migrate
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Migration failed! Check your database credentials in .env
    pause
    exit /b 1
)
echo Migrations completed successfully!
echo.

REM Ask about seeding
echo Would you like to seed demo data? (Y/N)
set /p seeddata=
if /i "%seeddata%"=="Y" (
    call npm run db:seed
    echo Demo data seeded!
)
echo.

echo ========================================
echo Setup Complete! 
echo ========================================
echo.
echo Your backend is ready to run!
echo.
echo To start the server:
echo   npm run dev
echo.
echo Server will run at: http://localhost:4000
echo.
echo Documentation:
echo   - QUICK_START.md - Quick reference
echo   - API_DOCUMENTATION.md - API endpoints
echo   - TROUBLESHOOTING.md - Common issues
echo.
pause
