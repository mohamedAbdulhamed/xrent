import React from "react";
import {
  Box,
  Typography,
  CardMedia,
  IconButton,
  useTheme,
  Tooltip,
  Skeleton,
} from "@mui/material";
import { tokens } from "../theme.ts";
import { useShoppingCart } from "../context/ShoppingCartProvider.tsx";
import { CartItem as CartItemType, Product } from "../config/constants";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";

export function CartItem({
  id,
  title,
  forSale,
  price,
  forRent,
  rentDetails,
}: CartItemType) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { removeFromCartForSale, removeFromCartForRent } = useShoppingCart();
  const [product, setProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    const fetchProduct = () => {
      const objectFromAxios: Product = {
        id: id,
        title: "Elegant Dress",
        description: "A beautiful dress for special occasions.",
        isForSale: false,
        price: 100,
        rating: 4.1,
        colors: ["Black", "Red"],
        condition: "New",
        size: "XL",
        city: "Cairo",
        category: { title: "Dresses" },
        images: ["red_shoes1.png", "red_shoes2.png", "red_shoes3.png"],
        isForRent: true,
        depositAmount: 500,
        availability: [
          {
            id: "1",
            startDate: new Date("2024-10-01"),
            endDate: new Date("2024-10-15"),
            price: 90,
            status: "available",
            productId: "1",
          },
          {
            id: "2",
            startDate: new Date("2024-11-01"),
            endDate: new Date("2024-11-10"),
            price: 95,
            status: "unavailable",
            productId: "1",
          },
        ],
      };
      setProduct(objectFromAxios);
    };

    const timeoutId = setTimeout(() => {
      fetchProduct();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [id]);

  const handleRemoveFromCart = () => {
    // validate product using zod
    if (!product && product === null) return;
    if (!product.id) return;

    if (forSale) {
      removeFromCartForSale(product.id);
    } else if (forRent && rentDetails) {
      removeFromCartForRent(product.id, rentDetails);
    } else {
      //
    }
  };

  return (
    <>
      {product ? (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1, height: 100 }}
        >
          {/* Image Section */}
          {product?.images && product.images.length > 0 && (
            <CardMedia
              className="product-image"
              component="img"
              image={`../../assets/${product?.images?.[0]}`}
              alt={product.title}
              sx={{
                width: "130px",
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                transform: "scale(1)",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
          )}

          {/* Product Details */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{title}</Typography>
            {/* buying details */}
            <Typography variant="body2" color="textSecondary">
              {forSale ? (
                <span style={{ color: colors.blueAccent[600] }}>
                  <span style={{ color: colors.blueAccent[600], fontWeight: "bold" }}>Buying</span>
                  {" @ EGP "}
                  {price?.toFixed(2)}
                </span>
              ) : forRent ? (
                <span style={{ color: colors.blueAccent[600] }}>
                  <span style={{ color: colors.blueAccent[600], fontWeight: "bold" }}>Renting</span>
                  <br />
                  From {dayjs(rentDetails?.startDate).format("DD/MM/YYYY")}
                  <br />
                  To {dayjs(rentDetails?.endDate).format("DD/MM/YYYY")}
                  <br />
                  {"@ EGP"}
                  {price}
                </span>
              ) : (
                ""
              )}
            </Typography>
          </Box>

          {/* Remove Button */}
          <Tooltip title="Remove From Cart" placement="top-start" arrow>
            <IconButton
              sx={{
                width: "30px",
                height: "30px",
                color: colors.black,
                backgroundColor: colors.white,
                borderRadius: "5px",

                "&:hover": {
                  backgroundColor: colors.redAccent[500],
                  color: colors.white,
                },
              }}
              onClick={handleRemoveFromCart}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Skeleton variant="rectangular" height={100} />
      )}
    </>
  );
}
