#!/bin/bash

echo "🚀 Starting Student Management System..."
echo

echo "📦 Installing dependencies..."
cd backend && npm install
cd ../frontend && npm install
cd ..

echo "🗄️  Setting up database and seeding admin user..."
cd backend
npm run seed
cd ..

echo "🖥️  Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!

echo "⏳ Waiting for backend to start..."
sleep 5

echo "🌐 Starting Frontend Server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo
echo "================================"
echo "   Student Management System   "
echo "================================"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:4000"
echo
echo "Default Login:"
echo "Email: admin@example.com"
echo "Password: admin123"
echo
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
