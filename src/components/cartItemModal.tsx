import { useDisclosure } from "@mantine/hooks";
import { Alert, Button, Modal, Text, Title, Table, Divider, Loader } from "@mantine/core";
import { CartItem } from "../types/cartType";
import { useCart } from "../context/cartContext";
import {
  IconCreditCard,
  IconPhoneCheck,
  IconQrcode,
  IconShoppingCartOff,
  IconTrash,
} from "@tabler/icons-react";
import { formatCurrency } from "../utils/currencyFormatter";
import { useCurrency } from "../context/currencyContext";
import { useState } from "react";
import { makePayment } from "../services/core-api";

type ModalCartItemProps = {
  opened: boolean;
  onClose: () => void;
  pay: boolean;
  showCart: boolean
};

const paymentMethods = [
  { title: "Card" },
  { title: "Mobile" },
  { title: "QR" },
];

export function ModalCartItem({ opened, onClose, pay, showCart }: ModalCartItemProps) {
  // Destructure props
  const { cart, removeFromCart, clearCart, total } = useCart();
  const { currency } = useCurrency();
  const [payScreen, setPayScreen] = useState(pay);
  const [cartScreen, setCartScreen] = useState(showCart);
  const [loading, setLoading] = useState(false)
 
  console.log(cartScreen)

  const rows = cart.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.quantity}</Table.Td>
      <Table.Td>{formatCurrency(item.price, currency)}</Table.Td>
      <Table.Td>
        {
          <IconTrash
            style={{ cursor: "pointer" }}
            color="red"
            onClick={() => removeFromCart(item.id)}
          />
        }
      </Table.Td>
    </Table.Tr>
  ));

  const payNow = async () => {
    setLoading(true)
    try {
      const data = await makePayment(total.toFixed(2));
      if(data.ResponseText === 'Approved'){
        setLoading(false)
        alert('payment successful')
      }
    } catch (err) {
      alert(err)
      setLoading(false)
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        size={"60%"}
        opened={opened}
        onClose={onClose}
        // title={<Title order={3}>Item Details</Title>}
        centered
      >
        
        <div
          style={{
            paddingInline: "3%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "70dvh",
            marginTop: 30,
          }}
        >
          {
            payScreen ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
           
                {loading ? <>
                  <Text style={{ fontSize: 13 }}> Amount {formatCurrency(total, currency)} </Text>
                  <Loader mt={20} color="#000" />
                  <Text mt={20} style={{ fontSize: 13 }}> Processing Transaction </Text>
                </>
                : 
                <>
              <Text style={{ fontSize: 13 }}> Payment Amount </Text>
                 <Title mt={15} mb={10} order={1}>
                  {formatCurrency(total, currency)}
                </Title>
                <Text style={{ fontSize: 13 }}> Select payment method </Text>
                </>
                }
                

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: loading ? "#dedede": "green",
                    marginTop: 40,
                    height: 200,
                    width: "100%",
                  }}
                >
                 {paymentMethods.map((method) => {
  return (
    <>
      <div
        style={{
          cursor: 'pointer',
          borderRight: method.title !== 'QR' ? '2px solid white' : 'none',
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
       
        {method.title === 'Card' ? (
          <button
          onClick={payNow}
          disabled={loading}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              backgroundColor: 'transparent',
              border: 'none',
              alignItems: 'center'
            }}
          >
            <div>
              <IconCreditCard
                style={{
                  backgroundColor: '#7cb07d52',
                  padding: 10,
                  borderRadius: 100,
                }}
                color="#fff"
                size={60}
              />
              
            </div>
            <div>
              <Text c={'#FFF'}>Card</Text>
            </div>
          </button>
        ) : method.title === 'Mobile' ? (
          <button
          onClick={payNow}
          disabled={loading}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              backgroundColor: 'transparent',
              alignItems: 'center',
              border: 'none'
            }}
          >
            <div>
              <IconPhoneCheck
                style={{
                  backgroundColor: '#7cb07d52',
                  padding: 10,
                  borderRadius: 100,
                }}
                color="#fff"
                size={60}
              />
            </div>
            <div>
              <Text c={'#FFF'}>Mobile</Text>
            </div>
          </button>
        ) : (
          <button
          onClick={payNow}
          disabled={loading}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              backgroundColor: 'transparent',
              alignItems: 'center',
              border: 'none'

            }}
          >
            <div>
              <IconQrcode
                style={{
                  backgroundColor: '#7cb07d52',
                  padding: 10,
                  borderRadius: 100,
                }}
                color="#fff"
                size={60}
              />
            </div>
            <div>
              <Text c={'#FFF'}>QR</Text>
            </div>
          </button>
        )}
      </div>
    </>
  );
})}


                </div>
              </div>
            ) : (
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
            )

            // :  <div>
            //   {cart.map((item) => (
            //     <>
            //       <div
            //         key={item.id}
            //         style={{
            //           display: "flex",
            //           flexDirection: "row",
            //           justifyContent: "space-between",
            //           width: "100%",
            //           borderBottom: '1px solid #dedede',
            //           padding: 10,
            //           // backgroundColor: '#ececec',
            //           marginRight: 10,
            //           marginBlock: 5
            //         }}
            //       >
            //        <div>
            //        {/* <div>
            //           <img src={item.image} width={70} alt="image"/>
            //           </div> */}
            //           <Text fw={'bold'}>
            //           {item.name}
            //         </Text>
            //        </div>

            //        <Text>QTY: {item.quantity}</Text>

            //         <div style={{ display:'flex'}}>
            //          <div>
            //         <Text>Price: {formatCurrency(item.price, currency)}</Text>
            //          </div>
            //         </div>
            //        <div>
            //        <IconTrash style={{ cursor: 'pointer'}} color="red" onClick={() => removeFromCart(item.id)} />
            //        </div>
            //       </div>
            //     </>
            //   ))}
            //   </div>
          }

          <div style={{ marginBottom: 20 }}>
            {/* <Alert color="green" mt={20}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text fw={"bold"}>Total</Text>
                <Text>{formatCurrency(total, currency)}</Text>
              </div>
            </Alert> */}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                h={50}
                disabled={cart.length === 0 || payScreen === true}
                w={"50%"}
                mb={20}
                m={5}
                mt={20}
                leftSection={<IconShoppingCartOff />}
                color="red"
                onClick={clearCart}
              >
                Clear Cart
              </Button>

              <Button
                onClick={() => setPayScreen(!payScreen)}
                h={50}
                m={5}
                disabled={cart.length === 0}
                mt={20}
                mb={20}
                color={payScreen ? "red" : "#008000"}
                w={"50%"}
              >
                {" "}
                {payScreen ? "Cancel" : "Complete payment"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
