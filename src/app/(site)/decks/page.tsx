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
    <div className="relative">
      <CreateDeck />

      <ul>
        Deck List
        {decks.map((deck) => (
          <li key={deck.id}>
            <Link href={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
