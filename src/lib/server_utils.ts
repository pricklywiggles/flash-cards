import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { decodeJwt } from './utils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const getSupabase = () => createServerComponentClient({ cookies });

export const getAccessToken = (cookies: ReadonlyRequestCookies) => {
  const cookie = cookies.get(
    `sb-${process.env.SUPABASE_PROJECT_ID}-auth-token`
  );
  if (!cookie) {
    return null;
  }
  return JSON.parse(cookie.value)[0];
};

export const getCurrentUser = ({
  cookies,
  accessToken
}: {
  cookies?: ReadonlyRequestCookies;
  accessToken?: string;
}) => {
  if (cookies) {
    accessToken = getAccessToken(cookies);
  }
  if (!accessToken) {
    return null;
  }
  const claims = decodeJwt(accessToken);
  if (!claims) {
    return null;
  }
  const claimsObj = JSON.parse(claims);

  return {
    isAuthenticated: claimsObj.aud === 'authenticated',
    id: claimsObj.sub,
    email: claimsObj.email
  };
};
