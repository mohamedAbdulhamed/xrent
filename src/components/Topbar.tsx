import React, { useState, useEffect } from "react";
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
  Drawer,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate.ts";
import { fetchCategories } from "../api/categories/index.ts";
import useAuth from "../hooks/useAuth.ts";
import useLogout from "../hooks/useLogout.ts";
import { tokens } from "../theme.ts";
import {
  LANGUAGES,
  HEADER_HEIGHT,
  APPBAR_HEIGHT,
  TRANSLAITIONS,
  Category,
} from "../config/constants.ts";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import { useShoppingCart } from "../context/ShoppingCartProvider.tsx";
import { useTranslation } from "react-i18next";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InsightsIcon from "@mui/icons-material/Insights";
import InventoryIcon from "@mui/icons-material/Inventory";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import { Menu as MenuIcon } from "@mui/icons-material";
import useLoading from "../hooks/useLoading.ts";

type VerticalDividerProps = {
  height: string | null
}


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)"); // 600 or more = computer, labtop and tablet (not mobile L - M - S)
  const isSmallMobile = useMediaQuery("(max-width:350px)"); // 350 or less = mobile (S)
  const isTablet = useMediaQuery("(min-width: 426px) and (max-width: 768px)"); // between 768px and 426px

  const logout = useLogout();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { cartQuantity, openCart } = useShoppingCart();
  const { setMainLoading } = useLoading();

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsAllowed, setNotificationsAllowed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Notification
    if (Notification.permission === "granted") {
      setNotificationsAllowed(true);
    }

    // Tutorial
    const tutorial = () => {
      const driverObj = driver({
        popoverClass: "driverjs-theme",
        showProgress: true,
        steps: [
          {
            element: ".logo",
            popover: {
              title: "Home Page",
              description:
                "This logo will get you back to home when you click it.",
            },
          },
          {
            element: "#language",
            popover: {
              title: "Page Language",
              description:
                "Change the language to either `English` or `Arabic`.",
            },
          },
          {
            element: "#login",
            popover: {
              title: "More access",
              description:
                "Login in to get access to your profile settings, buy, sell or rent products. also you get follow the updates on the orders you made",
            },
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
    };

    // fetch categories
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchCategories(axiosPrivate);
        setCategories(response.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoriesData();
    tutorial();
  }, [axiosPrivate]);

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

  const handleSearchClick = () => {
    searchQuery && navigate(`/?q=${searchQuery}`);
  };

  const handleSignOut = async () => {
    setMainLoading(true);

    const result = await logout();

    if (result.success) {
      navigate("/login");
    } else {
      throw new Error(result.message);
    }

    setMainLoading(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const toggleDrawer = (open: boolean) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const VerticalDivider = ({height = "100%"}: VerticalDividerProps) => (
    <Box
      sx={{
        width: "1px",
        minWidth: "1px",
        backgroundColor: "#b1cdc6",
        height: height,
        margin: "0 15px",
      }}
    />
  );

  return (
    <React.Fragment>
      {/* Upper Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: colors.black,
          backgroundColor: colors.main,
          position: "relative",
          height: `${HEADER_HEIGHT}px`,
          gap: "10px",
          p: 2,
          overflowX: "scroll",
          overflowY: "hidden",
          zIndex: "991",
          msOverflowStyle: "none", // For Internet Explorer and Edge
          scrollbarWidth: "none", // For Firefox
          // Hide scrollbar for Chrome, Safari, Edge, and Firefox
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and Edge
          },
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <ButtonBase
            component={Link}
            to="/"
            sx={{
              display: "flex",
              borderRadius: "3px",
              p: "10px",
              gap: "5px",
              textDecoration: "none",
              overflow: "hidden",
              "&:hover .logo": {
                backgroundPosition: "0%",
              },
            }}
            tabIndex={0}
          >
            <Box sx={{ display: "flex", }}>
              <img
                src="../../assets/XRent-Logo.png"
                alt="logo"
                style={{ width: isTablet ? "20px" : isNonMobile ? "30px" : "20px" }}
              />
            </Box>
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
        </Box>

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
            <IconButton
              onClick={handleSearchClick}
              sx={{ padding: isSmallMobile ? "0px" : undefined }}
            >
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
              width: isSmallMobile ? "29vw" : isTablet ? "20vw" : "35vw",
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
        {isNonMobile ? (
          <Box display="flex" alignItems="center" sx={{ textWrap: "nowrap" }}>
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

            {/* User is Authenticated */}
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
                  {/* Orders */}
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

                  {/* Notifications */}
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/user/notifications");
                    }}
                  >
                    {t(TRANSLAITIONS.toolbar_notifications)}
                    <Badge badgeContent={cartQuantity} color="error">
                      <NotificationImportantIcon />
                    </Badge>
                  </MenuItem>

                  {/* Insights */}
                  <Tooltip
                    title={t(TRANSLAITIONS.toolbar_insights_tooltipTitle)}
                    placement="right"
                    arrow
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate("/user/insights");
                      }}
                    >
                      {t(TRANSLAITIONS.toolbar_insights)}
                      <InsightsIcon />
                    </MenuItem>
                  </Tooltip>

                  {/* Profile */}
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

                  {/* Listings */}
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

                  {/* List */}
                  <Tooltip
                    title={t(TRANSLAITIONS.toolbar_list_tooltipTitle)}
                    placement="right"
                    arrow
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate("/user/listings/new");
                      }}
                    >
                      {t(TRANSLAITIONS.toolbar_list)}
                      <PlaylistAddIcon />
                    </MenuItem>
                  </Tooltip>

                  {/* Signout */}
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handleSignOut();
                    }}
                    sx={{
                      color: colors.redAccent[400],
                    }}
                  >
                    {t(TRANSLAITIONS.toolbar_signOut)}
                    <LogoutIcon />
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              // User is NOT Authenticated
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
            {cartQuantity > 0 && (
              <>
                <ButtonBase onClick={openCart} tabIndex={4}>
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
                    <Badge badgeContent={cartQuantity} color="primary">
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </Box>
                </ButtonBase>

                <VerticalDivider height="50%" />
              </>
            )}

            {/* Notifications */}
            <Tooltip
              title={
                notificationsAllowed
                  ? t(TRANSLAITIONS.toolbar_notifications_tooltipTitleAllowed)
                  : t(
                      TRANSLAITIONS.toolbar_notifications_tooltipTitleNotAllowed
                    )
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
        ) : (
          // Mobile Version
          <Box>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: 250, padding: 2 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
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
                      <Typography id="language" variant="h6">
                        {LANGUAGES[i18n.language]}
                      </Typography>
                    </Box>
                  </ButtonBase>
                </Tooltip>

                <Divider />

                {/* User is Authenticated */}
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
                      <Typography variant="h6" padding={1}>
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
                      MenuListProps={{ "aria-labelledby": "basic-button" }}
                      sx={{
                        "& li": {
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "10px",
                        },
                      }}
                    >
                      {/* Orders */}
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

                      {/* Notifications */}
                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          navigate("/user/notifications");
                        }}
                      >
                        {t(TRANSLAITIONS.toolbar_notifications)}
                        <Badge badgeContent={cartQuantity} color="error">
                          <NotificationImportantIcon />
                        </Badge>
                      </MenuItem>

                      {/* Insights */}
                      <Tooltip
                        title={t(TRANSLAITIONS.toolbar_insights_tooltipTitle)}
                        placement="right"
                        arrow
                      >
                        <MenuItem
                          onClick={() => {
                            handleMenuClose();
                            navigate("/user/insights");
                          }}
                        >
                          {t(TRANSLAITIONS.toolbar_insights)}
                          <InsightsIcon />
                        </MenuItem>
                      </Tooltip>

                      {/* Profile */}
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

                      {/* Listings */}
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

                      {/* List */}
                      <Tooltip
                        title={t(TRANSLAITIONS.toolbar_list_tooltipTitle)}
                        placement="right"
                        arrow
                      >
                        <MenuItem
                          onClick={() => {
                            handleMenuClose();
                            navigate("/user/listings/new");
                          }}
                        >
                          {t(TRANSLAITIONS.toolbar_list)}
                          <PlaylistAddIcon />
                        </MenuItem>
                      </Tooltip>

                      {/* Signout */}
                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          handleSignOut();
                        }}
                        sx={{ color: colors.redAccent[400] }}
                      >
                        {t(TRANSLAITIONS.toolbar_signOut)}
                        <LogoutIcon />
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  // User is NOT Authenticated
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
                      <Typography id="login" variant="h6" padding={1}>
                        {t(TRANSLAITIONS.toolbar_login)}
                      </Typography>
                      <PersonOutlinedIcon />
                    </Box>
                  </ButtonBase>
                )}

                <Divider />

                {/* Wish list */}
                <ButtonBase
                  onClick={() =>
                    navigate(auth?.user ? "/user/wishlist" : "/login")
                  }
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
                    <Typography variant="h6" padding={1}>
                      {t(TRANSLAITIONS.toolbar_wishlist)}
                    </Typography>
                    <FavoriteBorderOutlinedIcon />
                  </Box>
                </ButtonBase>

                <Divider />

                {/* Cart */}
                {cartQuantity > 0 && (
                  <>
                    <ButtonBase onClick={openCart} tabIndex={4}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          transition: "0.5s",
                          "&:hover": { color: colors.secondry },
                        }}
                      >
                        <Typography variant="h6" padding={1}>
                          {t(TRANSLAITIONS.toolbar_cart)}
                        </Typography>
                        <Badge badgeContent={cartQuantity} color="primary">
                          <ShoppingCartOutlinedIcon />
                        </Badge>
                      </Box>
                    </ButtonBase>

                    <Divider />
                  </>
                )}

                {/* Notifications */}
                <Tooltip
                  title={
                    notificationsAllowed
                      ? t(
                          TRANSLAITIONS.toolbar_notifications_tooltipTitleAllowed
                        )
                      : t(
                          TRANSLAITIONS.toolbar_notifications_tooltipTitleNotAllowed
                        )
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
            </Drawer>
          </Box>
        )}
      </Box>

      {/* Lower Header */}
      <AppBar
        position="static"
        sx={{
          bgcolor: colors.white,
          height: `${APPBAR_HEIGHT}px`,
          display: "flex",
          justifyContent: "center",
          textWrap: "nowrap",
        }}
      >
        <Toolbar
          sx={{
            color: colors.black,
            overflowX: "scroll",
            overflowY: "hidden",
            // Hide scrollbar for Chrome, Safari, Edge, and Firefox
            "&::-webkit-scrollbar": {
              display: "none", // For Chrome, Safari, and Edge
            },
            msOverflowStyle: "none", // For Internet Explorer and Edge
            scrollbarWidth: "none", // For Firefox
          }}
        >
          <ButtonBase sx={{ marginRight: "20px" }}>
            <Typography variant="h5" fontWeight="900">
              {t(TRANSLAITIONS.toolbar_categories)}
            </Typography>
          </ButtonBase>

          <VerticalDivider height="2vh" />

          {categories.length > 0 &&
            categories.map((category, index) => (
              <ButtonBase key={index} sx={{ marginRight: "20px" }}>
                <Typography variant="h5">{category.title}</Typography>
              </ButtonBase>
            ))}

          <ButtonBase sx={{ marginRight: "20px" }}>
            <Typography variant="h5">Tags</Typography>
          </ButtonBase>
          <ButtonBase sx={{ marginRight: "20px" }}>
            <Typography variant="h5">Tags</Typography>
          </ButtonBase>
          <ButtonBase sx={{ marginRight: "20px" }}>
            <Typography variant="h5">Tags</Typography>
          </ButtonBase>
          <ButtonBase sx={{ marginRight: "20px" }}>
            <Typography variant="h5">Tags</Typography>
          </ButtonBase>
          <ButtonBase sx={{ marginRight: "20px" }}>
            <Typography variant="h5">Tags</Typography>
          </ButtonBase>
          <ButtonBase sx={{ marginRight: "20px" }}>
            <Typography variant="h5">Tags</Typography>
          </ButtonBase>
          <ButtonBase sx={{ marginRight: "20px" }}>
            <Typography variant="h5">Tags</Typography>
          </ButtonBase>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Topbar;
