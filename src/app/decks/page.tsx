import Link from 'next/link';
import prisma from '@/lib/prisma';
import { CreateDeck } from '@/components/CreateDeck';

export default async function Page() {
  const decks = await prisma.deck.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <main className="relative">
      <CreateDeck />

      <div>Deck List</div>
      {decks.map((deck) => (
        <Link key={deck.id} href={`/decks/${deck.id}`}>
          {deck.name}
        </Link>
      ))}
    </main>
  );
}
