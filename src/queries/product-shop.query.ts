import { useQuery } from "@tanstack/react-query";

import { QUERY_PRODUCT_SHOPS_KEY } from "../constants/query.constant";
import {
  getProductShopById,
  getProductShops,
} from "../repositories/product-shops/product-shop.repository";
import { IShop } from "src/types";

export const useGetShops = () => {
  return useQuery<IShop[]>({
    queryKey: [QUERY_PRODUCT_SHOPS_KEY],
    queryFn: () => getProductShops().then((res) => res.data),
    staleTime: 20000,
  });
};

export const useGetShopById = (id: number) => {
  return useQuery<IShop>({
    queryKey: [QUERY_PRODUCT_SHOPS_KEY, id],
    queryFn: () => getProductShopById(id).then((res) => res.data),
    staleTime: 20000,
  });
};
