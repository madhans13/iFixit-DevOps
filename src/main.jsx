import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

// Layout and shared pages
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import GuidePage from './components/GuideRepair';
import FixYourStuffPage from './components/GuideRepair';
import CommunityPage from './components/Community';
import StorePage from './components/ShopStore';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import VerifyEmail from './pages/VerifyEmail';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import CreateGuidePage from './pages/CreateGuide';
import AdminDashboard from './pages/admin/Dashboard';

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
import './componentStyles/AdminDashboard.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            {/* Public Pages */}
                            <Route index element={<HomePage />} />
                            <Route path="guide" element={<GuidePage />} />
                            <Route path="fix-your-stuff" element={<FixYourStuffPage />} />
                            <Route path="community" element={<CommunityPage />} />
                            
                            {/* Store Routes */}
                            <Route path="store">
                                <Route index element={<StorePage />} />
                                <Route path="phone-parts" element={<StorePage />} />
                                <Route path="laptop-parts" element={<StorePage />} />
                                <Route path="phone-software" element={<StorePage />} />
                                <Route path="laptop-software" element={<StorePage />} />
                                <Route path="screens" element={<StorePage />} />
                                <Route path="batteries" element={<StorePage />} />
                                <Route path="chargers" element={<StorePage />} />
                                <Route path="keyboards" element={<StorePage />} />
                                <Route path="motherboards" element={<StorePage />} />
                                <Route path="cooling-fans" element={<StorePage />} />
                                <Route path=":category/:product" element={<StorePage />} />
                            </Route>

                            <Route path="join" element={<JoinPage />} />
                            <Route path="login" element={<LoginPage />} />
                            <Route path="verify-email/:token" element={<VerifyEmail />} />
                            
                            {/* Protected Pages */}
                            <Route path="cart" element={
                                <ProtectedRoute>
                                    <CartPage />
                                </ProtectedRoute>
                            } />
                            <Route path="account" element={
                                <ProtectedRoute>
                                    <AccountPage />
                                </ProtectedRoute>
                            } />
                            <Route path="create-guide" element={
                                <ProtectedRoute>
                                    <CreateGuidePage />
                                </ProtectedRoute>
                            } />
                            
                            {/* Admin Routes */}
                            <Route path="admin" element={
                                <ProtectedRoute requiredRole="admin">
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="admin/guides" element={
                                <ProtectedRoute requiredRole="admin">
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="admin/users" element={
                                <ProtectedRoute requiredRole="admin">
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } />
                            
                            {/* Repair Section */}
                            <Route path="repair/pclaptop" element={<LaptopPage />} />
                            <Route path="repair/pclaptop/asus" element={<AsusPage />} />
                            <Route path="repair/pclaptop/asus/tuf-dash-f15" element={<AsusTufDash15 />} />
                            <Route path="repair/pclaptop/asus/tuf-dash-f15/battery-replacement" element={<BatteryReplacement />} />
                            <Route path="repair/pclaptop/asus/tuf-dash-f15/os-installation" element={<OSGuide />} />
                            <Route path="repair/os-windows" element={<WindowsInstallGuide />} />
                            <Route path="repair/phone" element={<PhoneRepairPage />} />
                            <Route path="repair/phone/oneplus" element={<OnePlusPage />} />
                            <Route path="repair/phone/oneplus/oneplus9" element={<OnePlus9Page />} />
                            <Route path="repair/phone/oneplus/oneplus9/battery-replacement" element={<PhoneBatteryReplacementPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
