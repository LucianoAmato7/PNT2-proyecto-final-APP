import { createClient } from '@supabase/supabase-js';
import { SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY } from '@env';

const supabaseUrl = SUPABASE_PROJECT_URL;
const supabaseKey = SUPABASE_PUBLIC_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
