export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  timestamp: string;
}

export interface IPagination<T> {
  hasMore: boolean;
  items: T[];
}

export interface IShop {
  id: number;
  title: string;
}

export interface SortBy {
  title: string; // Field to sort by
  value: string; // Sort direction (ascending or descending)
}
