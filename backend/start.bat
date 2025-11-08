@echo off
REM Start script for Creator Studio Co-Pilot Backend (Windows)

echo Starting Creator Studio Co-Pilot Backend...

REM Check if .env file exists
if not exist .env (
    echo Warning: .env file not found. Please create one from .env.example
    echo Make sure to set GEMINI_API_KEY
)

REM Check if virtual environment exists
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Start the server
echo Starting server on http://localhost:8000
uvicorn main:app --reload --host 0.0.0.0 --port 8000

pause

