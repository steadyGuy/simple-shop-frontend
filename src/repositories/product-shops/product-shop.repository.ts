import apiClient from "../apiClient";

export const getProductShops = async () => {
  return await apiClient({
    method: "get",
    url: `/product-shops`,
  });
};

export const getProductShopById = async (id: number) => {
  return await apiClient({
    method: "get",
    url: `/product-shops/${id}`,
  });
};
