import { createOrderParam } from "@/repositories/orders/order.param";
import { createOrder } from "@/repositories/orders/order.repository";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateArticleMutation = () =>
  useMutation({
    mutationFn: (data: createOrderParam) =>
      createOrder(data).then((res) => res.data),
    onError: (error) => {
      toast.error(error.message.toString());
    },
  });
