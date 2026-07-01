export function isValidISODate(str: string):boolean {
  const date = new Date(str);
  return !isNaN(date.getTime());
}