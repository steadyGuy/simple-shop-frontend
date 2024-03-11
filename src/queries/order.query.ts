import { createOrderParam } from "@/repositories/orders/order.param";
import { createOrder } from "@/repositories/orders/order.repository";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import queryClient from "./queryClient";
import { QUERY_PRODUCTS_KEY } from "@/constants/query.constant";

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: (data: createOrderParam) =>
      createOrder(data).then((res) => {
        queryClient.invalidateQueries({ queryKey: [QUERY_PRODUCTS_KEY] });
        return res.data;
      }),
    onError: (error) => {
      toast.error(error.message.toString());
    },
  });
