import { supabase } from '../../data/supabaseClient.js';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

export const uploadImageToSupabase = async (uri, path = 'pnt2-avatars') => {  
  
  try {
    const file = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileName = `${Date.now()}.jpg`;

    const { data, error } = await supabase.storage
      .from(path)
      .upload(fileName, Buffer.from(file, 'base64'), {
        contentType: 'image/jpeg',
      });

  
    if (error) {
      console.error('❌ Error subiendo imagen:', error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage.from(path).getPublicUrl(fileName);
    return publicUrlData?.publicUrl || null;

  } catch (err) {
    console.error('❌ Error general:', err);
    return null;
  }
};
