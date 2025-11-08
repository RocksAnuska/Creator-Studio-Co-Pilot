import axios from 'axios';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        inlineData?: {
          data: string;
        };
      }>;
    };
  }>;
}

export async function generateGeminiImage(prompt: string, style?: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY in environment variables');
  }

  try {
    // Gemini API endpoint for text-to-image (update if your endpoint differs)
    const response = await axios.post<GeminiResponse>(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${prompt}${style ? `. Style: ${style}` : ''}` }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Gemini returns base64 image in candidates[0].content.parts[0].inlineData.data
    const base64 = response.data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64) throw new Error('No image data returned from Gemini API');
    return `data:image/png;base64,${base64}`;
  } catch (error: any) {
    console.error('Gemini API error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || 'Failed to generate image');
  }
}
