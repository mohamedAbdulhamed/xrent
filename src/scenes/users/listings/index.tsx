import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  useTheme,
  Container,
  Pagination,
  Button,
  Typography,
} from "@mui/material";
import { tokens } from "../../../theme.ts";
import useAuth from "../../../hooks/useAuth.ts";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.ts";
import { fetchProducts } from "../../../api/products/index.ts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "../../../components/ProductCard.tsx";
import AddIcon from "@mui/icons-material/Add";
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
  APPBAR_HEIGHT,
  TRANSLAITIONS,
  Product,
} from "../../../config/constants.ts";

const Listings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts(
          axiosPrivate,
          "/Account/listings",
          currentPage,
          perPage
        );

        response.data && setProducts(response.data);
        response.totalPages && setTotalPages(response.totalPages);
      } catch (error) {
        console.error(
          t(TRANSLAITIONS.failedToFetchError, { name: "products" }),
          error
        );
      }
    };

    fetchData();
  }, [currentPage, perPage, axiosPrivate, t]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container
      sx={{
        padding: "2rem",
        minHeight: `calc(100vh - (${HEADER_HEIGHT}px + ${FOOTER_HEIGHT}px + ${APPBAR_HEIGHT}px))`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #cbc3c363",
          marginBottom: "5vh",
        }}
      >
        <Typography sx={{ color: colors.black }} variant="h2">
          Listings
        </Typography>
        <Button
          onClick={() => navigate("/user/listings/new")}
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ margin: "0 0 20px 20px" }}
        >
          {t(TRANSLAITIONS.listings_headToList)}
          <AddIcon />
        </Button>
      </Box>

      {products?.length > 0 && (
        <Grid container spacing="50px">
          {products.map((product) => (
            <Grid item xs={12} sm={8} md={6} lg={4} xl={3} key={product.id}>
              <ProductCard product={product} isListing={true} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            "& .css-1ik833o-MuiButtonBase-root-MuiPaginationItem-root": {
              color: colors.black,
            },
            "& .css-1ik833o-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
              { color: colors.white },
          }}
        />
      </Box>
    </Container>
  );
};

export default Listings;
