import ShopItemsContent from "../components/organisms/ShopItemsContent";
import { useGetProducts } from "../queries/product.query";
import { useContext } from "react";
import { SortByContext } from "@/contexts/SortByContext";
import { CartAndFavouritesContext } from "@/contexts/CartAndFavouritesContextProvider";

const HomePage = () => {
  const { favouriteItems } = useContext(CartAndFavouritesContext);
  const { sortBy } = useContext(SortByContext);
  const { data } = useGetProducts({
    sort: sortBy?.value,
    favouriteProducts: sortBy?.value ? favouriteItems : [],
  });

  return (
    <>
      {data && (
        <ShopItemsContent
          products={data.items}
          hasMoreItems={data.hasMore}
          title="Home page"
          key={sortBy?.value}
        />
      )}
    </>
  );
};

export default HomePage;
