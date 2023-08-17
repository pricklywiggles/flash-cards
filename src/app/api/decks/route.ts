import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getCurrentUser } from '@/lib/server_utils';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { getErrorResponse } from '@/lib/route_utils';

export async function POST(req: Request) {
  const { name } = await req.json();

  try {
    const userId = getUserIdFromCookies(req.headers);

    const deck = await prisma.deck.create({
      data: { name, authorId: userId }
    });

    return NextResponse.json({ data: deck, error: null });
  } catch (e) {
    const { data, error, status } = getErrorResponse(e);
    return NextResponse.json({ data, error }, { status });
  }
}

export const getUserIdFromCookies = (headers: Headers) => {
  const userId = headers.get('x-flash-id');
  if (!userId) {
    throw new Error('User ID not found in headers');
  }
  return userId;
};
