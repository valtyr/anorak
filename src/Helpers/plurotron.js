export default (singular, plural, n) => {
  if (n === 0) return plural;
  if (!n) return '';
  if (String(n).length >= 2 && String(n).slice(-2) === '11') return plural;
  return String(n).slice(-1) === '1' ? singular : plural;
};
