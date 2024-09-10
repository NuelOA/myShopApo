import React, { useEffect, useState } from "react";
import { getDrinks } from "../services/core-api";
import { Badge, Button, Card, CardSection, Group, Image, Text } from "@mantine/core";
import { IconPlus, IconMinus, IconBottle, IconPizza } from "@tabler/icons-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCurrency } from "../context/currencyContext";
import { useCart } from "../context/cartContext";
import { cartData } from "../data/drinks";
import { formatCurrency } from "../utils/currencyFormatter";

export default function Home() {
  const [drinksData, setDrinksData] = useState<cartData[]>([]);
  const { currency } = useCurrency();
  const { addToCart, updateCart, removeFromCart, cart } = useCart();
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDrinks();
      const items = data.map((data) => data);
      setDrinksData(items);
    };

    fetchData();
  }, []);

  const handleCardClick = (drinkId: string) => {
    setHighlightedCard(drinkId);
    setTimeout(() => {
      setHighlightedCard(null);
    }, 100);
  };

  const getItemQuantity = (drinkId: string) => {
    const item = cart.find((cartItem) => cartItem.id === drinkId);
    return item ? item.quantity : 0;
  };

  const incrementQuantity = (drinkId: string) => {
    const item = cart.find((cartItem) => cartItem.id === drinkId);
    if (item) {
      updateCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity + 1,
        image: item.image,
      });
    } else {
      addToCart({
        id: drinkId,
        name: drinkId,
        price: 0, 
        quantity: 1,
        image: ''
      });
    }
  };

  const decrementQuantity = (drinkId: string) => {
    const item = cart.find((cartItem) => cartItem.id === drinkId);
    if (item && item.quantity > 1) {
      updateCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity - 1,
        image: item.image,
      });
    } else if (item && item.quantity === 1) {
      removeFromCart(item.id);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{ overflow: "auto", width: "80%", backgroundColor: "#fff" }}
        >
          {drinksData.map((data, index) => (
            <>
              <div
                style={{
                  marginLeft: 20,
                  marginTop: 100,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {data.category === 'Drinks' ? <IconBottle /> : <IconPizza />} <Text>{data.category}</Text>
              </div>

              <div style={itemStyle}>
                {data.items.map((drink) => (
                  <Card
                  className="fade-in"
                    onClick={() => {
                      addToCart({
                        id: drink.drink,
                        name: drink.drink,
                        price: parseFloat(drink.price),
                        quantity: 1,
                        image: drink.image,
                      });
                      handleCardClick(drink.drink);
                    }}
                    key={index}
                    w={250}
                    m={10}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{
                      cursor: "pointer",
                      border:
                        highlightedCard === drink.drink
                          ? "1.2px solid red"
                          : "1px solid #e0e0e0"
                    }}
                  >
                    <Card.Section p={10}>
                      <Image
                        src={drink.image}
                        height={195}
                        alt={drink.drink}
                      />
                    </Card.Section>

                    <Card.Section p={10} bg={'#ecececec'} h={'100%'}>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                   <Text fw={'bold'}>{drink.drink}</Text>
  
                      <Text c="red" mt={5} fw={'bold'} variant="filled">
                       {formatCurrency(parseFloat(drink.price), currency)}
                      </Text>
                   </div>

                    {/* <Text size="sm" c="dimmed">
                      {drink.size}
                    </Text> */}

                    {getItemQuantity(drink.drink) > 0 ? (
                      <Group justify="center" align="center" mt="md">
                        <Button
                           mr={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            decrementQuantity(drink.drink);
                          }}
                          size="xs"
                          variant="outline"
                          color="red"
                        >
                          <IconMinus size={16} />
                        </Button>
                        <Text>{getItemQuantity(drink.drink)}</Text>
                        <Button
                           ml={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            incrementQuantity(drink.drink);
                          }}
                          size="xs"
                          variant="outline"
                          color="green"
                        >
                          <IconPlus size={16} />
                        </Button>
                      </Group>
                    ) : (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents triggering the card's onClick
                          addToCart({
                            id: drink.drink,
                            name: drink.drink,
                            price: parseFloat(drink.price),
                            quantity: 1,
                            image: drink.image,
                          });
                          handleCardClick(drink.drink);
                        }}
                        color="green"
                        variant="outline"
                        fullWidth
                        mt="md"
                        radius="md"
                        style={{ fontWeight: "bold" }}
                      >
                        + Add
                      </Button>
                    )}
                    </Card.Section>

                  </Card>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
      <Footer currency={`${currency}`} />
    </>
  );
}

const itemStyle: React.CSSProperties = {
  marginBottom: 100,
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
};
