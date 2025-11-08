# Backend for Creator Studio

This folder contains a minimal TypeScript + Express backend scaffold.

Quick start (PowerShell):

1. Copy .env.example to .env and fill values.

2. Install deps and run in dev mode:

```powershell
cd backend
npm install
npm run dev
```

Available endpoints:
- GET /health — returns { status: 'ok' }
- POST /api/generate — stubbed endpoint that requires a `prompt` in JSON body and reads `SECRET_API_KEY` from the env.
