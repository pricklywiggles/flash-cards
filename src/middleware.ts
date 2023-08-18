import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './lib/server_utils';

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const session = await supabase.auth.getSession();

  if (
    req.nextUrl.pathname.startsWith('/api/decks') ||
    req.nextUrl.pathname.startsWith('/api/cards')
  ) {
    const currentUser = getCurrentUser({
      accessToken: session.data.session?.access_token
    });
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-flash-id', currentUser?.id || '');
    res = NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });

    if (!currentUser || !currentUser.isAuthenticated) {
      return NextResponse.json(
        { error: "I don't even know who you are, log in first." },
        { status: 401 }
      );
    }
  }
  return res;
}
