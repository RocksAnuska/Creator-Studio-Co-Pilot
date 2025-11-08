import { createClient } from '@supabase/supabase-js';
import { ImageMetadata } from '../types/image';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveImageMetadata(metadata: Omit<ImageMetadata, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data, error } = await supabase
    .from('images')
    .insert([{
      ...metadata,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateImageMetadata(id: string, updates: Partial<ImageMetadata>) {
  const { data, error } = await supabase
    .from('images')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getImageMetadata(id: string): Promise<ImageMetadata | null> {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Upload image to Supabase Storage
export async function uploadImage(imageBuffer: Buffer, path: string): Promise<string> {
  const { data, error } = await supabase
    .storage
    .from('images')
    .upload(path, imageBuffer, {
      contentType: 'image/png',
      upsert: true
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase
    .storage
    .from('images')
    .getPublicUrl(data.path);

  return publicUrl;
}