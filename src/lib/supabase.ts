import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// The publishable (anon) key is safe to ship in the client — access is guarded
// by Row-Level Security policies on the database.
const SUPABASE_URL = 'https://fhgmffqhktzccnrvefss.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Jp2w8MupbPrDNezj50kxqA_VwnTiMY-';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
