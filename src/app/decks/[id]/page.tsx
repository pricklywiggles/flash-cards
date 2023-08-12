import prisma from '@/lib/prisma';
import { Deck, Card } from '@prisma/client';
import { FComponent } from '@/types/common';
import { IconButton } from '@/components/Button';
import { EditDeckDetails } from '@/components/EditDeckDetails';

export default async function Deck({ params }: { params: { id: string } }) {
  const data = await prisma.deck.findUnique({
    where: { id: Number(params.id) },
    include: {
      cards: {
        orderBy: {
          position: 'asc'
        }
      },
      author: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  if (!data) return <div>Deck not found</div>;

  return (
    <div className="relative">
      <div>{data.name}</div>
      <div>{data.description}</div>
      <div>Created by {data.author.name}</div>
      <div>{data.createdAt.toLocaleString()}</div>
      <EditDeckDetails className="absolute right-0 top-0" {...data} />
      <div className="border-t-[1px] border-gray-600 pb-5" />
      {data.cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
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
