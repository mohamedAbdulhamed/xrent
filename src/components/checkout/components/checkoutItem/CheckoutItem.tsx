import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { CartItem, Product } from "../../../../config/constants.ts";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.ts";
import { fetchProduct } from "../../../../api/products/index.ts";
import { Skeleton, Typography } from "@mui/material";

// Function to detect if text contains Arabic characters
const isArabic = (text: string) => {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
};

// Direction constants for layout
const DIRECTIONS = {
  rtl: "rtl",
  ltr: "ltr",
};

// Function to determine flex direction based on language and layout direction
const flexDirection = (text: string, direction: string) => {
  const isRtl = direction === DIRECTIONS.rtl;
  const isTextArabic = isArabic(text);

  return (isRtl && !isTextArabic) || (!isRtl && isTextArabic)
    ? "row-reverse"
    : "row";
};

// Destructure props from the functional component parameters
const CheckoutItem: React.FC<{ cartItem: CartItem; direction: string }> = ({
  cartItem,
  direction,
}) => {
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const axiosPrivate = useAxiosPrivate();

  // Fetch product based on cartItem id
  React.useEffect(() => {
    const fetchCartProduct = async () => {
      if (!cartItem?.id) return;

      try {
        const response = await fetchProduct(
          axiosPrivate,
          `Product/Get/${cartItem.id}`
        );

        if (response.data) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchCartProduct();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [cartItem.id, axiosPrivate]);

  return (
    <>
      {loading ? (
        <ListItem>
          <Skeleton
            variant="rectangular"
            width="60%"
            height={30}
            sx={{ margin: "6px 10px" }}
          />
          <Skeleton
            variant="text"
            width="30%"
            height={30}
            sx={{ margin: "6px 10px" }}
          />
        </ListItem>
      ) : (
        <ListItem
          sx={{
            py: 1,
            px: 0,
            display: "flex",
            flexDirection: flexDirection(cartItem.title, direction),
            textAlign: isArabic(cartItem.title) ? "right" : "left",
          }}
        >
          <ListItemText
            sx={{ margin: "6px 10px" }}
            primary={product?.title || "Unknown Product"}
            secondary={
              product?.description && product.description.length > 50
                ? `${product.description.slice(0, 50)}...`
                : product?.description || "No description available"
            }
          />
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            EGP {cartItem.price.toFixed(2)} {/* Ensure price is formatted properly */}
          </Typography>
        </ListItem>
      )}
    </>
  );
};

export default CheckoutItem;
