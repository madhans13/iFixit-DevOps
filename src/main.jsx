import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout and shared pages
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

// Repair pages
import LaptopPage from './Repair/Laptop';
import AsusPage from './pages/brands/asus';
import AsusTufDash15 from './pages/brands/AsusTufDash15';
import BatteryReplacement from './pages/repair/BatteryReplacement';

// Styles
import './componentStyles/HomePage.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main Pages */}
          <Route index element={<HomePage />} />
          <Route path="guide" element={<GuidePage />} />
          <Route path="fix-your-stuff" element={<FixYourStuffPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="store" element={<StorePage />} />
          <Route path="join" element={<JoinPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="account" element={<AccountPage />} />

          {/* Repair Section */}
          <Route path="repair/pclaptop" element={<LaptopPage />} />
          <Route path="repair/pclaptop/asus" element={<AsusPage />} />
          <Route path="repair/pclaptop/asus/tuf-dash-f15" element={<AsusTufDash15 />} />
          <Route path="repair/pclaptop/asus/tuf-dash-f15/battery-replacement" element={<BatteryReplacement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
