import { useEffect, useState } from "react";
import { Box, Grid, useTheme, Container, Pagination } from "@mui/material";
import { tokens } from "../../theme";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { fetchProducts } from "../../api/productApi.ts";
import { fetchCategories } from "../../api/categoryApi.ts";
import { TRANSLAITIONS } from "../../config/constants";
import { useTranslation } from "react-i18next";
import Loading from "../../components/Loading";
import ProductCard from "../../components/ProductCard";
import SidebarComponent from "../../components/Sidebar";
import SwiperSlider from "../../components/Swiper";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { t } = useTranslation();

  // filters
  const [priceRange, setPriceRange] = useState([0, 9]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(8);

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // remove after using backend

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingChange = (event, newValue) => {
    setRatingRange(newValue);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value || null);
  };

  const handleColorChange = (colors) => {
    setSelectedColors(colors);
  };

  const handleApplyFilter = () => {
    fetchProducts();
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      // console.log(currentPage, perPage);
      try {
        const response = await fetchProducts(
          axiosPrivate,
          "/Products/GetAll",
          currentPage,
          perPage,
          {
            priceRange,
            ratingRange,
            selectedCategory,
            selectedColors,
          }
        );

        setProducts(response?.data);
        setTotalPages(response?.totalPages);

        setMinPrice(response?.priceRange[0]);
        setMaxPrice(response?.priceRange[1]);
        setPriceRange(response?.priceRange);
      } catch (error) {
        console.error(
          t(TRANSLAITIONS.failedToFetchError, { name: "products" }),
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [currentPage, perPage]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchCategories(axiosPrivate);
        setCategories(response.data);
      } catch (error) {
        console.error(
          t(TRANSLAITIONS.failedToFetchError, { name: "categories" }),
          error
        );
      }
    };

    fetchCategoriesData();
  }, []);

  // remove after using backend
  useEffect(() => {
    // product.name.toLowerCase().includes(q.toLowerCase()) &&
    // Apply filters to the fetched products
    const applyFilters = () => {
      const newFilteredProducts = products.filter(
        (product) =>
          product.price >= priceRange[0] &&
          product.price <= priceRange[1] &&
          product.rating >= ratingRange[0] &&
          product.rating <= ratingRange[1] &&
          (selectedCategory === null || product.category === selectedCategory) &&
          (selectedColors.length === 0 ||
            selectedColors.some((color) => product.colors.includes(color.name)))
      );
      setFilteredProducts(newFilteredProducts);
    };

    applyFilters();
  }, [products, priceRange, ratingRange, selectedCategory, selectedColors]);

  const slides = [
    { src: "../../assets/slides/1.jpg", style: {} },
    { src: "../../assets/slides/2.mp4", style: {}, isVideo: true },
    { src: "../../assets/slides/3.jpg", style: {} },
    { src: "../../assets/slides/4.jpg", style: {} },
    { src: "../../assets/slides/5.jpg", style: {} },
    { src: "../../assets/slides/6.jpg", style: {} },
    { src: "../../assets/slides/7.jpg", style: {} },
    { src: "../../assets/slides/8.jpg", style: {} },
    { src: "../../assets/slides/9.jpg", style: {} },
    { src: "../../assets/slides/10.mp4", style: {}, isVideo: true },
  ];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Loading />
      </Box>
    );
  }

  return (
    <>
      <SwiperSlider slides={slides} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <SidebarComponent
          minPriceRange={minPrice}
          maxPriceRange={maxPrice}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          ratingRange={ratingRange}
          onRatingChange={handleRatingChange}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedColors={selectedColors}
          onColorChange={handleColorChange}
          onApplyFilter={handleApplyFilter}
        />

        {/* Product Grid */}
        <Container sx={{ padding: "2rem", minHeight: "100%" }}>
          {products?.length > 0 && (
            <Grid container spacing="50px">
              {/* change to products (not filtered, when using backend) */}
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={8} md={6} lg={4} xl={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 4,
              direction: "ltr !important",
            }}
          >
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
      </Box>
    </>
  );
};

export default Home;
