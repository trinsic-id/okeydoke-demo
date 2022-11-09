import { atom } from "recoil";
import { defataultProducts, Product } from "../data/products";

export const productsState = atom<Product[]>({
  key: "cart",
  default: defataultProducts,
});

export const filterProductsState = atom<boolean>({
  key: "filter-products",
  default: true,
});
