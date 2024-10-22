import React, { createContext, ReactNode, useContext } from "react";
import { ShoppingCart } from "../components/ShoppingCart.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { Availability, Product } from "../config/constants.ts";
import dayjs from "dayjs";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type RentDetails = {
  startDate: Date;
  endDate: Date;
}

type CartItem = {
  id: string;
  title: string;
  price: number;
  forSale: boolean;
  forRent: boolean;
  rentDetails?: RentDetails;
};



type ShoppingCartContextType = {
  openCart: () => void;
  closeCart: () => void;
  addToCartForSale: (product: Product) => void;
  removeFromCartForSale: (productId: string) => void;
  isAlreadyAddedForSale: (productId: string) => boolean;
  addToCartForRent: (product: Product, availability: Availability) => void;
  removeFromCartForRent: (
    productId: string,
    availability: Availability | RentDetails
  ) => void;
  isAlreadyAddedForRent: (
    productId: string,
    availability: Availability
  ) => boolean;
  cartQuantity: number;
  cartItems: CartItem[];
  getTotalPrice: () => number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.length;
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCartForSale = (product: Product) => {
    product.id = "1";
    const isRented = cartItems.find(
      (item) => item.id === product.id && item.forRent
    );

    if (isRented) {
      throw new Error("This product is already rented, can't add for sale.");
    }

    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.forSale
    );

    // Add validation for product using zod
    if (!product.id || !product.price) return;

    if (!existingItem) {
      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        forSale: true,
        forRent: false,
      };

      setCartItems([...cartItems, newItem]);
      console.log(cartItems)
    }
  };

  const removeFromCartForSale = (productId: string) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.id === productId && item.forSale)
    );
    setCartItems(updatedCart);
  };

  const isAlreadyAddedForSale = (productId: string) => {
    return cartItems.some((item) => item.id === productId && item.forSale);
  };

  const addToCartForRent = (product: Product, availability: Availability) => {
    const isBought = cartItems.find(
      (item) => item.id === product.id && item.forSale
    );
  
    if (isBought) {
      throw new Error("This product is already bought, can't add for rent.");
    }

    const existingItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.forRent &&
        item.rentDetails?.startDate === availability.startDate &&
        item.rentDetails?.endDate === availability.endDate
    );

    // Add validation for product using zod
    if (!product.id || !product.price) return;

    if (!existingItem) {
      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: availability.price,
        forSale: false,
        forRent: true,
        rentDetails: {
          startDate: availability.startDate,
          endDate: availability.endDate,
        },
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeFromCartForRent = (
    productId: string,
    availability: Availability | RentDetails
  ) => {
    const updatedCart = cartItems.filter(
      (item) =>
        !(
          item.id === productId &&
          item.forRent &&
          item.rentDetails?.startDate === availability.startDate &&
          item.rentDetails?.endDate === availability.endDate
        )
    );
    setCartItems(updatedCart);
  };

  const isAlreadyAddedForRent = (
    productId: string,
    availability: Availability
  ) => {
    return cartItems.some(
      (item) =>
        item.id === productId &&
        item.forRent &&
        dayjs(item.rentDetails?.startDate).format('DD/MM/YYYY') === dayjs(availability.startDate).format('DD/MM/YYYY') &&
        dayjs(item.rentDetails?.endDate).format('DD/MM/YYYY') === dayjs(availability.endDate).format('DD/MM/YYYY')
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      // If the item is bought (forSale), add its price
      if (item.forSale) {
        total += item.price;
      }
  
      // If the item is rented (forRent), add its price
      if (item.forRent && item.rentDetails) {
        total += item.price;
      }
  
      return total;
    }, 0);
  };
  

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        addToCartForSale,
        removeFromCartForSale,
        isAlreadyAddedForSale,
        addToCartForRent,
        removeFromCartForRent,
        isAlreadyAddedForRent,
        cartQuantity,
        cartItems,
        getTotalPrice
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
