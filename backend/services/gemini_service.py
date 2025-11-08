import google.generativeai as genai
import os
import json
from typing import List, Optional, Dict
import base64
from io import BytesIO
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class GeminiService:
    def __init__(self):
        # Get API key from environment variable
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is not set")
        
        genai.configure(api_key=api_key)
        # Try gemini-1.5-pro first, fallback to gemini-pro
        try:
            self.model = genai.GenerativeModel('gemini-1.5-pro')
        except Exception:
            try:
                self.model = genai.GenerativeModel('gemini-pro')
            except Exception:
                # Fallback to any available model
                self.model = genai.GenerativeModel('gemini-1.5-flash')
        # For image generation, we'll use a different approach since Gemini doesn't directly generate images
        # We'll use Gemini to enhance prompts and suggest image generation strategies
        
    def generate_script(
        self,
        topic: str,
        tone: str = "professional",
        duration: str = "5",
        keywords: Optional[str] = None
    ) -> str:
        """Generate a video script using Gemini AI"""
        
        # Calculate approximate word count based on duration (average 150 words per minute)
        word_count = int(duration) * 150
        
        prompt = f"""Create a {duration}-minute video script about "{topic}".

Requirements:
- Tone: {tone}
- Target duration: {duration} minutes (approximately {word_count} words)
- Structure: Hook, Main Content, Call to Action
- Make it engaging and suitable for video content

{f"Key points to include: {keywords}" if keywords else ""}

Format the script with:
1. A compelling hook (first 15-30 seconds)
2. Main content broken into clear sections
3. A strong call-to-action at the end
4. Natural transitions between sections

Write the script in a conversational style that works well for video narration."""

        try:
            response = self.model.generate_content(prompt)
            if not response or not response.text:
                raise Exception("Empty response from Gemini API")
            return response.text
        except Exception as e:
            raise Exception(f"Failed to generate script: {str(e)}")
    
    def generate_image(
        self,
        prompt: str,
        style: str = "realistic",
        size: int = 1024
    ) -> Dict:
        """Generate image prompt enhancement and suggestions using Gemini"""
        
        # Since Gemini doesn't directly generate images, we'll:
        # 1. Enhance the prompt using Gemini
        # 2. Return an enhanced prompt that can be used with image generation APIs
        # 3. For now, return a placeholder structure
        
        enhancement_prompt = f"""Enhance this image generation prompt to be more detailed and effective:

Original prompt: "{prompt}"
Style: {style}
Size: {size}x{size}

Provide an enhanced, detailed prompt that includes:
- Specific visual details
- Lighting and mood
- Composition and framing
- Color palette
- Technical quality descriptors

Return only the enhanced prompt, nothing else."""

        try:
            response = self.model.generate_content(enhancement_prompt)
            if not response or not response.text:
                raise Exception("Empty response from Gemini API")
            enhanced_prompt = response.text.strip()
            
            # For actual image generation, you would integrate with:
            # - Stable Diffusion API
            # - DALL-E API
            # - Or other image generation services
            
            # Return structure with enhanced prompt
            return {
                "enhanced_prompt": enhanced_prompt,
                "original_prompt": prompt,
                "style": style,
                "size": size,
                "image_url": None,  # Placeholder - integrate with actual image generation API
                "image_base64": None,  # Placeholder
                "note": "Image generation requires integration with an image generation API. Enhanced prompt provided."
            }
        except Exception as e:
            raise Exception(f"Failed to enhance image prompt: {str(e)}")
    
    def generate_hashtags(
        self,
        topic: str,
        platform: str = "general"
    ) -> List[str]:
        """Generate relevant hashtags using Gemini AI"""
        
        prompt = f"""Generate 20 relevant, trending hashtags for content about: "{topic}"

Platform: {platform}

Requirements:
- Mix of popular and niche hashtags
- Include trending and evergreen options
- Relevant to the topic
- Suitable for social media platforms
- Format: Return only the hashtags, one per line, starting with #

Example format:
#hashtag1
#hashtag2
#hashtag3"""

        try:
            response = self.model.generate_content(prompt)
            if not response or not response.text:
                raise Exception("Empty response from Gemini API")
            hashtags = [
                tag.strip() 
                for tag in response.text.split('\n') 
                if tag.strip().startswith('#')
            ]
            # If no hashtags found, try to extract from text
            if not hashtags:
                # Try to find hashtags without # prefix
                lines = [line.strip() for line in response.text.split('\n') if line.strip()]
                hashtags = [f"#{line.replace('#', '')}" for line in lines[:20] if line]
            # Limit to 20 hashtags
            return hashtags[:20] if hashtags else [f"#{topic.replace(' ', '')}", f"#{topic.replace(' ', '').lower()}"]
        except Exception as e:
            raise Exception(f"Failed to generate hashtags: {str(e)}")
    
    def process_prompt(self, prompt: str) -> Dict:
        """Process a general prompt and provide content suggestions"""
        
        analysis_prompt = f"""Analyze this content creation prompt and provide suggestions:

"{prompt}"

Provide:
1. Suggested content type (script, image, video, etc.)
2. Key themes and topics to cover
3. Recommended tone and style
4. Content structure suggestions
5. Tools that would be most useful

Format as a structured analysis."""

        try:
            response = self.model.generate_content(analysis_prompt)
            if not response or not response.text:
                raise Exception("Empty response from Gemini API")
            return {
                "analysis": response.text,
                "suggested_tools": self._extract_suggested_tools(response.text),
                "recommendations": response.text
            }
        except Exception as e:
            raise Exception(f"Failed to process prompt: {str(e)}")
    
    def get_video_editing_suggestions(self, prompt: str) -> Dict:
        """Get AI-powered video editing suggestions"""
        
        suggestion_prompt = f"""Based on this video content description, provide editing suggestions:

"{prompt}"

Suggest:
1. Recommended editing style
2. Color grading suggestions
3. Music/audio recommendations
4. Text overlay suggestions
5. Transition effects
6. Pacing and rhythm tips

Format as actionable editing recommendations."""

        try:
            response = self.model.generate_content(suggestion_prompt)
            if not response or not response.text:
                raise Exception("Empty response from Gemini API")
            return {
                "suggestions": response.text,
                "editing_style": self._extract_editing_style(response.text),
                "recommendations": response.text
            }
        except Exception as e:
            raise Exception(f"Failed to get video suggestions: {str(e)}")
    
    def _extract_suggested_tools(self, text: str) -> List[str]:
        """Extract suggested tools from analysis text"""
        tools = []
        text_lower = text.lower()
        
        if "script" in text_lower or "writing" in text_lower:
            tools.append("script_writer")
        if "image" in text_lower or "visual" in text_lower or "thumbnail" in text_lower:
            tools.append("image_creator")
        if "video" in text_lower or "editing" in text_lower:
            tools.append("video_editor")
        if "hashtag" in text_lower or "social" in text_lower:
            tools.append("hashtag_generator")
        
        return tools if tools else ["script_writer", "image_creator"]
    
    def _extract_editing_style(self, text: str) -> str:
        """Extract editing style from suggestions"""
        text_lower = text.lower()
        
        if "cinematic" in text_lower:
            return "cinematic"
        elif "vintage" in text_lower or "retro" in text_lower:
            return "vintage"
        elif "dynamic" in text_lower or "energetic" in text_lower:
            return "dynamic"
        else:
            return "professional"

