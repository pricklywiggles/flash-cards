import { NextResponse } from 'next/server';
import { getErrorResponse, getUserIdFromCookies } from '@/lib/route_utils';
import { getRlsClient } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function PUT(req: Request) {
  const { id, front, back } = await req.json();

  try {
    const userId = getUserIdFromCookies(req.headers);
    const prisma = getRlsClient({ cookies });

    const card = await prisma.card.update({
      where: { id, authorId: userId },
      data: { front, back }
    });

    return NextResponse.json({ data: card, error: null });
  } catch (e) {
    const { data, error, status } = getErrorResponse(e);
    return NextResponse.json({ data, error }, { status });
  }
}
