// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import GuidePage from './components/GuideRepair';
import FixYourStuffPage from './components/GuideRepair';
import CommunityPage from './components/Community';
import StorePage from './components/ShopStore';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import './componentStyles/HomePage.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="guide" element={<GuidePage />} />
          <Route path="fix-your-stuff" element={<FixYourStuffPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="store" element={<StorePage />} />
          <Route path="join" element={<JoinPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
