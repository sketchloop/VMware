@echo off
REM ChromeOS VM Manager - Windows Launcher
REM Simply run this file to start the application

setlocal enabledelayedexpansion

REM Check if the executable exists
if not exist "chromeos-vm-manager-win.exe" (
    echo Error: chromeos-vm-manager-win.exe not found!
    echo Please ensure you have extracted all files correctly.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   ChromeOS VM Manager - Starting
echo ============================================
echo.

REM Start the application in a new window
start "ChromeOS VM Manager" chromeos-vm-manager-win.exe

REM Wait a moment for the server to start
timeout /t 3 /nobreak

REM Attempt to open the browser
echo Opening application in browser...
start http://localhost:5000

echo.
echo Application is starting...
echo If the browser doesn't open automatically, go to: http://localhost:5000
echo.
echo Press Ctrl+C in this window to stop the application.
pause
