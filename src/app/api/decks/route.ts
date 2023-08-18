import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserIdFromHeaders } from '@/lib/server_utils';
import { getErrorResponse } from '@/lib/route_utils';

export async function POST(req: Request) {
  const { name } = await req.json();

  try {
    const userId = getUserIdFromHeaders(req.headers);

    const deck = await prisma.deck.create({
      data: { name, authorId: userId }
    });

    return NextResponse.json({ data: deck, error: null });
  } catch (e) {
    const { data, error, status } = getErrorResponse(e);
    return NextResponse.json({ data, error }, { status });
  }
}
