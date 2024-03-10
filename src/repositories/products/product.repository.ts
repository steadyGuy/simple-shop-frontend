import apiClient from "../apiClient";
import { getProductParam } from "./product.param";

export const getProducts = async ({
  skip,
  limit,
  filters,
  sort,
  ids,
  favouriteProducts,
}: getProductParam) => {
  let urlParams = "";
  if (filters) {
    urlParams = urlParams.concat(`&where=${filters}`);
  }
  if (sort) {
    urlParams = urlParams.concat(`&sort=${sort}`);
  }
  if (skip) {
    urlParams = urlParams.concat(`&skip=${skip}`);
  }
  if (limit) {
    urlParams = urlParams.concat(`&take=${limit}`);
  }
  if (ids) {
    urlParams = urlParams.concat(`&ids=${ids.join(",")}`);
  }

  if (favouriteProducts && favouriteProducts.length > 0) {
    urlParams = urlParams.concat(
      `&favouriteIds=${favouriteProducts.join(",")}`
    );
  }
  return await apiClient({
    method: "get",
    url:
      urlParams.length > 1
        ? encodeURI(`/products?${urlParams.slice(1)}`)
        : "/products",
  });
};
