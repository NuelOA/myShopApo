import React from 'react';
import { Modal, Text, Title, Divider, Group, Stack, Button } from '@mantine/core';
import { IconCheck, IconPrinter, IconX } from '@tabler/icons-react';

interface TransactionData {
  MessageType?: string;
  TransactionType?: string;
  TellerID?: string;
  TellerName?: string;
  DateTime?: string;
  TransactionID?: string;
  InvoiceNo?: string;
  ReferenceNo?: string;
  TenderType?: string;
  Currency?: string;
  CurrencySymbol?: string;
  TransactionAmount?: string;
  CashBackAmount?: string;
  Narration?: string;
  ResponseCode?: string;
  ResponseText?: string;
  PAN?: string;
  AuthorizationCode?: string;
  AuthorizationReference?: string;
  Account1?: string;
  Account2?: string;
  EchoData?: string;
  ReceiptData?: string;
  TransactionId?: string; // For mock responses
}

interface ReceiptModalProps {
  opened: boolean;
  onClose: () => void;
  transactionData: TransactionData | null;
}

export function ReceiptModal({ opened, onClose, transactionData }: ReceiptModalProps) {
  if (!transactionData) return null;

  const formatDateTime = (dateTime?: string) => {
    if (!dateTime) return 'N/A';
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
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={
        <Group>
          <IconCheck size={24} color="green" />
          <Title order={3} c="green">Payment Successful!</Title>
        </Group>
      }
      size="md"
      centered
    >
      <Stack gap="md">
        <Divider />
        
        <Stack gap="xs">
          <Group justify="space-between">
            <Text fw={500}>Transaction ID:</Text>
            <Text>{transactionData.TransactionID || transactionData.TransactionId || 'N/A'}</Text>
          </Group>
          
          <Group justify="space-between">
            <Text fw={500}>Amount:</Text>
            <Text fw={700} size="lg">
              {transactionData.CurrencySymbol || 'USD'} {transactionData.TransactionAmount || '0.00'}
            </Text>
          </Group>
          
          <Group justify="space-between">
            <Text fw={500}>Date & Time:</Text>
            <Text>{formatDateTime(transactionData.DateTime)}</Text>
          </Group>
          
          <Group justify="space-between">
            <Text fw={500}>Reference:</Text>
            <Text>{transactionData.ReferenceNo || 'N/A'}</Text>
          </Group>
          
          {transactionData.PAN && (
            <Group justify="space-between">
              <Text fw={500}>Card:</Text>
              <Text>{transactionData.PAN}</Text>
            </Group>
          )}
          
          {transactionData.AuthorizationCode && (
            <Group justify="space-between">
              <Text fw={500}>Auth Code:</Text>
              <Text>{transactionData.AuthorizationCode}</Text>
            </Group>
          )}
          
          {transactionData.AuthorizationReference && (
            <Group justify="space-between">
              <Text fw={500}>Payment Type:</Text>
              <Text>{transactionData.AuthorizationReference}</Text>
            </Group>
          )}
          
          {transactionData.ReceiptData && (
            <Group justify="space-between">
              <Text fw={500}>Receipt Data:</Text>
              <Text>{transactionData.ReceiptData}</Text>
            </Group>
          )}
        </Stack>
        
        <Divider />
        
        <Group justify="center" gap="md">
          <Button 
            leftSection={<IconPrinter />} 
            variant="outline"
            onClick={() => window.print()}
          >
            Print Receipt
          </Button>
          <Button 
            leftSection={<IconX />}
            color="green"
            onClick={onClose}
          >
            Close
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}