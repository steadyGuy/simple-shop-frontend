export interface getProductParam {
  skip?: number;
  limit?: number;
  filters?: string;
  sort?: string;
  ids?: number[];
  favouriteProducts?: number[];
}
