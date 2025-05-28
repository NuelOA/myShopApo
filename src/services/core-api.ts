
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
    const ipAddress = localStorage.getItem('pinpad_ip') || '127.0.0.1'; // fallback IP if none saved

    const response = await fetch(`http://${ipAddress}:8080/v1/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "MessageType": "0200",
        "TransactionType": "00",
        "TellerID": "Teller001",
        "TellerName": "John Banker",
        "ReferenceNo": "REF0000001",
        "DateTime": "20230908221310",
        "InvoiceNo": "001134440",
        "TenderType": "00",
        "Currency": "936",
        "CurrencySymbol": currency,
        "TransactionAmount": amount,
        "CashBackAmount": "0.00",
        "Narration": "Purchase Transaction",
        "Account1": "",
        "Account2": "",
        "EchoData": "Testing 123"
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error making pay request:', error);
    throw error;
  }
};



  




export {
    getDrinks,
    makePayment
};
