import { getServerSession } from 'next-auth/next';
import { useSession } from '@/hooks/useSession';
import Link from 'next/link';

const Header = async () => {
  const session = await getServerSession();
  console.log({ session });
  return (
    <header className="flex w-full py-4 px-5">
      {session ? (
        <div className="ml-auto">{session?.user?.email}</div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </header>
  );
};

export default Header;
