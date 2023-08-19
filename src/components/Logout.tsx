'use client';

import { getSupabase } from '@/lib/client_utils';
import { FComponent } from '@/types/common';
import { useRouter } from 'next/navigation';

export const Logout: FComponent = () => {
  const supabase = getSupabase();
  const router = useRouter();
  const handleSignOut = async () => {
    console.log('signing out');
    await supabase.auth.signOut();
    router.refresh();
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};
