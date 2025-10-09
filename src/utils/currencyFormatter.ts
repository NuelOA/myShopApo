// src/utils/currencyFormatter.ts

export const formatCurrency = (amount: number, currency: string, locale: string = 'en-US'): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  } catch (error) {
    // Fallback for unsupported currencies
    return `${currency} ${amount.toFixed(2)}`;
  }
};

export const formatPrice = (price: string | number, currency: string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return formatCurrency(numPrice, currency);
};
  