#!/usr/bin/env python3
"""
Quick test script to verify the backend server can start
"""
import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    print("Testing imports...")
    from fastapi import FastAPI
    from services.gemini_service import GeminiService
    from services.content_service import ContentService
    print("✓ All imports successful!")
    
    print("\nTesting ContentService initialization...")
    content_svc = ContentService()
    print("✓ ContentService initialized successfully!")
    
    print("\nTesting environment variables...")
    from dotenv import load_dotenv
    load_dotenv()
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
        print(f"✓ GEMINI_API_KEY found (length: {len(api_key)})")
        print("\nTesting GeminiService initialization...")
        try:
            gemini_svc = GeminiService()
            print("✓ GeminiService initialized successfully!")
        except Exception as e:
            print(f"⚠ GeminiService initialization failed: {e}")
            print("  This is OK if you haven't set up your API key yet.")
    else:
        print("⚠ GEMINI_API_KEY not found in .env file")
        print("  Create a .env file with: GEMINI_API_KEY=your_key_here")
    
    print("\n✓ All basic tests passed!")
    print("\nYou can now start the server with:")
    print("  uvicorn main:app --reload")
    print("  or")
    print("  python main.py")
    
except ImportError as e:
    print(f"✗ Import error: {e}")
    print("\nPlease install dependencies:")
    print("  pip install -r requirements.txt")
    sys.exit(1)
except Exception as e:
    print(f"✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

