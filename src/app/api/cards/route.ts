import { NextResponse } from 'next/server';
import { getErrorResponse, getUserIdFromCookies } from '@/lib/route_utils';
import { cookies } from 'next/headers';
import { getRlsClient } from '@/lib/prisma';

export async function POST(req: Request) {
  const cardDetails = await req.json();

  try {
    const userId = getUserIdFromCookies(req.headers);
    const prisma = getRlsClient({ cookies });

    const card = await prisma.card.create({
      data: {
        ...cardDetails,
        authorId: userId
      }
    });

    return NextResponse.json({ data: card, error: null });
  } catch (e) {
    const { data, error, status } = getErrorResponse(e);
    return NextResponse.json({ data, error }, { status });
  }
}
