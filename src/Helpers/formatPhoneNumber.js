export default no => {
  const str = String(no);
  if (str.length === 7) return `${str.substring(0, 3)}–${str.substring(3, 7)}`;
  return str;
};
