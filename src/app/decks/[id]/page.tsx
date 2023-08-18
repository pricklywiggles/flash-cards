import prisma from '@/lib/prisma';
import { Deck, Card } from '@prisma/client';
import { FComponent } from '@/types/common';
import { IconButton } from '@/components/Button';
import { EditDeckDetails } from '@/components/EditDeckDetails';
import { CreateCard } from '@/components/CreateCard';
import { EditCardDetails } from '@/components/EditCardDetails';

export default async function Deck({ params }: { params: { id: string } }) {
  const deck = await prisma.deck.findUnique({
    where: { id: params.id },
    include: {
      cards: {
        orderBy: {
          position: 'asc'
        }
      },
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  if (!deck) return <div>Deck not found</div>;

  return (
    <div className="relative">
      <div>{deck.name}</div>
      <div>{deck.description}</div>
      <div>Created by {deck.author.email}</div>
      <div>{deck.createdAt.toLocaleString()}</div>
      <EditDeckDetails className="absolute right-0 top-0" {...deck} />
      <div className="border-t-[1px] border-gray-600 pb-5" />
      <div className="relative">
        <CreateCard deckId={deck.id} position={deck.cards.length} />
        {deck.cards.map((card) => (
          <div key={card.id} className="relative flex justify-normal">
            <Card card={card} />
            <EditCardDetails className="pl-5" {...card} />
          </div>
        ))}
      </div>
    </div>
  );
}

const Card = ({ card }: { card: Card }) => {
  return (
    <div className="pb-2" key={card.id}>
      <div>{card.front}</div>
      <div>{card.back}</div>
    </div>
  );
};
