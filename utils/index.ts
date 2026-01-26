export const generateItemLabel = (): string =>
  ["Покушать кашу", "Почистить зубки", "Умыть личико", "Поработать", "Поспать"][
    +(Math.random() * 100).toFixed(0) % 5
  ] as string;

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;
  return JSON.parse(JSON.stringify(toRaw(obj)));
};
