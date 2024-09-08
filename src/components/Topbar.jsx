import {
  Box,
  Typography,
  useTheme,
  ButtonBase,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { tokens } from "../theme";
import {
  LANGUAGES,
  HEADER_HEIGHT,
  APPBAR_HEIGHT,
  TRANSLAITIONS,
} from "../config/constants";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import { useTranslation } from "react-i18next";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InventoryIcon from "@mui/icons-material/Inventory";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import LogoutIcon from "@mui/icons-material/Logout";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsAllowed, setNotificationsAllowed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor

  useEffect(() => {
    if (Notification.permission === "granted") {
      setNotificationsAllowed(true);
    }
  }, []);

  const handleNotificationClick = () => {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotificationsAllowed(true);
        }
      });
    } else if (Notification.permission === "granted") {
      setNotificationsAllowed(true);
    }
  };

  const handleLanguageClick = async () => {
    const newLanguage = i18n.language === "en" ? "ar" : "en";
    await i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", i18n.language);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = (event) => {
    searchQuery && navigate(`/?q=${searchQuery}`);
  };

  const handleSignOut = async () => {
    const result = await logout();

    if (result.success) {
      navigate("/login");
    } else {
      throw new Error(result.message);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const driverObj = driver({
    popoverClass: "driverjs-theme",
    showProgress: true,
    steps: [
      {
        element: ".logo",
        popover: {
          title: "Home Page",
          description: "This logo will get you back to home when you click it.",
        },
        side: "left",
        align: "start",
      },
      {
        element: "#language",
        popover: {
          title: "Page Language",
          description: "Change the language to either `English` or `Arabic`.",
        },
        side: "bottom",
        align: "start",
      },
      {
        element: "#login",
        popover: {
          title: "More access",
          description:
            "Login in to get access to your profile settings, buy, sell or rent products. also you get follow the updates on the orders you made",
        },
        side: "bottom",
        align: "start",
      },
      {
        popover: {
          title: "All set!",
          description: "And that is all, go ahead and start ...",
        },
      },
    ],
  });

  const isAlreadyGuided = localStorage.getItem("isGuided") === "true";
  if (!isAlreadyGuided) {
    driverObj.drive();
    localStorage.setItem("isGuided", "true");
  }

  const VerticalDivider = (height) => (
    <Box
      sx={{
        width: "1px",
        backgroundColor: "#b1cdc6",
        height: height || "100%",
        margin: "0 15px",
      }}
    />
  );

  return (
    <>
      {/* Upper Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        p={2}
        backgroundColor={colors.main}
        color={colors.black}
        height={HEADER_HEIGHT + "px"}
      >
        {/* Logo */}
        <ButtonBase
          component={Link}
          to="/"
          sx={{
            display: "flex",
            borderRadius: "3px",
            p: "10px",
            textDecoration: "none",
            position: "relative",
            overflow: "hidden",
            "&:hover .logo": {
              backgroundPosition: "0%",
            },
          }}
          tabIndex={0}
        >
          <Typography
            variant="h2"
            fontWeight="800"
            className="logo"
            sx={{
              background: `linear-gradient(to right, #febd69 50%, ${colors.black} 50%)`,
              backgroundClip: "text",
              color: "transparent",
              transition: "background-position 0.5s ease",
              backgroundSize: "200%",
              backgroundPosition: "100%",
            }}
          >
            XRent
          </Typography>
        </ButtonBase>

        {/* Search */}
        <Box
          sx={{
            display: "flex",
            borderRadius: "3px",
            textDecoration: "none",
            width: "fit-content",
            bgcolor: colors.secondry,
            "&:hover": { bgcolor: "#f3a847" },
          }}
          tabIndex={0}
        >
          <Tooltip
            title={t(TRANSLAITIONS.toolbar_search_tooltipTitle)}
            placement="top-start"
          >
            <IconButton onClick={handleSearchClick}>
              <SearchIcon sx={{ margin: "10px" }} />
            </IconButton>
          </Tooltip>
          <TextField
            variant="standard"
            placeholder={t(TRANSLAITIONS.toolbar_search_placeholder)}
            value={searchQuery}
            onChange={handleSearchChange}
            type="search"
            sx={{
              padding: 1,
              width: "35vw",
              bgcolor: colors.white,
              color: colors.black,
              borderRadius: "4px",
              input: { color: colors.black },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: colors.black,
                },
                "&:hover fieldset": {
                  borderColor: colors.black,
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.black,
                },
              },
            }}
            InputProps={{
              style: { color: colors.black },
            }}
          />
        </Box>

        {/* Buttons */}
        <Box display="flex" alignItems="center">
          {/* Language */}
          <Tooltip
            title={t(TRANSLAITIONS.toolbar_changeLanguage_tooltipTitle)}
            placement="bottom-start"
            arrow
          >
            <ButtonBase onClick={handleLanguageClick} tabIndex={1}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  transition: "0.5s",
                  "&:hover": { color: colors.secondry },
                }}
              >
                <Typography id="language" variant="h4">
                  {LANGUAGES[i18n.language]}
                </Typography>
              </Box>
            </ButtonBase>
          </Tooltip>

          <VerticalDivider height="50%" />

          {/* Profile */}
          {auth?.user ? (
            <Box>
              <ButtonBase
                onClick={handleMenuClick}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  transition: "0.5s",
                  "&:hover": { color: colors.secondry },
                }}
              >
                <Typography variant="h4" padding={1}>
                  {t(TRANSLAITIONS.toolbar_greeting, {
                    firstName: auth.user.firstName,
                  })}
                </Typography>
                <ArrowDropDownIcon />
              </ButtonBase>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{
                  "& li": {
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  },
                }}
              >
                <Tooltip
                  title={t(TRANSLAITIONS.toolbar_orders_tooltipTitle)}
                  placement="right"
                  arrow
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/user/orders");
                    }}
                  >
                    {t(TRANSLAITIONS.toolbar_orders)}
                    <InventoryIcon />
                  </MenuItem>
                </Tooltip>

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/user/notifications");
                  }}
                >
                  {t(TRANSLAITIONS.toolbar_notifications)}
                  <NotificationImportantIcon />
                </MenuItem>

                <Tooltip
                  title={t(TRANSLAITIONS.toolbar_profile_tooltipTitle)}
                  placement="right"
                  arrow
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/user/profile");
                    }}
                  >
                    {t(TRANSLAITIONS.toolbar_profile)}
                    <AssignmentIndIcon />
                  </MenuItem>
                </Tooltip>

                <Tooltip
                  title={t(TRANSLAITIONS.toolbar_listings_tooltipTitle)}
                  placement="right"
                  arrow
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/user/listings");
                    }}
                  >
                    {t(TRANSLAITIONS.toolbar_listings)}
                    <StorefrontIcon />
                  </MenuItem>
                </Tooltip>

                <Tooltip
                  title={t(TRANSLAITIONS.toolbar_list_tooltipTitle)}
                  placement="right"
                  arrow
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/user/list");
                    }}
                  >
                    {t(TRANSLAITIONS.toolbar_list)}
                    <PlaylistAddIcon />
                  </MenuItem>
                </Tooltip>

                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleSignOut();
                  }}
                >
                  {t(TRANSLAITIONS.toolbar_signOut)}
                  <LogoutIcon />
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <ButtonBase onClick={() => navigate("/login")} tabIndex={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "0.5s",
                  "&:hover": { color: colors.secondry },
                }}
              >
                <Typography id="login" variant="h4" padding={1}>
                  {t(TRANSLAITIONS.toolbar_login)}
                </Typography>
                <PersonOutlinedIcon />
              </Box>
            </ButtonBase>
          )}

          <VerticalDivider height="50%" />

          {/* Wish list */}
          <ButtonBase
            onClick={() => navigate(auth?.user ? "/user/wishlist" : "/login")}
            tabIndex={3}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                transition: "0.5s",
                "&:hover": { color: colors.secondry },
              }}
            >
              <Typography variant="h4" padding={1}>
                {t(TRANSLAITIONS.toolbar_wishlist)}
              </Typography>
              <FavoriteBorderOutlinedIcon />
            </Box>
          </ButtonBase>

          <VerticalDivider height="50%" />

          {/* Cart */}
          <ButtonBase
            onClick={() => navigate(auth?.user ? "/user/checkout" : "/login")}
            tabIndex={4}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                transition: "0.5s",
                "&:hover": { color: colors.secondry },
              }}
            >
              <Typography variant="h4" padding={1}>
                {t(TRANSLAITIONS.toolbar_cart)}
              </Typography>
              <Badge
                badgeContent={4}
                color="primary"
                sx={{ fontWeight: "900" }}
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Box>
          </ButtonBase>

          <VerticalDivider height="50%" />

          {/* Notification */}
          <Tooltip
            title={
              notificationsAllowed
                ? t(TRANSLAITIONS.toolbar_notifications_tooltipTitleAllowed)
                : t(TRANSLAITIONS.toolbar_notifications_tooltipTitleNotAllowed)
            }
            placement="bottom-start"
            arrow
          >
            <ButtonBase onClick={handleNotificationClick} tabIndex={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  transition: "0.5s",
                  "&:hover": { color: colors.secondry },
                }}
              >
                {notificationsAllowed ? (
                  <NotificationsActiveIcon />
                ) : (
                  <NotificationsOutlinedIcon />
                )}
              </Box>
            </ButtonBase>
          </Tooltip>
        </Box>
      </Box>

      {/* Lower Header */}
      <AppBar
        position="static"
        sx={{
          bgcolor: colors.white,
          height: `${APPBAR_HEIGHT}px`,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar sx={{ color: colors.black }}>
          <ButtonBase sx={{ marginRight: "20px" }}>
            <Typography variant="h5" fontWeight="900">
              {t(TRANSLAITIONS.toolbar_categories)}
            </Typography>
          </ButtonBase>

          <VerticalDivider height="15px" />

          <ButtonBase sx={{ marginRight: "20px" }}>
            <Typography variant="h5">Dresses</Typography>
          </ButtonBase>

          <ButtonBase sx={{ marginRight: "20px" }}>
            <Typography variant="h5">Tags</Typography>
          </ButtonBase>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Topbar;
