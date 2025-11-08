export interface ImageMetadata {
  id: string;
  prompt: string;
  style?: string;
  size: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  imageUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  error?: string;
}

export interface GenerateImageRequest {
  prompt: string;
  style?: string;
  size?: string;
  count?: number;
}