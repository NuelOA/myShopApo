
import { cartData, data } from "../data/drinks";
import { drinksType } from "../types/drinksType";
import axios from 'axios';

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


 const makePayment = async (amount: string) => {
  try {
    const response = await fetch('http://172.60.254.87:8080/v1/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
            "MessageType":"0200",
            "TransactionType":"00",
            "TellerID": "Teller001",
            "TellerName": "John Banker",
            "ReferenceNo":"REF0000001",
            "DateTime":"20230908221310",
            "InvoiceNo":"001134440",
            "TenderType":"00",
            "Currency":"936",
            "CurrencySymbol":"GHS",
            "TransactionAmount": amount,
            "CashBackAmount":"0.00",
            "Narration":"Purchase Transaction",
            "Account1":"",
            "Account2":"",
            "EchoData":"Testing 123"
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
