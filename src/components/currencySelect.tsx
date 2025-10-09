import { Menu, Button, rem } from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';
import { useCurrency } from '../context/currencyContext';

export const CurrencyMenu =() =>  {
  const { currency, currencies, updateCurrency } = useCurrency();
  
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <Button rightSection={<IconSelector />} variant='default' style={{border: 'none'}}>{currency}</Button>
      </Menu.Target>
  
      <Menu.Dropdown w={100} style={{zIndex: 99999}}>
      {currencies.map((curr) => (
        <Menu.Item key={curr.value} onClick={() => updateCurrency(curr.value)}>
          {curr.label}
        </Menu.Item>
      ))}

      </Menu.Dropdown>
    </Menu>
  );
}