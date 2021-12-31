export const convertDescription = (data: string) =>
  data
    .replace(/<[^>]+>/g, '')
    .split(';')
    .join(';\n')
    .split(':')
    .join(':\n');
