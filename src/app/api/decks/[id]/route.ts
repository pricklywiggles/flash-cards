// import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { getExtendedPrismaClient } from '@/lib/prisma';

export async function PUT(req: Request) {
  const { id, name, description, imageUrl } = await req.json();
  const accessToken = getAccessToken(cookies());

  console.log({
    accessToken
  });

  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { error: 'You must be logged in to edit this deck' },
      { status: 401 }
    );
  }
  const prisma = getExtendedPrismaClient(accessToken);

  try {
    const deck = await prisma.deck.update({
      where: { id },
      data: { name, description, imageUrl }
    });

    const result = await supabase
      .from('Deck')
      .update({ name, description, imageUrl })
      .eq('id', id);
    console.log(result);

    return NextResponse.json({ deck, error: null });
  } catch (e) {
    return NextResponse.json({ data: null, error: e }, { status: 500 });
  }
}

export const getAccessToken = (cookies: ReadonlyRequestCookies) => {
  const cookie = cookies.get(
    `sb-${process.env.SUPABASE_PROJECT_ID}-auth-token`
  );
  if (!cookie) {
    return null;
  }
  return JSON.parse(cookie.value)[0];
};
