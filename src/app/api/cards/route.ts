import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getErrorResponse, getUserIdFromCookies } from '@/lib/route_utils';

export async function POST(req: Request) {
  const card = await req.json();

  try {
    const userId = getUserIdFromCookies(req.headers);

    const deck = await prisma.card.create({
      data: {
        ...card,
        authorId: userId
      }
    });

    return NextResponse.json({ data: deck, error: null });
  } catch (e) {
    const { data, error, status } = getErrorResponse(e);
    return NextResponse.json({ data, error }, { status });
  }
}
