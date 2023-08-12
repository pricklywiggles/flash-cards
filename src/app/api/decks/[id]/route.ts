import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { readSession } from '@/lib/server_utils';
import { log } from '@/lib/utils';

export async function PUT(req: Request) {
  const { id, name, description, imageUrl } = await req.json();

  const session = await readSession();
  if (!session) {
    return NextResponse.json(
      { error: 'You must be logged in to edit this deck' },
      { status: 401 }
    );
  }

  try {
    const deck = await prisma.deck.update({
      where: { id },
      data: { name, description, imageUrl }
    });
    return NextResponse.json(deck);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
