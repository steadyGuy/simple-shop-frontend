import { CART_ITEMS, FAVOURITE_ITEMS } from "@/constants/global.constant";
import { IProduct } from "@/types";

import { useEffect, useState } from "react";

const useCartAndFavouritesContext = () => {
  const cartItemsStorage = localStorage.getItem(CART_ITEMS);
  const favouriteItemsStorage = localStorage.getItem(FAVOURITE_ITEMS);
  const [cartItems, setCartItems] = useState<
    { id: number; amount: number; price: number }[]
  >(cartItemsStorage ? JSON.parse(cartItemsStorage) : []);
  const [favouriteItems, setFavouriteItems] = useState<number[]>(
    favouriteItemsStorage ? JSON.parse(favouriteItemsStorage) : []
  );

  const addToCart = ({ id, price }: IProduct, amount: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) return;
    setCartItems((prev) => [...prev, { id, amount, price }]);
  };

  const increaseItemAmount = (product: IProduct) => {
    const itemIdx = cartItems.findIndex((item) => item.id === product.id);
    if (itemIdx !== -1 && cartItems[itemIdx].amount < product.quantity) {
      const newCartItems = [...cartItems];
      newCartItems[itemIdx].amount += 1;
      setCartItems(newCartItems);
    }
  };

  const decreaseItemAmount = (product: IProduct) => {
    const itemIdx = cartItems.findIndex((item) => item.id === product.id);
    if (itemIdx !== -1 && cartItems[itemIdx].amount > 1) {
      const newCartItems = [...cartItems];
      newCartItems[itemIdx].amount -= 1;
      setCartItems(newCartItems);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addToFavourites = (id: number) => {
    const favourite = favouriteItems.find((item) => item === id);
    if (favourite) return;
    setFavouriteItems((prev) => [...prev, id]);
  };

  const removeFromFavourites = (id: number) => {
    setFavouriteItems((prev) => prev.filter((item) => item !== id));
  };

  useEffect(() => {
    if (cartItems) {
      localStorage.setItem(CART_ITEMS, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (favouriteItems) {
      localStorage.setItem(FAVOURITE_ITEMS, JSON.stringify(favouriteItems));
    }
  }, [favouriteItems]);

  return {
    favouriteItems,
    cartItems,
    addToCart,
    removeFromCart,
    addToFavourites,
    removeFromFavourites,
    increaseItemAmount,
    decreaseItemAmount,
  };
};

export default useCartAndFavouritesContext;
