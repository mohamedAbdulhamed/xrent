import { Routes, Route } from "react-router-dom";
import React from "react";

import Login from "./scenes/auth/login.tsx";
import RegisterForm from "./scenes/auth/register.tsx";

// index
import Listings from "./scenes/users/listings/index.tsx";
// new
import NewList from "./scenes/users/listings/new.tsx";
// view
import ViewList from "./scenes/users/listings/view.tsx";

import Insights from "./scenes/users/insights.tsx";
import Profile from "./scenes/users/profile.tsx";
import Checkout from "./components/checkout/Checkout";
import Whishlist from "./scenes/users/whishlist.tsx";

import Home from "./scenes/shared/Home.tsx";
import ProductDetails from "./scenes/products/view.tsx";

import NotFoundPage from "./scenes/error/NotFound";
import UnauthorizedPage from "./scenes/error/Unauthorized";

import Footer from "./components/Footer.tsx";
import Topbar from "./components/Topbar.tsx";

import PersistLogin from "./components/PersistLogin.tsx";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.ts";
import { useTranslation } from "react-i18next";
// import { LicenseInfo } from '@mui/x-license';

import Notification from "./components/notification/Notification.tsx";
import { LoadingProvider } from "./context/LoadingProvider.tsx";

const App = () => {
  const [theme, colorMode] = useMode();
  const { i18n } = useTranslation();

  // LicenseInfo.setLicenseKey('YOUR_LICENSE_KEY');

  React.useEffect(() => {
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n.language]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <LoadingProvider>
            <main className="content">
              <Topbar />
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                {/* Private Routes */}
                <Route element={<PersistLogin />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetails />} />

                  {/* index */}
                  <Route path="/user/listings" element={<Listings />} />
                  {/* view */}
                  <Route path="/user/listings/:id" element={<ViewList />} />
                  {/* add */}
                  <Route path="/user/listings/new" element={<NewList />} />

                  <Route path="/user/insights" element={<Insights />} />
                  <Route path="/user/profile" element={<Profile />} />
                  <Route path="/user/checkout" element={<Checkout />} />
                  <Route path="/user/wishlist" element={<Whishlist />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />}></Route>
              </Routes>
              <Footer />
            </main>
          </LoadingProvider>
          <Notification />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
