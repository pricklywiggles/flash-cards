import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        console.log('authorizing', credentials);
        if (!email || !password) {
          throw new Error('Missing username or password');
        }
        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });
        if (!user || !(await compare(password, user.password))) {
          throw new Error('Invalid username or password');
        }
        console.log({ user });
        return user;
      }
    })
  ],
  pages: {
    signIn: '/login'
  }
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     const redirect = new URL(url).searchParams.get('redirect');

  //     console.log('in redirect callback', { url, baseUrl, redirect });
  //     let r = '';
  //     // Allows relative callback URLs
  //     if (redirect) {
  //       r = `${baseUrl}${redirect}`;
  //       console.log("url starts with '/'", { r });
  //     }
  //     // Allows callback URLs on the same origin
  //     else if (new URL(url).origin === baseUrl) {
  //       r = url;
  //       console.log('url origin === baseUrl', { r });
  //     } else {
  //       r = baseUrl;
  //     }

  //     console.log({ r });
  //     return r;
  //   }
  // }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };