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
} from '@mantine/core';
import { useCurrency } from '../context/currencyContext';

export default function Settings() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<string | null>('Currency');
  const { currencies } = useCurrency();
  const [ipAddress, setIpAddress] = useState('');

  // Load saved IP from localStorage on mount
  useEffect(() => {
    const savedIp = localStorage.getItem('pinpad_ip');
    if (savedIp) {
      setIpAddress(savedIp);
    }
  }, []);

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
            <div style={{ maxWidth: 400, margin: '40px auto' }}>
              <Select
                label="Select currency"
                placeholder="Pick a currency"
                data={currencies}
                searchable
              />
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
