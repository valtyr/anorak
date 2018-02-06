const months = [
  'janúar',
  'febrúar',
  'mars',
  'apríl',
  'maí',
  'júní',
  'júlí',
  'ágúst',
  'september',
  'október',
  'nóvember',
  'desember',
];

export default date => {
  if (!date) return '';
  const parsed = typeof date === 'object' ? date : new Date(date);
  return `${parsed.getDate()}. ${months[parsed.getMonth()]}`;
};
