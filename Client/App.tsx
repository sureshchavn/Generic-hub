import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout & Context
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { MedicineProvider } from './context/MedicineContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import HomePage from './pages/HomePage';
import ComparePage from './pages/ComparePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MedicineDetailPage from './pages/MedicineDetailPage';
import AboutPage from './pages/AboutPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import MedicinesListPage from './pages/MedicinesListPage';
import MedicalShopFinder from './pages/MedicalShopFinder';

// Logic & Types
import { findNearbyPharmacies, calculateDistance } from './services/geminiService';
import { ShopLocation, UserLocation, AppStatus } from './types';

const App: React.FC = () => {
  // Shared State for the Store Locator
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearbyShops, setNearbyShops] = useState<ShopLocation[]>([]);
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  // Memoized function to fetch shops (used by Locator and AI Search)
  const fetchNearbyShops = useCallback(async (location: UserLocation) => {
    setAppStatus(AppStatus.SEARCHING_SHOPS);
    try {
      let shops = await findNearbyPharmacies(location);
      // Map distances for sorting
      shops = shops.map(shop => {
        if (shop.latitude && shop.longitude) {
          const dist = calculateDistance(location.latitude, location.longitude, shop.latitude, shop.longitude);
          return { ...shop, distance: dist };
        }
        return shop;
      }).sort((a, b) => (a.distance || 0) - (b.distance || 0));

      setNearbyShops(shops);
      setAppStatus(AppStatus.IDLE);
    } catch (err) {
      setError(`Failed to find shops: ${(err as Error).message}`);
      setAppStatus(AppStatus.ERROR);
    }
  }, []);

  // Browser Geolocation trigger
  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
        setUserLocation(loc);
        fetchNearbyShops(loc);
      },
      (err) => { setError(err.message); setAppStatus(AppStatus.ERROR); }
    );
  }, [fetchNearbyShops]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <MedicineProvider>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                {/* 1. Public Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/medicines" element={<MedicinesListPage />} />
                <Route path="/medicine/:id" element={<MedicineDetailPage />} />
                
                {/* 2. Medical Shop Locator */}
                <Route
                  path="/locator"
                  element={
                    <MedicalShopFinder
                      userLocation={userLocation}
                      shops={nearbyShops}
                      loading={appStatus === AppStatus.SEARCHING_SHOPS}
                      error={error}
                      onFindShops={getUserLocation}
                    />
                  }
                />

                {/* 3. Authentication Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* 4. Protected Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute role="admin">
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            <Footer />
          </div>
        </MedicineProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;