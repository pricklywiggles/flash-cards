import prisma from '@/lib/prisma';
import { Deck, Card } from '@prisma/client';
import { FComponent } from '@/types/common';

export default async function Deck({ params }: { params: { id: string } }) {
  const data = await prisma.deck.findUnique({
    where: { id: Number(params.id) },
    include: {
      cards: {
        orderBy: {
          position: 'asc'
        }
      }
    }
  });

  if (!data) return <div>Deck not found</div>;

  return (
    <main>
      <div>Deck {params.id}</div>
      <div>{data.name}</div>
      <div>{data.description}</div>
      <div>{data.createdAt.toLocaleString()}</div>
      {data.cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </main>
  );
}

const Card = ({ card }: { card: Card }) => {
  return (
    <div key={card.id}>
      <div>{card.front}</div>
      <div>{card.back}</div>
    </div>
  );
};
