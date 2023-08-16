// import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getAccessToken } from './[id]/route';
import { getExtendedPrismaClient } from '@/lib/prisma';

export async function POST(req: Request) {
  const { name } = await req.json();

  const accessToken = getAccessToken(cookies());
  const prisma = getExtendedPrismaClient(accessToken);

  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { error: 'You must be logged in to create a deck' },
      { status: 401 }
    );
  }

  try {
    const deck = await prisma.deck.create({
      data: { name, authorId: user.id }
    });
    console.log({ deck });
    return NextResponse.json({ data: deck, error: null });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
