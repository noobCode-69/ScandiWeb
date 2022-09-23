import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './pages/Layout';
import THEME from './theme';
import ProductsList from './components/productsList/ProductsList';
import Product from './components/Product/Product';
import Cart from './components/cart/Cart';
import Error from './components/Error/Error';

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route exact path="/:categoryId/:productId" element={<Product />} />
            <Route exact path="/:categoryId" element={<ProductsList />} />
            <Route exact path="/cart" element={<Cart />} />
          </Route>
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
