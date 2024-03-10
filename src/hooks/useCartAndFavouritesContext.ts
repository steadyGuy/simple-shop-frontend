import { CART_ITEMS, FAVOURITE_ITEMS } from "@/constants/global.constant";

import { useEffect, useState } from "react";

const useCartAndFavouritesContext = () => {
  const cartItemsStorage = localStorage.getItem(CART_ITEMS);
  const favouriteItemsStorage = localStorage.getItem(FAVOURITE_ITEMS);
  const [cartItems, setCartItems] = useState<{ id: number; amount: number }[]>(
    cartItemsStorage ? JSON.parse(cartItemsStorage) : []
  );
  const [favouriteItems, setFavouriteItems] = useState<number[]>(
    favouriteItemsStorage ? JSON.parse(favouriteItemsStorage) : []
  );

  const addToCart = (id: number, amount: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) return;
    setCartItems((prev) => [...prev, { id, amount }]);
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
  };
};

export default useCartAndFavouritesContext;
