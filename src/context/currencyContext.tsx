import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface CurrencyContextProps {
  currency: string;
  updateCurrency: (newCurrency: string) => void;
}

// Create the context with a default value
const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

// Create a provider component
export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('USD'); // Default currency

  const updateCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
  };


  return (
    <CurrencyContext.Provider value={{ currency, updateCurrency }}>
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
