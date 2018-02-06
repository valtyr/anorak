export const pluralFormatter = (n, singular, plural) => {
  const string = String(n);
  if (string.substr(string.length - 2, 2) == '11') return plural;
  if (string.substr(string.length - 1, 1) == '1') return singular;
  return plural;
};
