import { IOrder } from "@/types";
import apiClient from "../apiClient";
import { createOrderParam } from "./order.param";

export const createOrder = async ({
  name,
  address,
  phone,
  email,
  products,
}: createOrderParam) => {
  return apiClient<IOrder>({
    method: "post",
    url: `/orders`,
    data: {
      name,
      address,
      phone,
      email,
      products,
    },
  });
};
