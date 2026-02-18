#!/bin/bash

# ChromeOS VM Manager - Linux Launcher
# Simply run this file to start the application

echo ""
echo "============================================"
echo "   ChromeOS VM Manager - Starting"
echo "============================================"
echo ""

# Check if the executable exists
if [ ! -f "./chromeos-vm-manager-linux" ]; then
    echo "Error: chromeos-vm-manager-linux not found!"
    echo "Please ensure you have extracted all files correctly."
    exit 1
fi

# Make the executable runnable
chmod +x ./chromeos-vm-manager-linux

# Start the application in the background
./chromeos-vm-manager-linux &
SERVER_PID=$!

# Wait a moment for the server to start
sleep 3

# Function to open browser based on available tools
open_browser() {
    if command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:5000"
    elif command -v gnome-open &> /dev/null; then
        gnome-open "http://localhost:5000"
    elif command -v kde-open &> /dev/null; then
        kde-open "http://localhost:5000"
    else
        echo "Could not auto-open browser. Visit: http://localhost:5000"
    fi
}

# Attempt to open browser
echo "Opening application in browser..."
open_browser

echo ""
echo "Application is running!"
echo "URL: http://localhost:5000"
echo ""
echo "To stop the application, press Ctrl+C"
echo ""

# Wait for the server process
wait $SERVER_PID
