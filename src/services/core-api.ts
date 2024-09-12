
import { cartData, data } from "../data/drinks";
import { drinksType } from "../types/drinksType";

const getDrinks = (): cartData[] => {
    try {
        return data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
    return []; // Fallback in case of an error, though this would rarely be reached in this context
};


const makePayment = async() => {    
    // http://localhost:8080/smart/SmartPayAPI
    try {
     const response =  await fetch ('http://localhost:8080/smart/SmartPayAPI/transaction', {
        method: 'POST',
        // mode: 'no-cors',
        // headers: {
        //     'Content-Type': 'application/json',
            
        //   },
          body: JSON.stringify({
            "MessageType":"0200",
            "TransactionType":"00",
            "TellerID": "Teller001",
            "TellerName": "John Banker",
            "ReferenceNo":"REF0000001",
            "DateTime":"20230908221310",
            "InvoiceNo":"001134440",
            "TenderType":"00",
            "Currency":"748",
            "CurrencySymbol":"E",
            "TransactionAmount":"120.00",
            "CashBackAmount":"0.00",
            "Narration":"Purchase Transaction",
            "Account1":"",
            "Account2":"",
            "EchoData":"Testing 123"
          })
     })
     const data = await response.json()
     console.log(data, 'here')
     return data
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}

export {
    getDrinks,
    makePayment
};
