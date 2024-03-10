import { useParams } from "react-router-dom";
import ShopItemsContent from "../components/organisms/ShopItemsContent";
import { useGetProducts } from "@/queries/product.query";
import { useGetShopById } from "@/queries/product-shop.query";
import { useContext } from "react";
import { SortByContext } from "@/contexts/SortByContext";
import { CartAndFavouritesContext } from "@/contexts/CartAndFavouritesContextProvider";

const ShopPage = () => {
  const { id } = useParams();
  const activeId = Number(id);
  const { sortBy } = useContext(SortByContext);
  const { favouriteItems } = useContext(CartAndFavouritesContext);
  const { data: products } = useGetProducts({
    id: activeId,
    sort: sortBy?.value,
    favouriteProducts: sortBy?.value ? favouriteItems : [],
  });
  const { data: shop } = useGetShopById(activeId);

  return (
    <>
      <div className="bg-gray-100">
        {products && shop && (
          <ShopItemsContent
            products={products.items}
            hasMoreItems={products.hasMore}
            title={shop.title}
            key={`${shop.id}-${sortBy?.value}`}
            shopId={activeId}
          />
        )}
      </div>
    </>
  );
};

export default ShopPage;
