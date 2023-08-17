import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { decodeJwt } from '@/lib/utils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getUserIdFromCookies } from '../route';
import { getErrorResponse } from '@/lib/route_utils';

export async function PUT(req: Request) {
  const { id, name, description, imageUrl } = await req.json();

  try {
    const userId = getUserIdFromCookies(req.headers);

    const deck = await prisma.deck.update({
      where: { id, authorId: userId },
      data: { name, description, imageUrl }
    });

    return NextResponse.json({ deck, error: null });
  } catch (e) {
    const { data, error, status } = getErrorResponse(e);

    return NextResponse.json({ data, error }, { status });
  }
}
