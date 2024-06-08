import { formatForCurrency } from "./numberFormatters";


describe('NumberFormatting', () => {
  it.each([
    { amount: 100.21, currency: "USD", expected: "100" },
    { amount: "300123.22", currency: "JPY", expected: '300,100' },
    { amount: 123.51, currency: "CNY", expected: '124' },
    { amount: 500, currency: "KRW", expected: '500' },
  ])('parseAmount should round correctly for different currencies', ({amount, currency, expected}) => {
      const parsedAmount = formatForCurrency(amount, currency);
      expect(parsedAmount).toBe(expected);
  });
});

