import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';

import Login from "./scenes/auth/login";
import RegisterForm from "./scenes/auth/register";


import Profile from "./scenes/users/profile";
import ListProduct from "./scenes/users/list";
import Listings from "./scenes/users/listings";
import Whishlist from "./scenes/users/whishlist";
import Checkout from './components/checkout/Checkout';

import Home from "./scenes/shared/Home";
import ProductDetail from "./scenes/products/view";

import NotFoundPage from "./scenes/error/NotFound";
import UnauthorizedPage from "./scenes/error/Unauthorized";

import Footer from './components/Footer';
import Topbar from "./components/Topbar";

import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ROLES } from './config/constants';
import { useTranslation } from 'react-i18next';
const App = () => {
  const [theme, colorMode] = useMode();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n.language]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
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
                <Route path="/product/:id" element={<ProductDetail />} />

                <Route path="/user/profile" element={<Profile />} />
                <Route path="/user/listings" element={<Listings />} />
                <Route path="/user/list" element={<ListProduct />} />
                <Route path="/user/checkout" element={<Checkout />} />
                <Route path="/user/wishlist" element={<Whishlist />} />

                {/* <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.owner]} />}> */}
                {/* </Route> */}
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
            <Footer />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
