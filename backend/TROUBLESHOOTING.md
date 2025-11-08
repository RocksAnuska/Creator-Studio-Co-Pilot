# Troubleshooting Guide

## Common Issues and Solutions

### 1. "GEMINI_API_KEY environment variable is not set"

**Problem**: The backend can't find your Gemini API key.

**Solution**:
1. Create a `.env` file in the `backend` directory
2. Add your API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Get your API key from: https://makersuite.google.com/app/apikey

### 2. "ModuleNotFoundError: No module named 'fastapi'"

**Problem**: Dependencies are not installed.

**Solution**:
```bash
cd Creator-Studio-Co-Pilot/backend
pip install -r requirements.txt
```

### 3. "Port 8000 already in use"

**Problem**: Another application is using port 8000.

**Solution**:
```bash
# Use a different port
uvicorn main:app --reload --port 8001
```

Or kill the process using port 8000:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill
```

### 4. "Failed to initialize Gemini service"

**Possible causes**:
- API key is incorrect
- No internet connection
- API key is expired or revoked

**Solution**:
1. Verify your API key at https://makersuite.google.com/app/apikey
2. Check your internet connection
3. Make sure the API key is in the `.env` file (not `.env.example`)

### 5. CORS Errors in Browser

**Problem**: Frontend can't connect to backend.

**Solution**:
1. Make sure backend is running on port 8000
2. Check that your frontend URL is in the CORS origins list in `main.py`
3. Verify frontend is using the correct API URL

### 6. "NameError: name 'content_service' is not defined"

**Problem**: This was a bug that has been fixed. If you still see this:
- Make sure you have the latest version of `main.py`
- The variable should be `content_svc` not `content_service`

### 7. Server Starts But Endpoints Don't Work

**Check**:
1. Is the server actually running? Check terminal output
2. Test health endpoint: http://localhost:8000/health
3. Check API docs: http://localhost:8000/docs
4. Look for error messages in the terminal

### 8. "Empty response from Gemini API"

**Possible causes**:
- API rate limit exceeded
- API key doesn't have access to the model
- Network issues

**Solution**:
1. Wait a few minutes and try again
2. Check your API quota at Google AI Studio
3. Verify your API key has access to Gemini models

## Testing the Backend

Run the test script:
```bash
python test_server.py
```

This will check:
- ✓ All imports work
- ✓ Services can be initialized
- ✓ Environment variables are loaded

## Manual Testing

### Test Health Endpoint
```bash
curl http://localhost:8000/health
```

### Test Script Generation (requires API key)
```bash
curl -X POST "http://localhost:8000/api/scripts/generate" \
  -H "Content-Type: application/json" \
  -d '{"topic": "Test topic", "tone": "professional", "duration": "5"}'
```

## Getting Help

If none of these solutions work:

1. Check the terminal output for specific error messages
2. Verify all files are in the correct locations
3. Make sure you're in the `backend` directory when running commands
4. Check Python version: `python --version` (should be 3.8+)

## Quick Verification Checklist

- [ ] Python 3.8+ installed
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file created with `GEMINI_API_KEY`
- [ ] Server starts without errors
- [ ] Health endpoint works: http://localhost:8000/health
- [ ] API docs accessible: http://localhost:8000/docs

