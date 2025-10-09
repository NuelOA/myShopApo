import { useDisclosure } from "@mantine/hooks";
import {
  Alert,
  Button,
  Modal,
  Text,
  Title,
  Table,
  Loader,
} from "@mantine/core";
import { IconCreditCard, IconPhoneCheck, IconQrcode, IconShoppingCartOff, IconTrash, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useCart } from "../context/cartContext";
import { useCurrency } from "../context/currencyContext";
import { formatCurrency } from "../utils/currencyFormatter";
import { makePayment } from "../services/core-api";

type ModalCartItemProps = {
  opened: boolean;
  onClose: () => void;
  pay: boolean;
  showCart: boolean;
};

const paymentMethods = [
  { title: "Card" },
  { title: "Mobile" },
  { title: "QR" },
];

export function ModalCartItem({ opened, onClose, pay, showCart }: ModalCartItemProps) {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const { currency, convertPrice } = useCurrency();
  const [payScreen, setPayScreen] = useState(pay);
  const [cartScreen, setCartScreen] = useState(showCart);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const rows = cart.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.quantity}</Table.Td>
      <Table.Td>{formatCurrency(convertPrice(item.price), currency)}</Table.Td>
      <Table.Td>
        <IconTrash
          style={{ cursor: "pointer" }}
          color="red"
          onClick={() => removeFromCart(item.id)}
        />
      </Table.Td>
    </Table.Tr>
  ));

  const payNow = async () => {
    setLoading(true);
    try {
      const data = await makePayment(total.toFixed(2), currency);
      if (data.ResponseText === "Approved") {
        setLoading(false);
        setSuccessModal(true);
        clearCart();
        setPayScreen(false);
      }
    } catch (err) {
      alert(err);
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <Modal size="60%" opened={opened} onClose={onClose} centered>
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
          {payScreen ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <>
                  <Text style={{ fontSize: 13 }}>Amount {formatCurrency(convertPrice(total), currency)}</Text>
                  <Loader mt={20} color="#000" />
                  <Text mt={20} style={{ fontSize: 13 }}>Processing Transaction</Text>
                </>
              ) : (
                <>
                  <Text style={{ fontSize: 13 }}>Payment Amount</Text>
                  <Title mt={15} mb={10} order={1}>
                    {formatCurrency(convertPrice(total), currency)}
                  </Title>
                  <Text style={{ fontSize: 13 }}>Select payment method</Text>
                </>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: loading ? "#dedede" : "green",
                  marginTop: 40,
                  height: 200,
                  width: "100%",
                }}
              >
                {paymentMethods.map((method) => (
                  <div
                    key={method.title}
                    style={{
                      cursor: "pointer",
                      borderRight: method.title !== "QR" ? "2px solid white" : "none",
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={payNow}
                      disabled={loading}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        {method.title === "Card" && <IconCreditCard style={{ backgroundColor: "#7cb07d52", padding: 10, borderRadius: 100 }} color="#fff" size={60} />}
                        {method.title === "Mobile" && <IconPhoneCheck style={{ backgroundColor: "#7cb07d52", padding: 10, borderRadius: 100 }} color="#fff" size={60} />}
                        {method.title === "QR" && <IconQrcode style={{ backgroundColor: "#7cb07d52", padding: 10, borderRadius: 100 }} color="#fff" size={60} />}
                      </div>
                      <div>
                        <Text c={"#FFF"}>{method.title}</Text>
                      </div>
                    </button>
                  </div>
                ))}
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
          )}

          <div style={{ marginBottom: 20 }}>
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
                {payScreen ? "Cancel" : "Complete payment"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        opened={successModal}
        onClose={() => {
          setSuccessModal(false);
          onClose();
        }}
        size="sm"
        centered
        withCloseButton={false}
      >
        <div style={{ textAlign: "center", padding: 20 }}>
          <IconCheck size={60} color="green" style={{ marginBottom: 20 }} />
          <Title order={3}>Payment Successful</Title>
          <Text mt={10}>Thank you for your purchase!</Text>
          <Button color="#000" fullWidth mt={30} onClick={() => {
            setSuccessModal(false);
            onClose();
          }}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}
