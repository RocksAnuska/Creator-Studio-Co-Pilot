import axios from 'axios';

interface DallEResponse {
  created: number;
  data: Array<{
    url: string;
  }>;
}

interface DallEErrorResponse {
  error: {
    message: string;
  };
}

export async function generateImage(prompt: string, style?: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY in environment variables');
  }

  try {
    const response = await axios.post<DallEResponse>(
      'https://api.openai.com/v1/images/generations',
      {
        model: "dall-e-3",
        prompt: `${prompt}${style ? `. Style: ${style}` : ''}`,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    const imageUrl = response.data.data[0].url;
    
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    });
    
    const base64 = Buffer.from(imageResponse.data as ArrayBuffer).toString('base64');
    return `data:image/png;base64,${base64}`;
  } catch (error: any) {
    if (error.response?.data) {
      const errorData = error.response.data as DallEErrorResponse;
      console.error('DALL-E API error:', errorData.error?.message || 'API Error');
      throw new Error(errorData.error?.message || 'Failed to generate image');
    }
    console.error('Unknown error:', error);
    throw new Error('Failed to generate image');
  }
}

// Frontend code example
(async () => {
  const response = await fetch('http://localhost:5174/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: "A beautiful mountain landscape at sunset",
      style: "realistic",
      size: "1024x1024"
    })
  });

  const data = await response.json();
  if (data.success) {
    // data.data.imageUrl will contain the generated image as base64
    const imgElement = document.createElement('img');
    imgElement.src = data.data.imageUrl;
    // Add to your preview section
  }
})();