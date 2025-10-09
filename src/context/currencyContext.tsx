import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface CurrencyContextProps {
  currency: string;
  updateCurrency: (newCurrency: string) => void;
  currencies: { value: string; label: string }[];
  exchangeRates: { [key: string]: number };
  updateExchangeRate: (currency: string, rate: number) => void;
  convertPrice: (price: number, fromCurrency?: string) => number;
}

// Create the context with a default value
const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

// Create a provider component
export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('USD'); // Default currency
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({
    USD: 1.00,
    EUR: 0.85,
    GBP: 0.73,
    GHS: 12.50,
    NGN: 460.00,
    KES: 130.00,
    ZAR: 18.50,
    UGX: 3700.00,
    ZMK: 25.00
  });

  const currencies = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'GHS', label: 'Ghana Cedi (GHS)' },
    { value: 'NGN', label: 'Nigerian Naira (NGN)' },
    { value: 'KES', label: 'Kenyan Shilling (KES)' },
    { value: 'ZAR', label: 'South African Rand (ZAR)' },
    { value: 'UGX', label: 'Ugandan Shilling (Uganda)' },
    { value: 'ZMK', label: 'Zambian Kwacha (Zambia)' }
  ];

  const updateCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  const updateExchangeRate = (currency: string, rate: number) => {
    setExchangeRates(prev => ({ ...prev, [currency]: rate }));
  };

  const convertPrice = (price: number, fromCurrency: string = 'USD') => {
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[currency] || 1;
    return (price / fromRate) * toRate;
  };


  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      currencies, 
      updateCurrency, 
      exchangeRates, 
      updateExchangeRate, 
      convertPrice 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};


// Custom hook to use the CurrencyContext
export const useCurrency = (): CurrencyContextProps => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
