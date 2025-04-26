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
import CreateGuidePage from './pages/CreateGuide';
// Repair pages
import LaptopPage from './Repair/Laptop';
import AsusPage from './pages/brands/asus';
import AsusTufDash15 from './pages/brands/AsusTufDash15';
import BatteryReplacement from './pages/repair/BatteryReplacement';
import PhoneRepairPage from './Repair/phone';
// Import the OnePlus brand page component
import OnePlusPage from './pages/brands/oneplus';
// Import the OnePlus 9 page component
import OnePlus9Page from './pages/brands/oneplus9';
// Import the new Phone Battery Replacement Page
import PhoneBatteryReplacementPage from './pages/repair/PhoneBatteryReplacementPage';
import OSGuide from './pages/brands/OsGuide'; // Import the OSGuide component
import WindowsInstallGuide from './components/WindowsInstallGuide';


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
                    <Route path="create-guide" element={<CreateGuidePage />} />
                    {/* Repair Section */}
                    <Route path="repair/pclaptop" element={<LaptopPage />} />
                    <Route path="repair/pclaptop/asus" element={<AsusPage />} />
                    <Route path="repair/pclaptop/asus/tuf-dash-f15" element={<AsusTufDash15 />} />
                    <Route path="repair/pclaptop/asus/tuf-dash-f15/battery-replacement" element={<BatteryReplacement />} />
                    <Route path="repair/pclaptop/asus/tuf-dash-f15/os-installation" element={<OSGuide />} /> {/* Add this line */}
                    <Route path="repair/os-windows" element={<WindowsInstallGuide />} />
                    <Route path="repair/phone" element={<PhoneRepairPage />} />
                    {/* Route for the main OnePlus page */}
                    <Route path="repair/phone/oneplus" element={<OnePlusPage />} />
                    {/* Routes for the individual OnePlus phone pages */}
                    <Route path="repair/phone/oneplus/oneplus9" element={<OnePlus9Page />} />
                    {/* Route for the new Phone Battery Replacement Page */}
                    <Route path="repair/phone/oneplus/oneplus9/battery-replacement" element={<PhoneBatteryReplacementPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
