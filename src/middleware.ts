import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
// import { decodeJwt } from './lib/server_utils';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  // const accessToken = session.data.session?.access_token;
  // let claims;
  // if (accessToken) {
  //   claims = decodeJwt(accessToken);
  // }
  // console.log({ accessToken, claims });
  // req.headers.set('x-sb-token', claims || 'none');
  return res;
}
