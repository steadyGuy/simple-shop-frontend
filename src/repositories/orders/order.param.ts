export interface createOrderParam {
  name: string;
  email: string;
  phone: string;
  address: string;
  products: { quantity: number; id: number }[];
}
