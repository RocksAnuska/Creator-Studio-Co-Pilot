import express from "express";
import { z } from "zod";
import { generateGeminiImage } from '../services/geminiService';

const router = express.Router();

// Validation schema for the request body
const GenerateRequestSchema = z.object({
  prompt: z.string().min(1).max(1000),
  style: z.string().optional(),
  size: z.enum(['1024x1024', '512x512']).optional().default('1024x1024'),
  count: z.number().min(1).max(4).optional().default(1)
});

router.post("/", async (req, res) => {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    return res.status(500).json({ error: "Server missing GEMINI_API_KEY" });
  }

  try {
    const data = GenerateRequestSchema.parse(req.body);
    // Call Gemini API to generate the image
    const imageDataUrl = await generateGeminiImage(data.prompt, data.style);
    return res.json({
      success: true,
      message: "Image generated successfully",
      data: {
        imageUrl: imageDataUrl,
        prompt: data.prompt,
        style: data.style,
        size: data.size
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: "Invalid request data", 
        details: error.issues 
      });
    }
    console.error('Gemini generate error:', error);
    return res.status(500).json({ error: "Failed to generate image" });
  }
});

export default router;
