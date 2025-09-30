export const getCurrencyString = (number: number) =>
  number.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  });
