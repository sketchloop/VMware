#!/bin/bash

# ChromeOS VM Manager - macOS Launcher
# Simply run this file to start the application

echo ""
echo "============================================"
echo "   ChromeOS VM Manager - Starting"
echo "============================================"
echo ""

# Check if the executable exists
if [ ! -f "./chromeos-vm-manager-mac" ]; then
    echo "Error: chromeos-vm-manager-mac not found!"
    echo "Please ensure you have extracted all files correctly."
    exit 1
fi

# Make the executable runnable
chmod +x ./chromeos-vm-manager-mac

# Start the application in the background
./chromeos-vm-manager-mac &
SERVER_PID=$!

# Wait a moment for the server to start
sleep 3

# Open the browser
echo "Opening application in browser..."
open "http://localhost:5000"

echo ""
echo "Application is running!"
echo "URL: http://localhost:5000"
echo ""
echo "To stop the application, press Ctrl+C"
echo ""

# Wait for the server process
wait $SERVER_PID
