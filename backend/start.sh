#!/bin/bash

# Start script for Creator Studio Co-Pilot Backend

echo "Starting Creator Studio Co-Pilot Backend..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Warning: .env file not found. Please create one from .env.example"
    echo "Make sure to set GEMINI_API_KEY"
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Start the server
echo "Starting server on http://localhost:8000"
uvicorn main:app --reload --host 0.0.0.0 --port 8000

