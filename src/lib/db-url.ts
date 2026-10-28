export function normalizePostgresUrl(value: string) {
  return value.replace(
    /([?&]sslmode=)(prefer|require|verify-ca)(?=&|$)/g,
    "$1verify-full"
  );
}
