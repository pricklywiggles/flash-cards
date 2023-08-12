import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { readSession } from "@/lib/server_utils";
import { decodeUuid, log } from "@/lib/utils";

export async function POST(req: Request) {
  const { name } = await req.json();

  const session = await readSession();
  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to create a deck" },
      { status: 401 },
    );
  }

  try {
    const deck = await prisma.deck.create({
      data: { name, authorId: decodeUuid(session.id) },
    });
    console.log(`Created deck ${name}`, { deck });
    return NextResponse.json(deck);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
