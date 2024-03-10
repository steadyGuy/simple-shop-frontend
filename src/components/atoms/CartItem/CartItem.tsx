import { CartAndFavouritesContext } from "@/contexts/CartAndFavouritesContextProvider";
import { IProduct } from "@/types";
import { useContext } from "react";

type CartItemProps = {
  item: IProduct;
  amount: number;
};

const CartItem = ({ item, amount }: CartItemProps) => {
  const { increaseItemAmount, decreaseItemAmount, removeFromCart } = useContext(
    CartAndFavouritesContext
  );
  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-20">
          <img
            className="h-24 object-contain"
            src={item.image}
            alt={item.title}
          />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{item.title}</span>
          <span className="text-red-500 text-xs">{item.shop?.title}</span>
          <span
            onClick={() => removeFromCart(item.id)}
            className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
          >
            Remove
          </span>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <button onClick={() => decreaseItemAmount(item)}>
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
        <input
          className="mx-2 border text-center w-12"
          type="text"
          disabled
          value={amount}
        />
        <button onClick={() => increaseItemAmount(item)}>
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${item.price}
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${item.price * amount}
      </span>
    </div>
  );
};

export default CartItem;
