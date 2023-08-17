import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const getErrorResponse = (error: unknown, defaultMessage = '') => {
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
