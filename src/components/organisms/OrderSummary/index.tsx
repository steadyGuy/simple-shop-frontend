import { CartAndFavouritesContext } from "@/contexts/CartAndFavouritesContextProvider";
import { LocationOrderView } from "@/types";

import { Dispatch, SetStateAction, useContext, useMemo, useState } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";

type OrderSummaryProps = {
  clientLocation: LocationOrderView | null;
  setClientLocation: Dispatch<SetStateAction<LocationOrderView | null>>;
};

const OrderSummary = ({
  clientLocation,
  setClientLocation,
}: OrderSummaryProps) => {
  const { cartItems } = useContext(CartAndFavouritesContext);
  const defaultForm = {
    email: "",
    phone: "",
    address: clientLocation?.formatedAddress,
  };
  const [form, setForm] = useState(defaultForm);
  const renderInput = ({
    type = "text",
    placeholder,
    name,
  }: {
    type: string;
    placeholder: string;
    name: keyof typeof form;
  }) => {
    return (
      <input
        type={type}
        id={`inp-${name}`}
        name={name}
        required
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder}
        className="p-2 text-sm w-full mt-3"
      />
    );
  };

  const totalCost = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.amount * item.price, 0);
  }, [cartItems]);
  console.log("OrderSummary", clientLocation);
  return (
    <div id="summary" className="sm:w-1/4 px-8 py-10 w-full">
      <form>
        <h1 className="font-semibold text-2xl pb-4">Order Summary</h1>
        <div>
          <label className="font-medium inline-block text-sm uppercase">
            Shipping
          </label>
          {renderInput({
            type: "email",
            placeholder: "Enter your email",
            name: "email",
          })}
          {renderInput({
            type: "tel",
            placeholder: "Enter your phone number",
            name: "phone",
          })}
          <ReactGoogleAutocomplete
            className="p-2 text-sm w-full mt-3"
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={(place) =>
              setClientLocation({
                formatedAddress: place.formatted_address || "",
                coords: {
                  lat: Number(place.geometry?.location?.lat()),
                  lng: Number(place.geometry?.location?.lng()),
                },
              })
            }
            defaultValue={clientLocation?.formatedAddress}
          />
        </div>

        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>${totalCost}</span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full disabled:bg-gray-400">
            Checkout
          </button>
        </div>
      </form>
      <form>
        <div className="pt-10 pb-4">
          <label
            htmlFor="promo"
            className="font-semibold inline-block mb-3 text-sm uppercase"
          >
            Promo Code
          </label>
          <input
            type="text"
            required
            id="promo"
            placeholder="Enter your code"
            className="p-2 text-sm w-full"
          />
        </div>
        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase disabled:bg-gray-400">
          Apply
        </button>
      </form>
    </div>
  );
};

export default OrderSummary;
