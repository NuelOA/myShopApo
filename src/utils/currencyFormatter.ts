// src/utils/currencyFormatter.ts

export const formatCurrency = (amount: number, currency: string, locale: string = `en-${currency.slice(0, 2)}`): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  