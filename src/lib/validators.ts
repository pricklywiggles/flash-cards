import { Fail, Success, Validation } from 'tiny-validation';
import { pattern } from 'tiny-validation/build/main/lib/validators';

const urlRegex = new RegExp(
  '^(https?|ftp):\\/\\/' + // protocol
    '(?:(?:[a-z0-9-]+\\.)+[a-z]{2,6}' + // domain name and extension
    '|\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})' + // OR IP address
    '(?::\\d{1,5})?' + // optional port
    '(?:\\/\\S*)?' + // path
    '(?:\\?\\S*)?' + // query
    '(?:#\\S*)?$', // fragment
  'i' // case-insensitive
);

const optionalUrlRegex = new RegExp(
  '^(?:(https?|ftp):\\/\\/' +
    '(?:(?:[a-z0-9-]+\\.)+[a-z]{2,6}' +
    '|\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})' +
    '(?::\\d{1,5})?' +
    '(?:\\/\\S*)?' +
    '(?:\\?\\S*)?' +
    '(?:#\\S*)?)?$',
  'i'
);

export const isUrl = Validation(pattern(urlRegex, 'Enter a valid url'));
export const isOptionalUrl = Validation(
  pattern(optionalUrlRegex, 'Enter a valid url')
);

export const optionalMinChars = (min: number, errorMessage?: string) =>
  Validation((key, x) =>
    typeof x !== 'string'
      ? Fail({ [key]: [`${key} must be a string`] })
      : x.length === 0 || x.length >= min
      ? Success()
      : Fail({
          [key]: [errorMessage ?? `${key} has to be greater than ${min} chars`]
        })
  );
