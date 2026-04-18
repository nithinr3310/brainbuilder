#!/bin/bash

echo "🧠 Starting Brain Builders - CBSE Tuition Website"
echo "=================================================="
echo ""

# Check if running on Windows
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    echo "📍 Detected Windows environment"
fi

# Backend startup
echo "🚀 Starting Backend Server..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd brain-builders/backend
npm run dev &
BACKEND_PID=$!

sleep 2

# Check if backend started successfully
if ! lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ Backend failed to start on port 3001"
    exit 1
fi

echo "✅ Backend is running on http://localhost:3001"
echo ""

# Frontend startup
echo "🎨 Starting Frontend Server..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd ../frontend
echo "✅ Frontend ready on http://localhost:8080"
echo ""
echo "📱 Opening browser..."
echo ""

# Open in browser (cross-platform)
if command -v xdg-open > /dev/null; then
    xdg-open "http://localhost:8080"
elif command -v open > /dev/null; then
    open "http://localhost:8080"
elif command -v start > /dev/null; then
    start "http://localhost:8080"
fi

echo "🌐 Frontend: http://localhost:8080"
echo "📡 API: http://localhost:3001"
echo "📊 Contact API: POST http://localhost:3001/api/contact"
echo "⭐ Reviews API: GET http://localhost:3001/api/reviews"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start frontend server
python -m http.server 8080 2>/dev/null || npx serve .

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
