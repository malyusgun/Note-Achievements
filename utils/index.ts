export const generateItemLabel = (): string =>
  ["Покушать кашу", "Почистить зубки", "Умыть личико", "Поработать", "Поспать"][
    +(Math.random() * 100).toFixed(0) % 5
  ] as string;
