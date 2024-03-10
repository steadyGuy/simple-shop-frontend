import HeartIcon from "@/components/molecules/Icons/HeartIcon";
import { CartAndFavouritesContext } from "@/contexts/CartAndFavouritesContextProvider";
import clsx from "clsx";

import { useContext } from "react";
import { IProduct } from "src/types";

type ShopItemProps = {
  item: IProduct;
};

const ShopItem = ({ item }: ShopItemProps) => {
  const {
    addToCart,
    addToFavourites,
    removeFromCart,
    removeFromFavourites,
    cartItems,
    favouriteItems,
  } = useContext(CartAndFavouritesContext);

  const renderAddToCart = () => {
    return <button onClick={() => addToCart(item, 1)}>Add to cart</button>;
  };

  const renderRemoveFromCart = () => {
    return (
      <button onClick={() => removeFromCart(item.id)}>Remove from cart</button>
    );
  };
  return (
    <div className="bg-white rounded-2xl p-6 hover:-translate-y-2 transition-all relative flex flex-col">
      <button
        onClick={() =>
          favouriteItems.includes(item.id)
            ? removeFromFavourites(item.id)
            : addToFavourites(item.id)
        }
        className={clsx(
          "bg-gray-100 w-10 h-10 flex cursor-pointer items-center justify-center rounded-full absolute top-4 right-4",
          favouriteItems.includes(item.id) && "bg-red-500"
        )}
      >
        <HeartIcon />
      </button>
      <div className="w-11/12 h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
        <img
          src={item.image}
          alt={`${item.title} - 205x220`}
          className="h-full w-full object-contain"
        />
      </div>

      <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
      <p className="text-gray-500 text-sm mt-2">
        {item.description.slice(0, 60)}...
      </p>
      <h4 className="text-lg text-gray-700 font-bold mt-4">${item.price} </h4>
      <div className="mt-2 flex justify-between">
        {item.quantity !== 0 && (
          <>
            {cartItems.find((itm) => itm.id === item.id)
              ? renderRemoveFromCart()
              : renderAddToCart()}
          </>
        )}
        <span>qnty: {item.quantity}</span>
      </div>
    </div>
  );
};

export default ShopItem;
