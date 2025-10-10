
import { useCurrency } from "../context/currencyContext";
import { cartData, data } from "../data/drinks";
// import { drinksType } from "../types/drinksType";


const getDrinks = (): cartData[] => {
    try {
        return data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
    return [];
};


const makePayment = async (amount: string, currency: string) => {
  try {
    const pinpadIP = localStorage.getItem('pinpad_ip') || '192.168.1.195';
    
    console.log('Making payment via proxy server');
    
    const response = await fetch('http://localhost:3001/api/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: currency,
        pinpadIP: pinpadIP
      }),
    });

    if (!response.ok) {
      throw new Error(`Proxy server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};



  




export {
    getDrinks,
    makePayment
};
