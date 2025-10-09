import {
  IconArrowLeft,
} from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import {
  Button,
  Paper,
  Select,
  Switch,
  Tabs,
  Text,
  TextInput,
  Title,
  NumberInput,
  Group,
  Stack,
} from '@mantine/core';
import { useCurrency } from '../context/currencyContext';

export default function Settings() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<string | null>('Currency');
  const { currencies, currency, updateCurrency, exchangeRates, updateExchangeRate } = useCurrency();
  const [ipAddress, setIpAddress] = useState('');
  const [tempRates, setTempRates] = useState(exchangeRates);
  const [loading, setLoading] = useState(false);

  const fetchCurrentRates = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      const newRates = {
        USD: 1.00,
        EUR: data.rates.EUR || 0.85,
        GBP: data.rates.GBP || 0.73,
        GHS: data.rates.GHS || 12.50,
        NGN: data.rates.NGN || 460.00,
        KES: data.rates.KES || 130.00,
        ZAR: data.rates.ZAR || 18.50,
        UGX: data.rates.UGX || 3700.00,
        ZMK: data.rates.ZMK || 25.00
      };
      setTempRates(newRates);
      Object.entries(newRates).forEach(([curr, rate]) => {
        updateExchangeRate(curr, rate);
      });
      alert('Exchange rates updated with current market rates!');
    } catch (error) {
      alert('Failed to fetch current exchange rates');
    } finally {
      setLoading(false);
    }
  };

  // Load saved IP from localStorage on mount
  useEffect(() => {
    const savedIp = localStorage.getItem('pinpad_ip');
    if (savedIp) {
      setIpAddress(savedIp);
    }
  }, []);

  // Update temp rates when exchange rates change
  useEffect(() => {
    setTempRates(exchangeRates);
  }, [exchangeRates]);

  const handleSaveIp = () => {
    localStorage.setItem('pinpad_ip', ipAddress);
    alert('IP address saved!');
  };

  const handleCancel = () => {
    setIpAddress('');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Sidebar */}
      <div style={{ backgroundColor: '#d2d2d2', height: '100dvh', width: '20%', padding: 40 }}>
        <IconArrowLeft onClick={() => navigate(ROUTES.home)} style={{ cursor: 'pointer' }} />
        <Title order={3} mb={40} mt={20}>Settings</Title>
      </div>

      {/* Main Content */}
      <div style={{ height: '100dvh', width: '80%', padding: 40 }}>
        <Tabs value={tab} onChange={setTab}>
          <Tabs.List>
            <Tabs.Tab fw={'bold'} value="Currency">Currency</Tabs.Tab>
            <Tabs.Tab fw={'bold'} value="Pinpad">Pinpad Settings</Tabs.Tab>
          </Tabs.List>

          {/* Currency Tab */}
          <Tabs.Panel value="Currency" mt={40} p={20}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Title order={3}>Currency Configuration</Title>
            </div>
            <div style={{ maxWidth: 600, margin: '40px auto' }}>
              <Stack gap="md">
                <Select
                  label="Select currency"
                  placeholder="Pick a currency"
                  data={currencies}
                  value={currency}
                  onChange={(value) => value && updateCurrency(value)}
                  searchable
                />
                
                <Title order={4} mt="xl">Exchange Rates (relative to USD)</Title>
                <Text size="sm" c="dimmed">Update exchange rates for currency conversion</Text>
                
                {currencies.map((curr) => (
                  <Group key={curr.value} justify="space-between">
                    <Text fw={500}>{curr.label}</Text>
                    <NumberInput
                      value={tempRates[curr.value]}
                      onChange={(value) => setTempRates(prev => ({ ...prev, [curr.value]: Number(value) || 0 }))}
                      decimalScale={4}
                      fixedDecimalScale
                      w={120}
                    />
                  </Group>
                ))}
                
                <Group justify="center" mt="md" gap="md">
                  <Button 
                    onClick={fetchCurrentRates}
                    loading={loading}
                    variant="outline"
                  >
                    Get Current Rates
                  </Button>
                  <Button 
                    onClick={() => {
                      Object.entries(tempRates).forEach(([curr, rate]) => {
                        updateExchangeRate(curr, rate);
                      });
                      alert('Exchange rates updated!');
                    }}
                    color="green"
                  >
                    Save Exchange Rates
                  </Button>
                </Group>
              </Stack>
            </div>
          </Tabs.Panel>

          {/* Pinpad Tab */}
          <Tabs.Panel value="Pinpad" p={20} mt={40}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Title order={3}>Pinpad Configuration</Title>
            </div>

            {/* Debug Mode Switch */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Text fw="bold">Debug Mode</Text>
                <Switch color="#008000" size="lg" />
              </div>
            </div>

            {/* IP Address Input + Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 30,
              gap: 20,
              flexWrap: 'wrap',
              alignItems: 'flex-end'
            }}>
              <TextInput
                label="Pinpad IP Address"
                placeholder="000.000.0.0.00"
                style={{ minWidth: 250 }}
                value={ipAddress}
                onChange={(e) => setIpAddress(e.currentTarget.value)}
              />
              <Button color="red" mt="md" onClick={handleCancel}>Cancel</Button>
              <Button color="#008000" mt="md" onClick={handleSaveIp}>Save</Button>
            </div>
          </Tabs.Panel>

        </Tabs>
      </div>
    </div>
  );
}
