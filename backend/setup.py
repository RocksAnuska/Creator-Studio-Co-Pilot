#!/usr/bin/env python3
"""
Setup script to help configure the backend
"""
import os
import shutil

def setup_backend():
    print("=" * 50)
    print("Creator Studio Co-Pilot - Backend Setup")
    print("=" * 50)
    
    # Check if .env exists
    env_file = ".env"
    env_example = "env.example.txt"
    
    if os.path.exists(env_file):
        print(f"✓ {env_file} already exists")
        with open(env_file, 'r') as f:
            content = f.read()
            if "GEMINI_API_KEY" in content and "your_gemini_api_key_here" not in content:
                print("✓ GEMINI_API_KEY appears to be set")
            else:
                print("⚠ GEMINI_API_KEY needs to be set in .env file")
    else:
        print(f"✗ {env_file} not found")
        if os.path.exists(env_example):
            print(f"Creating {env_file} from {env_example}...")
            shutil.copy(env_example, env_file)
            print(f"✓ Created {env_file}")
            print("\n⚠ IMPORTANT: Edit .env and add your GEMINI_API_KEY")
            print("   Get your API key from: https://makersuite.google.com/app/apikey")
        else:
            print(f"✗ {env_example} not found either")
            print("Creating new .env file...")
            with open(env_file, 'w') as f:
                f.write("# Gemini API Configuration\n")
                f.write("# Get your API key from: https://makersuite.google.com/app/apikey\n")
                f.write("GEMINI_API_KEY=your_gemini_api_key_here\n")
            print(f"✓ Created {env_file}")
            print("\n⚠ IMPORTANT: Edit .env and add your GEMINI_API_KEY")
    
    # Check data directory
    data_dir = "data"
    if not os.path.exists(data_dir):
        print(f"\nCreating {data_dir} directory...")
        os.makedirs(data_dir)
        print(f"✓ Created {data_dir} directory")
    else:
        print(f"✓ {data_dir} directory exists")
    
    print("\n" + "=" * 50)
    print("Setup Complete!")
    print("=" * 50)
    print("\nNext steps:")
    print("1. Edit .env file and add your GEMINI_API_KEY")
    print("2. Start the server:")
    print("   uvicorn main:app --reload")
    print("   or")
    print("   python main.py")
    print("\n3. Test the API:")
    print("   http://localhost:8000/health")
    print("   http://localhost:8000/docs")

if __name__ == "__main__":
    setup_backend()

