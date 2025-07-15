import React from 'react';
import './App.css';

import Navbar from './customer/components/Navbar/Navbar';
import { ThemeProvider } from '@mui/material';
import customTheme from './Theme/customTheme';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';
import ProductDetails from './customer/pages/ProductDetails/ProductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';


function App() {
  return (

    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />
        {/* <Home /> */}
        {/* <Product /> */}
        {/* <ProductDetails /> */}
        {/* <Review /> */}
        <Cart />
      </div>
    </ThemeProvider>

  );
}

export default App;
