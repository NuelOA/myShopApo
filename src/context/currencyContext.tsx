import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface CurrencyContextProps {
  currency: string;
  updateCurrency: (newCurrency: string) => void;
  currencies: { value: string; label: string }[];
}

// Create the context with a default value
const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

// Create a provider component
export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('USD'); // Default currency

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


  return (
    <CurrencyContext.Provider value={{ currency, currencies,  updateCurrency }}>
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
