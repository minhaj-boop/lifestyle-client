import React from 'react';
import './App.css';

import Navbar from './customer/components/Navbar/Navbar';
import { ThemeProvider } from '@mui/material';
import customTheme from './Theme/customTheme';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';

function App() {
  return (

    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />
        {/* <Home /> */}
        <Product />
      </div>
    </ThemeProvider>

  );
}

export default App;
