export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  timestamp: string;
  shop?: IShop;
}

export interface IPagination<T> {
  hasMore: boolean;
  items: T[];
}

export interface IShop {
  id: number;
  title: string;
  address?: IAddress;
}

export interface IAddress extends ILocation {
  id: number;
}

export interface ILocation {
  latitude: string;
  longitude: string;
}

export interface SortBy {
  title: string; // Field to sort by
  value: string; // Sort direction (ascending or descending)
}

export type LocationOrderView = {
  formatedAddress: string;
  coords: { lat: number; lng: number };
};
