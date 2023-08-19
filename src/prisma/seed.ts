import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const goose = {
    id: '2cd27f94-de60-4504-9b4f-cfad1f59f8a0',
    email: 'goose@fractal.ly',
    isAdmin: false
  };

  const deck = await prisma.deck.create({
    data: {
      name: 'Functional Programming Concepts',
      description:
        'Flashcards to help you learn functional programming concepts',
      publishedAt: new Date(),
      authorId: goose.id,
      imageUrl:
        'https://cdn.discordapp.com/attachments/995804262749716530/1132745151379419277/IMG_0256.JPG',
      cards: {
        create: [
          {
            position: 0,
            front: 'What is a monad?',
            back: 'A monad is a monoid in the category of endofunctors',
            authorId: goose.id
          },
          {
            position: 1,
            front: 'What is a functor?',
            back: 'A functor is a morphism between categories',
            authorId: goose.id
          }
        ]
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
