export function formatForCurrency(amount: string | number, currency: string = 'USD'): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;

  const multiplier = currency === "USD" || currency === "SGD" || currency === "CNY" ? 1 : 100;

  return (Math.round(value / multiplier) * multiplier).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}