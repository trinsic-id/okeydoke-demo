import { atom, selector } from "recoil";
import { defataultProducts, Product } from "../data/products";
import { memberProduceState } from "./member";

export const productsState = atom<Product[]>({
  key: "products",
  default: defataultProducts,
});

export const filterProductsState = atom<boolean>({
  key: "filter-products",
  default: true,
});

export const filteredProductsState = selector<Product[]>({
  key: "filtered-products-state",
  get: ({ get }) => {
    const products = get(productsState);
    const isFiltered = get(filterProductsState);
    const memberProduce = get(memberProduceState);

    if (isFiltered && memberProduce) {
      return products.filter(
        (product) => product.produceType === memberProduce
      );
    }
    return products;
  },
});
