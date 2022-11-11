import { atom, selector } from "recoil";
import { Product } from "../data/products";

export const cartState = atom<Product[]>({
    key: "cart",
    default: [],
});

export type Cart = {
    totalCost: number;
    totalQty: number;
};

export const cartTotalState = selector<Cart>({
    key: "cartState",
    get: ({ get }) => {
        const totalCost = get(cartState).reduce(
            (a, b) => a + b.price * b.qty,
            0
        );
        const totalQty = get(cartState).reduce((a, b) => a + b.qty, 0);
        return {
            totalCost,
            totalQty,
        };
    },
});

export interface CartTotals {
    [item: string]: number;
}

export const cartAdjustedTotalState = atom<CartTotals>({
    key: "cart-adjusted-totals",
    default: {},
});

export const cartTotalPriceState = selector<number>({
    key: "cart-total-price",
    get: ({ get }) => {
        const cartTotals = get(cartAdjustedTotalState);
        let total = 0;
        for (const key in cartTotals) {
            total += cartTotals[key];
        }
        return total;
    },
});
