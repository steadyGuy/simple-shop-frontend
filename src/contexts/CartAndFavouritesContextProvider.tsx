import useCartAndFavouritesContext from "@/hooks/useCartAndFavouritesContext";
import { createContext } from "react";

interface ICartAndFavouritesContextProviderProps {
  children: JSX.Element[] | JSX.Element;
}

export const CartAndFavouritesContext = createContext(
  {} as ReturnType<typeof useCartAndFavouritesContext>
);

const CartAndFavouritesContextProvider = ({
  children,
}: ICartAndFavouritesContextProviderProps) => {
  return (
    <CartAndFavouritesContext.Provider value={useCartAndFavouritesContext()}>
      {children}
    </CartAndFavouritesContext.Provider>
  );
};

export default CartAndFavouritesContextProvider;
