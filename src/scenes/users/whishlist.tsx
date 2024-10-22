import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import { fetchProducts } from "../../api/products/index.ts";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTheme, Container, Grid } from "@mui/material";
import { tokens } from "../../theme.ts";
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
  APPBAR_HEIGHT,
  TRANSLAITIONS,
  Product,
} from "../../config/constants.ts";
import ProductCard from "../../components/ProductCard.tsx";

const Whishlist = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const { t } = useTranslation();
  const [products, setProducts] = React.useState<Product[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchProducts(axiosPrivate, "/Account/wishlist");
        setProducts(response?.data || []);
      } catch (error) {
        console.error(
          t(TRANSLAITIONS.failedToFetchError, { name: "products" }),
          error
        );
      }
    };

    fetchCategoriesData();
  }, []);

  return (
    <Container
      sx={{
        padding: "2rem",
        minHeight: `calc(100vh - (${HEADER_HEIGHT}px + ${FOOTER_HEIGHT}px + ${APPBAR_HEIGHT}px))`,
      }}
    >
      {products?.length > 0 && (
        <Grid container spacing="50px">
          {products.map((product) => (
            <Grid item xs={12} sm={8} md={6} lg={4} xl={3} key={product.id}>
              <ProductCard product={product} isWhishlist={true} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Whishlist;
