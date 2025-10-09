import { Button, Indicator, Text, Drawer, Table, Group, Stack, Title, Loader } from '@mantine/core'
import { IconShoppingBag, IconShoppingCart, IconTrash, IconShoppingCartOff, IconCreditCard, IconPhoneCheck, IconQrcode, IconCheck } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useCart } from '../context/cartContext'
import { useCurrency } from '../context/currencyContext'
import { formatCurrency } from '../utils/currencyFormatter'
import { useDisclosure } from '@mantine/hooks';
import { makePayment } from '../services/core-api';

interface currencyType {
    currency: string
}

const paymentMethods = [
  { title: "Card" },
  { title: "Mobile" },
  { title: "QR" },
];

export default function Footer( currency: currencyType ) {
  const {total, cart, removeFromCart, clearCart } = useCart()
  const { convertPrice } = useCurrency()
  const [opened, { open, close }] = useDisclosure(false)
  const [payScreen, setPayScreen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successModal, setSuccessModal] = useState(false)


  const payNow = async () => {
    setLoading(true);
    try {
      const data = await makePayment(convertPrice(total).toFixed(2), currency.currency);
      if (data.ResponseText === "Approved") {
        setLoading(false);
        setSuccessModal(true);
        clearCart();
        setPayScreen(false);
      }
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  };

  const rows = cart.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.quantity}</Table.Td>
      <Table.Td>{formatCurrency(convertPrice(item.price), currency.currency)}</Table.Td>
      <Table.Td>
        <IconTrash
          style={{ cursor: "pointer" }}
          color="red"
          onClick={() => removeFromCart(item.id)}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
   <>
     <div style={{ display: 'flex', justifyContent: 'center'}}>
       <div style={footerstyle}>
          <Button color='#000' onClick={open} disabled={cart.length <= 0} style={{ display:'flex', cursor: 'pointer', justifyContent: 'center', alignItems:'center', width: '100%', height: 50}}>
            <Indicator style={{ marginInline: 15}} size={15} color='red' inline label={cart.length}> 
              <IconShoppingCart />
            </Indicator>
            <Text mr={20}>{formatCurrency(convertPrice(total), currency.currency)}</Text>
          </Button>
       </div>
     </div>

     <Drawer opened={opened} onClose={() => {
       close();
       setPayScreen(false);
     }} position="bottom" size="70%" title={payScreen ? "Payment" : "Cart Items"} styles={{
       content: {
         width: '100%',
         maxWidth: '1200px',
         margin: '0 auto',
         left: '50%',
         transform: 'translateX(-50%)',
         borderTopLeftRadius: '16px',
         borderTopRightRadius: '16px'
       }
     }}>
       <div style={{ padding: 20, height: '100%', display: 'flex', flexDirection: 'column' }}>
         {payScreen ? (
           <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
             {loading ? (
               <>
                 <Text size="sm">Amount {formatCurrency(convertPrice(total), currency.currency)}</Text>
                 <Loader mt={20} color="#000" />
                 <Text mt={20} size="sm">Processing Transaction</Text>
               </>
             ) : (
               <>
                 <Text size="sm">Payment Amount</Text>
                 <Title mt={15} mb={10} order={1}>
                   {formatCurrency(convertPrice(total), currency.currency)}
                 </Title>
                 <Text size="sm">Select payment method</Text>
               </>
             )}

             <div style={{
               display: 'flex',
               justifyContent: 'space-around',
               backgroundColor: loading ? '#dedede' : 'green',
               marginTop: 40,
               height: 200,
               width: '100%',
               borderRadius: 8
             }}>
               {paymentMethods.map((method) => (
                 <div key={method.title} style={{
                   cursor: 'pointer',
                   borderRight: method.title !== 'QR' ? '2px solid white' : 'none',
                   height: '100%',
                   width: '100%',
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center'
                 }}>
                   <button onClick={payNow} disabled={loading} style={{
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                     textAlign: 'center',
                     backgroundColor: 'transparent',
                     border: 'none',
                     alignItems: 'center'
                   }}>
                     <div>
                       {method.title === 'Card' && <IconCreditCard style={{ backgroundColor: '#7cb07d52', padding: 10, borderRadius: 100 }} color="#fff" size={60} />}
                       {method.title === 'Mobile' && <IconPhoneCheck style={{ backgroundColor: '#7cb07d52', padding: 10, borderRadius: 100 }} color="#fff" size={60} />}
                       {method.title === 'QR' && <IconQrcode style={{ backgroundColor: '#7cb07d52', padding: 10, borderRadius: 100 }} color="#fff" size={60} />}
                     </div>
                     <Text c="#FFF">{method.title}</Text>
                   </button>
                 </div>
               ))}
             </div>
           </div>
         ) : (
           <>
             <Table>
               <Table.Thead>
                 <Table.Tr>
                   <Table.Th>Product</Table.Th>
                   <Table.Th>Quantity</Table.Th>
                   <Table.Th>Price</Table.Th>
                   <Table.Th>Action</Table.Th>
                 </Table.Tr>
               </Table.Thead>
               <Table.Tbody>{rows}</Table.Tbody>
             </Table>
           </>
         )}

         <Group justify="center" mt="xl" gap="md">
           <Button
             disabled={cart.length === 0 || payScreen}
             leftSection={<IconShoppingCartOff />}
             color="red"
             onClick={clearCart}
           >
             Clear Cart
           </Button>
           <Button
             onClick={() => setPayScreen(!payScreen)}
             disabled={cart.length === 0}
             color={payScreen ? "red" : "#008000"}
           >
             {payScreen ? "Back to Cart" : "Proceed to Payment"}
           </Button>
         </Group>
       </div>
     </Drawer>
   </>
  )
}

const footerstyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0, 
    width: '100%',
    maxWidth: '1200px',
    alignItems:'center', 
    color: '#fff',
    display: 'flex', 
    flexDirection:'row',
    justifyContent: 'space-between',
    padding: '0 20px',
    boxSizing: 'border-box'
}
