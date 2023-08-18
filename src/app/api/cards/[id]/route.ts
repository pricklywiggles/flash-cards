import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getErrorResponse, getUserIdFromCookies } from '@/lib/route_utils';

export async function PUT(req: Request) {
  const { id, front, back } = await req.json();

  try {
    const userId = getUserIdFromCookies(req.headers);

    const deck = await prisma.card.update({
      where: { id, authorId: userId },
      data: { front, back }
    });

    return NextResponse.json({ deck, error: null });
  } catch (e) {
    const { data, error, status } = getErrorResponse(e);

    return NextResponse.json({ data, error }, { status });
  }
}
