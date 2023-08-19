import { AFComponent } from '@/types/common';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { Logout } from './Logout';
import logo from '@/assets/flash_logo.png';
import Image from 'next/image';

export const Header: AFComponent<{ user: User | null }> = async ({ user }) => {
  return (
    <header className="isolate z-20 flex w-full gap-5 px-5 py-4">
      {user ? (
        <>
          <div className="ml-auto">{user.email}</div>
          <Logout />
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
        </>
      )}
    </header>
  );
};

export default Header;
