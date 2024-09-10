
import './App.css';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import Router from './routes/router';
import { CurrencyProvider } from './context/currencyContext';
import { CartProvider } from './context/cartContext';

const theme = createTheme({
});


function App() {
  return (
  <MantineProvider theme={theme}>
    <CurrencyProvider>
      <CartProvider>
      <Router />
      </CartProvider>
    </CurrencyProvider>
     </MantineProvider>
   
  );
}

export default App;
