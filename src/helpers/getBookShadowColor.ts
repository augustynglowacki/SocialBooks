import {palette} from 'src/styles';

export const getBookShadowColor = (x: number) => {
  if (x % 3 === 0) return palette.primary;
  else if (x % 3 === 1) return palette.secondary;
  return palette.third;
};
