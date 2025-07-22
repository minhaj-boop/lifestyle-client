import React, { use, useEffect } from 'react';
import './App.css';

import Navbar from './customer/components/Navbar/Navbar';
import { ThemeProvider } from '@mui/material';
import customTheme from './Theme/customTheme';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';
import ProductDetails from './customer/pages/ProductDetails/ProductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/pages/AdminDashboard/AdminDashboard';
import { fetchProducts } from './state/fetchProduct';
import store, { useAppDispatch, useAppSelector } from './state/store';
import { fetchSellerProfile } from './state/seller/sellerSlice';


function App() {

  const dispatch = useAppDispatch();
  const { seller } = useAppSelector(store => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSellerProfile(localStorage.getItem('jwt') || ''));
  }, [])

  useEffect(() => {
    if (seller.profile) {
      navigate('/seller');
    }
  }, [seller.profile]);

  return (

    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/weiews/:productId" element={<Review />} />
          <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/seller/*" element={<SellerDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          {/* Add more routes as needed */}
        </Routes>

      </div>
    </ThemeProvider>

  );
}

export default App;
