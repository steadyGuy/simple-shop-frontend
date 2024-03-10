import { IPagination, IProduct } from "src/types";
import Sidebar from "../Sidebar";
import ShopItem from "@/components/atoms/ShopItem";
import { useContext, useEffect, useState } from "react";
import SimpleButton from "@/components/molecules/SimpleButton";
import { useGetProducts } from "@/queries/product.query";
import { ITEMS_PER_PAGE } from "@/constants/units.constant";
import SortByDropdown from "@/components/atoms/SortByDropdown";
import { SortByContext } from "@/contexts/SortByContext";
import { CartAndFavouritesContext } from "@/contexts/CartAndFavouritesContextProvider";

type ShopItemsContentProps = {
  products: IProduct[];
  hasMoreItems: boolean;
  title: string;
  shopId?: number;
  favouriteItemsProducts?: IPagination<IProduct>;
};

const ShopItemsContent = ({
  products,
  title,
  hasMoreItems,
  shopId,
}: ShopItemsContentProps) => {
  const { favouriteItems } = useContext(CartAndFavouritesContext);
  const { sortBy } = useContext(SortByContext);
  const [items, setItems] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(hasMoreItems);
  const {
    refetch,
    data: newItems,
    isLoading,
  } = useGetProducts({
    skip: currentPage * ITEMS_PER_PAGE,
    id: shopId,
    sort: sortBy?.value,
    automaticallyRunning: false,
    favouriteProducts: sortBy?.value ? favouriteItems : [],
  });

  const handleLoadMore = () => {
    refetch({});
  };

  useEffect(() => {
    if (newItems) {
      if (sortBy && favouriteItems.length > 0) {
        setItems((prev) => [
          ...prev,
          ...newItems.items.filter((itm) => !favouriteItems.includes(itm.id)),
        ]);
      } else {
        setItems((prev) => [...prev, ...newItems.items]);
      }
      setHasMore(newItems.hasMore);
      setCurrentPage((prev) => prev + 1);
    }
  }, [newItems]);

  return (
    <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
      <div className="flex justify-between w-full mb-6">
        <h2 className="text-4xl font-extrabold text-gray-800">{title}</h2>
        <div className="mt-1">
          <SortByDropdown />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-12 min-h-screen">
        <Sidebar activeShopId={shopId} />
        <div className="col-span-9 bg-gray-100 px-4 mt-6 sm:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((product) => (
              <ShopItem item={product} key={product.id} />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-6">
              <SimpleButton
                title="Load more"
                onClick={handleLoadMore}
                disabled={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopItemsContent;
