import { AFComponent } from '@/types/common';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { Button } from './forms/Button';
import { getSupabase } from '@/lib/server_utils';
import { Logout } from './Logout';

const Header: AFComponent<{ user: User | null }> = async ({ user }) => {
  return (
    <header className="isolate z-20 flex w-full gap-5 px-5 py-4">
      {user ? (
        <>
          <div className="ml-auto">{user.email}</div>
          <Logout />
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </header>
  );
};

export default Header;
