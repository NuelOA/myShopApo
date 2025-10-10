import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Paper, Text, Title, Divider, Group, Stack } from '@mantine/core';
import { IconCheck, IconPrinter, IconHome } from '@tabler/icons-react';
import { ROUTES } from '../routes/routes';

interface TransactionData {
  MessageType: string;
  TransactionType: string;
  TellerID: string;
  TellerName: string;
  DateTime: string;
  TransactionID: string;
  InvoiceNo: string;
  ReferenceNo: string;
  TenderType: string;
  Currency: string;
  CurrencySymbol: string;
  TransactionAmount: string;
  CashBackAmount: string;
  Narration: string;
  ResponseCode: string;
  ResponseText: string;
  PAN: string;
  AuthorizationCode: string;
  AuthorizationReference: string;
  Account1: string;
  Account2: string;
  EchoData: string;
  ReceiptData: string;
}

export default function Receipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const transactionData = location.state?.transactionData as TransactionData;

  if (!transactionData) {
    navigate(ROUTES.home);
    return null;
  }

  const formatDateTime = (dateTime: string) => {
    if (dateTime.length === 14) {
      const year = dateTime.substring(0, 4);
      const month = dateTime.substring(4, 6);
      const day = dateTime.substring(6, 8);
      const hour = dateTime.substring(8, 10);
      const minute = dateTime.substring(10, 12);
      const second = dateTime.substring(12, 14);
      return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    }
    return dateTime;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <Paper shadow="lg" p="xl" style={{ maxWidth: 400, width: '100%' }}>
        <Stack align="center" gap="md">
          <IconCheck size={60} color="green" />
          <Title order={2} c="green">Payment Successful!</Title>
          
          <Divider w="100%" />
          
          <Stack gap="xs" w="100%">
            <Group justify="space-between">
              <Text fw={500}>Transaction ID:</Text>
              <Text>{transactionData.TransactionID}</Text>
            </Group>
            
            <Group justify="space-between">
              <Text fw={500}>Amount:</Text>
              <Text fw={700} size="lg">{transactionData.CurrencySymbol} {transactionData.TransactionAmount}</Text>
            </Group>
            
            <Group justify="space-between">
              <Text fw={500}>Date & Time:</Text>
              <Text>{formatDateTime(transactionData.DateTime)}</Text>
            </Group>
            
            <Group justify="space-between">
              <Text fw={500}>Reference:</Text>
              <Text>{transactionData.ReferenceNo}</Text>
            </Group>
            
            <Group justify="space-between">
              <Text fw={500}>Card:</Text>
              <Text>{transactionData.PAN}</Text>
            </Group>
            
            <Group justify="space-between">
              <Text fw={500}>Auth Code:</Text>
              <Text>{transactionData.AuthorizationCode}</Text>
            </Group>
            
            <Group justify="space-between">
              <Text fw={500}>Payment Type:</Text>
              <Text>{transactionData.AuthorizationReference}</Text>
            </Group>
            
            {transactionData.ReceiptData && (
              <Group justify="space-between">
                <Text fw={500}>Receipt Data:</Text>
                <Text>{transactionData.ReceiptData}</Text>
              </Group>
            )}
          </Stack>
          
          <Divider w="100%" />
          
          <Group justify="center" gap="md" w="100%">
            <Button 
              leftSection={<IconPrinter />} 
              variant="outline"
              onClick={() => window.print()}
            >
              Print Receipt
            </Button>
            <Button 
              leftSection={<IconHome />}
              color="green"
              onClick={() => navigate(ROUTES.home)}
            >
              Back to Home
            </Button>
          </Group>
        </Stack>
      </Paper>
    </div>
  );
}