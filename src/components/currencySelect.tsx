import { Menu, Button, rem } from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';

export const CurrencyMenu =() =>  {
  const currencies = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'GHS', label: 'Ghana Cedi (GHS)' },
    { value: 'NGN', label: 'Nigerian Naira (NGN)' },
    { value: 'KES', label: 'Kenyan Shilling (KES)' },
    { value: 'ZAR', label: 'South African Rand (ZAR)' },
    { value: 'UGX', label: 'Ugandan Shilling (Uganda)' },
    { value: 'ZMK', label: 'Zambian Kwacha (Zambia)' }
  ]
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <Button rightSection={<IconSelector />} variant='default' style={{border: 'none'}}>GHS</Button>
      </Menu.Target>
  
      <Menu.Dropdown w={100} style={{zIndex: 99999}}>
      {currencies.map((currency) => (
        <Menu.Item key={currency.value} component="a" href="#" onClick={() => {}}>
          {currency.label}
        </Menu.Item>
      ))}

      </Menu.Dropdown>
    </Menu>
  );
}