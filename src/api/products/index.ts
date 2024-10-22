import { AxiosInstance } from "axios";
import {
  GetDataResponse,
  Product,
} from "../../config/constants";
import { test_products } from "../../mockdata/test_products.js"
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { Dayjs } from "dayjs";

interface Filters {
  priceRange: number[];
  ratingRange: number[];
  category: string | undefined;
  colors: string[];
  dateRange: DateRange<Dayjs> | undefined;
}

async function fetchProducts(
  axiosInstance: AxiosInstance,
  url: string,
  page: number = 1,
  perPage: number = 10,
  filters?: Filters
): Promise<GetDataResponse<Product[]>> {
  try {
    console.log("filters: ", filters);

    if (filters) {
      if (filters.priceRange?.[0] && filters.priceRange?.[1]) {
        // include priceRange
      }

      // Filter by rating range
      if (filters.ratingRange?.[0] && filters.ratingRange?.[1]) {
        // include ratingRange
      }

      // Filter by category
      if (filters.category) {
        // include the category
      }

      // Filter by colors
      if (filters.colors.length > 0) {
        // include colors
      }

      // Filter by date range (availability)
      if (filters.dateRange && filters?.dateRange?.[0] && filters?.dateRange?.[0] !== null && filters?.dateRange?.[1] && filters?.dateRange?.[1] !== null) {
        // convert to normal date
        // include dateRange
      }
    }

    const filteredProducts = test_products;

    // const response = await axiosInstance.get(url, { params: { page, perPage, ...filters } });
    // console.log('response: ', response)


    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / perPage); // should be returned from backend

    const prices = filteredProducts?.map((product) => product.price);
    const filteredPrices = prices.filter(price => price !== null) as number[];
    // should be returned from backend
    const minPrice = Math.min(...filteredPrices);
    const maxPrice = Math.max(...filteredPrices);

    const totalProducts = filteredProducts.length

    return {
      data: filteredProducts,
      totalPages,
      totalProducts,
      priceRange: [minPrice, maxPrice],
    };
  } catch (error) {
    throw error;
  }
}

async function fetchProduct(
  axiosPrivate: AxiosInstance,
  url: string
): Promise<GetDataResponse<Product>> {
  try {
    // const response = await axiosPrivate.get(url);

    const objectFromAxios: Product = {
      id: "1",
      title: "Elegant Dress",
      description: "A beautiful dress for special occasions.",
      isForSale: true,
      price: 100,
      rating: 4.1,
      colors: ["Black", "Red"],
      condition: "New",
      size: "XL",
      city: "Cairo",
      category: { id: "1", title: "Dresses" },
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
    return { data: objectFromAxios };
  } catch (error) {
    throw error;
  }
}

export { fetchProducts, fetchProduct };
