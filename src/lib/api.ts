// API Client for Creator Studio Co-Pilot Backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  detail?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Request failed',
          detail: data.detail,
        };
      }

      return {
        success: true,
        data: data as T,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Network error',
        detail: error instanceof Error ? error.message : String(error),
      };
    }
  }

  // Script Generation
  async generateScript(params: {
    topic: string;
    tone?: string;
    duration?: string;
    keywords?: string;
  }) {
    return this.request<{
      script: string;
      content_id: string;
      metadata: {
        tone: string;
        duration: string;
        topic: string;
      };
    }>('/api/scripts/generate', {
      method: 'POST',
      body: JSON.stringify({
        topic: params.topic,
        tone: params.tone || 'professional',
        duration: params.duration || '5',
        keywords: params.keywords,
      }),
    });
  }

  // Image Generation
  async generateImage(params: {
    prompt: string;
    style?: string;
    size?: number;
  }) {
    return this.request<{
      image_url?: string;
      image_base64?: string;
      enhanced_prompt: string;
      content_id: string;
      metadata: {
        style: string;
        size: number;
        prompt: string;
      };
    }>('/api/images/generate', {
      method: 'POST',
      body: JSON.stringify({
        prompt: params.prompt,
        style: params.style || 'realistic',
        size: params.size || 1024,
      }),
    });
  }

  // Hashtag Generation
  async generateHashtags(params: {
    topic: string;
    platform?: string;
  }) {
    return this.request<{
      hashtags: string[];
      count: number;
    }>('/api/hashtags/generate', {
      method: 'POST',
      body: JSON.stringify({
        topic: params.topic,
        platform: params.platform || 'general',
      }),
    });
  }

  // Process General Prompt
  async processPrompt(prompt: string) {
    return this.request<{
      suggestions: {
        analysis: string;
        suggested_tools: string[];
        recommendations: string;
      };
      prompt: string;
    }>('/api/prompt/process', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
  }

  // Video Editing Suggestions
  async getVideoSuggestions(prompt: string) {
    return this.request<{
      suggestions: string;
      editing_style: string;
      recommendations: string;
    }>('/api/video/suggestions', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
  }

  // Gallery Operations
  async getGallery(contentType?: string) {
    const endpoint = contentType
      ? `/api/gallery?content_type=${contentType}`
      : '/api/gallery';
    return this.request<{
      items: Array<{
        id: string;
        type: string;
        title: string;
        content: string;
        created_at: string;
        metadata?: Record<string, any>;
      }>;
      count: number;
    }>(endpoint);
  }

  async getContent(contentId: string) {
    return this.request<{
      item: {
        id: string;
        type: string;
        title: string;
        content: string;
        created_at: string;
        metadata?: Record<string, any>;
      };
    }>(`/api/gallery/${contentId}`);
  }

  async deleteContent(contentId: string) {
    return this.request<{ message: string }>(`/api/gallery/${contentId}`, {
      method: 'DELETE',
    });
  }

  // Health Check
  async healthCheck() {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

export const apiClient = new ApiClient();
export default apiClient;

