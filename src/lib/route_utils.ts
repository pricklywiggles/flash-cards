import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const getErrorResponse = (error: unknown, defaultMessage = '') => {
  console.log(error);
  let message = defaultMessage || "Oops, the server ain't serving";
  let status = 500;

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      message = "Sumthn' ain't yours";
      status = 401;
    } else {
      message = `${error.meta?.cause || error.message} (${error.code})`;
    }
  }

  return { data: null, error: message, status };
};

export const getUserIdFromCookies = (headers: Headers) => {
  const userId = headers.get('x-flash-id');
  if (!userId) {
    throw new Error('User ID not found in headers');
  }
  return userId;
};
