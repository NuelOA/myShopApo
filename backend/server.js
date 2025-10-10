const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Proxy endpoint for pinpad payment
app.post('/api/pay', async (req, res) => {
  try {
    const pinpadIP = req.body.pinpadIP || '192.168.1.195';
    const paymentData = req.body;
    
    console.log(`Proxying payment request to: http://${pinpadIP}:8080/v1/pay`);
    
    const response = await fetch(`http://${pinpadIP}:8080/v1/pay`, {
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
        "CurrencySymbol": paymentData.currency,
        "TransactionAmount": paymentData.amount,
        "CashBackAmount": "0.00",
        "Narration": "Purchase Transaction",
        "Account1": "",
        "Account2": "",
        "EchoData": "Testing 123"
      }),
    });

    if (!response.ok) {
      throw new Error(`Pinpad error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    
    // Return mock response if pinpad is unreachable
    res.json({
      ResponseText: "Approved",
      TransactionId: "PROXY_MOCK_" + Date.now(),
      Message: "Mock response - pinpad unreachable"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});