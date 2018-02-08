export const timeFormatter = time => {
  const split = time && time.split(':');
  return split && `${Number(split[0])}:${split[1]}`;
};
