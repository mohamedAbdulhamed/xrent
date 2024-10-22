import {
  Typography,
  Box,
  Button,
  Rating,
  useTheme,
  CardMedia,
  IconButton,
  Tooltip,
} from "@mui/material";
import { tokens } from "../theme.ts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  TRANSLAITIONS,
  Product,
  minConsideredRating,
} from "../config/constants.ts";
import { useTranslation } from "react-i18next";

type ShoppingCardProps = {
  product: Product;
  isListing?: boolean;
  isWhishlist?: boolean;
};

// used in wishlist, listings, products
function ShoppingCard({
  product,
  isListing = false,
  isWhishlist = false,
}: ShoppingCardProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);

  // delete list from user listings
  const handleDelete = async () => {
    // call API
  };

  const handleFavorite = () => {
    // call API
    setIsFavorited(!isFavorited);
  };

  const handleView = () => {
    const url = isListing
      ? `/user/listings/${product.id}`
      : `/product/${product.id}`;
    navigate(url);
  };

  return (
    <Box
      sx={{
        // width: isNonMobile ? "290px" : "100%",
        width: "100%",
        height: "470px",
        boxShadow: "0 0 8px #6c14d0",
        borderRadius: "5px",
        textAlign: "center",
        padding: "10px 20px",
        background: colors.grey[100],
        position: "relative",
        "&:hover .small-card": {
          transform: "translateX(2px)",
          opacity: 1,
        },
        "&:hover .product-image": {
          transform: "scale(1.1)",
        },
      }}
    >
      {/* Hover Buttons */}
      {!isWhishlist && !isListing && (
        <Box
          className="small-card"
          sx={{
            display: "flex",
            flexFlow: "column",
            position: "absolute",
            margin: "10px 0",
            transform: "translateX(-20px)",
            transition: "0.3s",
            opacity: 0,
          }}
        >
          {/* Favorite button */}
          <Tooltip
            title={
              isFavorited
                ? t(TRANSLAITIONS.productcard_favorite_tooltipTitleIsFavorited)
                : t(
                    TRANSLAITIONS.productcard_favorite_tooltipTitleIsNotFavorited
                  )
            }
            placement="top-start"
            arrow
          >
            <IconButton onClick={handleFavorite}>
              <FavoriteIcon
                sx={{
                  color: isFavorited ? "#f00" : colors.black,
                  width: "40px",
                  height: "40px",
                  borderRadius: "5px",
                  fontSize: "16px",
                  margin: "2px 0",
                  lineHeight: "40px",
                  border: "2px solid #999999",
                  transition: "0.2s",
                  "&:hover": {
                    color: isFavorited ? "#ff4d4d" : "#f00",
                  },
                }}
              />
            </IconButton>
          </Tooltip>
          {/* Add more here if needed */}
        </Box>
      )}

      {/* product image */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          height: "50%",
        }}
      >
        <CardMedia
          className="product-image"
          component="img"
          image={`../../assets/${product?.images?.[0]}`} // Deal with it as File, after using backend
          alt={product.title}
          sx={{
            width: "150px",
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            transition: "0.3s",
          }}
        />
      </Box>

      {/* product details */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          height: "50%",
          marginTop: "auto",
        }}
      >
        <Typography
          variant="h2"
          color={colors.primary[900]}
          sx={{ alignSelf: "center" }}
        >
          {product.title}
        </Typography>
        <Typography variant="h6" color={colors.grey[800]}>
          {product.price ? `Sale price: EGP${product.price}` : "Not For Sale"} 
          {" "}|{" "}
          {product &&
          product.availability &&
          product.availability?.filter(
            (avail) => avail.status !== "unavailable"
          ).length > 0 ? (
            <>
              {" "}
              Available at:{" "}
              {product.availability
                ?.filter((avail) => avail.status !== "unavailable")
                .slice(0, 3)
                .map((availability, index) => (
                  <Box
                    key={availability.id}
                    sx={{ display: "inline-block", marginLeft: 1 }}
                  >
                    {/* Format dates to readable format */}
                    {availability.startDate.toLocaleDateString()}
                    {" - "}
                    {availability.endDate.toLocaleDateString()}
                    {" @ EGP "}{availability.price}
                    {index <= (product.availability?.length || 0) - 1 && ", "}
                  </Box>
                ))}
            </>
          ) : (
            "Not For Rent"
          )}
        </Typography>

        {/* rating */}
        {product.rating > minConsideredRating && (
          <Box
            sx={{
              color: "gold",
              cursor: "pointer",
              alignSelf: "center",
            }}
          >
            <Rating
              sx={{
                direction: "ltr !important",
              }}
              name="read-only"
              value={product.rating ?? 0.0}
              precision={0.5}
              readOnly
            />
          </Box>
        )}

        {isListing ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Tooltip
              title={t(TRANSLAITIONS.productcard_deleteButton_toolTipTitle)}
              placement="top"
            >
              <Button
                type="button"
                variant="contained"
                onClick={handleDelete}
                sx={{
                  textDecoration: "none",
                  padding: "10px 20px",
                  color: "white",
                  backgroundColor: colors.redAccent[500],
                  "&:hover": { backgroundColor: colors.redAccent[300] },
                }}
              >
                {t(TRANSLAITIONS.productcard_deleteButton)}
              </Button>
            </Tooltip>
            <Tooltip
              title={t(TRANSLAITIONS.productcard_editButton_toolTipTitle)}
              placement="top"
            >
              <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={handleView}
                sx={{
                  textDecoration: "none",
                  padding: "10px 20px",
                  color: "white",
                  "&:hover": { backgroundColor: colors.grey[700] },
                }}
              >
                {t(TRANSLAITIONS.productcard_editButton)}
              </Button>
            </Tooltip>
          </Box>
        ) : (
          <Tooltip
            title={t(TRANSLAITIONS.productcard_viewButton_toolTipTitle)}
            placement="top"
          >
            <Button
              type="button"
              color="secondary"
              variant="contained"
              onClick={handleView}
              sx={{
                width: "100%",
                textDecoration: "none",
                padding: "10px 20px",
                color: "white",
              }}
            >
              {t(TRANSLAITIONS.productcard_viewButton)}
            </Button>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}

export default ShoppingCard;
