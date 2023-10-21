export const trimObjectValues = (
  obj: Record<string, string | number>,
): Record<string, string> => {
  const trimmedObject: Record<string, string> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = String(obj[key]!).trim();
      trimmedObject[key] = value;
    }
  }
  return trimmedObject;
};
