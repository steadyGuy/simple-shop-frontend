export interface IRouterLinks {
  path: string;
}

export type RouterMetaType = {
  [key: string]: IRouterLinks;
};

const routerLinks: RouterMetaType = {
  HomePage: {
    path: "/",
  },
  CartPage: {
    path: "/cart",
  },
  ShopPage: {
    path: "/shop/:id",
  },
  NotFoundPage: {
    path: "/*",
  },
};

export default routerLinks;
