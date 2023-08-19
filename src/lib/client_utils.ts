'use client';

import {
  createClientComponentClient,
  createPagesBrowserClient
} from '@supabase/auth-helpers-nextjs';

export const getSupabase = () => createClientComponentClient();
