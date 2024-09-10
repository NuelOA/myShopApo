import { Menu, Button, rem } from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';

export const CurrencyMenu =() =>  {
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <Button rightSection={<IconSelector />} variant='default' style={{border: 'none'}}>GHS</Button>
      </Menu.Target>
      <Menu.Dropdown w={100} style={{zIndex: 99999}}>
        <Menu.Item component="a" href="#">
          USD
        </Menu.Item>
        <Menu.Item component="a" href="#" onClick={()=> {}}>
          GHS
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}