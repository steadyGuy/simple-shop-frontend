import { useQuery } from "@tanstack/react-query";

import {
  QUERY_PRODUCTS_BY_IDS_KEY,
  QUERY_PRODUCTS_KEY,
} from "../constants/query.constant";

import { getProducts } from "../repositories/products/product.repository";

import { IPagination, IProduct } from "@/types";

export const useGetProducts = ({
  skip,
  sort,
  favouriteProducts,
  id,
  automaticallyRunning,
}: {
  skip?: number;
  id?: number;
  sort?: string;
  favouriteProducts: number[];
  automaticallyRunning?: boolean;
}) => {
  const queryKey = [QUERY_PRODUCTS_KEY];
  if (skip) {
    queryKey.push(`${skip}`);
  }
  if (id) {
    queryKey.push(`${id}`);
  }
  if (sort) {
    queryKey.push(sort);
  }

  // if (favouriteProducts.length > 0) {
  //   queryKey.push(favouriteProducts.join(","));
  // }

  return useQuery<IPagination<IProduct>>({
    enabled: automaticallyRunning,
    queryKey,
    queryFn: () =>
      getProducts({
        skip,
        favouriteProducts,
        sort,
        filters: id ? `shop[id]=${id}` : undefined,
      }).then((res) => res.data),
    staleTime: 20000,
  });
};

export const useGetProductsByIds = ({
  ids,
  sort,
  automaticallyRunning,
}: {
  ids: number[];
  sort?: string;
  automaticallyRunning?: boolean;
}) => {
  const queryKey = [QUERY_PRODUCTS_BY_IDS_KEY];
  if (ids.length > 0) {
    queryKey.push(ids.join(","));
  }
  if (sort) {
    queryKey.push(sort);
  }
  return useQuery<IPagination<IProduct>>({
    enabled: automaticallyRunning,
    queryKey,
    queryFn: () =>
      getProducts({
        ids,
        sort,
      }).then((res) => res.data),
    staleTime: 20000,
  });
};
