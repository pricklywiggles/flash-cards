import { Prisma, PrismaClient } from '@prisma/client';
import { decodeJwt } from './utils';
import { getAccessToken } from './server_utils';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export const getRlsClient = ({
  token,
  cookies
}: {
  token?: string;
  cookies?: () => ReadonlyRequestCookies;
}) => {
  let accessToken =
    getAccessToken(cookies?.()) ||
    token ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!accessToken) {
    throw new Error('No access token provided for PrismaClient');
  }
  return prisma.$extends(extendWithRls(decodeJwt(accessToken)));
};

// This gives us a PrismaClient with Row Level Security (RLS).
// https://github.com/prisma/prisma/issues/5128
const extendWithRls = (jwtClaim = '{}') => {
  console.log('WTF');
  return Prisma.defineExtension((prisma) =>
    // @ts-ignore (Excessive stack depth comparing types...)
    prisma.$extends({
      query: {
        $allModels: {
          async $allOperations({ args, query }) {
            try {
              // console.log('WTF 2', { args, query });

              const [, result] = await prisma.$transaction([
                prisma.$executeRawUnsafe(
                  `SELECT set_config('request.jwt.claim', '${jwtClaim}', TRUE)`
                ),
                query(args)
              ]);
              console.log({ result });
              return result;
            } catch (e) {
              console.error('Extended prisma client error:', e);
              throw e;
            }

            // const [, result] = await prisma.$transaction([
            //   prisma.$executeRawUnsafe(
            //     `SELECT set_config('request.jwt.claim', '${jwtClaim}', TRUE)`
            //   ),
            //   query(args)
            // ]);
            // return result;
          }
        }
      }
    })
  );
};

export default prisma;
