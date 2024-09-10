import React, { useState } from "react";
import { IconBottle, IconPower, IconSettings } from "@tabler/icons-react";
// import { CurrencyMenu } from './currencySelect';
import { Divider, Select, Text } from "@mantine/core";
import { useCurrency } from "../context/currencyContext";
import logo from '../assets/logo/logo.png'
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";

export default function Navbar() {
  const { currency, updateCurrency } = useCurrency();
  const navigate = useNavigate()

  // const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     updateCurrency(event.target.value);
  //   };

  return (
   <div style={{ display: 'flex', justifyContent: 'center'}}>
     <div style={{ position: "fixed", top: 0, width: "80%", zIndex: 99 }}>
      <div style={NavStyle}>
        <div>
          <IconSettings onClick={()=> navigate(ROUTES.settings)} style={{ cursor: 'pointer'}}/>
        </div>
        <div> <img src={logo} width={70}/> </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Select
            styles={(theme) => ({
              input: {
                border: "none",
                boxShadow: "none",
                backgroundColor: 'transparent',
                zIndex: 9999,
                textAlign: "end",
              },
            })}
            value={currency}
            onChange={(e: any) => updateCurrency(e)}
            w={100}
            mr={20}
            data={["USD", "GHS", "ZiG"]}
          />
          {/* <Divider orientation="vertical" /> */}
          {/* <IconPower color="red" style={{ marginLeft: 10 }} /> */}
        </div>
      </div>
      <div style={subNavStyle}>
        SHOP EVERYDAY EVERYWHERE
        <div></div>
      </div>
    </div>
   </div>
  );
}

const NavStyle: React.CSSProperties = {
  backgroundColor: '#fff',  //f2f2f2
  height: 50,
  display: "flex",
  justifyContent: "space-between",
  paddingInline: 30,
  alignItems: "center",
};
const subNavStyle: React.CSSProperties = {
  backgroundColor: "green",
  height: 30,
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  color: "#fff",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: 12,
};
