"use server";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  useTheme,
  Container,
  Pagination,
  Skeleton,
  TablePagination,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme.ts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";

import { fetchProducts } from "../../api/products/index.ts";
import { fetchCategories } from "../../api/categories/index.ts";

import { Product, Category } from "../../config/constants.ts";

import ProductCard from "../../components/ProductCard.tsx";
import SidebarComponent from "../../components/Sidebar.tsx";
import SwiperSlider from "../../components/Swiper.tsx";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import { DateRange } from "@mui/x-date-pickers-pro/models";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // filters
  const [priceRange, setPriceRange] = useState<number[]>([0, Infinity]);
  const [ratingRange, setRatingRange] = useState<number[]>([0, 5]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange<Dayjs>>([
    null,
    null,
  ]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(25);

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const filtersRef = useRef({
    priceRange,
    ratingRange,
    selectedCategory,
    selectedColors,
    selectedDateRange,
  });

  useEffect(() => {
    filtersRef.current = {
      priceRange,
      ratingRange,
      selectedCategory,
      selectedColors,
      selectedDateRange,
    };
  }, [
    priceRange,
    ratingRange,
    selectedCategory,
    selectedColors,
    selectedDateRange,
  ]);

  const handlePriceChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    typeof value === "object" && setPriceRange(value);
  };

  const handleRatingChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    typeof value === "object" && setRatingRange(value);
  };

  const handleColorChange = (colors: string[]) => {
    setSelectedColors(colors);
  };

  const handleCategoryChange = (newValue: Category | null) => {
    setSelectedCategory(newValue);
  };

  const handledDateRangeChange = (newValue: DateRange<dayjs.Dayjs>) => {
    setSelectedDateRange(newValue);
  };

  const handleApplyFilter = async () => {
    if (loading) return;
    await fetchProductsData();
  };

  const clearFilters = async () => {
    setPriceRange([0, Infinity]);
    setRatingRange([0, 5]);
    setSelectedCategory(null);
    setSelectedColors([]);
    setSelectedDateRange([null, null]);

    await fetchProductsData();
  };

  const handlePageChange = (
    event,
    newPage: number,
    isTablePagination = false
  ) => {
    if (isTablePagination) {
      setCurrentPage(newPage + 1); // Adjust for zero-based indexing
    } else {
      setCurrentPage(newPage); // Use as-is for Pagination (1-based)
    }
  };

  const handleRowsPerPageChange = (event) => {
    const newPerPage = parseInt(event.target?.value!, 10);
    setPerPage(newPerPage);
    // setCurrentPage(1); // optionally
  };

  const fetchProductsData = useCallback(async () => {
    console.log(perPage);
    setLoading(true);
    const {
      priceRange,
      ratingRange,
      selectedCategory,
      selectedColors,
      selectedDateRange,
    } = filtersRef.current;

    try {
      const response = await fetchProducts(
        axiosPrivate,
        "/ProductController/GetProducts",
        currentPage,
        perPage,
        {
          priceRange,
          ratingRange,
          category: selectedCategory?.title,
          colors: selectedColors,
          dateRange: selectedDateRange,
        }
      );

      setProducts(response?.data || []);
      setTotalPages(response?.totalPages || 0);
      setTotalProducts(response.totalProducts || 0);
      setPriceRange(response?.priceRange || [0, Infinity]);
    } catch (error) {
      console.log(error);
      toast.error(
        `Couldn't fetch products: ${error.message || "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage, perPage, axiosPrivate]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProductsData();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [fetchProductsData]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchCategories(axiosPrivate);
        setCategories(response.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoriesData();
  }, [axiosPrivate]);

  const slides = [
    { src: "../../assets/slides/1.jpg", style: {} },
    { src: "../../assets/slides/3.jpg", style: {} },
    { src: "../../assets/slides/4.jpg", style: {} },
    { src: "../../assets/slides/5.jpg", style: {} },
    { src: "../../assets/slides/6.jpg", style: {} },
    { src: "../../assets/slides/7.jpg", style: {} },
    { src: "../../assets/slides/8.jpg", style: {} },
    { src: "../../assets/slides/9.jpg", style: {} },
    { src: "../../assets/slides/10.mp4", style: {} },
  ];

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
          loading={loading}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          ratingRange={ratingRange}
          onRatingChange={handleRatingChange}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedColors={selectedColors}
          onColorChange={handleColorChange}
          selectedDateRange={selectedDateRange}
          onDateRangeChange={handledDateRangeChange}
          onClearFilters={clearFilters}
          onApplyFilter={handleApplyFilter}
        />

        {/* Product Grid */}
        <Container
          sx={{
            padding: isNonMobile ? "2rem" : "0",
            minHeight: "100%",
            maxWidth: "100% !important",
            margin: "5vh auto",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "10vh",
              marginBottom: "5vh",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TablePagination
              component="div"
              count={totalProducts}
              page={currentPage - 1}
              onPageChange={(event, page) =>
                handlePageChange(event, page, true)
              }
              rowsPerPage={perPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              aria-disabled={loading}
              disabled={loading}
              sx={{
                color: colors.black,
              }}
            />
          </Box>

          {loading ? (
            // skeletons
            <Grid container spacing={isNonMobile ? "50px" : "0"}>
              {[...Array(6)].map((_, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={3}
                  key={index}
                  margin={isNonMobile ? "0" : "20px"}
                >
                  <Box
                    sx={{
                      width: isNonMobile ? "290px" : "100%",
                      height: "470px",
                      padding: "10px 20px",
                      cursor: "wait",
                      borderRadius: "5px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={230}
                      sx={{ backgroundColor: colors.grey[200] }}
                    />
                    <Skeleton
                      variant="text"
                      width="100%"
                      sx={{
                        marginTop: "10px",
                        height: "30px",
                        backgroundColor: colors.grey[200],
                      }}
                    />
                    <Skeleton
                      variant="text"
                      width="60%"
                      sx={{
                        marginTop: "10px",
                        backgroundColor: colors.grey[200],
                      }}
                    />
                    <Skeleton
                      variant="text"
                      width="40%"
                      sx={{
                        marginTop: "10px",
                        backgroundColor: colors.grey[200],
                      }}
                    />
                    <Skeleton
                      variant="rounded"
                      width="100%"
                      height={30}
                      sx={{
                        marginTop: "10px",
                        backgroundColor: colors.grey[200],
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            products?.length > 0 && (
              <Grid container spacing={isNonMobile ? "50px" : "0"}>
                {products.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                    xl={3}
                    key={product.id}
                    margin={isNonMobile ? "0" : "20px"}
                  >
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )
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
              showFirstButton
              showLastButton
              disabled={loading}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: colors.black,
                },
                "& .MuiPaginationItem-page:hover": {
                  backgroundColor: colors.primary[400],
                },
                "& .Mui-selected": {
                  backgroundColor: colors.primary[500],
                  color: colors.white,
                },
                "& .MuiPaginationItem-ellipsis": {
                  color: colors.black,
                },
                direction: "ltr",
                mt: 4,
                mb: 4,
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
