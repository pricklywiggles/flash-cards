import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// export const readSession = async () => {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user || !session.user.email) {
//     return null;
//   }

//   return {
//     id: session.user.id,
//     email: session.user.email,
//     name: session.user.name,
//     isAdmin: session.user.isAdmin
//   };
// };

export const getSupabase = () => createServerComponentClient({ cookies });

// export const getCurrentUser = async () => {
//   const session = await readSession();

//   if (session === null) {
//     return null;
//   }

//   const user = await prisma.user.findUnique({
//     where: {
//       email: session.email,
//     },
//   });
//   if (!user) {
//     throw new Error("Current user not found");
//   }
//   return user;
// };
