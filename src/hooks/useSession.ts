'use client';
import * as React from 'react';
import { getSession } from 'next-auth/react';
import { useAsync } from './useAsync';

type SessionData = Awaited<ReturnType<typeof getSession>>;

export const useSession = () => {
  const { run, data: session, ...rest } = useAsync<SessionData>();

  React.useEffect(() => {
    run(getSession());
  }, [run]);

  return {
    session,
    isSignedIn: !!session,
    ...rest
  };
};
