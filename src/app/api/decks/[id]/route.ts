import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getErrorResponse } from '@/lib/route_utils';
import { getRlsClient } from '@/lib/prisma';
import { getUserIdFromHeaders } from '@/lib/server_utils';

export async function PUT(req: Request) {
  const { id, name, description, imageUrl } = await req.json();
  const prisma = getRlsClient({ cookies });

  try {
    const userId = getUserIdFromHeaders(req.headers);

    const deck = await prisma.deck.update({
      where: { id, authorId: userId },
      data: { name, description, imageUrl }
    });

    return NextResponse.json({ data: deck, error: null });
  } catch (e) {
    const { data, error, status } = getErrorResponse(e);

    return NextResponse.json({ data, error }, { status });
  }
}
