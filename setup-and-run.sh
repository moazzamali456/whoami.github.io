#!/bin/bash

echo "========================================"
echo " Matrix Student Management System"
echo " Local Setup and Run Script"
echo "========================================"
echo ""

echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please download and install Node.js from: https://nodejs.org/"
    echo "Then run this script again."
    exit 1
fi

echo "Node.js found! Version:"
node --version

echo ""
echo "Installing dependencies..."
cd frontend

if ! npm install; then
    echo ""
    echo "ERROR: Failed to install dependencies!"
    echo "Please check your internet connection and try again."
    exit 1
fi

echo ""
echo "========================================"
echo " Starting Matrix Student Management System"
echo "========================================"
echo ""
echo "Your Matrix website will open at: http://localhost:5173"
echo ""
echo "To stop the server, press Ctrl+C in this terminal"
echo ""

npm run dev
