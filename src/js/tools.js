import crypto from 'crypto-js';

export const algoritms = [
  'MD5',
  'SHA1',
  'SHA256',
  'SHA512',
];

export function getHash(data, algoritm) {
  const wordArray = crypto.lib.WordArray.create(data);
  return crypto[algoritms[algoritm]](wordArray).toString(crypto.enc.Hex);
}
