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

export const base64ToUint8Array = (base64: string) => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
