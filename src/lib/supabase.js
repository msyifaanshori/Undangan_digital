// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// createClient tetap dipanggil — error akan muncul saat runtime (query),
// bukan saat build time, sehingga Next.js bisa collect page data dengan aman.
export const supabase = createClient(supabaseUrl, supabaseKey);
