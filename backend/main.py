from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List
import os
from datetime import datetime
import uuid
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from services.gemini_service import GeminiService
from services.content_service import ContentService

app = FastAPI(
    title="Creator Studio Co-Pilot API",
    description="Backend API for Creator Studio Co-Pilot using Gemini AI",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:8080", "http://127.0.0.1:5173", "http://127.0.0.1:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services (lazy initialization to handle errors gracefully)
gemini_service = None
content_service = None

def get_gemini_service():
    global gemini_service
    if gemini_service is None:
        try:
            gemini_service = GeminiService()
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to initialize Gemini service: {str(e)}. Please check your GEMINI_API_KEY in .env file."
            )
    return gemini_service

def get_content_service():
    global content_service
    if content_service is None:
        content_service = ContentService()
    return content_service

# Request Models
class ScriptRequest(BaseModel):
    topic: str
    tone: str = "professional"
    duration: str = "5"
    keywords: Optional[str] = None

class ImageRequest(BaseModel):
    prompt: str
    style: str = "realistic"
    size: int = 1024

class HashtagRequest(BaseModel):
    topic: str
    platform: Optional[str] = "general"

class PromptRequest(BaseModel):
    prompt: str

class ContentItem(BaseModel):
    id: str
    type: str
    title: str
    content: str
    created_at: str
    metadata: Optional[dict] = None

# Health check endpoint
@app.get("/")
async def root():
    return {"message": "Creator Studio Co-Pilot API is running", "status": "healthy"}

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Script Generation Endpoint
@app.post("/api/scripts/generate")
async def generate_script(request: ScriptRequest):
    try:
        service = get_gemini_service()
        content_svc = get_content_service()
        script = service.generate_script(
            topic=request.topic,
            tone=request.tone,
            duration=request.duration,
            keywords=request.keywords
        )
        
        # Save to content service
        content_id = content_svc.save_content(
            content_type="script",
            title=request.topic,
            content=script,
            metadata={
                "tone": request.tone,
                "duration": request.duration,
                "keywords": request.keywords
            }
        )
        
        return {
            "success": True,
            "script": script,
            "content_id": content_id,
            "metadata": {
                "tone": request.tone,
                "duration": request.duration,
                "topic": request.topic
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating script: {str(e)}")

# Image Generation Endpoint
@app.post("/api/images/generate")
async def generate_image(request: ImageRequest):
    try:
        service = get_gemini_service()
        content_svc = get_content_service()
        image_data = service.generate_image(
            prompt=request.prompt,
            style=request.style,
            size=request.size
        )
        
        # Save to content service
        content_id = content_svc.save_content(
            content_type="image",
            title=request.prompt[:50],
            content=image_data.get("image_url", ""),
            metadata={
                "style": request.style,
                "size": request.size,
                "prompt": request.prompt
            }
        )
        
        return {
            "success": True,
            "image_url": image_data.get("image_url"),
            "image_base64": image_data.get("image_base64"),
            "content_id": content_id,
            "metadata": {
                "style": request.style,
                "size": request.size,
                "prompt": request.prompt
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating image: {str(e)}")

# Hashtag Generation Endpoint
@app.post("/api/hashtags/generate")
async def generate_hashtags(request: HashtagRequest):
    try:
        service = get_gemini_service()
        hashtags = service.generate_hashtags(
            topic=request.topic,
            platform=request.platform
        )
        
        return {
            "success": True,
            "hashtags": hashtags,
            "count": len(hashtags)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating hashtags: {str(e)}")

# General Prompt Processing (for Dashboard)
@app.post("/api/prompt/process")
async def process_prompt(request: PromptRequest):
    try:
        service = get_gemini_service()
        suggestions = service.process_prompt(request.prompt)
        
        return {
            "success": True,
            "suggestions": suggestions,
            "prompt": request.prompt
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing prompt: {str(e)}")

# Content Gallery Endpoints
@app.get("/api/gallery")
async def get_gallery(content_type: Optional[str] = None):
    try:
        content_svc = get_content_service()
        items = content_svc.get_all_content(content_type)
        return {
            "success": True,
            "items": items,
            "count": len(items)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching gallery: {str(e)}")

@app.get("/api/gallery/{content_id}")
async def get_content(content_id: str):
    try:
        content_svc = get_content_service()
        item = content_svc.get_content(content_id)
        if not item:
            raise HTTPException(status_code=404, detail="Content not found")
        return {
            "success": True,
            "item": item
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching content: {str(e)}")

@app.delete("/api/gallery/{content_id}")
async def delete_content(content_id: str):
    try:
        content_svc = get_content_service()
        success = content_svc.delete_content(content_id)
        if not success:
            raise HTTPException(status_code=404, detail="Content not found")
        return {
            "success": True,
            "message": "Content deleted successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting content: {str(e)}")

# Video Editing Suggestions
@app.post("/api/video/suggestions")
async def get_video_suggestions(request: PromptRequest):
    try:
        service = get_gemini_service()
        suggestions = service.get_video_editing_suggestions(request.prompt)
        return {
            "success": True,
            "suggestions": suggestions
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting video suggestions: {str(e)}")

# Error handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"success": False, "error": "Internal server error", "detail": str(exc)}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

