import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const goose = await prisma.user.create({
    data: {
      email: 'goose@fractal.ly',
      password: '$2b$10$BfWJFZ7XeGnR4iuuDTLfD.t2wSLkFH6RQAAGdq8levVCvtVZv9ghy',
      isAdmin: true,
      name: 'Goose'
    }
  });

  const deck = await prisma.deck.create({
    data: {
      name: 'Functional Programming Concepts',
      description:
        'Flashcards to help you learn functional programming concepts',
      publishedAt: new Date(),
      author: { connect: { id: goose.id } },
      imageUrl:
        'https://cdn.discordapp.com/attachments/995804262749716530/1132745151379419277/IMG_0256.JPG',
      cards: {
        create: [
          {
            position: 0,
            front: 'What is a monad?',
            back: 'A monad is a monoid in the category of endofunctors',
            authorId: 1
          },
          {
            position: 1,
            front: 'What is a functor?',
            back: 'A functor is a morphism between categories',
            authorId: 1
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
