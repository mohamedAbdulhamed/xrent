import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CardMedia,
  Typography,
  Rating,
  useTheme,
  IconButton,
  Grid,
  Divider,
  Chip,
  Button,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme.ts";
import {
  Product,
  minConsideredRating,
  SEVERITY,
  SeverityType,
  Availability,
} from "../../config/constants.ts";
import { fetchProduct } from "../../api/products/index.ts";

import { useShoppingCart } from "../../context/ShoppingCartProvider.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";

import { Notification } from "../../components/Notification.tsx";
import ReviewBox from "../../components/ReviewBox.tsx";

import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import SellIcon from "@mui/icons-material/Sell";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import dayjs from "dayjs";

const ProductDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const axiosPrivate = useAxiosPrivate();
  const {
    isAlreadyAddedForSale,
    addToCartForSale,
    removeFromCartForSale,
    addToCartForRent,
    removeFromCartForRent,
    isAlreadyAddedForRent,
  } = useShoppingCart();

  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<SeverityType>(SEVERITY.error);
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isAddedToCartForSale, setIsAddedToCartForSale] = useState<boolean>(
    isAlreadyAddedForSale(id || "0")
  );

  React.useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await fetchProduct(axiosPrivate, `/Product/Get/${id}`);

        setProduct(response.data || null);
        setMainImage(`../assets/${response?.data?.images?.[0]}`);
      } catch (error) {
        setMessage("Failed to fetch categories: " + error);
        setSeverity(SEVERITY.error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProductData();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [id, axiosPrivate]);

  const handleImageClick = (imageSrc: string) => {
    setMainImage(imageSrc);
  };

  const handleAddToCartForSale = () => {
    if (!id) return;
    if (!product && product === null) return;
    // validate product using zod
    if (!product.id) return;

    if (isAlreadyAddedForSale(product.id)) {
      // if already added remove it
      removeFromCartForSale(product.id);
      setIsAddedToCartForSale(false);
      setMessage("Product was removed from cart.");
      setSeverity(SEVERITY.info);
    } else {
      try {
        addToCartForSale(product);
        setIsAddedToCartForSale(true);
        setMessage("Product was added to cart.");
        setSeverity(SEVERITY.info);
      } catch (error) {
        setMessage(error.message)        
        setSeverity(SEVERITY.error);
      }
    }
  };

  const handleAddToCartForRent = (availability: Availability) => {
    // validate product using zod
    if (!product) return;
    if (!product.id) return;

    if (isAlreadyAddedForRent(product.id, availability)) {
      removeFromCartForRent(product.id, availability);
      setMessage("Product was removed from cart.");
      setSeverity(SEVERITY.info);
    } else {
      try {
        addToCartForRent(product, availability);
        setMessage("Product was added to cart.");
        setSeverity(SEVERITY.info);
      } catch (error) {
        setMessage(error.message)        
        setSeverity(SEVERITY.error);
      }
    }
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  // WARNING: After backend this will exist inside the product => product.reviews
  const reviews = [
    {
      user: {
        name: "Ranidi Lochana",
        // ... rest
        image: "../assets/profile/girl_dp1.jpg",
      },
      rating: 4.5,
      description: "Great product! Really loved the quality and design.",
    },
    {
      user: {
        name: "John Doe",
        image: "../assets/profile/man_dp2.jpg",
      },
      rating: 4.0,
      description: "Good value for money. Will definitely recommend to others.",
    },
    {
      user: {
        name: "Jane Smith",
        image: "../assets/profile/girl_dp3.jpg",
      },
      rating: 3.5,
      description: "Decent product but could be improved in terms of comfort.",
    },
    {
      user: {
        name: "Jane Smith",
        image: "../assets/profile/man_dp3.jpg",
      },
      rating: 3.5,
      description:
        "Decent product but could be improved in terms of comfort. and that is a very loooooong description that should need more than the available space but there should be description length validation that will prevent that.",
    },
    {
      user: {
        name: "Jane Smith",
        image: "../assets/profile/man_dp1.jpg",
      },
      rating: 3.5,
      description: "Decent product but could be improved in terms of comfort.",
    },
    {
      user: {
        name: "Jane Smith",
        image: "../assets/profile/girl_dp3.jpg",
      },
      rating: 3.5,
      description: "Decent product but could be improved in terms of comfort.",
    },
  ];

  if (!id) return <></>;

  return (
    <>
      <Notification msg={message} setMessage={setMessage} severity={severity} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: isNonMobile ? "row" : "column",
          padding: 3,
          gap: 3,
        }}
      >
        {/* Product images */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isNonMobile ? "row" : "column-reverse",
            flex: "1 1 50%",
          }}
        >
          {/* All Images */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              flex: "1 1 auto",
              alignItems: "center",
            }}
          >
            {loading
              ? [...Array(4)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    height="15vh"
                    width="15vh"
                    sx={{
                      cursor: "wait",
                      borderRadius: 1,
                      padding: "0.5rem",
                      boxShadow: "0 0 6px rgba(0,0,0,0.6)",
                    }}
                  />
                ))
              : product?.images?.map((image, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    className="productViewMainImage"
                    src={`../assets/${image}`}
                    onClick={() => handleImageClick(`../assets/${image}`)}
                    sx={{
                      width: isNonMobile ? "15vh" : "100%",
                      height: "15vh",
                      cursor: "pointer",
                      background: colors.main,
                      borderRadius: 1,
                      padding: "0.5rem",
                      boxShadow: "0 0 6px rgba(0,0,0,0.6)",
                      opacity: 0.8,
                      objectFit: "contain !important",
                      transition: "opacity 0.3s, transform 0.3s",
                      "&:hover": {
                        opacity: 1,
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                ))}
          </Box>

          {/* Main Image */}
          <Box
            sx={{
              // padding: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: "1 1 auto",
              overflow: "hidden",
            }}
          >
            {loading ? (
              <Skeleton
                variant="rectangular"
                height="60vh"
                width="60vh"
                sx={{
                  cursor: "wait",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  boxShadow: "0 0 8px " + colors.main,
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />
            ) : (
              <CardMedia
                id="imagebox"
                component="img"
                image={`../assets/${mainImage}`}
                sx={{
                  width: isNonMobile ? "60vh" : "100%",
                  height: "60vh",
                  border: "0.2rem solid " + colors.white,
                  borderRadius: "0.5rem",
                  maxHeight: "100%",
                  maxWidth: "100%",
                  padding: "1rem",
                  boxShadow: "0 0 8px " + colors.main,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            )}
          </Box>
        </Box>

        {/* Product details */}
        <Box
          sx={{
            background: colors.white,
            padding: "1.5rem",
            border: "0.2rem solid " + colors.white,
            borderRadius: "0.5rem",
            boxShadow: "0 0 8px " + colors.black,
            flex: "1 1 50%",
            height: "100%",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {loading ? (
            <>
              <Skeleton
                variant="rectangular"
                width="100%"
                height="7vh"
                sx={{ backgroundColor: colors.grey[200], marginBottom: "2vh" }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height="15vh"
                sx={{ backgroundColor: colors.grey[200] }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height="7vh"
                sx={{ backgroundColor: colors.grey[200], marginTop: "2vh" }}
              />
            </>
          ) : (
            <>
              {/* Upper section (title, favorite button and rating) */}
              <Box height="25%">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h3" color={colors.primary[900]}>
                    {product?.title}
                  </Typography>
                  <IconButton onClick={handleFavoriteClick}>
                    <FavoriteIcon
                      sx={{ color: isFavorite ? "red" : colors.grey[500] }}
                    />
                  </IconButton>
                </Box>

                {product?.rating && product.rating > minConsideredRating && (
                  <Rating name="read-only" value={product.rating} readOnly />
                )}

                <Divider
                  sx={{ margin: "auto", borderColor: "#0000001f !important" }}
                />
              </Box>

              {/* middle section (product specific details: Availabilities, Sale Price, Colors, ) */}
              <Box height="50%">
                {/* Sale Information */}
                {product?.isForSale && product.price && product.price > 0 ? (
                  <Box sx={{ my: 1 }}>
                    <Typography
                      variant="h5"
                      color={colors.grey[700]}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "20px",
                      }}
                    >
                      <SellIcon color="warning" /> Sale Price:{" "}
                      <span
                        style={{
                          color: colors.blueAccent[600],
                          fontWeight: "bold",
                        }}
                      >
                        EGP {product.price}
                      </span>
                      <Button
                        type="button"
                        color={isAddedToCartForSale ? "error" : "secondary"}
                        variant="contained"
                        onClick={handleAddToCartForSale}
                        sx={{
                          textDecoration: "none",
                          padding: "10px 20px",
                          color: "white",
                        }}
                      >
                        {isAddedToCartForSale ? (
                          <RemoveShoppingCartIcon />
                        ) : (
                          <AddShoppingCartIcon />
                        )}
                      </Button>
                    </Typography>
                  </Box>
                ) : (
                  <Typography color={colors.grey[300]}>
                    <MoneyOffIcon color="error" /> Not for sale
                  </Typography>
                )}

                {/* Rent Information (Availabilities) */}
                {product?.isForRent ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <Typography
                        variant="h5"
                        color={colors.grey[700]}
                        sx={{ display: "flex", gap: "10px" }}
                      >
                        <EventAvailableIcon color="success" /> Available For
                        Rent:
                      </Typography>
                      {product?.availability?.map((avail, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "20px",
                          }}
                        >
                          <span
                            style={{
                              color: colors.blueAccent[600],
                              fontWeight: "bold",
                            }}
                          >
                            From {dayjs(avail.startDate).format('DD/MM/YYYY')} To{" "}
                            {dayjs(avail.endDate).format('DD/MM/YYYY')}{" @ EGP "}{avail.price}
                          </span>
                          <Button
                            type="button"
                            variant="contained"
                            color={isAlreadyAddedForRent(id, avail) ? "error" : "primary"}
                            onClick={() => handleAddToCartForRent(avail)}
                            sx={{
                              textDecoration: "none",
                              padding: "10px 20px",
                              color: "white",
                            }}
                          >
                            {isAlreadyAddedForRent(id, avail) ? (
                              <RemoveShoppingCartIcon />
                            ) : (
                              <AddShoppingCartIcon />
                            )}
                          </Button>
                        </Box>
                      ))}
                    </Box>
                  </>
                ) : (
                  <Typography color={colors.grey[300]}>
                    <EventBusyIcon color="error" /> Not available for rent
                  </Typography>
                )}

                {/* Colors */}
                <Box sx={{ my: 1 }}>
                  <Typography variant="h5" color={colors.grey[700]}>
                    Colors:
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {product?.colors?.map((color, index) => (
                      <Chip
                        key={index}
                        label={color}
                        sx={{
                          background: color.toLowerCase(),
                          color:
                            color.toLowerCase() === "white" ? "#000" : "#fff",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* lower section (action buttons) */}
              <Box
                height="25%"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Box>
            </>
          )}
        </Box>
      </Box>

      {/* Divider with the header */}
      <Divider
        sx={{
          margin: "2rem 0",
          position: "relative",
          "::before, ::after": {
            borderTop: `thin solid ${colors.black} !important`,
          },
        }}
      >
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontSize: isNonMobile ? "3.75rem" : "1.5rem",
            marginBottom: "30px",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.black,
          }}
        >
          Customer's
          <Typography
            component="span"
            sx={{
              fontSize: isNonMobile ? "3.75rem" : "1.5rem",
              background: "linear-gradient(to left, #c72092, #6c14d0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginLeft: "15px",
            }}
          >
            reviews
          </Typography>
        </Typography>
      </Divider>

      {/* Review section */}
      <Box sx={{ padding: "2rem" }}>
        <Grid container spacing={3}>
          {reviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ReviewBox review={review} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProductDetails;
