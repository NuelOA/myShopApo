import { Button, Indicator, Text } from '@mantine/core'
import { IconShoppingBag, IconShoppingCart } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useCart } from '../context/cartContext'
import { formatCurrency } from '../utils/currencyFormatter'
import { ModalCartItem } from './cartItemModal'
import { useDisclosure } from '@mantine/hooks';


interface currencyType {
    currency: string
}
export default function Footer( currency: currencyType ) {
  const {total, cart } = useCart()
  const [opened, { open, close }] = useDisclosure(false)
  const [paynow, setPayNow] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)


  return (
   <div style={{ display: 'flex', justifyContent: 'center'}}>
          <ModalCartItem showCart={cartOpen ? true : false} opened={opened} onClose={close} pay={paynow ? true : false}/>
     <div style={footerstyle}>
        <Button color='#000' onClick={()=> {
          setPayNow(false)
          open()
        }} disabled={cart.length <= 0 ? true : false}  style={{ display:'flex', cursor: 'pointer', justifyContent: 'center', alignItems:'center', width: '50%', height: 50}}><Indicator style={{ marginInline: 15}}  size={15} color='red' inline label={cart.length}> <IconShoppingCart /></Indicator>
        <Text mr={20}>{formatCurrency(total, currency.currency)}</Text>
        </Button>
        <Button color={'#008000'} disabled={cart.length <= 0 ? true : false} onClick={()=> {
          setCartOpen(true)
          open()
        }} style={{ borderRadius: 'none', height: 50, alignItems:'center', display: 'flex', width: '50%', justifyContent: 'center', fontWeight: 'bold'}}> Pay Now</Button>
        </div>
   </div>
  )
}

const footerstyle: React.CSSProperties = {
    // backgroundColor: '#000',
    position: 'fixed',
     bottom: 0, 
     width: '80%',
    alignItems:'center', 
     color: '#fff',
     display: 'flex', 
     flexDirection:'row',
     justifyContent: 'space-between'
}
