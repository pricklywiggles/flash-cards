import { readSession } from "@/lib/server_utils";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

const Header = async () => {
  const session = await readSession();
  console.log({ headersession: session });
  return (
    <header className="flex w-full px-5 py-4">
      {session ? (
        <div className="ml-auto">{session.email}</div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </header>
  );
};

export default Header;
