import { AxiosInstance } from "axios";

interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  colors: string[];
}

interface DataResponse<T> {
  data: T[];
  totalPages?: number;
  priceRange?: [number, number];
}

interface Filters {
  priceRange?: [number, number],
  ratingRange?: [number, number],
  category?: string,
  colors?: string[]
}

async function fetchProducts(
  axiosPrivate: AxiosInstance,
  url: string,
  page: number = 1,
  perPage: number = 10,
  filters: Filters
): Promise<DataResponse<Product>> {
  try {
    // const response = await axiosPrivate.get(url, { params: { page, perPage, ...filters } });

    const objectFromAxios = [
      {
        id: 1,
        image: "../../assets/shoes.png",
        name: "Elegant Dress",
        description: "A beautiful dress for special occasions.",
        price: 100,
        rating: 4.1,
        category: "Dresses",
        colors: ["Black", "Red"],
      },
      {
        id: 2,
        image: "../../assets/shoes.png",
        name: "Casual Dress",
        description: "Perfect for everyday wear.",
        price: 50,
        rating: 4.0,
        category: "Dresses",
        colors: ["Blue", "Green"],
      },
      {
        id: 3,
        image: "../../assets/shoes.png",
        name: "Party Dress",
        description: "Stand out at any event.",
        price: 150,
        rating: 4.5,
        category: "Dresses",
        colors: ["Pink", "Purple"],
      },
      {
        id: 4,
        image: "../../assets/shoes.png",
        name: "Summer Dress",
        description: "Light and breezy for hot days.",
        price: 75,
        rating: 4.2,
        category: "Dresses",
        colors: ["Yellow", "White"],
      },
      {
        id: 5,
        image: "../../assets/shoes.png",
        name: "Meow Dress",
        description: "Light and breezy for hot days.",
        price: 75,
        rating: 1.2,
        category: "Dresses",
        colors: ["Multicolour"],
      },
      {
        id: 6,
        image: "../../assets/shoes.png",
        name: "Whatever Dress",
        description: "Light and breezy for hot days.",
        price: 34,
        rating: 2.2,
        category: "Dresses",
        colors: ["Orange", "Brown"],
      },
      {
        id: 7,
        image: "../../assets/shoes.png",
        name: "NoobMaster69 Dress",
        description: "Light and breezy for hot days.",
        price: 12,
        rating: 4.4,
        category: "Dresses",
        colors: ["Gold", "Silver"],
      },
      {
        id: 8,
        image: "../../assets/shoes.png",
        name: "NoobMaster69 Dress",
        description: "Light and breezy for hot days.",
        price: 326,
        rating: 4.4,
        category: "Dresses",
        colors: ["Beige", "Clear"],
      },
    ];

    const total = 2;

    const prices = objectFromAxios?.map((product) => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return { data: objectFromAxios, totalPages: total, priceRange: [minPrice, maxPrice] };
  } catch (error) {
    throw error;
  }
}



export { fetchProducts };
