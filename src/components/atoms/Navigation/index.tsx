import { Link } from "react-router-dom";
import HeartIcon from "../../molecules/Icons/HeartIcon";
import { useContext } from "react";
import { CartAndFavouritesContext } from "@/contexts/CartAndFavouritesContextProvider";

const Navigation = () => {
  const { cartItems, favouriteItems } = useContext(CartAndFavouritesContext);
  return (
    <header className="px-4 mx-auto fixed left-0 w-full bg-white z-50">
      <div className="flex-no-wrap relative flex w-full items-center justify-between py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:py-4">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart" className="ml-4">
            Shopping cart
          </Link>
        </nav>
        <div className="flex">
          <div>
            <HeartIcon />
            &nbsp;({favouriteItems.length})
          </div>
          <Link to="/cart" className="ml-4 flex">
            Cart ({cartItems.length})
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
