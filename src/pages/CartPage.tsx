import CartItem from "@/components/atoms/CartItem/CartItem";
import Map from "@/components/organisms/Map";
import OrderSummary from "@/components/organisms/OrderSummary";
import { CartAndFavouritesContext } from "@/contexts/CartAndFavouritesContextProvider";
import { useGetProductsByIds } from "@/queries/product.query";
import { LocationOrderView } from "@/types";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartAndFavouritesContext);

  if (cartItems.length === 0) {
    navigate("/");
  }

  const { data: products } = useGetProductsByIds({
    ids: cartItems.map((item) => item.id),
  });
  const [clientLocation, setClientLocation] =
    useState<LocationOrderView | null>(null);

  return (
    <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
      <div className="flex sm:flex-row flex-col shadow-md my-10">
        <OrderSummary
          setClientLocation={setClientLocation}
          clientLocation={clientLocation}
        />
        <div className="sm:w-3/4 bg-white px-10 py-10 w-full">
          {products?.items && (
            <Map
              shopsLocations={products.items.map((itm) => itm.shop!)}
              setClientLocation={setClientLocation}
              clientLocation={clientLocation}
            />
          )}
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">
              {cartItems.length} {cartItems.length > 1 ? "Items" : "Item"}
            </h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              Total
            </h3>
          </div>
          {products?.items?.map((product) => (
            <CartItem
              item={product}
              amount={
                cartItems.find((itm) => itm.id == product.id)?.amount || 0
              }
              key={product.id}
            />
          ))}
          <Link
            to="/"
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
