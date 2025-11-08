# Frontend Integration Guide

This guide explains how to integrate the backend API with your existing frontend without modifying existing components.

## Quick Start

1. **Start the Backend Server**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   # or: source venv/bin/activate  # Linux/Mac
   pip install -r requirements.txt
   # Create .env file with your GEMINI_API_KEY
   uvicorn main:app --reload
   ```

2. **Configure Frontend Environment**
   Create a `.env` file in the `Creator-Studio-Co-Pilot` directory:
   ```
   VITE_API_URL=http://localhost:8000
   ```

3. **Use the API Client**
   The API client is already created at `src/lib/api.ts`. Import it in your components:

   ```typescript
   import apiClient from '@/lib/api';
   ```

## Integration Examples

### Script Writer Page

Update `src/pages/ScriptWriter.tsx`:

```typescript
import { useState } from "react";
import { toast } from "sonner";
import apiClient from "@/lib/api";

const ScriptWriter = () => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [duration, setDuration] = useState("5");
  const [keywords, setKeywords] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setLoading(true);
    toast.loading("Generating your script...");

    const response = await apiClient.generateScript({
      topic,
      tone,
      duration,
      keywords: keywords || undefined,
    });

    setLoading(false);

    if (response.success && response.data) {
      setGeneratedScript(response.data.script);
      toast.success("Script generated successfully!");
    } else {
      toast.error(response.error || "Failed to generate script");
    }
  };

  // ... rest of your component
  // In the output section, replace the placeholder with:
  // {generatedScript || "Your generated script will appear here"}
};
```

### Image Creator Page

Update `src/pages/ImageCreator.tsx`:

```typescript
import { useState } from "react";
import { toast } from "sonner";
import apiClient from "@/lib/api";

const ImageCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [size, setSize] = useState([1024]);
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    toast.loading("Generating your image...", {
      description: "This will take a few moments",
    });

    const response = await apiClient.generateImage({
      prompt,
      style,
      size: size[0],
    });

    setLoading(false);

    if (response.success && response.data) {
      // If image_base64 is available, use it
      if (response.data.image_base64) {
        setGeneratedImage(`data:image/png;base64,${response.data.image_base64}`);
      } else if (response.data.image_url) {
        setGeneratedImage(response.data.image_url);
      } else {
        toast.info("Enhanced prompt generated. Image generation requires additional setup.");
        // You can display the enhanced prompt
        console.log("Enhanced prompt:", response.data.enhanced_prompt);
      }
      toast.success("Image generated successfully!");
    } else {
      toast.error(response.error || "Failed to generate image");
    }
  };

  // ... rest of your component
};
```

### Dashboard Prompt Input

Update `src/components/PromptInput.tsx`:

```typescript
import { useState } from "react";
import { toast } from "sonner";
import apiClient from "@/lib/api";

export const PromptInput = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter your idea first!");
      return;
    }

    setLoading(true);
    toast.loading("Processing your idea...", {
      description: "Your AI co-pilot is working on it!",
    });

    const response = await apiClient.processPrompt(prompt);

    setLoading(false);

    if (response.success && response.data) {
      toast.success("Suggestions generated!", {
        description: "Check the recommendations below",
      });
      // You can display suggestions or navigate to appropriate tool
      console.log("Suggestions:", response.data.suggestions);
    } else {
      toast.error(response.error || "Failed to process prompt");
    }

    setPrompt("");
  };

  // ... rest of your component
};
```

### Gallery Page

Update `src/pages/Gallery.tsx` to fetch real content:

```typescript
import { useState, useEffect } from "react";
import apiClient from "@/lib/api";
import { toast } from "sonner";

const Gallery = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    loadContent();
  }, [activeTab]);

  const loadContent = async () => {
    setLoading(true);
    const contentType = activeTab === "all" ? undefined : activeTab;
    const response = await apiClient.getGallery(contentType);

    if (response.success && response.data) {
      setContent(response.data.items);
    } else {
      toast.error("Failed to load gallery");
    }
    setLoading(false);
  };

  const handleDelete = async (contentId: string) => {
    const response = await apiClient.deleteContent(contentId);
    if (response.success) {
      toast.success("Content deleted");
      loadContent();
    } else {
      toast.error("Failed to delete content");
    }
  };

  // ... rest of your component
  // Replace the mock data with actual content from state
};
```

## API Client Methods

All methods return a promise with this structure:
```typescript
{
  success: boolean;
  data?: T;      // Response data if success
  error?: string; // Error message if failed
  detail?: string; // Detailed error info
}
```

### Available Methods

- `apiClient.generateScript(params)` - Generate video scripts
- `apiClient.generateImage(params)` - Generate/enhance image prompts
- `apiClient.generateHashtags(params)` - Generate hashtags
- `apiClient.processPrompt(prompt)` - Process general prompts
- `apiClient.getVideoSuggestions(prompt)` - Get video editing suggestions
- `apiClient.getGallery(contentType?)` - Get all content
- `apiClient.getContent(contentId)` - Get specific content
- `apiClient.deleteContent(contentId)` - Delete content
- `apiClient.healthCheck()` - Check API health

## Error Handling

Always check `response.success` before using `response.data`:

```typescript
const response = await apiClient.generateScript({ topic: "AI" });

if (response.success && response.data) {
  // Use response.data safely
  console.log(response.data.script);
} else {
  // Handle error
  console.error(response.error);
  toast.error(response.error || "Something went wrong");
}
```

## Testing the Integration

1. Start the backend server
2. Open browser console
3. Test API connection:
   ```typescript
   import apiClient from '@/lib/api';
   apiClient.healthCheck().then(console.log);
   ```

## Notes

- The backend runs on `http://localhost:8000` by default
- CORS is configured to allow requests from your frontend
- All endpoints return JSON responses
- The API client handles network errors automatically
- Content is stored in `backend/data/content.json`

## Next Steps

1. Add loading states to your components
2. Implement error boundaries
3. Add retry logic for failed requests
4. Implement caching for frequently accessed content
4. Add authentication if needed (currently not implemented)

