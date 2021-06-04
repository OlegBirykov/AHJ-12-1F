export const algoritms = [
  'MD5',
  'SHA1',
  'SHA256',
  'SHA512',
];

export function getHash(data, algoritm) {
  return { data, algoritm };
}
